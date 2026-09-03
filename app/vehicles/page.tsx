import Link from "next/link";
import { getPublicVehicles } from "@/services/public-vehicles.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

function priceLabel(brand: string, model: string, price: number) {
  const premium = [
    "Volkswagen Touareg R-Line",
    "Volkswagen T-Roc",
    "Hyundai Tucson",
  ];

  const fullName = `${titleCase(brand)} ${model}`;

  if (premium.includes(fullName) || Number(price) === 0) {
    return "Tarif sur demande";
  }

  return `${price} MAD / jour`;
}

export default async function PublicVehiclesPage() {
  const vehicles = await getPublicVehicles();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
            Notre flotte
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Choisissez votre vehicule a Casablanca
          </h1>
          <p className="mt-4 text-neutral-300">
            Decouvrez notre selection de vehicules economiques et premium disponibles a la location.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => {
            const displayBrand = titleCase(vehicle.brand);
            const displayModel = vehicle.model;
            const displayCategory = categoryLabel(vehicle.category);
            const displayTransmission = transmissionLabel(vehicle.transmission);
            const displayFuel = fuelLabel(vehicle.fuel_type);
            const premium = Number(vehicle.price_per_day) === 0;

            return (
              <Card
                key={vehicle.id}
                className="border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:border-[#d4af37]/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">
                        {displayBrand} {displayModel}
                      </CardTitle>
                      <CardDescription className="mt-1 text-neutral-400">
                        {vehicle.year} · {displayCategory}
                      </CardDescription>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {vehicle.is_featured && <Badge>Populaire</Badge>}
                      <Badge variant={vehicle.status === "available" ? "default" : "secondary"}>
                        {statusLabel(vehicle.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <VehicleIllustration
                    slug={vehicle.slug}
                    brand={displayBrand}
                    model={displayModel}
                    premium={premium}
                    className="h-44 rounded-[1.25rem]"
                  />

                  <p className="line-clamp-3 text-sm text-neutral-300">
                    {vehicle.description || "Vehicule disponible a la location avec service professionnel a Casablanca."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm text-neutral-300">
                    <div>
                      Boite : <span className="font-medium text-white">{displayTransmission}</span>
                    </div>
                    <div>
                      Carburant : <span className="font-medium text-white">{displayFuel}</span>
                    </div>
                    <div>
                      Places : <span className="font-medium text-white">{vehicle.seats}</span>
                    </div>
                    <div>
                      Portes : <span className="font-medium text-white">{vehicle.doors}</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-sm text-neutral-400">Tarif</p>
                      <p className="text-2xl font-semibold text-[#d4af37]">
                        {priceLabel(vehicle.brand, vehicle.model, vehicle.price_per_day)}
                      </p>
                    </div>

                    <Button asChild>
                      <Link href={`/vehicles/${vehicle.slug}`}>Voir details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {vehicles.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-neutral-300">
            Aucun vehicule public n&apos;est disponible pour le moment.
          </div>
        )}
      </section>
    </main>
  );
}