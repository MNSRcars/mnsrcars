import { z } from "zod";

export const createCustomerSchema = z.object({
  first_name: z.string().trim().min(1, "Le prénom est obligatoire."),
  last_name: z.string().trim().min(1, "Le nom est obligatoire."),
  email: z.string().trim().email("Email invalide.").optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  country: z.string().trim().min(1, "Le pays est obligatoire."),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  driver_license_number: z.string().trim().optional(),
  driver_license_country: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
