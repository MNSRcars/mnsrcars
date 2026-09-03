import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/session";
import { createPaymentSchema, type CreatePaymentInput } from "@/lib/validations/payment";

export type PaymentListItem = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  paid_at: string | null;
  created_at: string;
  reservation: { id: string; reservation_number: string | null } | null;
  customer: { first_name: string; last_name: string } | null;
};

export async function getPayments(): Promise<PaymentListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("id, amount, currency, status, method, paid_at, created_at, reservation:reservations(id, reservation_number), customer:customers(first_name, last_name)")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Impossible de récupérer les paiements.");

  return (data ?? []).map((payment) => ({
    id: payment.id,
    amount: Number(payment.amount),
    currency: payment.currency,
    status: payment.status,
    method: payment.method,
    paid_at: payment.paid_at,
    created_at: payment.created_at,
    reservation: Array.isArray(payment.reservation) ? payment.reservation[0] ?? null : payment.reservation,
    customer: Array.isArray(payment.customer) ? payment.customer[0] ?? null : payment.customer,
  }));
}

export async function createPayment(input: CreatePaymentInput) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Vous devez être connecté pour enregistrer un paiement.");
  if (!["super_admin", "admin", "accountant"].includes(profile.role)) {
    throw new Error("Vous n'avez pas la permission d'enregistrer un paiement.");
  }

  const parsed = createPaymentSchema.parse(input);
  const supabase = await createClient();

  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .select("id, customer_id, total_amount")
    .eq("id", parsed.reservation_id)
    .maybeSingle();

  if (reservationError || !reservation) throw new Error("Réservation introuvable.");

  const { data, error } = await supabase.from("payments").insert({
    reservation_id: reservation.id,
    customer_id: reservation.customer_id,
    amount: parsed.amount,
    currency: "MAD",
    status: "paid",
    method: parsed.method,
    provider: "manual",
    paid_at: new Date().toISOString(),
    notes: parsed.notes || null,
  }).select("id").single();

  if (error || !data) throw new Error(error?.message || "Impossible d'enregistrer le paiement.");

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "payment.create",
    entity_type: "payment",
    entity_id: data.id,
    metadata: {
      reservation_id: reservation.id,
      amount: parsed.amount,
      method: parsed.method,
    },
  });

  return data.id;
}
