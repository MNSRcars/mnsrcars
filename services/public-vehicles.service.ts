import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/database.types";

type VehicleRow = Database["public"]["Tables"]["vehicles"]["Row"];

export type PublicVehicleListItem = Pick<
  VehicleRow,
  | "id"
  | "slug"
  | "brand"
  | "model"
  | "year"
  | "price_per_day"
  | "category"
  | "fuel_type"
  | "transmission"
  | "seats"
  | "doors"
  | "color"
  | "description"
  | "features"
  | "is_featured"
  | "status"
>;

export type PublicVehicleDetail = Pick<
  VehicleRow,
  | "id"
  | "slug"
  | "brand"
  | "model"
  | "year"
  | "price_per_day"
  | "price_per_week"
  | "price_per_month"
  | "deposit_amount"
  | "category"
  | "fuel_type"
  | "transmission"
  | "seats"
  | "doors"
  | "color"
  | "description"
  | "features"
  | "is_featured"
  | "status"
  | "mileage"
>;

export async function getPublicVehicles(): Promise<PublicVehicleListItem[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, slug, brand, model, year, price_per_day, category, fuel_type, transmission, seats, doors, color, description, features, is_featured, status"
    )
    .eq("is_public", true)
    .order("is_featured", { ascending: false })
    .order("price_per_day", { ascending: true });

  if (error) {
  console.warn("⚠️ Attention: Pas de véhicules trouvés - utilisation d'une liste vide");
  return [];
}

export async function getPublicVehicleBySlug(slug: string): Promise<PublicVehicleDetail | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, slug, brand, model, year, price_per_day, price_per_week, price_per_month, deposit_amount, category, fuel_type, transmission, seats, doors, color, description, features, is_featured, status, mileage"
    )
    .eq("slug", slug)
    .eq("is_public", true)
    .maybeSingle();

  if (error) {
    throw new Error("Impossible de recuperer ce vehicule.");
  }

  return data;
}

// Correction ajoutée le 07/09/2026