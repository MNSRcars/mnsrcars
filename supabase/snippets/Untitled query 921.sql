select enumlabel
from pg_enum
where enumtypid = 'vehicle_category'::regtype
order by enumsortorder;
select
  brand,
  model,
  category,
  fuel_type,
  transmission,
  status,
  is_public,
  is_featured
from public.vehicles
order by created_at desc
limit 10;
