"use server";

import { ZodError } from "zod";
import { updateVehicle } from "@/services/vehicle.service";
import { updateVehicleSchema } from "@/lib/validations/vehicle";

export async function updateVehicleAction(id: string, input: unknown) {
  try {
    const parsed = updateVehicleSchema.parse(input);
    await updateVehicle(id, parsed);

    return { success: true as const };
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
          : "Impossible de modifier le véhicule.",
    };
  }
}
