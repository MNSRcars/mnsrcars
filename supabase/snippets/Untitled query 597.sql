select id, device_identifier, label, is_active, vehicle_id
from public.gps_devices;

select id, brand, model, license_plate
from public.vehicles
limit 10;