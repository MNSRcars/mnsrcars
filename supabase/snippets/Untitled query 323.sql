alter table public.gps_positions
add column if not exists device_id uuid;

notify pgrst, 'reload schema';