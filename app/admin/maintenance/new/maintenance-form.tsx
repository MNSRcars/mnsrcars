"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createMaintenanceAction } from "./actions";

type Option = { id: string; label: string };

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

export function MaintenanceForm({ vehicles }: { vehicles: Option[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const result = await createMaintenanceAction({
      vehicle_id: form.get("vehicle_id"),
      title: form.get("title"),
      description: form.get("description"),
      status: form.get("status"),
      maintenance_type: form.get("maintenance_type"),
      cost_amount: form.get("cost_amount"),
      mileage: form.get("mileage"),
      notes: form.get("notes"),
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin/maintenance");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <select name="vehicle_id" required className={inputClass}>
          <option value="">Choisir un véhicule</option>
          {vehicles.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <input name="title" required placeholder="Titre, ex. Vidange" className={inputClass} />
        <input name="maintenance_type" placeholder="Type, ex. Entretien" className={inputClass} />
        <select name="status" defaultValue="planned" className={inputClass}>
          <option value="planned">Planifiée</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminée</option>
          <option value="cancelled">Annulée</option>
        </select>
        <input name="cost_amount" type="number" min={0} placeholder="Coût (MAD)" className={inputClass} />
        <input name="mileage" type="number" min={0} placeholder="Kilométrage" className={inputClass} />
        <textarea name="description" rows={3} placeholder="Description" className={"sm:col-span-2 " + inputClass} />
        <textarea name="notes" rows={2} placeholder="Notes internes" className={"sm:col-span-2 " + inputClass} />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-end gap-3">
        <Link href="/admin/maintenance" className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold">Annuler</Link>
        <button type="submit" disabled={loading} className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {loading ? "Enregistrement..." : "Enregistrer la maintenance"}
        </button>
      </div>
    </form>
  );
}
