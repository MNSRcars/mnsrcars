import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from "@/lib/validations/customer";

export type CustomerListItem = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  country: string;
  created_at: string;
};

export type CustomerDetail = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  country: string;
  city: string | null;
  address: string | null;
  driver_license_number: string | null;
  driver_license_country: string | null;
  notes: string | null;
  created_at: string;
};

export async function getCustomers(): Promise<CustomerListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("customers")
    .select("id, first_name, last_name, email, phone, city, country, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Impossible de récupérer les clients.");
  }

  return data ?? [];
}

export async function getCustomerById(id: string): Promise<CustomerDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("customers")
    .select("id, first_name, last_name, email, phone, country, city, address, driver_license_number, driver_license_country, notes, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Impossible de récupérer le client.");
  }

  return data;
}

export async function createCustomer(input: CreateCustomerInput) {
  const profile = await getCurrentProfile();

  if (!profile) {
    throw new Error("Vous devez être connecté pour ajouter un client.");
  }

  if (!["super_admin", "admin", "manager", "agent"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission d'ajouter un client.");
  }

  const parsed = createCustomerSchema.parse(input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("customers")
    .insert({
      first_name: parsed.first_name,
      last_name: parsed.last_name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      country: parsed.country,
      city: parsed.city || null,
      address: parsed.address || null,
      driver_license_number: parsed.driver_license_number || null,
      driver_license_country: parsed.driver_license_country || null,
      notes: parsed.notes || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Impossible d'ajouter le client.");
  }

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "customer.create",
    entity_type: "customer",
    entity_id: data.id,
    metadata: {
      first_name: parsed.first_name,
      last_name: parsed.last_name,
      email: parsed.email || null,
    },
  });

  return data.id;
}
