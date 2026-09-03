-- 1) Voir la structure exacte de profiles
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'profiles'
order by ordinal_position;

-- 2) Upsert super_admin AVEC email (obligatoire)
insert into public.profiles (id, email, role)
select u.id, u.email, 'super_admin'
from auth.users u
where u.email = 'aacaapvp@gmail.com'
on conflict (id) do update
set
  email = excluded.email,
  role  = 'super_admin';

-- 3) Vérification
select p.id, p.email, p.role, p.is_active
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'aacaapvp@gmail.com';