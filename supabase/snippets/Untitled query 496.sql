-- Qui es-tu côté auth ?
select id, email, role from auth.users where email = 'aacaapvp@gmail.com';

-- Y a-t-il une table de profils / rôles ?
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('profiles', 'users', 'roles', 'user_roles', 'members', 'staff');

-- Policies sur vehicles
select policyname, roles, cmd, qual, with_check
from pg_policies
where tablename = 'vehicles';