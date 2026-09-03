import { z } from "zod";

export const vehicleCategoryValues = [
  "economy",
  "compact",
  "sedan",
  "suv",
  "luxury",
  "van",
] as const;

export const transmissionValues = ["manual", "automatic"] as const;

export const fuelTypeValues = [
  "petrol",
  "diesel",
  "hybrid",
  "electric",
] as const;

export const vehicleStatusValues = [
  "available",
  "reserved",
  "rented",
  "maintenance",
  "inactive",
] as const;

export const createVehicleSchema = z.object({
  brand: z.string().trim().min(1, "La marque est obligatoire."),
  model: z.string().trim().min(1, "Le modèle est obligatoire."),
  year: z.coerce.number().int().min(1990, "Année invalide."),
  category: z.enum(vehicleCategoryValues),
  transmission: z.enum(transmissionValues),
  fuel_type: z.enum(fuelTypeValues),
  seats: z.coerce.number().int().min(1, "Le nombre de places est obligatoire."),
  doors: z.coerce.number().int().min(1, "Le nombre de portes est obligatoire."),
  color: z.string().trim().optional(),
  license_plate: z.string().trim().min(1, "L'immatriculation est obligatoire."),
  vin: z.string().trim().optional(),
  status: z.enum(vehicleStatusValues),
  price_per_day: z.coerce.number().min(0, "Le prix par jour est invalide."),
  price_per_week: z.coerce.number().min(0, "Le prix par semaine est invalide."),
  price_per_month: z.coerce.number().min(0, "Le prix par mois est invalide."),
  deposit_amount: z.coerce.number().min(0, "La caution est invalide."),
  mileage: z.coerce.number().int().min(0, "Le kilométrage est invalide."),
  description: z.string().trim().optional(),
  is_featured: z.coerce.boolean().default(false),
  is_public: z.coerce.boolean().default(true),
});

export const updateVehicleSchema = createVehicleSchema;

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
