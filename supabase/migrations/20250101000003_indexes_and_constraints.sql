create index idx_vehicles_status on public.vehicles(status);
create index idx_vehicles_category on public.vehicles(category);
create index idx_vehicles_brand_model on public.vehicles(brand, model);
create index idx_vehicles_slug on public.vehicles(slug);
create index idx_vehicles_public on public.vehicles(is_public, status);
create index idx_vehicle_images_vehicle on public.vehicle_images(vehicle_id);
create index idx_vehicle_documents_vehicle on public.vehicle_documents(vehicle_id);
create index idx_customers_email on public.customers(email);
create index idx_customers_phone on public.customers(phone);
create index idx_customers_last_name on public.customers(last_name);
create index idx_customer_documents_customer on public.customer_documents(customer_id);
create index idx_locations_active on public.locations(is_active);
create index idx_extras_active on public.extras(is_active);
create index idx_reservations_vehicle on public.reservations(vehicle_id);
create index idx_reservations_customer on public.reservations(customer_id);
create index idx_reservations_status on public.reservations(status);
create index idx_reservations_dates on public.reservations(pickup_at, return_at);
create index idx_reservations_vehicle_dates on public.reservations(vehicle_id, pickup_at, return_at);
create index idx_reservation_extras_reservation on public.reservation_extras(reservation_id);
create index idx_reservation_status_history_reservation on public.reservation_status_history(reservation_id);
create index idx_rental_contracts_reservation on public.rental_contracts(reservation_id);
create index idx_rental_contracts_vehicle on public.rental_contracts(vehicle_id);
create index idx_vehicle_inspections_vehicle on public.vehicle_inspections(vehicle_id);
create index idx_vehicle_inspections_reservation on public.vehicle_inspections(reservation_id);
create index idx_vehicle_damage_reports_vehicle on public.vehicle_damage_reports(vehicle_id);
create index idx_vehicle_damage_reports_reservation on public.vehicle_damage_reports(reservation_id);
create index idx_payments_reservation on public.payments(reservation_id);
create index idx_payments_customer on public.payments(customer_id);
create index idx_payments_status on public.payments(status);
create index idx_pricing_rules_active on public.pricing_rules(is_active, start_date, end_date);
create index idx_gps_devices_vehicle on public.gps_devices(vehicle_id);
create index idx_gps_positions_vehicle_recorded on public.gps_positions(vehicle_id, recorded_at desc);
create index idx_gps_positions_device_recorded on public.gps_positions(gps_device_id, recorded_at desc);
create index idx_maintenance_vehicle on public.maintenance_records(vehicle_id);
create index idx_maintenance_status on public.maintenance_records(status);
create index idx_notifications_reservation on public.notifications(reservation_id);
create index idx_notifications_status on public.notifications(status);
create index idx_audit_logs_actor on public.audit_logs(actor_id);
create index idx_audit_logs_entity on public.audit_logs(entity_type, entity_id);
create index idx_settings_public on public.settings(is_public);

-- ANTI-DOUBLE-BOOKING REEL POSTGRESQL
-- Statuts bloquants : pending, confirmed, rented
-- Deux reservations actives ne peuvent pas se chevaucher pour le meme vehicule.
alter table public.reservations
add constraint reservations_no_overlap
exclude using gist (
  vehicle_id with =,
  tstzrange(pickup_at, return_at, '[)') with &&
)
where (status in ('pending', 'confirmed', 'rented'));
