"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { VehicleIllustration } from "@/components/marketing/vehicle-illustration";

const economyVehicles = [
  { slug: "dacia-logan", brand: "Dacia", model: "Logan", price: "300 DH / jour", color: "Noir" },
  { slug: "dacia-sandero", brand: "Dacia", model: "Sandero", price: "250 DH / jour", color: "Gris" },
  { slug: "renault-clio-5-gris", brand: "Renault", model: "Clio 5", price: "300 DH / jour", color: "Gris / Blanc" },
  { slug: "peugeot-208-noire", brand: "Peugeot", model: "208", price: "300 DH / jour", color: "Noir / Gris / Pistache" },
];

const premiumVehicles = [
  { slug: "volkswagen-touareg-r-line", brand: "Volkswagen", model: "Touareg R-Line", price: "Tarif sur demande", fuel: "Essence" },
  { slug: "volkswagen-t-roc", brand: "Volkswagen", model: "T-Roc", price: "Tarif sur demande", fuel: "Diesel" },
  { slug: "hyundai-tucson", brand: "Hyundai", model: "Tucson", price: "Tarif sur demande", fuel: "Diesel" },
];

export function HomePremium() {
  return (
    <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_25%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d4af37]">
              MNSRcars · Casablanca
            </p>

            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl xl:text-7xl">
              Location de voitures
              <span className="block text-[#d4af37]">premium & fiables</span>
              {"à Casablanca"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              Reservez facilement votre vehicule, de la citadine economique au SUV premium,
              avec une experience moderne, rapide et professionnelle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[#d4af37] text-black hover:bg-[#c9a62f]">
                <Link href="/vehicles">Voir la flotte</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                <Link href="/login">Connexion admin</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Stat value="10+" label="Vehicules disponibles" />
              <Stat value="24/7" label="Assistance & reactivite" />
              <Stat value="Premium" label="Service sur mesure" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-2xl backdrop-blur"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-neutral-900/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Vedette premium</p>
                    <h2 className="mt-2 text-3xl font-semibold">Touareg R-Line</h2>
                    <p className="mt-2 text-neutral-400">Automatique · Essence · 2026</p>
                  </div>
                  <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1 text-sm text-[#f5de87]">
                    Sur demande
                  </span>
                </div>

                <div className="mt-8">
                  <VehicleIllustration
                    slug="volkswagen-touareg-r-line"
                    brand="Volkswagen"
                    model="Touareg R-Line"
                    premium
                    className="h-64 rounded-[1.5rem]"
                  />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                  <InfoChip label="Transmission" value="Auto" />
                  <InfoChip label="Places" value="5" />
                  <InfoChip label="Energie" value="Essence" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">Flotte economique</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Des vehicules accessibles et pratiques
          </h2>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Ideal pour les deplacements quotidiens, les sejours en ville et les locations longue duree.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {economyVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <VehicleIllustration
                slug={vehicle.slug}
                brand={vehicle.brand}
                model={vehicle.model}
                className="mb-5 h-44 rounded-[1.25rem]"
              />

              <div className="space-y-2">
                <p className="text-neutral-400">Manuelle · Diesel · 5 places</p>
                <p className="text-2xl font-semibold text-[#d4af37]">{vehicle.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
            <Link href="/vehicles">Decouvrir tous les vehicules</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/10 via-white/5 to-transparent p-8 sm:p-10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">Collection premium</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Une selection premium pour une experience plus exclusive
              </h2>
              <p className="mt-4 text-neutral-300">
                Touareg R-Line, T-Roc et Tucson : des vehicules plus prestigieux pour vos besoins professionnels,
                evenements et deplacements haut de gamme.
              </p>
            </div>
            <Button asChild className="bg-[#d4af37] text-black hover:bg-[#c9a62f]">
              <Link href="/vehicles">Demander une offre</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {premiumVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
              >
                <VehicleIllustration
                  slug={vehicle.slug}
                  brand={vehicle.brand}
                  model={vehicle.model}
                  premium
                  className="h-36 rounded-[1rem]"
                />
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-neutral-400">{vehicle.brand}</p>
                <h3 className="mt-2 text-2xl font-semibold">{vehicle.model}</h3>
                <p className="mt-2 text-neutral-300">{vehicle.fuel} · Automatique · 5 places</p>
                <p className="mt-4 text-lg font-medium text-[#d4af37]">{vehicle.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-2xl font-semibold text-[#d4af37]">{value}</p>
      <p className="mt-1 text-sm text-neutral-400">{label}</p>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  );
}