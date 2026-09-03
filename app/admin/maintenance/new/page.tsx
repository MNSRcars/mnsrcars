import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MaintenanceForm } from "./maintenance-form";

export default async function NewMaintenancePage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, brand, model, license_plate")
    .neq("status", "inactive")
    .order("brand");

  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">Flotte</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Ajouter une maintenance</h1>
        <Link href="/admin/maintenance" className="mt-4 inline-block text-sm font-medium text-[#a9841c] hover:underline">
          Retour à la liste
        </Link>
      </header>
      <MaintenanceForm
        vehicles={(vehicles ?? []).map((v) => ({
          id: v.id,
          label: `${v.brand} ${v.model} · ${v.license_plate}`,
        }))}
      />
    </section>
  );
}
