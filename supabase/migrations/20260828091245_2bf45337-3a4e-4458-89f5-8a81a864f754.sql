create schema if not exists private;

revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated, service_role;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

revoke all on function private.has_role(uuid, public.app_role) from public, anon;
grant execute on function private.has_role(uuid, public.app_role) to authenticated, service_role;

drop policy if exists "Admins can view leads" on public.waitlist_leads;
create policy "Admins can view leads" on public.waitlist_leads
for select to authenticated
using (private.has_role(auth.uid(), 'admin'::public.app_role));

drop policy if exists "Admins can view qualification answers" on public.qualification_responses;
create policy "Admins can view qualification answers" on public.qualification_responses
for select to authenticated
using (private.has_role(auth.uid(), 'admin'::public.app_role));

drop policy if exists "Admins can view demo feedback" on public.demo_feedback;
create policy "Admins can view demo feedback" on public.demo_feedback
for select to authenticated
using (private.has_role(auth.uid(), 'admin'::public.app_role));

drop function if exists public.has_role(uuid, public.app_role);