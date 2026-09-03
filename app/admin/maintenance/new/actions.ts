"use server";

import { ZodError } from "zod";
import { createMaintenance } from "@/services/maintenance.service";
import { createMaintenanceSchema } from "@/lib/validations/maintenance";

export async function createMaintenanceAction(input: unknown) {
  try {
    const parsed = createMaintenanceSchema.parse(input);
    const id = await createMaintenance(parsed);
    return { success: true as const, id };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Les données de la maintenance sont invalides.",
      };
    }

    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Impossible d'ajouter la maintenance.",
    };
  }
}
