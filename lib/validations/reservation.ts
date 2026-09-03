import { z } from "zod";

export const createReservationSchema = z.object({
  vehicle_id: z.string().uuid("Véhicule invalide."),
  customer_id: z.string().uuid("Client invalide."),
  pickup_location_id: z.string().uuid("Lieu de récupération invalide.").optional().or(z.literal("")),
  return_location_id: z.string().uuid("Lieu de retour invalide.").optional().or(z.literal("")),
  pickup_at: z.string().min(1, "La date de départ est obligatoire."),
  return_at: z.string().min(1, "La date de retour est obligatoire."),
  customer_notes: z.string().trim().optional(),
}).refine((value) => new Date(value.return_at) > new Date(value.pickup_at), {
  message: "La date de retour doit être après la date de départ.",
  path: ["return_at"],
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
