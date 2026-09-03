import "server-only";

import type { UserRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

export type DashboardStats = {
  totalVehicles: number;
  availableVehicles: number;
  rentedVehicles: number;
  maintenanceVehicles: number;
  pendingReservations: number;
  currentMonthRevenue: number;
};

function getCurrentMonthStart(): string {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  ).toISOString();
}

export async function getDashboardStats(
  role: UserRole
): Promise<DashboardStats> {
  const supabase = await createClient();

  const [
    totalVehiclesResult,
    availableVehiclesResult,
    rentedVehiclesResult,
    maintenanceVehiclesResult,
    pendingReservationsResult,
  ] = await Promise.all([
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("status", "available"),
    supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("status", "rented"),
    supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("status", "maintenance"),
    supabase
      .from("reservations")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  const results = [
    totalVehiclesResult,
    availableVehiclesResult,
    rentedVehiclesResult,
    maintenanceVehiclesResult,
    pendingReservationsResult,
  ];

  const databaseError = results.find((result) => result.error)?.error;

  if (databaseError) {
    throw new Error(
      "Impossible de récupérer les statistiques du dashboard."
    );
  }

  let currentMonthRevenue = 0;

  const canViewPayments = [
    "super_admin",
    "admin",
    "manager",
    "accountant",
  ].includes(role);

  if (canViewPayments) {
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("amount")
      .eq("status", "paid")
      .gte("paid_at", getCurrentMonthStart());

    if (paymentsError) {
      throw new Error("Impossible de récupérer les revenus du mois.");
    }

    currentMonthRevenue = (payments ?? []).reduce(
      (total, payment) => total + Number(payment.amount),
      0
    );
  }

  return {
    totalVehicles: totalVehiclesResult.count ?? 0,
    availableVehicles: availableVehiclesResult.count ?? 0,
    rentedVehicles: rentedVehiclesResult.count ?? 0,
    maintenanceVehicles: maintenanceVehiclesResult.count ?? 0,
    pendingReservations: pendingReservationsResult.count ?? 0,
    currentMonthRevenue,
  };
}
