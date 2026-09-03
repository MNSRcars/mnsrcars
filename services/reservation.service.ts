import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { createReservationSchema, type CreateReservationInput } from "@/lib/validations/reservation";

export type ReservationListItem = {
  id: string;
  reservation_number: string | null;
  status: string;
  pickup_at: string;
  return_at: string;
  total_amount: number;
  currency: string;
  created_at: string;
  vehicle: { brand: string; model: string; license_plate: string } | null;
  customer: { first_name: string; last_name: string; email: string | null; phone: string | null } | null;
};

export type ReservationDetail = ReservationListItem & {
  price_per_day: number;
  subtotal_amount: number;
  deposit_amount: number;
  customer_notes: string | null;
  pickup_location: { name: string } | null;
  return_location: { name: string } | null;
};

function rentalDays(pickupAt: string, returnAt: string) {
  const days = Math.ceil((new Date(returnAt).getTime() - new Date(pickupAt).getTime()) / 86400000);
  return Math.max(days, 1);
}

export async function getReservations(): Promise<ReservationListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("id, reservation_number, status, pickup_at, return_at, total_amount, currency, created_at, vehicle:vehicles(brand, model, license_plate), customer:customers(first_name, last_name, email, phone)")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Impossible de récupérer les réservations.");

  return (data ?? []).map((r) => ({
    ...r,
    total_amount: Number(r.total_amount),
    vehicle: Array.isArray(r.vehicle) ? r.vehicle[0] ?? null : r.vehicle,
    customer: Array.isArray(r.customer) ? r.customer[0] ?? null : r.customer,
  }));
}

export async function getReservationById(id: string): Promise<ReservationDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("id, reservation_number, status, pickup_at, return_at, total_amount, currency, created_at, price_per_day, subtotal_amount, deposit_amount, customer_notes, vehicle:vehicles(brand, model, license_plate), customer:customers(first_name, last_name, email, phone), pickup_location:locations!pickup_location_id(name), return_location:locations!return_location_id(name)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("Impossible de récupérer la réservation.");
  if (!data) return null;

  return {
    ...data,
    total_amount: Number(data.total_amount),
    price_per_day: Number(data.price_per_day),
    subtotal_amount: Number(data.subtotal_amount),
    deposit_amount: Number(data.deposit_amount),
    vehicle: Array.isArray(data.vehicle) ? data.vehicle[0] ?? null : data.vehicle,
    customer: Array.isArray(data.customer) ? data.customer[0] ?? null : data.customer,
    pickup_location: Array.isArray(data.pickup_location) ? data.pickup_location[0] ?? null : data.pickup_location,
    return_location: Array.isArray(data.return_location) ? data.return_location[0] ?? null : data.return_location,
  };
}

export async function createReservation(input: CreateReservationInput) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Vous devez être connecté pour créer une réservation.");
  if (!["super_admin", "admin", "manager", "agent"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission de créer une réservation.");
  }

  const parsed = createReservationSchema.parse(input);
  const supabase = await createClient();
  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id, price_per_day, deposit_amount, status")
    .eq("id", parsed.vehicle_id)
    .maybeSingle();

  if (vehicleError || !vehicle) throw new Error("Véhicule introuvable.");
  if (vehicle.status === "inactive" || vehicle.status === "maintenance") {
    throw new Error("Ce véhicule n'est pas disponible à la réservation.");
  }

  const days = rentalDays(parsed.pickup_at, parsed.return_at);
  const pricePerDay = Number(vehicle.price_per_day);
  const total = pricePerDay * days;

  const { data, error } = await supabase.from("reservations").insert({
    vehicle_id: parsed.vehicle_id,
    customer_id: parsed.customer_id,
    pickup_location_id: parsed.pickup_location_id || null,
    return_location_id: parsed.return_location_id || null,
    pickup_at: new Date(parsed.pickup_at).toISOString(),
    return_at: new Date(parsed.return_at).toISOString(),
    status: "pending",
    source: "admin",
    price_per_day: pricePerDay,
    subtotal_amount: total,
    options_amount: 0,
    discount_amount: 0,
    tax_amount: 0,
    total_amount: total,
    deposit_amount: Number(vehicle.deposit_amount),
    currency: "MAD",
    customer_notes: parsed.customer_notes || null,
    created_by: profile.id,
  }).select("id").single();

  if (error || !data) {
    if (error?.code === "23P01") throw new Error("Ce véhicule est déjà réservé sur cette période.");
    throw new Error(error?.message || "Impossible de créer la réservation.");
  }

  await supabase.from("reservation_status_history").insert({
    reservation_id: data.id, old_status: null, new_status: "pending", changed_by: profile.id, reason: "Création back-office",
  });

  await supabase.from("audit_logs").insert({
    actor_id: profile.id, action: "reservation.create", entity_type: "reservation", entity_id: data.id,
    metadata: { vehicle_id: parsed.vehicle_id, customer_id: parsed.customer_id, total_amount: total },
  });

  return data.id;
}
