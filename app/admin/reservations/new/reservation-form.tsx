"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createReservationAction } from "./actions";

type Option = { id: string; label: string };

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

export function ReservationForm({
  vehicles,
  customers,
  locations,
}: {
  vehicles: Option[];
  customers: Option[];
  locations: Option[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const result = await createReservationAction({
      vehicle_id: form.get("vehicle_id"),
      customer_id: form.get("customer_id"),
      pickup_location_id: form.get("pickup_location_id"),
      return_location_id: form.get("return_location_id"),
      pickup_at: form.get("pickup_at"),
      return_at: form.get("return_at"),
      customer_notes: form.get("customer_notes"),
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin/reservations");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <select name="customer_id" required className={inputClass}>
          <option value="">Choisir un client</option>
          {customers.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <select name="vehicle_id" required className={inputClass}>
          <option value="">Choisir un véhicule</option>
          {vehicles.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <input name="pickup_at" type="datetime-local" required className={inputClass} />
        <input name="return_at" type="datetime-local" required className={inputClass} />
        <select name="pickup_location_id" className={inputClass}>
          <option value="">Lieu de récupération</option>
          {locations.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <select name="return_location_id" className={inputClass}>
          <option value="">Lieu de retour</option>
          {locations.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <textarea name="customer_notes" rows={3} placeholder="Notes" className={"sm:col-span-2 " + inputClass} />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-end gap-3">
        <Link href="/admin/reservations" className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold">Annuler</Link>
        <button type="submit" disabled={loading} className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {loading ? "Enregistrement..." : "Créer la réservation"}
        </button>
      </div>
    </form>
  );
}
