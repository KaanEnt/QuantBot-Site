-- Run this in Supabase SQL Editor if waitlist signups return 42501 permission denied.
-- RLS policies alone are not enough; roles also need table-level grants.

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on public.waitlist to service_role;

grant insert on public.waitlist to anon, authenticated;

-- Optional: allow anon to update preferred_mode after signup (only if PATCH also fails)
-- grant update on public.waitlist to anon, authenticated;
-- create policy "Allow public update to waitlist"
-- on public.waitlist for update using (true) with check (true);
