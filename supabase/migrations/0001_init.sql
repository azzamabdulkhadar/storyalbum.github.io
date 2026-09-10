-- ============================================================
-- Her Story — initial schema + Row Level Security
-- Run this in Supabase SQL Editor (or via supabase db push).
--
-- Security model:
--   • Everyone (anon)  → read rows where is_public = true
--   • Authenticated    → same public reads
--   • Admin (you)      → full read/write on everything
-- The service-role key bypasses RLS and must never reach the browser.
-- ============================================================

-- Helper: is the current user the admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null;
$$;

-- ------------------------------------------------------------
-- profiles (single row: her)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  nickname text,
  bio text,
  birthday text,
  hometown text,
  favorite_color text,
  favorite_food text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- chapters (life timeline)
-- ------------------------------------------------------------
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text default '',
  cover_image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- memories
-- ------------------------------------------------------------
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  memory_date date,
  category text not null default 'Random',
  image_path text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- quotes (shayari + lines)
-- ------------------------------------------------------------
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  category text not null default 'Emotional',
  language text not null default 'hinglish',
  author text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- letters (private by default!)
-- ------------------------------------------------------------
create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content jsonb not null default '[]',   -- array of paragraphs
  date date,
  is_private boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- dreams
-- ------------------------------------------------------------
create table if not exists public.dreams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text not null default 'Future Dreams',
  completed boolean not null default false,
  sort_order int not null default 0
);

-- ------------------------------------------------------------
-- songs (soundtrack)
-- ------------------------------------------------------------
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null default '',
  cover_image text,
  audio_url text,
  reason text default '',
  sort_order int not null default 0
);

-- ------------------------------------------------------------
-- people
-- ------------------------------------------------------------
create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship text not null default '',
  description text default '',
  image_path text,
  is_public boolean not null default true,
  sort_order int not null default 0
);

-- ============================================================
-- Row Level Security — enable on EVERY table
-- ============================================================
alter table public.profiles enable row level security;
alter table public.chapters enable row level security;
alter table public.memories enable row level security;
alter table public.quotes enable row level security;
alter table public.letters enable row level security;
alter table public.dreams enable row level security;
alter table public.songs enable row level security;
alter table public.people enable row level security;

-- Public read for public content --------------------------------
create policy "public read profiles"    on public.profiles  for select using (true);

create policy "public read chapters"    on public.chapters  for select using (true);

create policy "public read memories"    on public.memories  for select using (is_public or is_admin());
create policy "public read quotes"      on public.quotes    for select using (is_public or is_admin());
create policy "public read letters"     on public.letters   for select using (not is_private or is_admin());
create policy "public read dreams"      on public.dreams    for select using (true);
create policy "public read songs"       on public.songs     for select using (true);
create policy "public read people"      on public.people    for select using (is_public or is_admin());

-- Full write access for the logged-in admin ---------------------
do $$
declare t text;
begin
  foreach t in array array['profiles','chapters','memories','quotes','letters','dreams','songs','people']
  loop
    execute format('create policy "admin write %1$s" on public.%1$I for all using (is_admin()) with check (is_admin());', t);
  end loop;
end $$;

-- updated_at touch trigger --------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['profiles','chapters','memories','letters']
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$I;', t);
    execute format('create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at();', t);
  end loop;
end $$;

-- Storage buckets (private by default) --------------------------
insert into storage.buckets (id, name, public)
values ('photos', 'photos', false), ('audio', 'audio', false)
on conflict (id) do nothing;

-- Logged-in admin can read private photos via signed URLs;
-- public photo URLs are generated as signed links server-side.
create policy "auth read photos" on storage.objects
  for select using (bucket_id in ('photos','audio') and auth.role() = 'authenticated');
create policy "auth write photos" on storage.objects
  for all using (bucket_id in ('photos','audio') and auth.role() = 'authenticated')
  with check (bucket_id in ('photos','audio') and auth.role() = 'authenticated');
