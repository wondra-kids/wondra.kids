-- WONDRA — Collecte visiteur v2 « MAX » (PRÉ-LANCEMENT) — décision WDR-079 (2026-09-15)
-- =====================================================================================
-- MODE : pré-lancement = collecte maximale, first-party uniquement (rien ne sort de WONDRA).
--   Côté serveur (headers PostgREST, fiables) : IP, user-agent, accept-language.
--   Côté client  (beacon) : url complète, referrer complet, UTM, langue(s), timezone,
--     écran/viewport/DPR, appareil/connexion/cœurs/mémoire, session, durée, scroll,
--     clics (liens/boutons), et 'lead' quand un visiteur laisse son email.
-- BASCULE AU LANCEMENT OFFICIEL (outil : scripts/purge_visitor_data.py) :
--   1) update public.wondra_settings set value='min' where key='visit_mode';  -- arrêt IP/UA
--   2) python3 scripts/purge_visitor_data.py --anonymize                     -- scrub historique
--   MODE 'min' = v1 : path, referrer_domain, visitor_id quotidien uniquement.
-- Écriture : RPC log_visit (et log_page_view conservé, délègue) security definer — anon: execute seul.
-- Lecture / purge : service_role uniquement.
-- Idempotente. Exécutée en une seule transaction (begin/commit).
begin;

create extension if not exists pgcrypto;

-- 1. Colonnes v2 (nullable : compat totale avec la v1)
alter table public.page_visits
  add column if not exists url                text,
  add column if not exists ref_full           text,
  add column if not exists ua                 text,
  add column if not exists ip                 inet,
  add column if not exists accept_language    text,
  add column if not exists visitor_persistent uuid,
  add column if not exists session_id         uuid,
  add column if not exists event              text not null default 'pageview',
  add column if not exists meta               jsonb,
  add column if not exists country            text,
  add column if not exists city               text,
  add column if not exists isp                text;

-- 2. Réglage global (bascule lancement)
create table if not exists public.wondra_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);
insert into public.wondra_settings (key, value) values ('visit_mode', 'max')
  on conflict (key) do nothing;
alter table public.wondra_settings enable row level security;
revoke all on public.wondra_settings from anon, authenticated;
grant select on public.wondra_settings to service_role;

-- 3. Cache géo (rempli hors-ligne par scripts/geo_enrich.py — jamais d'appel tiers côté visiteur)
create table if not exists public.ip_geo (
  ip         inet primary key,
  country    text,
  region     text,
  city       text,
  isp        text,
  org        text,
  asn        text,
  mobile     boolean,
  proxy      boolean,
  hosting    boolean,
  raw        jsonb,
  fetched_at timestamptz not null default now()
);
alter table public.ip_geo enable row level security;
revoke all on public.ip_geo from anon, authenticated;
grant select, insert, update, delete on public.ip_geo to service_role;

-- 4. RPC v2 : capture enrichie
create or replace function public.log_visit(
  p_path       text,
  p_event      text default 'pageview',
  p_referrer   text default '',
  p_ref_full   text default '',
  p_visitor    text default null,
  p_persistent text default null,
  p_session    text default null,
  p_meta       jsonb default null
) returns boolean
language plpgsql security definer set search_path = public as $$
declare
  v_mode   text := coalesce((select value from public.wondra_settings where key = 'visit_mode'), 'max');
  v_head   jsonb;
  v_ip     inet := null;
  v_ua     text := null;
  v_accept text := null;
  v_txt    text;
  v_uuid1  uuid := null;
  v_uuid2  uuid := null;
  v_uuid3  uuid := null;
  v_pmeta  jsonb := coalesce(p_meta, '{}'::jsonb);
begin
  -- En-têtes de la requête (posés par PostgREST ; non spoofables côté client)
  begin
    v_head := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb;
  exception when others then
    v_head := '{}'::jsonb;
  end;

  if v_mode <> 'min' then
    v_txt := btrim(split_part(coalesce(v_head->>'x-forwarded-for',
                                       v_head->>'cf-connecting-ip',
                                       v_head->>'x-real-ip', ''), ',', 1));
    begin v_ip := nullif(v_txt, '')::inet; exception when others then v_ip := null; end;
    v_ua     := left(coalesce(v_head->>'user-agent', ''), 400);
    v_accept := left(coalesce(v_head->>'accept-language', ''), 160);
  end if;

  -- Borne la taille du blob client (3 Ko max)
  if octet_length(v_pmeta::text) > 3000 then
    v_pmeta := jsonb_build_object('truncated', true, 'bytes', octet_length(v_pmeta::text));
  end if;

  begin v_uuid1 := p_visitor::uuid;    exception when others then v_uuid1 := null; end;
  begin v_uuid2 := p_persistent::uuid; exception when others then v_uuid2 := null; end;
  begin v_uuid3 := p_session::uuid;    exception when others then v_uuid3 := null; end;

  insert into public.page_visits
    (path, referrer_domain, visitor_id, url, ref_full, ua, ip, accept_language,
     visitor_persistent, session_id, event, meta)
  values (
    coalesce(nullif(left(p_path, 200), ''), '/'),
    coalesce(nullif(lower(left(p_referrer, 255)), ''), ''),
    v_uuid1,
    nullif(left(coalesce(v_pmeta->>'url', ''), 600), ''),
    nullif(left(p_ref_full, 600), ''),
    v_ua,
    v_ip,
    v_accept,
    v_uuid2,
    v_uuid3,
    coalesce(nullif(left(p_event, 40), ''), 'pageview'),
    v_pmeta
  );
  return true;
end;
$$;
grant execute on function public.log_visit(text, text, text, text, text, text, text, jsonb)
  to anon, authenticated;

-- 5. RPC v1 conservé (pages en cache) : délègue à log_visit, capte aussi les en-têtes
drop function if exists public.log_page_view(text, text, text);
create or replace function public.log_page_view(
  p_path text, p_referrer text default '', p_visitor text default null
) returns boolean
language sql security definer set search_path = public as $$
  select public.log_visit(p_path, 'pageview', p_referrer, '', p_visitor, null, null, '{}'::jsonb);
$$;
grant execute on function public.log_page_view(text, text, text) to anon, authenticated;

-- 6. Index v2
create index if not exists idx_pv_session on public.page_visits (session_id);
create index if not exists idx_pv_persist on public.page_visits (visitor_persistent);
create index if not exists idx_pv_ip      on public.page_visits (ip);
create index if not exists idx_pv_event   on public.page_visits (event);

commit;
