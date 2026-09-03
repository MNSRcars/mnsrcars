import { z } from "zod";

export const createMaintenanceSchema = z.object({
  vehicle_id: z.string().uuid("Véhicule invalide."),
  title: z.string().trim().min(1, "Le titre est obligatoire."),
  description: z.string().trim().optional(),
  status: z.enum(["planned", "in_progress", "completed", "cancelled"]),
  maintenance_type: z.string().trim().optional(),
  cost_amount: z.coerce.number().min(0).optional().or(z.literal("")),
  mileage: z.coerce.number().int().min(0).optional().or(z.literal("")),
  notes: z.string().trim().optional(),
});

export type CreateMaintenanceInput = z.infer<typeof createMaintenanceSchema>;
