import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  createVehicleSchema,
  updateVehicleSchema,
  type CreateVehicleInput,
  type UpdateVehicleInput,
} from "@/lib/validations/vehicle";

export type VehicleListItem = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuel_type: string;
  license_plate: string;
  status: string;
  price_per_day: number;
  is_public: boolean;
  created_at: string;
};

export type VehicleDetail = {
  id: string;
  brand: string;
  model: string;
  slug: string;
  year: number;
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  doors: number;
  color: string | null;
  license_plate: string;
  vin: string | null;
  status: string;
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
  deposit_amount: number;
  mileage: number;
  description: string | null;
  is_featured: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getVehicles(): Promise<VehicleListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, brand, model, year, category, transmission, fuel_type, license_plate, status, price_per_day, is_public, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Impossible de récupérer les véhicules.");
  }

  return (data ?? []).map((vehicle) => ({
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    category: vehicle.category,
    transmission: vehicle.transmission,
    fuel_type: vehicle.fuel_type,
    license_plate: vehicle.license_plate,
    status: vehicle.status,
    price_per_day: Number(vehicle.price_per_day),
    is_public: vehicle.is_public,
    created_at: vehicle.created_at,
  }));
}

export async function getVehicleById(id: string): Promise<VehicleDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, brand, model, slug, year, category, transmission, fuel_type, seats, doors, color, license_plate, vin, status, price_per_day, price_per_week, price_per_month, deposit_amount, mileage, description, is_featured, is_public, created_at, updated_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Impossible de récupérer le véhicule.");
  }

  if (!data) return null;

  return {
    id: data.id,
    brand: data.brand,
    model: data.model,
    slug: data.slug,
    year: data.year,
    category: data.category,
    transmission: data.transmission,
    fuel_type: data.fuel_type,
    seats: data.seats,
    doors: data.doors,
    color: data.color,
    license_plate: data.license_plate,
    vin: data.vin,
    status: data.status,
    price_per_day: Number(data.price_per_day),
    price_per_week: Number(data.price_per_week),
    price_per_month: Number(data.price_per_month),
    deposit_amount: Number(data.deposit_amount),
    mileage: data.mileage,
    description: data.description,
    is_featured: data.is_featured,
    is_public: data.is_public,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

export async function createVehicle(input: CreateVehicleInput) {
  const profile = await getCurrentProfile();

  if (!profile) {
    throw new Error("Vous devez être connecté pour ajouter un véhicule.");
  }

  if (!["super_admin", "admin", "manager"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission d'ajouter un véhicule.");
  }

  const parsed = createVehicleSchema.parse(input);
  const supabase = await createClient();

  const slugBase = slugify(
    `${parsed.brand}-${parsed.model}-${parsed.license_plate}`
  );
  const slug = `${slugBase}-${Date.now().toString().slice(-6)}`;

  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      brand: parsed.brand,
      model: parsed.model,
      slug,
      year: parsed.year,
      category: parsed.category,
      transmission: parsed.transmission,
      fuel_type: parsed.fuel_type,
      seats: parsed.seats,
      doors: parsed.doors,
      color: parsed.color || null,
      license_plate: parsed.license_plate.toUpperCase(),
      vin: parsed.vin || null,
      status: parsed.status,
      price_per_day: parsed.price_per_day,
      price_per_week: parsed.price_per_week,
      price_per_month: parsed.price_per_month,
      deposit_amount: parsed.deposit_amount,
      mileage: parsed.mileage,
      description: parsed.description || null,
      features: [],
      is_featured: parsed.is_featured,
      is_public: parsed.is_public,
    })
    .select("id")
    .single();

  if (error || !data) {
    if (error?.code === "23505") {
      throw new Error("Cette immatriculation existe déjà.");
    }

    throw new Error(error?.message || "Impossible d'ajouter le véhicule.");
  }

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "vehicle.create",
    entity_type: "vehicle",
    entity_id: data.id,
    metadata: {
      brand: parsed.brand,
      model: parsed.model,
      license_plate: parsed.license_plate,
    },
  });

  return data.id;
}

export async function updateVehicle(id: string, input: UpdateVehicleInput) {
  const profile = await getCurrentProfile();

  if (!profile) {
    throw new Error("Vous devez être connecté pour modifier un véhicule.");
  }

  if (!["super_admin", "admin", "manager"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission de modifier un véhicule.");
  }

  const parsed = updateVehicleSchema.parse(input);
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({
      brand: parsed.brand,
      model: parsed.model,
      year: parsed.year,
      category: parsed.category,
      transmission: parsed.transmission,
      fuel_type: parsed.fuel_type,
      seats: parsed.seats,
      doors: parsed.doors,
      color: parsed.color || null,
      license_plate: parsed.license_plate.toUpperCase(),
      vin: parsed.vin || null,
      status: parsed.status,
      price_per_day: parsed.price_per_day,
      price_per_week: parsed.price_per_week,
      price_per_month: parsed.price_per_month,
      deposit_amount: parsed.deposit_amount,
      mileage: parsed.mileage,
      description: parsed.description || null,
      is_featured: parsed.is_featured,
      is_public: parsed.is_public,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      throw new Error("Cette immatriculation existe déjà.");
    }

    throw new Error(error.message || "Impossible de modifier le véhicule.");
  }

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "vehicle.update",
    entity_type: "vehicle",
    entity_id: id,
    metadata: {
      brand: parsed.brand,
      model: parsed.model,
      license_plate: parsed.license_plate,
      status: parsed.status,
    },
  });
}
