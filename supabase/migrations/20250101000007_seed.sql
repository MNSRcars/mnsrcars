insert into public.locations (name, slug, address, city, country, is_active)
values
  ('Casablanca Centre', 'casablanca-centre', 'Boulevard d''Anfa, Casablanca', 'Casablanca', 'Maroc', true),
  ('A?roport Mohammed V', 'aeroport-mohammed-v', 'A?roport Mohammed V, Nouaceur', 'Casablanca', 'Maroc', true),
  ('Maarif', 'maarif', 'Maarif, Casablanca', 'Casablanca', 'Maroc', true)
on conflict (slug) do nothing;

insert into public.settings (key, value, description, is_public)
values
  ('company_name', '"MNScars"'::jsonb, 'Nom de l''entreprise', true),
  ('company_city', '"Casablanca"'::jsonb, 'Ville principale', true),
  ('company_country', '"Maroc"'::jsonb, 'Pays', true),
  ('default_currency', '"MAD"'::jsonb, 'Devise principale', true),
  ('contact_email', '"contact@mnscars.ma"'::jsonb, 'Email de contact', true),
  ('contact_phone', '"+212600000000"'::jsonb, 'T?l?phone de contact', true),
  ('whatsapp_number', '"212600000000"'::jsonb, 'Num?ro WhatsApp', true),
  ('booking_terms', '"Conditions de location ? d?finir"'::jsonb, 'Conditions g?n?rales', false)
on conflict (key) do nothing;
