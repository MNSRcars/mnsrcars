"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createCustomerAction } from "./actions";

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

export function CustomerForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const result = await createCustomerAction({
      first_name: form.get("first_name"),
      last_name: form.get("last_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      country: form.get("country"),
      city: form.get("city"),
      address: form.get("address"),
      driver_license_number: form.get("driver_license_number"),
      driver_license_country: form.get("driver_license_country"),
      notes: form.get("notes"),
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin/customers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="first_name" required placeholder="Prénom" className={inputClass} />
        <input name="last_name" required placeholder="Nom" className={inputClass} />
        <input name="email" type="email" placeholder="Email" className={inputClass} />
        <input name="phone" placeholder="Téléphone" className={inputClass} />
        <input name="country" required defaultValue="Maroc" className={inputClass} />
        <input name="city" placeholder="Ville" defaultValue="Casablanca" className={inputClass} />
        <input name="address" placeholder="Adresse" className={"sm:col-span-2 " + inputClass} />
        <input name="driver_license_number" placeholder="Numéro de permis" className={inputClass} />
        <input name="driver_license_country" placeholder="Pays du permis" defaultValue="Maroc" className={inputClass} />
        <textarea name="notes" rows={3} placeholder="Notes internes" className={"sm:col-span-2 " + inputClass} />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-end gap-3">
        <Link href="/admin/customers" className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold">
          Annuler
        </Link>
        <button type="submit" disabled={loading} className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {loading ? "Enregistrement..." : "Enregistrer le client"}
        </button>
      </div>
    </form>
  );
}
