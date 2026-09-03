import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleById } from "@/services/vehicle.service";
import { VehicleEditForm } from "./vehicle-edit-form";

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

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-neutral-950">{value}</p>
    </div>
  );
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) notFound();

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/admin/vehicles" className="text-sm font-medium text-[#a9841c] hover:underline">
            Retour aux véhicules
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="mt-2 text-neutral-600">
            {vehicle.year} · {vehicle.license_plate}
          </p>
        </div>
        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${STATUS_STYLES[vehicle.status] ?? STATUS_STYLES.inactive}`}>
          {STATUS_LABELS[vehicle.status] ?? vehicle.status}
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-neutral-950">Fiche technique</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Info label="Catégorie" value={vehicle.category} />
            <Info label="Transmission" value={vehicle.transmission} />
            <Info label="Carburant" value={vehicle.fuel_type} />
            <Info label="Places" value={vehicle.seats} />
            <Info label="Portes" value={vehicle.doors} />
            <Info label="Couleur" value={vehicle.color || "Non renseignée"} />
            <Info label="VIN" value={vehicle.vin || "Non renseigné"} />
            <Info label="Kilométrage" value={`${vehicle.mileage} km`} />
          </div>
        </section>
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-950">Tarifs</h2>
          <div className="mt-6 space-y-5">
            <Info label="Prix / jour" value={formatMad(vehicle.price_per_day)} />
            <Info label="Prix / semaine" value={formatMad(vehicle.price_per_week)} />
            <Info label="Prix / mois" value={formatMad(vehicle.price_per_month)} />
            <Info label="Caution" value={formatMad(vehicle.deposit_amount)} />
          </div>
        </section>
      </div>

      <VehicleEditForm vehicle={vehicle} />
    </section>
  );
}
