-- Assigne le 1er véhicule disponible à tous les boîtiers sans véhicule
update public.gps_devices d
set
  vehicle_id = (select v.id from public.vehicles v order by v.created_at nulls last limit 1),
  is_active = true
where d.vehicle_id is null
   or d.is_active = false;

-- Vérif
select id, device_identifier, is_active, vehicle_id, label
from public.gps_devices;