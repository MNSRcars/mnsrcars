-- Voir le schéma actuel
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'gps_positions'
order by ordinal_position;

-- Recréer une table positions propre (dev local)
drop table if exists public.gps_positions cascade;

create table public.gps_positions (
  id uuid primary key default gen_random_uuid(),
  device_id uuid not null references public.gps_devices(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  latitude double precision not null,
  longitude double precision not null,
  speed double precision default 0,
  heading double precision default 0,
  battery_level double precision,
  fuel_level double precision,
  ignition boolean default false,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index idx_gps_positions_vehicle_recorded
  on public.gps_positions (vehicle_id, recorded_at desc);

create index idx_gps_positions_device_recorded
  on public.gps_positions (device_id, recorded_at desc);

alter table public.gps_positions enable row level security;

drop policy if exists "gps_positions_all_auth" on public.gps_positions;
drop policy if exists "gps_positions_all_anon" on public.gps_positions;

create policy "gps_positions_all_auth"
  on public.gps_positions for all to authenticated
  using (true) with check (true);

create policy "gps_positions_all_anon"
  on public.gps_positions for all to anon
  using (true) with check (true);

-- Boîtier toujours lié
update public.gps_devices
set
  is_active = true,
  vehicle_id = coalesce(
    vehicle_id,
    (select id from public.vehicles where license_plate = 'ZZZ' limit 1),
    (select id from public.vehicles limit 1)
  );

select id, device_identifier, is_active, vehicle_id from public.gps_devices;
select column_name from information_schema.columns
where table_name = 'gps_positions' order by ordinal_position;

notify pgrst, 'reload schema';