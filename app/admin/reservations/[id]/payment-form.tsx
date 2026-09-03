"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPaymentAction } from "../../payments/actions";

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

export function PaymentForm({ reservationId, defaultAmount }: { reservationId: string; defaultAmount: number }) {
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
    const result = await createPaymentAction({
      reservation_id: reservationId,
      amount: form.get("amount"),
      method: form.get("method"),
      notes: form.get("notes"),
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-950">Enregistrer un paiement</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="amount" type="number" required min={1} defaultValue={defaultAmount} className={inputClass} />
        <select name="method" defaultValue="cash" className={inputClass}>
          <option value="cash">Espèces</option>
          <option value="bank_transfer">Virement</option>
          <option value="card">Carte</option>
          <option value="online">En ligne</option>
          <option value="other">Autre</option>
        </select>
        <textarea name="notes" rows={2} placeholder="Notes" className={"sm:col-span-2 " + inputClass} />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Paiement enregistré.</p>}
      <button type="submit" disabled={loading} className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
        {loading ? "Enregistrement..." : "Enregistrer le paiement"}
      </button>
    </form>
  );
}
