-- Boîtiers GPS
create table if not exists public.gps_devices (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  device_identifier text not null unique,
  label text,
  is_active boolean not null default true,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Positions / télémétrie
create table if not exists public.gps_positions (
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

create index if not exists idx_gps_positions_vehicle_recorded
  on public.gps_positions (vehicle_id, recorded_at desc);

create index if not exists idx_gps_positions_device_recorded
  on public.gps_positions (device_id, recorded_at desc);

-- Droits d'accès (RLS + policies simples pour le dev local)
alter table public.gps_devices enable row level security;
alter table public.gps_positions enable row level security;

create policy "gps_devices_all_auth"
  on public.gps_devices for all
  to authenticated
  using (true) with check (true);

create policy "gps_positions_all_auth"
  on public.gps_positions for all
  to authenticated
  using (true) with check (true);

-- Si ton app utilise aussi la clé anon sans session dans certains cas :
create policy "gps_devices_all_anon"
  on public.gps_devices for all
  to anon
  using (true) with check (true);

create policy "gps_positions_all_anon"
  on public.gps_positions for all
  to anon
  using (true) with check (true);