create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  session_id text not null,
  page_path text,
  properties jsonb not null default '{}',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referred_by text,
  referrer text,
  landing_page text,
  created_at timestamptz not null default now()
);

grant insert on public.analytics_events to anon, authenticated;
grant select on public.analytics_events to authenticated;
grant all on public.analytics_events to service_role;

alter table public.analytics_events enable row level security;

create policy "Anyone can log an event" on public.analytics_events
for insert to anon, authenticated
with check (true);

create policy "Admins can view events" on public.analytics_events
for select to authenticated
using (private.has_role(auth.uid(), 'admin'::public.app_role));

create index analytics_events_event_name_idx on public.analytics_events (event_name);
create index analytics_events_created_at_idx on public.analytics_events (created_at);
