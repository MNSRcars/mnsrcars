"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VehicleDetail } from "@/services/vehicle.service";
import { updateVehicleAction } from "./actions";

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

export function VehicleEditForm({ vehicle }: { vehicle: VehicleDetail }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = new FormData(event.currentTarget);
    const result = await updateVehicleAction(vehicle.id, {
      brand: form.get("brand"),
      model: form.get("model"),
      year: form.get("year"),
      category: form.get("category"),
      transmission: form.get("transmission"),
      fuel_type: form.get("fuel_type"),
      seats: form.get("seats"),
      doors: form.get("doors"),
      color: form.get("color"),
      license_plate: form.get("license_plate"),
      vin: form.get("vin"),
      status: form.get("status"),
      price_per_day: form.get("price_per_day"),
      price_per_week: form.get("price_per_week"),
      price_per_month: form.get("price_per_month"),
      deposit_amount: form.get("deposit_amount"),
      mileage: form.get("mileage"),
      description: form.get("description"),
      is_featured: form.get("is_featured") === "on",
      is_public: form.get("is_public") === "on",
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-950">Modifier le véhicule</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="brand" required defaultValue={vehicle.brand} className={inputClass} />
        <input name="model" required defaultValue={vehicle.model} className={inputClass} />
        <input name="year" type="number" required defaultValue={vehicle.year} className={inputClass} />
        <select name="category" defaultValue={vehicle.category} className={inputClass}>
          <option value="economy">Economy</option>
          <option value="compact">Compact</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
          <option value="van">Van</option>
        </select>
        <select name="transmission" defaultValue={vehicle.transmission} className={inputClass}>
          <option value="manual">Manuelle</option>
          <option value="automatic">Automatique</option>
        </select>
        <select name="fuel_type" defaultValue={vehicle.fuel_type} className={inputClass}>
          <option value="petrol">Essence</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybride</option>
          <option value="electric">Électrique</option>
        </select>
        <input name="seats" type="number" required defaultValue={vehicle.seats} className={inputClass} />
        <input name="doors" type="number" required defaultValue={vehicle.doors} className={inputClass} />
        <input name="color" defaultValue={vehicle.color ?? ""} className={inputClass} />
        <input name="license_plate" required defaultValue={vehicle.license_plate} className={inputClass} />
        <input name="vin" defaultValue={vehicle.vin ?? ""} className={inputClass} />
        <select name="status" defaultValue={vehicle.status} className={inputClass}>
          <option value="available">Disponible</option>
          <option value="reserved">Réservé</option>
          <option value="rented">Loué</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactif</option>
        </select>
        <input name="price_per_day" type="number" required defaultValue={vehicle.price_per_day} className={inputClass} />
        <input name="price_per_week" type="number" required defaultValue={vehicle.price_per_week} className={inputClass} />
        <input name="price_per_month" type="number" required defaultValue={vehicle.price_per_month} className={inputClass} />
        <input name="deposit_amount" type="number" required defaultValue={vehicle.deposit_amount} className={inputClass} />
        <input name="mileage" type="number" required defaultValue={vehicle.mileage} className={inputClass} />
        <textarea name="description" rows={3} defaultValue={vehicle.description ?? ""} className={"sm:col-span-2 " + inputClass} />
        <label className="flex items-center gap-2 text-sm"><input name="is_public" type="checkbox" defaultChecked={vehicle.is_public} /> Visible publiquement</label>
        <label className="flex items-center gap-2 text-sm"><input name="is_featured" type="checkbox" defaultChecked={vehicle.is_featured} /> Mis en avant</label>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Véhicule mis à jour.</p>}
      <button type="submit" disabled={loading} className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
        {loading ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
