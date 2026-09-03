import Link from "next/link";
import { CarFront, Plus } from "lucide-react";
import { getVehicles } from "@/services/vehicle.service";

const STATUS_LABELS: Record<string, string> = {
  available: "Disponible",
  reserved: "Réservé",
  rented: "Loué",
  maintenance: "Maintenance",
  inactive: "Inactif",
};

const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  reserved: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rented: "bg-blue-50 text-blue-700 ring-blue-600/20",
  maintenance: "bg-red-50 text-red-700 ring-red-600/20",
  inactive: "bg-neutral-100 text-neutral-600 ring-neutral-500/20",
};

function formatMad(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">
            Flotte automobile
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            Véhicules
          </h1>
          <p className="mt-2 text-neutral-600">
            Gérez votre flotte MNSRcars et ses disponibilités.
          </p>
        </div>

        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus className="size-4" />
          Ajouter un véhicule
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {vehicles.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
              <CarFront className="size-7 text-neutral-500" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-neutral-950">
              Aucun véhicule pour le moment
            </h2>
            <p className="mt-2 max-w-md text-sm text-neutral-500">
              Commencez par ajouter le premier véhicule de votre flotte MNSRcars.
            </p>
            <Link
              href="/admin/vehicles/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-[#c59f2d]"
            >
              <Plus className="size-4" />
              Ajouter un véhicule
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Véhicule</th>
                  <th className="px-6 py-4 font-medium">Catégorie</th>
                  <th className="px-6 py-4 font-medium">Immatriculation</th>
                  <th className="px-6 py-4 font-medium">Prix / jour</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Public</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="transition hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/vehicles/${vehicle.id}`}
                        className="font-semibold text-neutral-950 hover:text-[#a9841c]"
                      >
                        {vehicle.brand} {vehicle.model}
                      </Link>
                      <p className="mt-1 text-xs text-neutral-500">
                        {vehicle.year} · {vehicle.transmission} · {vehicle.fuel_type}
                      </p>
                    </td>
                    <td className="px-6 py-4 capitalize text-neutral-700">
                      {vehicle.category}
                    </td>
                    <td className="px-6 py-4 font-mono text-neutral-700">
                      {vehicle.license_plate}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-950">
                      {formatMad(vehicle.price_per_day)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                          STATUS_STYLES[vehicle.status] ?? STATUS_STYLES.inactive
                        }`}
                      >
                        {STATUS_LABELS[vehicle.status] ?? vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={vehicle.is_public ? "text-emerald-700" : "text-neutral-500"}>
                        {vehicle.is_public ? "Oui" : "Non"}
                      </span>
                    </td>
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
