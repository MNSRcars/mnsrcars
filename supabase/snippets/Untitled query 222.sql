select
  g.device_identifier,
  g.is_active,
  g.vehicle_id,
  v.brand,
  v.model,
  v.license_plate
from public.gps_devices g
left join public.vehicles v
  on v.id = g.vehicle_id;