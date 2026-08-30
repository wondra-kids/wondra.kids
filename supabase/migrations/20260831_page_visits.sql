-- WONDRA — Analytics first-party, sans cookies (fondation 2.7 : aucune donnée personnelle)
-- STATUT : PRÊTE — exécution via Postgres direct (pooler) ou management API, idempotente.
--
-- Principe : aucune donnée personnelle.
--   - path            : route de la page (home / jeu / level …) ou URL path des pages statiques
--   - referrer_domain : domaine de provenance (instagram.com, t.co, '' = direct)
--   - visitor_id      : uuid ALEATOIRE généré côté client (localStorage, rotatif quotidien)
--                      — sert UNIQUEMENT au comptage des visiteurs uniques du jour.
--                      Non relié à une identité, pas un fingerprint d'appareil.
--   - PAS d'IP, PAS d'user-agent, PAS de cookie, PAS de donnée enfant.
-- Écriture : RPC log_page_view security definer (anon = execute seul).
-- Lecture / purge : service_role uniquement.
-- Lecture courante : vue page_visits_daily (service_role).

create extension if not exists pgcrypto;

create table if not exists public.page_visits (
  id bigint generated always as identity primary key,
  path text not null default '/',
  referrer_domain text not null default '',
  visitor_id uuid null,
  created_at timestamptz not null default now()
);

alter table public.page_visits enable row level security;

grant usage on schema public to anon, authenticated;
grant select, delete on public.page_visits to service_role;

create or replace function public.log_page_view(p_path text, p_referrer text default '', p_visitor text default null)
returns boolean
language plpgsql security definer set search_path = public as $$
declare
  v_visitor uuid := null;
  v_path text := coalesce(nullif(left(p_path, 200), ''), '/');
  v_ref text := coalesce(nullif(lower(left(p_referrer, 255)), ''), '');
begin
  if p_visitor is not null and p_visitor <> '' then
    begin
      v_visitor := p_visitor::uuid;
    exception when others then
      v_visitor := null;
    end;
  end if;
  insert into public.page_visits (path, referrer_domain, visitor_id)
  values (v_path, v_ref, v_visitor);
  return true;
end;
$$;
grant execute on function public.log_page_view(text, text, text) to anon, authenticated;

revoke select on public.page_visits from anon, authenticated;

create index if not exists idx_pv_created on public.page_visits (created_at desc);
create index if not exists idx_pv_path on public.page_visits (path, created_at desc);

-- Lecture quotidienne (service_role) : vues + visiteurs uniques, par page et provenance
create or replace view public.page_visits_daily as
  select date_trunc('day', created_at)::date as day,
         path,
         referrer_domain,
         count(*) as views,
         count(distinct visitor_id) as uniques
  from public.page_visits
  group by 1, 2, 3
  order by 1 desc, 4 desc;

grant select on public.page_visits_daily to service_role;
