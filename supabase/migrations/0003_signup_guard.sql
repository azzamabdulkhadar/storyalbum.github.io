-- ============================================================
-- Her Story — 0003: signup code enforcement at the DB level
-- Run AFTER 0002_security.sql.
-- ============================================================

-- Mark a code as used (callable by any authenticated user mid-signup)
create or replace function public.claim_signup_code(candidate text)
returns void
language sql security definer
set search_path = public
as $$
  update public.signup_codes
  set used_by = auth.uid(), used_at = now()
  where code = candidate and used_by is null and auth.uid() is not null;
$$;

-- Hard guard: a signup with an invalid/used invite_code is REJECTED
-- by the database itself, even if the client form is bypassed.
create or replace function public.enforce_invite_code()
returns trigger
language plpgsql security definer
set search_path = public
as $$
declare code text;
  jwt_role text;
begin
  -- Dashboard/API-admin user creation runs as service_role — allow it
  jwt_role := coalesce(current_setting('request.jwt.claims', true)::json->>'role', '');
  if jwt_role = 'service_role' then
    return new;
  end if;

  code := new.raw_user_meta_data->>'invite_code';
  if code is null then
    raise exception 'Signup requires an invite code.';
  end if;
  if not exists (
    select 1 from public.signup_codes
    where signup_codes.code = code and used_by is null
  ) then
    raise exception 'Invalid or already-used invite code.';
  end if;
  return new;
end $$;

drop trigger if exists enforce_invite_code_trigger on auth.users;
create trigger enforce_invite_code_trigger
  before insert on auth.users
  for each row execute function public.enforce_invite_code();
