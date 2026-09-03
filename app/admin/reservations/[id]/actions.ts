"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";

const ALLOWED = ["pending", "confirmed", "cancelled", "rejected", "rented", "completed", "no_show"] as const;
type ReservationStatus = (typeof ALLOWED)[number];

export async function updateReservationStatusAction(id: string, status: ReservationStatus) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) throw new Error("Vous devez être connecté.");
    if (!["super_admin", "admin", "manager", "agent"].includes(profile.role)) {
      throw new Error("Vous n'avez pas la permission de modifier une réservation.");
    }
    if (!ALLOWED.includes(status)) throw new Error("Statut invalide.");

    const supabase = await createClient();
    const { data: current, error: currentError } = await supabase
      .from("reservations")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();

    if (currentError || !current) throw new Error("Réservation introuvable.");

    const { error } = await supabase
      .from("reservations")
      .update({
        status,
        cancelled_at: status === "cancelled" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23P01") throw new Error("Ce véhicule est déjà réservé sur cette période.");
      throw new Error(error.message || "Impossible de modifier le statut.");
    }

    await supabase.from("reservation_status_history").insert({
      reservation_id: id,
      old_status: current.status,
      new_status: status,
      changed_by: profile.id,
      reason: "Changement de statut back-office",
    });

    await supabase.from("audit_logs").insert({
      actor_id: profile.id,
      action: "reservation.status_update",
      entity_type: "reservation",
      entity_id: id,
      metadata: { old_status: current.status, new_status: status },
    });

    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Impossible de modifier le statut.",
    };
  }
}
