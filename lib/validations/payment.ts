import { z } from "zod";

export const createPaymentSchema = z.object({
  reservation_id: z.string().uuid("Réservation invalide."),
  amount: z.coerce.number().min(1, "Le montant doit être supérieur à 0."),
  method: z.enum(["cash", "bank_transfer", "card", "online", "other"]),
  notes: z.string().trim().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
