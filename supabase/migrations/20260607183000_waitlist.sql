-- Canonical waitlist schema expected by app/api/waitlist/route.ts
-- Compare against your live Supabase project if inserts return 500.

create table if not exists public.waitlist (
  email text primary key,
  preferred_mode text check (
    preferred_mode in ('agentic-teacher', 'quant-teacher', 'general')
  ),
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Diagnostic insert (run manually, then delete):
-- insert into public.waitlist (email) values ('diagnostic@example.com');
-- delete from public.waitlist where email = 'diagnostic@example.com';
