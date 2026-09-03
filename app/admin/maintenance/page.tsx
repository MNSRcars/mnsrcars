import Link from "next/link";
import { Plus, Wrench } from "lucide-react";
import { getMaintenanceRecords } from "@/services/maintenance.service";

const STATUS_LABELS: Record<string, string> = {
  planned: "Planifiée",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

function formatMad(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function MaintenancePage() {
  const records = await getMaintenanceRecords();

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">Flotte</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Maintenance</h1>
          <p className="mt-2 text-neutral-600">Suivez les entretiens et réparations des véhicules MNSRcars.</p>
        </div>
        <Link
          href="/admin/maintenance/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus className="size-4" />
          Ajouter une maintenance
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {records.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
              <Wrench className="size-7 text-neutral-500" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-neutral-950">Aucune maintenance pour le moment</h2>
            <p className="mt-2 max-w-md text-sm text-neutral-500">
              Les entretiens et réparations de la flotte apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Véhicule</th>
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Coût</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {records.map((record) => (
                  <tr key={record.id} className="transition hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-neutral-950">
                      {record.vehicle ? `${record.vehicle.brand} ${record.vehicle.model}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">{record.title}</td>
                    <td className="px-6 py-4 text-neutral-700">{record.maintenance_type || "—"}</td>
                    <td className="px-6 py-4 text-neutral-700">{formatMad(record.cost_amount)}</td>
                    <td className="px-6 py-4 text-neutral-700">{STATUS_LABELS[record.status] ?? record.status}</td>
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
