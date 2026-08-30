-- WONDRA — Capture d'email dans Supabase (WDR-041, point 5 ; fondation 2.7)
-- Migration versionnée : toute modification de la base passe par un fichier comme celui-ci,
-- jamais par des clics dans l'interface Supabase.
-- Table + RLS : les visiteurs peuvent S'INSCRIRE (insert) et se DÉSINSCRIRE
-- (update par token via RPC), mais jamais LIRE la liste. Lecture = service_role seul.
-- STATUT : EXÉCUTÉE le 2026-08-30 sur le projet wondra (via management API) — rejouable (idempotente).

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

-- inscription : n'importe qui peut ajouter son email (aucune donnée enfant)
create policy capture_insert on public.capture_emails
  for insert to anon, authenticated
  with check (true);

-- doublons : la contrainte unique + on conflict (géré côté client avec
-- Prefer: resolution=ignore-duplicates) — une adresse n'apparaît qu'une fois.

-- désinscription : fonction RPC sécurisée — un token (reçu par email) désinscrit
-- exactement la ligne qui le porte. Pas de UPDATE direct anon sur la table.
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
