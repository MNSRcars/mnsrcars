"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

export type PublicReservationState = {
  success: boolean;
  error: string | null;
  reservationId?: string;
  reservationNumber?: string;
};

const publicReservationSchema = z.object({
  vehicle_id: z.string().uuid("Vehicule invalide."),
  first_name: z.string().min(2, "Le prenom est requis."),
  last_name: z.string().min(2, "Le nom est requis."),
  email: z.string().optional(),
  phone: z.string().min(8, "Le telephone est requis."),
  pickup_at: z.string().min(1, "La date de depart est requise."),
  return_at: z.string().min(1, "La date de retour est requise."),
  customer_notes: z.string().optional(),
});

function normalizeDate(input: string, defaultTime: string) {
  if (input.length === 10) {
    return `${input}T${defaultTime}:00`;
  }
  return input;
}

function rentalDays(pickupAt: string, returnAt: string) {
  const days = Math.ceil(
    (new Date(returnAt).getTime() - new Date(pickupAt).getTime()) / 86400000
  );
  return Math.max(days, 1);
}

function buildReservationNumber() {
  return `WEB-${Date.now()}`;
}

export async function createPublicReservationAction(
  _prevState: PublicReservationState,
  formData: FormData
): Promise<PublicReservationState> {
  const parsed = publicReservationSchema.safeParse({
    vehicle_id: String(formData.get("vehicle_id") ?? ""),
    first_name: String(formData.get("first_name") ?? "").trim(),
    last_name: String(formData.get("last_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    pickup_at: String(formData.get("pickup_at") ?? "").trim(),
    return_at: String(formData.get("return_at") ?? "").trim(),
    customer_notes: String(formData.get("customer_notes") ?? "").trim(),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Les donnees sont invalides.",
    };
  }

  const email = parsed.data.email || null;
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Email invalide.",
      };
    }
  }

  const supabase = createAdminClient();

  const pickupAt = normalizeDate(parsed.data.pickup_at, "10:00");
  const returnAt = normalizeDate(parsed.data.return_at, "10:00");

  const pickupDay = new Date(parsed.data.pickup_at.length === 10 ? `${parsed.data.pickup_at}T00:00:00` : parsed.data.pickup_at);
  const returnDay = new Date(parsed.data.return_at.length === 10 ? `${parsed.data.return_at}T00:00:00` : parsed.data.return_at);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (pickupDay < today) {
    return {
      success: false,
      error: "La date de depart ne peut pas etre dans le passe.",
    };
  }

  if (returnDay <= pickupDay) {
    return {
      success: false,
      error: "La date de retour doit etre posterieure a la date de depart.",
    };
  }

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id, price_per_day, deposit_amount, status, is_public")
    .eq("id", parsed.data.vehicle_id)
    .maybeSingle();

  if (vehicleError || !vehicle || !vehicle.is_public) {
    return {
      success: false,
      error: "Vehicule introuvable.",
    };
  }

  if (vehicle.status === "maintenance") {
    return {
      success: false,
      error: "Ce vehicule n'est pas disponible pour le moment.",
    };
  }

  let customerId: string | null = null;

  if (email) {
    const { data: existingByEmail } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .limit(1)
      .maybeSingle();

    customerId = existingByEmail?.id ?? null;
  }

  if (!customerId) {
    const { data: existingByPhone } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", parsed.data.phone)
      .limit(1)
      .maybeSingle();

    customerId = existingByPhone?.id ?? null;
  }

  if (!customerId) {
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
        email,
        phone: parsed.data.phone,
        country: "Maroc",
        notes: parsed.data.customer_notes || null,
      })
      .select("id")
      .single();

    if (customerError || !customer) {
      return {
        success: false,
        error: customerError?.message || "Impossible de creer le client.",
      };
    }

    customerId = customer.id;
  } else {
    await supabase
      .from("customers")
      .update({
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
        email,
        phone: parsed.data.phone,
        notes: parsed.data.customer_notes || null,
      })
      .eq("id", customerId);
  }

  const days = rentalDays(pickupAt, returnAt);
  const pricePerDay = Number(vehicle.price_per_day);
  const total = pricePerDay * days;
  const reservationNumber = buildReservationNumber();

  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .insert({
      reservation_number: reservationNumber,
      vehicle_id: vehicle.id,
      customer_id: customerId,
      pickup_at: new Date(pickupAt).toISOString(),
      return_at: new Date(returnAt).toISOString(),
      status: "pending",
      source: "website",
      price_per_day: pricePerDay,
      subtotal_amount: total,
      options_amount: 0,
      discount_amount: 0,
      tax_amount: 0,
      total_amount: total,
      deposit_amount: Number(vehicle.deposit_amount),
      currency: "MAD",
      customer_notes: parsed.data.customer_notes || null,
      created_by: null,
      pickup_location_id: null,
      return_location_id: null,
    })
    .select("id, reservation_number")
    .single();

  if (reservationError || !reservation) {
    if (reservationError?.code === "23P01") {
      return {
        success: false,
        error: "Ce vehicule est deja reserve sur cette periode.",
      };
    }

    return {
      success: false,
      error: reservationError?.message || "Impossible de creer la reservation.",
    };
  }

  revalidatePath("/vehicles");
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/customers");

  return {
    success: true,
    error: null,
    reservationId: reservation.id,
    reservationNumber: reservation.reservation_number ?? reservationNumber,
  };
}