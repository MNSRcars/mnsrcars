"use server";

import { ZodError } from "zod";
import { createReservation } from "@/services/reservation.service";
import { createReservationSchema } from "@/lib/validations/reservation";

export async function createReservationAction(input: unknown) {
  try {
    const parsed = createReservationSchema.parse(input);
    const id = await createReservation(parsed);
    return { success: true as const, id };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Les données de la réservation sont invalides.",
      };
    }

    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Impossible de créer la réservation.",
    };
  }
}
