"use server";

import { ZodError } from "zod";
import { createVehicle } from "@/services/vehicle.service";
import { createVehicleSchema } from "@/lib/validations/vehicle";

export async function createVehicleAction(input: unknown) {
  try {
    const parsed = createVehicleSchema.parse(input);
    const id = await createVehicle(parsed);

    return { success: true as const, id };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Les données du véhicule sont invalides.",
      };
    }

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Impossible d'ajouter le véhicule.",
    };
  }
}
