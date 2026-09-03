import { CreditCard } from "lucide-react";
import { getPayments } from "@/services/payment.service";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  authorized: "Autorisé",
  paid: "Payé",
  failed: "Échoué",
  refunded: "Remboursé",
  cancelled: "Annulé",
};

const METHOD_LABELS: Record<string, string> = {
  cash: "Espèces",
  bank_transfer: "Virement",
  card: "Carte",
  online: "En ligne",
  other: "Autre",
};

function formatMad(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">Finance</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Paiements</h1>
        <p className="mt-2 text-neutral-600">Suivez les encaissements et remboursements MNSRcars.</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {payments.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
              <CreditCard className="size-7 text-neutral-500" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-neutral-950">Aucun paiement pour le moment</h2>
            <p className="mt-2 max-w-md text-sm text-neutral-500">
              Les paiements liés aux réservations apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Réservation</th>
                  <th className="px-6 py-4 font-medium">Montant</th>
                  <th className="px-6 py-4 font-medium">Méthode</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="transition hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-neutral-950">
                      {payment.customer ? `${payment.customer.first_name} ${payment.customer.last_name}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {payment.reservation?.reservation_number || "—"}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-950">{formatMad(payment.amount)}</td>
                    <td className="px-6 py-4 text-neutral-700">{METHOD_LABELS[payment.method] ?? payment.method}</td>
                    <td className="px-6 py-4 text-neutral-700">{STATUS_LABELS[payment.status] ?? payment.status}</td>
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
