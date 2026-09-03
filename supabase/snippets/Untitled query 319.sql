-- Voir si les tables existent
select to_regclass('public.gps_devices') as gps_devices;
select to_regclass('public.gps_positions') as gps_positions;

-- Colonnes actuelles (si les tables existent)
select table_name, column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name in ('gps_devices', 'gps_positions')
order by table_name, ordinal_position;