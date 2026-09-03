import Link from "next/link";
import { siteConfig, whatsappHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/10 via-white/5 to-transparent p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
                Contact rapide
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Besoin d&apos;une offre rapide ou d&apos;une reservation ?
              </h2>
              <p className="mt-3 text-neutral-300">
                Contactez {siteConfig.name} pour reserver un vehicule economique ou premium a Casablanca.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phoneHref}
                className="rounded-xl bg-[#d4af37] px-5 py-3 text-center font-medium text-black transition hover:bg-[#c9a62f]"
              >
                Appeler
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-5 py-3 text-center font-medium text-white transition hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d4af37]">
              {siteConfig.name}
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              Location de voitures economiques et premium a Casablanca avec un service
              professionnel, moderne et reactif.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li><Link href="/vehicles" className="hover:text-white">Flotte</Link></li>
              <li><Link href="/login" className="hover:text-white">Connexion admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li>{siteConfig.phoneDisplay}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li>Reservation rapide</li>
              <li>Vehicules economiques</li>
              <li>Vehicules premium</li>
              <li>Service local a Casablanca</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteConfig.name} · {siteConfig.city}, {siteConfig.country}
          </p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}