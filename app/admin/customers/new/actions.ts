"use server";

import { ZodError } from "zod";
import { createCustomer } from "@/services/customer.service";
import { createCustomerSchema } from "@/lib/validations/customer";

export async function createCustomerAction(input: unknown) {
  try {
    const parsed = createCustomerSchema.parse(input);
    const id = await createCustomer(parsed);
    return { success: true as const, id };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Les données du client sont invalides.",
      };
    }

    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Impossible d'ajouter le client.",
    };
  }
}
