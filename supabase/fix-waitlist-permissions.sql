-- Run in Supabase SQL Editor for the SAME project as your Vercel env vars.
-- Fixes 42501 "permission denied for table waitlist".

-- 1) Table-level grants (required even when RLS policies exist)
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table public.waitlist to postgres, service_role;

grant insert on table public.waitlist to anon, authenticated;

-- 2) RLS insert policy (safe to re-run)
alter table public.waitlist enable row level security;

drop policy if exists "Allow public insert to waitlist" on public.waitlist;

create policy "Allow public insert to waitlist"
on public.waitlist
for insert
to anon, authenticated
with check (true);

-- 3) Optional: allow track preference updates after signup
grant update on table public.waitlist to service_role;

-- If PATCH still fails and you want anon updates (less secure):
-- grant update on table public.waitlist to anon, authenticated;
-- drop policy if exists "Allow public update to waitlist" on public.waitlist;
-- create policy "Allow public update to waitlist"
-- on public.waitlist for update to anon, authenticated using (true) with check (true);

-- 4) Verify
insert into public.waitlist (email) values ('diagnostic@example.com');
delete from public.waitlist where email = 'diagnostic@example.com';
