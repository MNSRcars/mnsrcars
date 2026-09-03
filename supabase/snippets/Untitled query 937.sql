-- 1) État boîtiers
select id, device_identifier, is_active, vehicle_id, label
from public.gps_devices;

-- 2) Force lien Duster + actif
update public.gps_devices
set
  vehicle_id = '1cad7a4c-7522-45de-beef-60a6ad313590',
  is_active = true;

-- 3) RLS positions (dev local)
alter table public.gps_positions enable row level security;

drop policy if exists "gps_positions_all_auth" on public.gps_positions;
drop policy if exists "gps_positions_all_anon" on public.gps_positions;

create policy "gps_positions_all_auth"
  on public.gps_positions for all to authenticated
  using (true) with check (true);

create policy "gps_positions_all_anon"
  on public.gps_positions for all to anon
  using (true) with check (true);

-- 4) Test insert direct (doit marcher)
insert into public.gps_positions (
  device_id, vehicle_id, latitude, longitude,
  speed, heading, battery_level, fuel_level, ignition, recorded_at
)
select
  d.id, d.vehicle_id,
  33.5731, -7.5898,
  55, 120, 90, 60, true, now()
from public.gps_devices d
where d.vehicle_id is not null
limit 1
returning id, speed, vehicle_id;