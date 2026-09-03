"use client";

import { useState } from "react";
import Link from "next/link";
import { createVehicleAction } from "./actions";

const categories = [
  { value: "economy", label: "Economy" },
  { value: "compact", label: "Compact" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "van", label: "Van" },
];

const transmissions = [
  { value: "manual", label: "Manuelle" },
  { value: "automatic", label: "Automatique" },
];

const fuels = [
  { value: "petrol", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybride" },
  { value: "electric", label: "Électrique" },
];

const statuses = [
  { value: "available", label: "Disponible" },
  { value: "reserved", label: "Réservé" },
  { value: "rented", label: "Loué" },
  { value: "maintenance", label: "Maintenance" },
  { value: "inactive", label: "Inactif" },
];

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20";

export function VehicleForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const result = await createVehicleAction({
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      category: formData.get("category"),
      transmission: formData.get("transmission"),
      fuel_type: formData.get("fuel_type"),
      seats: formData.get("seats"),
      doors: formData.get("doors"),
      color: formData.get("color"),
      license_plate: formData.get("license_plate"),
      vin: formData.get("vin"),
      status: formData.get("status"),
      price_per_day: formData.get("price_per_day"),
      price_per_week: formData.get("price_per_week"),
      price_per_month: formData.get("price_per_month"),
      deposit_amount: formData.get("deposit_amount"),
      mileage: formData.get("mileage"),
      description: formData.get("description"),
      is_featured: formData.get("is_featured") === "on",
      is_public: formData.get("is_public") === "on",
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-950">Identité du véhicule</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Marque</label>
            <input name="brand" required placeholder="Dacia" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Modèle</label>
            <input name="model" required placeholder="Duster" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Année</label>
            <input name="year" type="number" required defaultValue={2024} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Catégorie</label>
            <select name="category" defaultValue="suv" className={inputClass}>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Transmission</label>
            <select name="transmission" defaultValue="automatic" className={inputClass}>
              {transmissions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Carburant</label>
            <select name="fuel_type" defaultValue="petrol" className={inputClass}>
              {fuels.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Places</label>
            <input name="seats" type="number" required defaultValue={5} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Portes</label>
            <input name="doors" type="number" required defaultValue={5} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Couleur</label>
            <input name="color" placeholder="Blanc" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Immatriculation</label>
            <input name="license_plate" required placeholder="A-12345" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-neutral-700">VIN</label>
            <input name="vin" placeholder="Optionnel" className={inputClass} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-950">Tarifs et statut</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Prix / jour (MAD)</label>
            <input name="price_per_day" type="number" required defaultValue={450} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Prix / semaine (MAD)</label>
            <input name="price_per_week" type="number" required defaultValue={2800} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Prix / mois (MAD)</label>
            <input name="price_per_month" type="number" required defaultValue={9500} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Caution (MAD)</label>
            <input name="deposit_amount" type="number" required defaultValue={5000} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Kilométrage</label>
            <input name="mileage" type="number" required defaultValue={0} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Statut</label>
            <select name="status" defaultValue="available" className={inputClass}>
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-neutral-700">Description</label>
            <textarea name="description" rows={4} placeholder="SUV confortable, idéal pour Casablanca et les déplacements familiaux." className={inputClass} />
          </div>
          <label className="flex items-center gap-3 text-sm text-neutral-700">
            <input name="is_public" type="checkbox" defaultChecked className="size-4 accent-[#d4af37]" />
            Visible sur le site public
          </label>
          <label className="flex items-center gap-3 text-sm text-neutral-700">
            <input name="is_featured" type="checkbox" className="size-4 accent-[#d4af37]" />
            Véhicule mis en avant
          </label>
        </div>
      </section>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer le véhicule"}
        </button>
      </div>
    </form>
  );
}
