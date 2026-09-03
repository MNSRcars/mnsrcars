update public.gps_devices
set
  vehicle_id = '1cad7a4c-7522-45de-beef-60a6ad313590',
  is_active = true
where id = (
  select id
  from public.gps_devices
  order by created_at desc
  limit 1