do $$
declare
  t text;
begin
  for t in
    select table_name
    from information_schema.columns
    where table_schema = 'public'
      and column_name = 'updated_at'
  loop
    execute format(
      'create trigger trg_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      t,
      t
    );
  end loop;
end $$;

create trigger reservations_set_number
before insert on public.reservations
for each row execute function public.set_reservation_number();

create trigger rental_contracts_set_number
before insert on public.rental_contracts
for each row execute function public.set_contract_number();

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
