import { requireRole } from "@/lib/auth/session";
import type { UserRole } from "@/lib/auth/roles";
import { getDashboardStats } from "@/services/dashboard.service";

const ALL_STAFF: UserRole[] = [
  "super_admin",
  "admin",
  "manager",
  "agent",
  "accountant",
];

function formatMad(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
  accent?: boolean;
};

function StatCard({
  label,
  value,
  description,
  accent = false,
}: StatCardProps) {
  return (
    <article
      className={
        accent
          ? "rounded-2xl border border-[#d4af37]/40 bg-neutral-950 p-6 text-white shadow-sm"
          : "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      }
    >
      <p
        className={
          accent
            ? "text-sm font-medium text-[#d4af37]"
            : "text-sm font-medium text-neutral-500"
        }
      >
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>

      <p
        className={
          accent
            ? "mt-3 text-sm text-neutral-300"
            : "mt-3 text-sm text-neutral-500"
        }
      >
        {description}
      </p>
    </article>
  );
}

export default async function AdminDashboardPage() {
  const profile = await requireRole(ALL_STAFF);
  const stats = await getDashboardStats(profile.role);

  const canViewRevenue = [
    "super_admin",
    "admin",
    "manager",
    "accountant",
  ].includes(profile.role);

  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">
          MNSRcars Administration
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Bonjour, {profile.first_name || profile.email}
        </h1>

        <p className="mt-3 text-neutral-600">
          Vue générale de votre activité à Casablanca.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Véhicules au total"
          value={stats.totalVehicles}
          description="Tous statuts confondus"
        />

        <StatCard
          label="Véhicules disponibles"
          value={stats.availableVehicles}
          description="Prêts à être loués"
        />

        <StatCard
          label="Véhicules loués"
          value={stats.rentedVehicles}
          description="Actuellement en location"
        />

        <StatCard
          label="En maintenance"
          value={stats.maintenanceVehicles}
          description="Indisponibles temporairement"
        />

        <StatCard
          label="Réservations en attente"
          value={stats.pendingReservations}
          description="À confirmer ou traiter"
        />

        {canViewRevenue ? (
          <StatCard
            label="Revenus du mois"
            value={formatMad(stats.currentMonthRevenue)}
            description="Paiements confirmés ce mois"
            accent
          />
        ) : (
          <StatCard
            label="Revenus du mois"
            value="Accès limité"
            description="Réservé aux rôles autorisés"
          />
        )}
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-950">
          Activité récente
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Les réservations, paiements et activités récentes seront ajoutés dans
          les prochaines étapes de la Phase 2.
        </p>
      </section>
    </section>
  );
}
