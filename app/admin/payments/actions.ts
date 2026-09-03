"use server";

import { ZodError } from "zod";
import { createPayment } from "@/services/payment.service";
import { createPaymentSchema } from "@/lib/validations/payment";

export async function createPaymentAction(input: unknown) {
  try {
    const parsed = createPaymentSchema.parse(input);
    const id = await createPayment(parsed);
    return { success: true as const, id };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Les données du paiement sont invalides.",
      };
    }

    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Impossible d'enregistrer le paiement.",
    };
  }
}
