"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createGpsDevice(formData: FormData) {
  const supabase = await createClient();

  const provider = String(formData.get("provider") ?? "").trim();
  const device_identifier = String(formData.get("device_identifier") ?? "").trim();
  const labelRaw = formData.get("label");
  const vehicleRaw = formData.get("vehicle_id");

  const label = labelRaw ? String(labelRaw).trim() : null;
  const vehicle_id = vehicleRaw && String(vehicleRaw).trim() !== "" ? String(vehicleRaw).trim() : null;

  if (!provider || !device_identifier) {
    throw new Error("Fournisseur et identifiant sont obligatoires.");
  }

  const { data, error } = await supabase
    .from("gps_devices")
    .insert({
      provider,
      device_identifier,
      label: label || null,
      vehicle_id,
      is_active: true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("createGpsDevice error:", error);
    throw new Error(`Erreur création GPS: ${error.message}`);
  }

  revalidatePath("/admin/gps-devices");
  revalidatePath("/admin/tracking");
  revalidatePath("/gps-devices");
  revalidatePath("/tracking");
  return data;
}

export async function updateGpsDevice(id: string, formData: FormData) {
  const supabase = await createClient();

  const labelRaw = formData.get("label");
  const vehicleRaw = formData.get("vehicle_id");
  const is_active = formData.get("is_active") === "true";

  const label = labelRaw ? String(labelRaw).trim() : null;
  const vehicle_id = vehicleRaw && String(vehicleRaw).trim() !== "" ? String(vehicleRaw).trim() : null;

  const { error } = await supabase
    .from("gps_devices")
    .update({
      label: label || null,
      vehicle_id,
      is_active,
    })
    .eq("id", id);

  if (error) {
    console.error("updateGpsDevice error:", error);
    throw new Error(`Erreur mise à jour GPS: ${error.message}`);
  }

  revalidatePath("/admin/gps-devices");
  revalidatePath("/admin/tracking");
  revalidatePath("/gps-devices");
  revalidatePath("/tracking");
}

export async function deleteGpsDevice(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gps_devices").delete().eq("id", id);

  if (error) {
    console.error("deleteGpsDevice error:", error);
    throw new Error(`Erreur suppression GPS: ${error.message}`);
  }

  revalidatePath("/admin/gps-devices");
  revalidatePath("/admin/tracking");
  revalidatePath("/gps-devices");
  revalidatePath("/tracking");
}