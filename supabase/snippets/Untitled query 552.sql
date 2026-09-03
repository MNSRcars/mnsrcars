-- Voir les boîtiers
select id, device_identifier, label, is_active, vehicle_id
from public.gps_devices;

-- Lier TOUS les boîtiers au Duster + les activer
update public.gps_devices
set
  vehicle_id = '1cad7a4c-7522-45de-beef-60a6ad313590',
  is_active  = true;

-- Vérification (vehicle_id ne doit plus être vide)
select id, device_identifier, label, is_active, vehicle_id
from public.gps_devices;