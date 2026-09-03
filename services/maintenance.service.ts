import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { createMaintenanceSchema, type CreateMaintenanceInput } from "@/lib/validations/maintenance";

export type MaintenanceListItem = {
  id: string;
  title: string;
  status: string;
  maintenance_type: string | null;
  started_at: string | null;
  completed_at: string | null;
  cost_amount: number | null;
  created_at: string;
  vehicle: { brand: string; model: string; license_plate: string } | null;
};

export async function getMaintenanceRecords(): Promise<MaintenanceListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_records")
    .select("id, title, status, maintenance_type, started_at, completed_at, cost_amount, created_at, vehicle:vehicles(brand, model, license_plate)")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Impossible de récupérer les maintenances.");

  return (data ?? []).map((record) => ({
    id: record.id,
    title: record.title,
    status: record.status,
    maintenance_type: record.maintenance_type,
    started_at: record.started_at,
    completed_at: record.completed_at,
    cost_amount: record.cost_amount === null ? null : Number(record.cost_amount),
    created_at: record.created_at,
    vehicle: Array.isArray(record.vehicle) ? record.vehicle[0] ?? null : record.vehicle,
  }));
}

export async function createMaintenance(input: CreateMaintenanceInput) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Vous devez être connecté pour ajouter une maintenance.");
  if (!["super_admin", "admin", "manager"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission d'ajouter une maintenance.");
  }

  const parsed = createMaintenanceSchema.parse(input);
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase.from("maintenance_records").insert({
    vehicle_id: parsed.vehicle_id,
    title: parsed.title,
    description: parsed.description || null,
    status: parsed.status,
    maintenance_type: parsed.maintenance_type || null,
    started_at: parsed.status === "in_progress" ? now : null,
    completed_at: parsed.status === "completed" ? now : null,
    cost_amount: parsed.cost_amount === "" || parsed.cost_amount === undefined ? null : Number(parsed.cost_amount),
    mileage: parsed.mileage === "" || parsed.mileage === undefined ? null : Number(parsed.mileage),
    notes: parsed.notes || null,
    created_by: profile.id,
  }).select("id").single();

  if (error || !data) throw new Error(error?.message || "Impossible d'ajouter la maintenance.");

  if (parsed.status === "in_progress") {
    await supabase.from("vehicles").update({ status: "maintenance" }).eq("id", parsed.vehicle_id);
  }

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "maintenance.create",
    entity_type: "maintenance",
    entity_id: data.id,
    metadata: { vehicle_id: parsed.vehicle_id, title: parsed.title, status: parsed.status },
  });

  return data.id;
}
