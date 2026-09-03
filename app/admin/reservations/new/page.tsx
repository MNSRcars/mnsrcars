import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ReservationForm } from "./reservation-form";

export default async function NewReservationPage() {
  const supabase = await createClient();

  const [{ data: vehicles }, { data: customers }, { data: locations }] = await Promise.all([
    supabase.from("vehicles").select("id, brand, model, license_plate").neq("status", "inactive").order("brand"),
    supabase.from("customers").select("id, first_name, last_name").order("last_name"),
    supabase.from("locations").select("id, name").eq("is_active", true).order("name"),
  ]);

  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">Activité</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Nouvelle réservation</h1>
        <Link href="/admin/reservations" className="mt-4 inline-block text-sm font-medium text-[#a9841c] hover:underline">
          Retour à la liste
        </Link>
      </header>
      <ReservationForm
        vehicles={(vehicles ?? []).map((v) => ({ id: v.id, label: `${v.brand} ${v.model} · ${v.license_plate}` }))}
        customers={(customers ?? []).map((c) => ({ id: c.id, label: `${c.first_name} ${c.last_name}` }))}
        locations={(locations ?? []).map((l) => ({ id: l.id, label: l.name }))}
      />
    </section>
  );
}
