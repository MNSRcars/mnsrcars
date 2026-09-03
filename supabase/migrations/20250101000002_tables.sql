create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text unique not null,
  phone text,
  role public.user_role not null default 'agent',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  address text,
  city text not null default 'Casablanca',
  country text not null default 'Maroc',
  latitude numeric,
  longitude numeric,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  slug text unique not null,
  year integer not null,
  category public.vehicle_category not null,
  transmission public.transmission_type not null,
  fuel_type public.fuel_type not null,
  seats integer not null,
  doors integer not null,
  color text,
  license_plate text unique not null,
  vin text unique,
  status public.vehicle_status not null default 'available',
  price_per_day numeric(10,2) not null default 0,
  price_per_week numeric(10,2) not null default 0,
  price_per_month numeric(10,2) not null default 0,
  deposit_amount numeric(10,2) not null default 0,
  mileage integer not null default 0,
  description text,
  features text[] not null default '{}',
  is_featured boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vehicles_price_check check (price_per_day >= 0 and price_per_week >= 0 and price_per_month >= 0 and deposit_amount >= 0),
  constraint vehicles_year_check check (year >= 1990),
  constraint vehicles_capacity_check check (seats > 0 and doors > 0)
);

create table public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.vehicle_documents (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  expires_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  country text not null default 'Maroc',
  city text,
  address text,
  driver_license_number text,
  driver_license_country text,
  driver_license_expiry date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customer_documents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  expires_at date,
  created_at timestamptz not null default now()
);

create table public.extras (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  pricing_type public.pricing_type not null default 'per_rental',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint extras_price_check check (price >= 0)
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_number text unique,
  vehicle_id uuid not null references public.vehicles(id),
  customer_id uuid not null references public.customers(id),
  pickup_location_id uuid references public.locations(id),
  return_location_id uuid references public.locations(id),
  pickup_at timestamptz not null,
  return_at timestamptz not null,
  status public.reservation_status not null default 'pending',
  source text not null default 'web',
  price_per_day numeric(10,2) not null default 0,
  subtotal_amount numeric(10,2) not null default 0,
  options_amount numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  tax_amount numeric(10,2) not null default 0,
  total_amount numeric(10,2) not null default 0,
  deposit_amount numeric(10,2) not null default 0,
  currency text not null default 'MAD',
  customer_notes text,
  internal_notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancelled_at timestamptz,
  constraint reservations_dates_check check (return_at > pickup_at),
  constraint reservations_amounts_check check (
    price_per_day >= 0 and subtotal_amount >= 0 and options_amount >= 0 and
    discount_amount >= 0 and tax_amount >= 0 and total_amount >= 0 and deposit_amount >= 0
  )
);

create table public.reservation_extras (
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  extra_id uuid not null references public.extras(id),
  quantity integer not null default 1,
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null,
  created_at timestamptz not null default now(),
  primary key (reservation_id, extra_id),
  constraint reservation_extras_quantity_check check (quantity > 0),
  constraint reservation_extras_price_check check (unit_price >= 0 and total_price >= 0)
);

create table public.reservation_status_history (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  old_status public.reservation_status,
  new_status public.reservation_status not null,
  changed_by uuid references public.profiles(id),
  reason text,
  created_at timestamptz not null default now()
);

create table public.rental_contracts (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  customer_id uuid not null references public.customers(id),
  vehicle_id uuid not null references public.vehicles(id),
  contract_number text unique,
  start_at timestamptz not null,
  end_at timestamptz not null,
  pickup_mileage integer,
  return_mileage integer,
  pickup_fuel_level text,
  return_fuel_level text,
  pickup_notes text,
  return_notes text,
  pickup_condition text,
  return_condition text,
  customer_signature text,
  company_signature text,
  status public.rental_contract_status not null default 'draft',
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rental_contracts_dates_check check (end_at > start_at)
);

create table public.vehicle_inspections (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  reservation_id uuid references public.reservations(id) on delete cascade,
  type public.inspection_type not null,
  mileage integer,
  fuel_level text,
  notes text,
  damage_notes text,
  photos text[] not null default '{}',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.vehicle_damage_reports (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  reservation_id uuid references public.reservations(id) on delete cascade,
  inspection_id uuid references public.vehicle_inspections(id) on delete set null,
  description text not null,
  severity public.damage_severity not null default 'minor',
  estimated_cost numeric(10,2) not null default 0,
  status public.damage_status not null default 'reported',
  photos text[] not null default '{}',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint damage_cost_check check (estimated_cost >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  customer_id uuid not null references public.customers(id),
  amount numeric(10,2) not null default 0,
  currency text not null default 'MAD',
  status public.payment_status not null default 'pending',
  method public.payment_method not null default 'cash',
  provider text,
  provider_payment_id text,
  provider_reference text,
  paid_at timestamptz,
  refunded_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payments_amount_check check (amount >= 0)
);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  category public.vehicle_category,
  start_date date not null,
  end_date date not null,
  price_per_day numeric(10,2),
  price_per_week numeric(10,2),
  price_per_month numeric(10,2),
  discount_percent numeric(5,2),
  minimum_days integer,
  priority integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pricing_rules_dates_check check (end_date >= start_date),
  constraint pricing_rules_discount_check check (discount_percent is null or (discount_percent >= 0 and discount_percent <= 100))
);

create table public.gps_devices (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete set null,
  provider text not null,
  device_identifier text not null,
  label text,
  is_active boolean not null default true,
  installed_at timestamptz,
  removed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gps_devices_unique_provider_device unique (provider, device_identifier)
);

create table public.gps_positions (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  gps_device_id uuid references public.gps_devices(id) on delete set null,
  provider text not null,
  device_identifier text not null,
  latitude numeric not null,
  longitude numeric not null,
  speed numeric,
  heading numeric,
  ignition boolean,
  battery_level numeric,
  recorded_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.maintenance_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  title text not null,
  description text,
  status public.maintenance_status not null default 'planned',
  maintenance_type text,
  started_at timestamptz,
  completed_at timestamptz,
  cost_amount numeric(10,2),
  provider_name text,
  mileage integer,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint maintenance_cost_check check (cost_amount is null or cost_amount >= 0)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  reservation_id uuid references public.reservations(id) on delete set null,
  channel public.notification_channel not null default 'system',
  status public.notification_status not null default 'pending',
  subject text,
  message text not null,
  provider text,
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
