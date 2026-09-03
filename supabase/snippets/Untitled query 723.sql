update public.profiles
set role = 'super_admin'
where id = (select id from auth.users where email = 'aacaapvp@gmail.com');

-- si aucune ligne mise à jour, le profil n'existe pas :
insert into public.profiles (id, role)
select id, 'super_admin'
from auth.users
where email = 'aacaapvp@gmail.com'
on conflict (id) do update set role = 'super_admin';

select email, role
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'aacaapvp@gmail.com';