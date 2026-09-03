-- Voir la structure
select column_name, data_type
from information_schema.columns
where table_name = 'profiles'
order by ordinal_position;

-- Voir ton profil
select * from public.profiles
where id = (select id from auth.users where email = 'aacaapvp@gmail.com');