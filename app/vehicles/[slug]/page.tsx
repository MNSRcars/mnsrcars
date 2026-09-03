import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicVehicleBySlug } from "@/services/public-vehicles.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicReservationForm } from "./reservation-form";
import { VehicleIllustration } from "@/components/marketing/vehicle-illustration";

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function categoryLabel(value: string) {
  switch (value) {
    case "suv":
      return "SUV";
    case "economy":
      return "Economique";
    default:
      return titleCase(value);
  }
}

function fuelLabel(value: string) {
  switch (value) {
    case "petrol":
      return "Essence";
    case "diesel":
      return "Diesel";
    case "hybrid":
      return "Hybride";
    case "electric":
      return "Electrique";
    default:
      return titleCase(value);
  }
}

function transmissionLabel(value: string) {
  switch (value) {
    case "manual":
      return "Manuelle";
    case "automatic":
      return "Automatique";
    default:
      return titleCase(value);
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "available":
      return "Disponible";
    case "maintenance":
      return "Maintenance";
    case "reserved":
      return "Reserve";
    case "rented":
      return "En location";
    default:
      return titleCase(status);
  }
}

function isPremiumPrice(price: number) {
  return Number(price) === 0;
}

function moneyLabel(price: number) {
  return isPremiumPrice(price) ? "Tarif sur demande" : `${price} MAD`;
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getPublicVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const displayBrand = titleCase(vehicle.brand);
  const displayModel = vehicle.model;
  const premium = Number(vehicle.price_per_day) === 0;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link href="/vehicles" className="text-sm text-neutral-400 hover:text-white">
          ← Retour a la flotte
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="flex flex-wrap items-center gap-3">
                {vehicle.is_featured && <Badge>Populaire</Badge>}
                <Badge variant={vehicle.status === "available" ? "default" : "secondary"}>
                  {statusLabel(vehicle.status)}
                </Badge>
              </div>

              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                {displayBrand} {displayModel}
              </h1>

              <p className="mt-2 text-neutral-400">
                {vehicle.year} · {categoryLabel(vehicle.category)} · {transmissionLabel(vehicle.transmission)}
              </p>

              <div className="mt-8">
                <VehicleIllustration
                  slug={vehicle.slug}
                  brand={displayBrand}
                  model={displayModel}
                  premium={premium}
                  className="h-72 rounded-[1.75rem]"
                />
              </div>

              <p className="mt-8 max-w-3xl text-neutral-300">
                {vehicle.description || "Vehicule disponible a la location a Casablanca avec service professionnel."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Info label="Tarif / jour" value={moneyLabel(vehicle.price_per_day)} />
                <Info label="Tarif / semaine" value={moneyLabel(vehicle.price_per_week)} />
                <Info label="Tarif / mois" value={moneyLabel(vehicle.price_per_month)} />
                <Info label="Caution" value={`${vehicle.deposit_amount} MAD`} />
                <Info label="Places" value={`${vehicle.seats}`} />
                <Info label="Portes" value={`${vehicle.doors}`} />
                <Info label="Carburant" value={fuelLabel(vehicle.fuel_type)} />
                <Info label="Boite" value={transmissionLabel(vehicle.transmission)} />
                <Info label="Couleur" value={vehicle.color ? titleCase(vehicle.color) : "-"} />
              </div>
            </div>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>Equipements</CardTitle>
              </CardHeader>
              <CardContent>
                {vehicle.features.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-neutral-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400">
                    Les equipements detailles seront bientot affiches ici.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <PublicReservationForm
              vehicleId={vehicle.id}
              vehicleName={`${displayBrand} ${displayModel}`}
              pricePerDay={vehicle.price_per_day}
              depositAmount={vehicle.deposit_amount}
              status={vehicle.status}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-2 text-lg font-medium text-white">{value}</p>
    </div>
  );
}