import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ReservationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reservation?: string; ref?: string }>;
}) {
  const params = await searchParams;
  const reservationId = params.reservation ?? null;
  const reservationRef = params.ref ?? null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
          Demande envoyee
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Merci pour votre reservation
        </h1>

        <p className="mt-4 text-neutral-300">
          Votre demande a bien ete enregistree. Notre equipe vous contactera rapidement
          pour confirmer la disponibilite du vehicule et finaliser la reservation.
        </p>

        {reservationRef && (
          <p className="mt-5 text-sm text-neutral-300">
            Reference client : <span className="font-mono text-white">{reservationRef}</span>
          </p>
        )}

        {reservationId && (
          <p className="mt-2 text-xs text-neutral-500">
            ID interne : <span className="font-mono">{reservationId}</span>
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/vehicles">Voir la flotte</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Retour a l'accueil</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}