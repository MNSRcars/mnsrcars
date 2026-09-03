create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.has_any_role(required text[])
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (
      select role::text = any(required)
      from public.profiles
      where id = auth.uid()
        and is_active = true
    ),
    false
  );
$$;

create or replace function public.reservation_is_blocking(p_status public.reservation_status)
returns boolean
language sql
immutable
as $$
  select p_status in ('pending', 'confirmed', 'rented');
$$;

create or replace function public.set_reservation_number()
returns trigger
language plpgsql
as $$
begin
  if new.reservation_number is null or new.reservation_number = '' then
    new.reservation_number := 'RES-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 6));
  end if;
  return new;
end;
$$;

create or replace function public.set_contract_number()
returns trigger
language plpgsql
as $$
begin
  if new.contract_number is null or new.contract_number = '' then
    new.contract_number := 'CTR-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 6));
  end if;
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role, is_active)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'agent'),
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
