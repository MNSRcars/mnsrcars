import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";
import { getReservations } from "@/services/reservation.service";

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

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">Activité</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Réservations</h1>
          <p className="mt-2 text-neutral-600">Suivez les locations MNSRcars.</p>
        </div>
        <Link href="/admin/reservations/new" className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white">
          <Plus className="size-4" />
          Nouvelle réservation
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {reservations.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
              <ClipboardList className="size-7 text-neutral-500" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-neutral-950">Aucune réservation pour le moment</h2>
            <p className="mt-2 max-w-md text-sm text-neutral-500">Les réservations apparaîtront ici.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase text-neutral-500">
                <tr>
                  <th className="px-6 py-4">Réservation</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Véhicule</th>
                  <th className="px-6 py-4">Montant</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4">
                      <Link href={`/admin/reservations/${reservation.id}`} className="font-semibold hover:text-[#a9841c]">
                        {reservation.reservation_number || reservation.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {reservation.customer ? `${reservation.customer.first_name} ${reservation.customer.last_name}` : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {reservation.vehicle ? `${reservation.vehicle.brand} ${reservation.vehicle.model}` : "—"}
                    </td>
                    <td className="px-6 py-4">{formatMad(reservation.total_amount)}</td>
                    <td className="px-6 py-4">{STATUS_LABELS[reservation.status] ?? reservation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
