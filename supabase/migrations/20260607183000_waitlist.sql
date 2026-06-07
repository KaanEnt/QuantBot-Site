-- Canonical waitlist schema for QuantBot-Site
-- Matches production Supabase table used by app/api/waitlist/route.ts

create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  preferred_mode text null,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  metadata jsonb default '{}'::jsonb,

  constraint check_valid_mode check (
    preferred_mode in ('agentic-teacher', 'quant-teacher', 'general')
  )
);

alter table public.waitlist enable row level security;

create policy "Allow public insert to waitlist"
on public.waitlist
for insert
with check (true);

grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update on public.waitlist to service_role;
grant insert on public.waitlist to anon, authenticated;

-- Diagnostic insert (run manually, then delete):
-- insert into public.waitlist (email) values ('diagnostic@example.com');
-- delete from public.waitlist where email = 'diagnostic@example.com';
