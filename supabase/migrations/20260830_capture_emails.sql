-- WONDRA — Capture d'email dans Supabase (WDR-041, point 5 ; fondation 2.7)
-- Migration versionnée : toute modification de la base passe par un fichier comme celui-ci,
-- jamais par des clics dans l'interface Supabase.
-- STATUT : EXÉCUTÉE le 2026-08-30 sur le projet wondra (via management API) — rejouable (idempotente).
--
-- Principe de sécurité : anon n'a AUCUN droit sur la table (ni lecture ni écriture).
-- Tout passe par deux fonctions RPC security definer :
--   subscribe(email)   — inscription, idempotente (ON CONFLICT DO NOTHING)
--   unsubscribe(token) — désinscription par token reçu par email
-- Lecture/export : service_role uniquement.

create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.capture_emails (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  unsub_token uuid not null default gen_random_uuid(),
  unsubscribed_at timestamptz null,
  created_at timestamptz not null default now()
);

alter table public.capture_emails enable row level security;

-- droits : anon = usage du schéma + execute sur les fonctions UNIQUEMENT
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.capture_emails to service_role;

-- plus aucune policy de table (l'insert direct anon est interdit — 403/42501)
drop policy if exists capture_insert on public.capture_emails;

-- inscription : idempotente, sans aucun droit de lecture pour anon
create or replace function public.subscribe(p_email citext)
returns boolean
language sql security definer set search_path = public as $$
  insert into public.capture_emails (email) values (p_email)
  on conflict (email) do nothing
  returning true;
$$;
grant execute on function public.subscribe(citext) to anon, authenticated;

-- désinscription : le token (reçu par email) désinscrit exactement la ligne qui le porte
create or replace function public.unsubscribe(t uuid)
returns boolean
language sql security definer set search_path = public as $$
  update public.capture_emails set unsubscribed_at = now()
  where unsub_token = t
  returning true;
$$;
grant execute on function public.unsubscribe(uuid) to anon, authenticated;

-- lecture : service_role uniquement (jamais anon) — l'export hebdo passe par là
revoke select on public.capture_emails from anon, authenticated;

-- indices pour l'export hebdo (emails actifs, non désinscrits)
create index if not exists idx_capture_active on public.capture_emails (created_at desc)
  where unsubscribed_at is null;
