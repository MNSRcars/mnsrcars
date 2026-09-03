"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createPublicReservationAction, type PublicReservationState } from "@/actions/public-reservation.actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: PublicReservationState = {
  success: false,
  error: null,
};

function moneyLabel(price: number) {
  return Number(price) === 0 ? "Tarif sur demande" : `${price} MAD`;
}

export function PublicReservationForm({
  vehicleId,
  vehicleName,
  pricePerDay,
  depositAmount,
  status,
}: {
  vehicleId: string;
  vehicleName: string;
  pricePerDay: number;
  depositAmount: number;
  status: string;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPublicReservationAction, initialState);

  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (state.success) {
      const query = new URLSearchParams();
      if (state.reservationId) query.set("reservation", state.reservationId);
      if (state.reservationNumber) query.set("ref", state.reservationNumber);
      router.push(`/reservation/success?${query.toString()}`);
    }
  }, [state.success, state.reservationId, state.reservationNumber, router]);

  const isBlocked = status === "maintenance";

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Reserver ce vehicule</CardTitle>
        <CardDescription className="text-neutral-400">
          Envoyez votre demande de reservation en quelques secondes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-neutral-400">{vehicleName}</p>
          <p className="mt-2 text-2xl font-semibold text-[#d4af37]">
            {moneyLabel(pricePerDay)}
            {Number(pricePerDay) > 0 ? " / jour" : ""}
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Caution : {depositAmount} MAD
          </p>
          {Number(pricePerDay) === 0 && (
            <p className="mt-2 text-xs text-neutral-400">
              Le tarif exact sera confirme apres etude de votre demande.
            </p>
          )}
        </div>

        {isBlocked ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            Ce vehicule n'est pas disponible a la reservation pour le moment.
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="vehicle_id" value={vehicleId} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">Prenom</Label>
                <Input id="first_name" name="first_name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Nom</Label>
                <Input id="last_name" name="last_name" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telephone</Label>
                <Input id="phone" name="phone" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pickup_at">Date de depart</Label>
                <Input id="pickup_at" name="pickup_at" type="date" min={today} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="return_at">Date de retour</Label>
                <Input id="return_at" name="return_at" type="date" min={today} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer_notes">Message</Label>
              <textarea
                id="customer_notes"
                name="customer_notes"
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black"
                placeholder="Ex: livraison aeroport, heure souhaitee, demande particuliere..."
              />
            </div>

            {state.error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {state.error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>

            <p className="text-xs text-neutral-400">
              Votre demande sera enregistree puis traitee par notre equipe.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}