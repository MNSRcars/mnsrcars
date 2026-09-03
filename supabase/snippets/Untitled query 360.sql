-- Flotte publique MNSRcars
-- Ajout / mise à jour par slug

-- 1) Dacia Logan
insert into public.vehicles (
  brand,
  model,
  year,
  category,
  fuel_type,
  transmission,
  seats,
  doors,
  license_plate,
  slug,
  status,
  is_public,
  is_featured,
  price_per_day,
  price_per_week,
  price_per_month,
  deposit_amount,
  color,
  description,
  features,
  mileage
)
select
  'dacia',
  'Logan',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-LOGAN-01',
  'dacia-logan',
  'available',
  true,
  false,
  300,
  2000,
  8000,
  5000,
  'noir',
  'Dacia Logan 2026, économique, fiable et idéale pour les déplacements quotidiens à Casablanca.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'dacia-logan'
);

update public.vehicles
set
  brand = 'dacia',
  model = 'Logan',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = false,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'noir',
  description = 'Dacia Logan 2026, économique, fiable et idéale pour les déplacements quotidiens à Casablanca.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'dacia-logan';

-- 2) Dacia Sandero
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'dacia',
  'Sandero',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-SANDERO-01',
  'dacia-sandero',
  'available',
  true,
  true,
  250,
  1700,
  6000,
  5000,
  'gris',
  'Dacia Sandero 2026, citadine économique et pratique, parfaite pour la ville et les séjours courte durée.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'dacia-sandero'
);

update public.vehicles
set
  brand = 'dacia',
  model = 'Sandero',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 250,
  price_per_week = 1700,
  price_per_month = 6000,
  deposit_amount = 5000,
  color = 'gris',
  description = 'Dacia Sandero 2026, citadine économique et pratique, parfaite pour la ville et les séjours courte durée.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'dacia-sandero';

-- 3) Renault Clio 5 gris
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'renault',
  'Clio 5',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-CLIO5-GRIS-01',
  'renault-clio-5-gris',
  'available',
  true,
  true,
  300,
  2000,
  8000,
  5000,
  'gris',
  'Renault Clio 5 2026, élégante et moderne, idéale pour une conduite confortable au quotidien.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'renault-clio-5-gris'
);

update public.vehicles
set
  brand = 'renault',
  model = 'Clio 5',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'gris',
  description = 'Renault Clio 5 2026, élégante et moderne, idéale pour une conduite confortable au quotidien.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'renault-clio-5-gris';

-- 4) Renault Clio 5 blanche
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'renault',
  'Clio 5',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-CLIO5-BLANC-01',
  'renault-clio-5-blanche',
  'available',
  true,
  false,
  300,
  2000,
  8000,
  5000,
  'blanche',
  'Renault Clio 5 blanche 2026, polyvalente et confortable pour les trajets urbains et interurbains.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'renault-clio-5-blanche'
);

update public.vehicles
set
  brand = 'renault',
  model = 'Clio 5',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = false,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'blanche',
  description = 'Renault Clio 5 blanche 2026, polyvalente et confortable pour les trajets urbains et interurbains.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'renault-clio-5-blanche';

-- 5) Peugeot 208 noire
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'peugeot',
  '208',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-208-NOIR-01',
  'peugeot-208-noire',
  'available',
  true,
  true,
  300,
  2000,
  8000,
  5000,
  'noir',
  'Peugeot 208 noire 2026, compacte, dynamique et idéale pour la conduite urbaine premium.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'peugeot-208-noire'
);

update public.vehicles
set
  brand = 'peugeot',
  model = '208',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'noir',
  description = 'Peugeot 208 noire 2026, compacte, dynamique et idéale pour la conduite urbaine premium.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'peugeot-208-noire';

-- 6) Peugeot 208 grise
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'peugeot',
  '208',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-208-GRIS-01',
  'peugeot-208-grise',
  'available',
  true,
  false,
  300,
  2000,
  8000,
  5000,
  'gris',
  'Peugeot 208 grise 2026, élégante et agréable pour les trajets professionnels et personnels.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'peugeot-208-grise'
);

update public.vehicles
set
  brand = 'peugeot',
  model = '208',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = false,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'gris',
  description = 'Peugeot 208 grise 2026, élégante et agréable pour les trajets professionnels et personnels.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'peugeot-208-grise';

