-- 1) État actuel des boîtiers
select id, device_identifier, label, is_active, vehicle_id
from public.gps_devices;

-- 2) Liste des véhicules
select id, brand, model, license_plate
from public.vehicles
limit 20;