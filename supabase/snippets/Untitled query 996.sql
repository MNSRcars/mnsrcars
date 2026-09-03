select u.email, p.*
from auth.users u
left join public.profiles p on p.id = u.id
where u.email = 'aacaapvp@gmail.com';