-- 7) Peugeot 208 pistache
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'peugeot',
  '208',
  2026,
  'economy',
  'diesel',
  'manual',
  5,
  5,
  'MNS-208-PISTACHE-01',
  'peugeot-208-pistache',
  'available',
  true,
  false,
  300,
  2000,
  8000,
  5000,
  'pistache',
  'Peugeot 208 pistache 2026, originale et moderne, parfaite pour se démarquer avec style.',
  array['CarPlay', 'Climatisation', 'Radar de recul'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'peugeot-208-pistache'
);

update public.vehicles
set
  brand = 'peugeot',
  model = '208',
  year = 2026,
  category = 'economy',
  fuel_type = 'diesel',
  transmission = 'manual',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = false,
  price_per_day = 300,
  price_per_week = 2000,
  price_per_month = 8000,
  deposit_amount = 5000,
  color = 'pistache',
  description = 'Peugeot 208 pistache 2026, originale et moderne, parfaite pour se démarquer avec style.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul']
where slug = 'peugeot-208-pistache';

-- 8) Volkswagen Touareg R-Line
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'volkswagen',
  'Touareg R-Line',
  2026,
  'suv',
  'petrol',
  'automatic',
  5,
  5,
  'MNS-TOUAREG-01',
  'volkswagen-touareg-r-line',
  'available',
  true,
  true,
  0,
  0,
  0,
  5000,
  'gris foncé',
  'Volkswagen Touareg R-Line 2026, SUV premium haut de gamme disponible sur demande pour une expérience exclusive.',
  array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'volkswagen-touareg-r-line'
);

update public.vehicles
set
  brand = 'volkswagen',
  model = 'Touareg R-Line',
  year = 2026,
  category = 'suv',
  fuel_type = 'petrol',
  transmission = 'automatic',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 0,
  price_per_week = 0,
  price_per_month = 0,
  deposit_amount = 5000,
  color = 'gris foncé',
  description = 'Volkswagen Touareg R-Line 2026, SUV premium haut de gamme disponible sur demande pour une expérience exclusive.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium']
where slug = 'volkswagen-touareg-r-line';

-- 9) Volkswagen T-Roc
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'volkswagen',
  'T-Roc',
  2026,
  'suv',
  'diesel',
  'automatic',
  5,
  5,
  'MNS-TROC-01',
  'volkswagen-t-roc',
  'available',
  true,
  true,
  0,
  0,
  0,
  5000,
  'gris',
  'Volkswagen T-Roc 2026, SUV compact premium avec confort moderne et prestation haut de gamme.',
  array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'volkswagen-t-roc'
);

update public.vehicles
set
  brand = 'volkswagen',
  model = 'T-Roc',
  year = 2026,
  category = 'suv',
  fuel_type = 'diesel',
  transmission = 'automatic',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 0,
  price_per_week = 0,
  price_per_month = 0,
  deposit_amount = 5000,
  color = 'gris',
  description = 'Volkswagen T-Roc 2026, SUV compact premium avec confort moderne et prestation haut de gamme.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium']
where slug = 'volkswagen-t-roc';

-- 10) Hyundai Tucson
insert into public.vehicles (
  brand, model, year, category, fuel_type, transmission, seats, doors,
  license_plate, slug, status, is_public, is_featured,
  price_per_day, price_per_week, price_per_month, deposit_amount,
  color, description, features, mileage
)
select
  'hyundai',
  'Tucson',
  2026,
  'suv',
  'diesel',
  'automatic',
  5,
  5,
  'MNS-TUCSON-01',
  'hyundai-tucson',
  'available',
  true,
  true,
  0,
  0,
  0,
  5000,
  'gris',
  'Hyundai Tucson 2026, SUV moderne, spacieux et confortable pour une clientèle premium.',
  array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium'],
  0
where not exists (
  select 1 from public.vehicles where slug = 'hyundai-tucson'
);

update public.vehicles
set
  brand = 'hyundai',
  model = 'Tucson',
  year = 2026,
  category = 'suv',
  fuel_type = 'diesel',
  transmission = 'automatic',
  seats = 5,
  doors = 5,
  status = 'available',
  is_public = true,
  is_featured = true,
  price_per_day = 0,
  price_per_week = 0,
  price_per_month = 0,
  deposit_amount = 5000,
  color = 'gris',
  description = 'Hyundai Tucson 2026, SUV moderne, spacieux et confortable pour une clientèle premium.',
  features = array['CarPlay', 'Climatisation', 'Radar de recul', 'SUV premium']
where slug = 'hyundai-tucson';

-- Vérification finale
select
  brand,
  model,
  slug,
  category,
  fuel_type,
  transmission,
  price_per_day,
  is_public,
  is_featured,
  status
from public.vehicles
order by brand, model, slug;