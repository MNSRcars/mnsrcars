-- =========================================================
-- GPS devices + positions (Phase 2)
-- =========================================================

-- 1) Boîtiers GPS
create table if not exists public.gps_devices (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  device_identifier text not null,
  label text,
  is_active boolean not null default true,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unique IMEI / identifiant boîtier
do $$
begin
  alter table public.gps_devices
    add constraint gps_devices_device_identifier_key unique (device_identifier);
exception
  when duplicate_object then null;
end $$;

create index if not exists idx_gps_devices_vehicle_id
  on public.gps_devices (vehicle_id);

create index if not exists idx_gps_devices_is_active
  on public.gps_devices (is_active);

-- 2) Positions / télémétrie
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

-- Si une vieille table cassée existe déjà, on ajoute les colonnes manquantes
do $$
begin
  alter table public.gps_positions add column device_id uuid references public.gps_devices(id) on delete cascade;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column vehicle_id uuid references public.vehicles(id) on delete set null;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column latitude double precision;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column longitude double precision;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column speed double precision default 0;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column heading double precision default 0;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column battery_level double precision;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column fuel_level double precision;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column ignition boolean default false;
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column recorded_at timestamptz default now();
exception when duplicate_column then null;
end $$;

do $$
begin
  alter table public.gps_positions add column created_at timestamptz default now();
exception when duplicate_column then null;
end $$;

create index if not exists idx_gps_positions_vehicle_recorded
  on public.gps_positions (vehicle_id, recorded_at desc);

create index if not exists idx_gps_positions_device_recorded
  on public.gps_positions (device_id, recorded_at desc);

-- 3) RLS
alter table public.gps_devices enable row level security;
alter table public.gps_positions enable row level security;

drop policy if exists "gps_devices_all_auth" on public.gps_devices;
drop policy if exists "gps_devices_all_anon" on public.gps_devices;
drop policy if exists "gps_positions_all_auth" on public.gps_positions;
drop policy if exists "gps_positions_all_anon" on public.gps_positions;

create policy "gps_devices_all_auth"
  on public.gps_devices for all to authenticated
  using (true) with check (true);

create policy "gps_devices_all_anon"
  on public.gps_devices for all to anon
  using (true) with check (true);

create policy "gps_positions_all_auth"
  on public.gps_positions for all to authenticated
  using (true) with check (true);

create policy "gps_positions_all_anon"
  on public.gps_positions for all to anon
  using (true) with check (true);

-- 4) Reload PostgREST schema cache
notify pgrst, 'reload schema';