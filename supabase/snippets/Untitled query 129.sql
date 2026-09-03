select 'vehicle_category' as enum_name, enumlabel
from pg_enum
where enumtypid = 'vehicle_category'::regtype
order by enumsortorder;

select 'fuel_type' as enum_name, enumlabel
from pg_enum
where enumtypid = 'fuel_type'::regtype
order by enumsortorder;

select 'transmission_type' as enum_name, enumlabel
from pg_enum
where enumtypid = 'transmission_type'::regtype
order by enumsortorder;

select 'vehicle_status' as enum_name, enumlabel
from pg_enum
where enumtypid = 'vehicle_status'::regtype
order by enumsortorder;
