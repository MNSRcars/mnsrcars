select
  t.typname as enum_name,
  e.enumlabel
from pg_type t
join pg_enum e on e.enumtypid = t.oid
where t.typname in (
  'vehicle_category',
  'fuel_type',
  'transmission_type',
  'vehicle_status'
)
order by t.typname, e.enumsortorder;