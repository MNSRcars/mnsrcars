"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateReservationStatusAction } from "./actions";

export function ReservationStatusActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function changeStatus(next: "confirmed" | "cancelled" | "rented" | "completed") {
    setLoading(next);
    setError(null);
    const result = await updateReservationStatusAction(id, next);
    if (!result.success) {
      setError(result.error);
      setLoading(null);
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {status === "pending" && (
          <button onClick={() => changeStatus("confirmed")} disabled={!!loading} className="rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {loading === "confirmed" ? "Confirmation..." : "Confirmer"}
          </button>
        )}
        {(status === "pending" || status === "confirmed") && (
          <button onClick={() => changeStatus("cancelled")} disabled={!!loading} className="rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold disabled:opacity-50">
            {loading === "cancelled" ? "Annulation..." : "Annuler"}
          </button>
        )}
        {status === "confirmed" && (
          <button onClick={() => changeStatus("rented")} disabled={!!loading} className="rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50">
            {loading === "rented" ? "Mise à jour..." : "Marquer comme loué"}
          </button>
        )}
        {status === "rented" && (
          <button onClick={() => changeStatus("completed")} disabled={!!loading} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {loading === "completed" ? "Mise à jour..." : "Terminer la location"}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
