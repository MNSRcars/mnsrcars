alter table public.gps_positions
add column if not exists device_id uuid;
alter table public.gps_positions
drop constraint if exists gps_positions_device_id_fkey;

alter table public.gps_positions
add constraint gps_positions_device_id_fkey
foreign key (device_id)
references public.gps_devices(id)
on delete cascade;
notify pgrst, 'reload schema';