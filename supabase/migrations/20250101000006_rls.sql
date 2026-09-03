alter table public.profiles enable row level security;
alter table public.locations enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.vehicle_documents enable row level security;
alter table public.customers enable row level security;
alter table public.customer_documents enable row level security;
alter table public.extras enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_extras enable row level security;
alter table public.reservation_status_history enable row level security;
alter table public.rental_contracts enable row level security;
alter table public.vehicle_inspections enable row level security;
alter table public.vehicle_damage_reports enable row level security;
alter table public.payments enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.gps_devices enable row level security;
alter table public.gps_positions enable row level security;
alter table public.maintenance_records enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.settings enable row level security;

create policy "profiles_select_own_or_privileged"
on public.profiles for select
using (
  id = auth.uid()
  or public.has_any_role(array['super_admin','admin','manager'])
);

create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid())
with check (
  id = auth.uid()
  and role = (select role from public.profiles where id = auth.uid())
);

create policy "profiles_super_admin_all"
on public.profiles for all
using (public.has_any_role(array['super_admin']))
with check (public.has_any_role(array['super_admin']));

create policy "locations_public_read"
on public.locations for select
using (is_active = true);

create policy "locations_staff_manage"
on public.locations for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "vehicles_public_read"
on public.vehicles for select
using (is_public = true and status <> 'inactive');

create policy "vehicles_staff_read"
on public.vehicles for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "vehicles_manage"
on public.vehicles for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "vehicle_images_public_read"
on public.vehicle_images for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_images.vehicle_id
      and v.is_public = true
      and v.status <> 'inactive'
  )
);

create policy "vehicle_images_staff_manage"
on public.vehicle_images for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "vehicle_documents_staff_read"
on public.vehicle_documents for select
using (public.has_any_role(array['super_admin','admin','manager']));

create policy "vehicle_documents_staff_manage"
on public.vehicle_documents for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "customers_staff_read"
on public.customers for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "customers_staff_manage"
on public.customers for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "customer_documents_staff_read"
on public.customer_documents for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "customer_documents_staff_manage"
on public.customer_documents for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "extras_public_read"
on public.extras for select
using (is_active = true);

create policy "extras_staff_manage"
on public.extras for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "reservations_staff_read"
on public.reservations for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "reservations_staff_manage"
on public.reservations for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "reservation_extras_staff_read"
on public.reservation_extras for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "reservation_extras_staff_manage"
on public.reservation_extras for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "reservation_status_history_staff_read"
on public.reservation_status_history for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "reservation_status_history_staff_insert"
on public.reservation_status_history for insert
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "rental_contracts_staff_read"
on public.rental_contracts for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "rental_contracts_staff_manage"
on public.rental_contracts for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "vehicle_inspections_staff_read"
on public.vehicle_inspections for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "vehicle_inspections_staff_manage"
on public.vehicle_inspections for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "vehicle_damage_reports_staff_read"
on public.vehicle_damage_reports for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "vehicle_damage_reports_staff_manage"
on public.vehicle_damage_reports for all
using (public.has_any_role(array['super_admin','admin','manager','agent']))
with check (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "payments_staff_read"
on public.payments for select
using (public.has_any_role(array['super_admin','admin','manager','accountant']));

create policy "payments_staff_manage"
on public.payments for all
using (public.has_any_role(array['super_admin','admin','accountant']))
with check (public.has_any_role(array['super_admin','admin','accountant']));

create policy "pricing_rules_staff_read"
on public.pricing_rules for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "pricing_rules_staff_manage"
on public.pricing_rules for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "gps_devices_staff_read"
on public.gps_devices for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "gps_devices_staff_manage"
on public.gps_devices for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "gps_positions_staff_read"
on public.gps_positions for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "gps_positions_staff_manage"
on public.gps_positions for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "maintenance_records_staff_read"
on public.maintenance_records for select
using (public.has_any_role(array['super_admin','admin','manager','agent']));

create policy "maintenance_records_staff_manage"
on public.maintenance_records for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "notifications_staff_read"
on public.notifications for select
using (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "notifications_staff_manage"
on public.notifications for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));

create policy "audit_logs_read_own_or_privileged"
on public.audit_logs for select
using (
  actor_id = auth.uid()
  or public.has_any_role(array['super_admin','admin','manager'])
);

create policy "audit_logs_insert_system"
on public.audit_logs for insert
with check (public.has_any_role(array['super_admin','admin','manager','agent','accountant']));

create policy "settings_public_read"
on public.settings for select
using (is_public = true);

create policy "settings_staff_manage"
on public.settings for all
using (public.has_any_role(array['super_admin','admin','manager']))
with check (public.has_any_role(array['super_admin','admin','manager']));
