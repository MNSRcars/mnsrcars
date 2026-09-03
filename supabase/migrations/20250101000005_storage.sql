insert into storage.buckets (id, name, public)
values
  ('vehicle-images', 'vehicle-images', true),
  ('vehicle-documents', 'vehicle-documents', false),
  ('customer-documents', 'customer-documents', false),
  ('inspection-photos', 'inspection-photos', false),
  ('damage-photos', 'damage-photos', false),
  ('contract-signatures', 'contract-signatures', false)
on conflict (id) do nothing;

create policy "Vehicle images public read"
on storage.objects for select
using (bucket_id = 'vehicle-images');

create policy "Vehicle images staff manage"
on storage.objects for all
using (
  bucket_id = 'vehicle-images'
  and public.has_any_role(array['super_admin','admin','manager'])
)
with check (
  bucket_id = 'vehicle-images'
  and public.has_any_role(array['super_admin','admin','manager'])
);

create policy "Private buckets staff read"
on storage.objects for select
using (
  bucket_id in ('vehicle-documents','customer-documents','inspection-photos','damage-photos','contract-signatures')
  and public.has_any_role(array['super_admin','admin','manager','agent'])
);

create policy "Private buckets staff manage"
on storage.objects for all
using (
  bucket_id in ('vehicle-documents','customer-documents','inspection-photos','damage-photos','contract-signatures')
  and public.has_any_role(array['super_admin','admin','manager'])
)
with check (
  bucket_id in ('vehicle-documents','customer-documents','inspection-photos','damage-photos','contract-signatures')
  and public.has_any_role(array['super_admin','admin','manager'])
);
