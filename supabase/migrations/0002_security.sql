-- ============================================================
-- Her Story — 0002: roles, invite-code signup, member uploads
-- Run in Supabase SQL Editor AFTER 0001_init.sql.
--
-- Security model (v2):
--   • owner   → first account ever created; full control,
--               generates invite codes, sees everything
--   • member  → invited via single-use code; can add their own
--               quotes/memories/letters + upload photos to their
--               own private storage folder
--   • anon    → public rows only
-- All enforced by RLS in the database, not by the UI.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Roles
-- ------------------------------------------------------------
create table if not exists public.site_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  created_at timestamptz not null default now()
);
alter table public.site_roles enable row level security;
create policy "read own role" on public.site_roles
  for select using (auth.uid() = user_id or public.is_admin());
create policy "owner manages roles" on public.site_roles
  for all using (public.is_admin()) with check (public.is_admin());

-- is_admin() is now a REAL admin check (was: any logged-in user)
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_roles r
    where r.user_id = auth.uid() and r.role = 'owner'
  );
$$;

-- Auto-provision role on signup: first user = owner, rest = member
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.site_roles where role = 'owner') then
    insert into public.site_roles (user_id, role) values (new.id, 'owner');
  else
    insert into public.site_roles (user_id, role) values (new.id, 'member');
  end if;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: whoever exists now (your account) becomes owner
insert into public.site_roles (user_id, role)
select id, 'owner' from auth.users
order by created_at limit 1
on conflict (user_id) do nothing;

-- ------------------------------------------------------------
-- 2. Single-use signup codes
-- ------------------------------------------------------------
create table if not exists public.signup_codes (
  code text primary key,
  created_by uuid references auth.users(id) on delete set null,
  used_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  used_at timestamptz
);
alter table public.signup_codes enable row level security;
create policy "owner manages codes" on public.signup_codes
  for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- 2b. Code validation RPC — callable by anyone (anon), returns
--     only whether the code is valid. Never leaks code contents.
-- ------------------------------------------------------------
create or replace function public.validate_signup_code(candidate text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.signup_codes
    where code = candidate and used_by is null
  );
$$;

-- ------------------------------------------------------------
-- 3. Authorship columns
-- ------------------------------------------------------------
alter table public.quotes   add column if not exists author_id uuid default auth.uid() references auth.users(id) on delete set null;
alter table public.memories add column if not exists author_id uuid default auth.uid() references auth.users(id) on delete set null;
alter table public.letters  add column if not exists author_id uuid default auth.uid() references auth.users(id) on delete set null;

-- ------------------------------------------------------------
-- 4. Read policies — members also see their own private rows
-- ------------------------------------------------------------
drop policy if exists "public read memories" on public.memories;
drop policy if exists "public read quotes"   on public.quotes;
drop policy if exists "public read letters"  on public.letters;

create policy "public read memories" on public.memories
  for select using (is_public or author_id = auth.uid() or public.is_admin());
create policy "public read quotes" on public.quotes
  for select using (is_public or author_id = auth.uid() or public.is_admin());
create policy "public read letters" on public.letters
  for select using (not is_private or author_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------
-- 5. Member write policies (own rows only)
-- ------------------------------------------------------------
create policy "members insert quotes" on public.quotes
  for insert to authenticated with check (auth.uid() = author_id);
create policy "members update own quotes" on public.quotes
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "members delete own quotes" on public.quotes
  for delete to authenticated using (auth.uid() = author_id);

create policy "members insert memories" on public.memories
  for insert to authenticated with check (auth.uid() = author_id);
create policy "members update own memories" on public.memories
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "members delete own memories" on public.memories
  for delete to authenticated using (auth.uid() = author_id);

create policy "members insert letters" on public.letters
  for insert to authenticated with check (auth.uid() = author_id);
create policy "members update own letters" on public.letters
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "members delete own letters" on public.letters
  for delete to authenticated using (auth.uid() = author_id);

-- ------------------------------------------------------------
-- 6. Storage — replace the old "any authenticated" policies
--    Members: read/write/delete ONLY inside photos/<their-uuid>/
--    Owner:   full media access
-- ------------------------------------------------------------
drop policy if exists "auth read photos"  on storage.objects;
drop policy if exists "auth write photos" on storage.objects;

create policy "owner read media" on storage.objects
  for select using (bucket_id in ('photos','audio') and public.is_admin());
create policy "member read own media" on storage.objects
  for select using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "member upload own media" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "member delete own media" on storage.objects
  for delete using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
