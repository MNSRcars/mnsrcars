import Link from "next/link";
import { notFound } from "next/navigation";
import { getReservationById } from "@/services/reservation.service";
import { ReservationStatusActions } from "./status-actions";
import { PaymentForm } from "./payment-form";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
  rejected: "Rejetée",
  rented: "En location",
  completed: "Terminée",
  no_show: "Non présenté",
};

function formatMad(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-MA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-neutral-950">{value}</p>
    </div>
  );
}

export default async function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = await getReservationById(id);
  if (!reservation) notFound();

  return (
    <section className="space-y-8">
      <header>
        <Link href="/admin/reservations" className="text-sm font-medium text-[#a9841c] hover:underline">
          Retour aux réservations
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          {reservation.reservation_number || "Réservation"}
        </h1>
        <p className="mt-2 text-neutral-600">{STATUS_LABELS[reservation.status] ?? reservation.status}</p>
      </header>

      <ReservationStatusActions id={reservation.id} status={reservation.status} />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-neutral-950">Détails</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Info label="Client" value={reservation.customer ? `${reservation.customer.first_name} ${reservation.customer.last_name}` : "—"} />
            <Info label="Véhicule" value={reservation.vehicle ? `${reservation.vehicle.brand} ${reservation.vehicle.model}` : "—"} />
            <Info label="Départ" value={formatDate(reservation.pickup_at)} />
            <Info label="Retour" value={formatDate(reservation.return_at)} />
            <Info label="Lieu de récupération" value={reservation.pickup_location?.name || "—"} />
            <Info label="Lieu de retour" value={reservation.return_location?.name || "—"} />
          </div>
        </section>
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-950">Montants</h2>
          <div className="mt-6 space-y-5">
            <Info label="Prix / jour" value={formatMad(reservation.price_per_day)} />
            <Info label="Sous-total" value={formatMad(reservation.subtotal_amount)} />
            <Info label="Total" value={formatMad(reservation.total_amount)} />
            <Info label="Caution" value={formatMad(reservation.deposit_amount)} />
          </div>
        </section>
      </div>

      <PaymentForm reservationId={reservation.id} defaultAmount={reservation.total_amount} />
    </section>
  );
}
