import Link from "next/link";
import { VehicleForm } from "./vehicle-form";

export default function NewVehiclePage() {
  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">
          Flotte automobile
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Ajouter un véhicule
        </h1>
        <p className="mt-2 text-neutral-600">
          Créez une fiche complète pour votre flotte MNSRcars.
        </p>
        <Link href="/admin/vehicles" className="mt-4 inline-block text-sm font-medium text-[#a9841c] hover:underline">
          Retour à la liste
        </Link>
      </header>

      <VehicleForm />
    </section>
  );
}
