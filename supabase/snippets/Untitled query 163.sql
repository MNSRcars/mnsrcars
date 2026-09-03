-- Si le profil n'existe pas
insert into public.profiles (id, role)
select id, 'admin'
from auth.users
where email = 'aacaapvp@gmail.com'
on conflict (id) do update set role = 'admin';

-- Si le profil existe déjà, force admin
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'aacaapvp@gmail.com');