import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerById } from "@/services/customer.service";

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-neutral-950">{value}</p>
    </div>
  );
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) notFound();

  return (
    <section className="space-y-8">
      <header>
        <Link href="/admin/customers" className="text-sm font-medium text-[#a9841c] hover:underline">
          Retour aux clients
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          {customer.first_name} {customer.last_name}
        </h1>
        <p className="mt-2 text-neutral-600">
          {customer.city || customer.country}
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-950">Informations</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Info label="Email" value={customer.email || "Non renseigné"} />
          <Info label="Téléphone" value={customer.phone || "Non renseigné"} />
          <Info label="Pays" value={customer.country} />
          <Info label="Ville" value={customer.city || "Non renseignée"} />
          <Info label="Adresse" value={customer.address || "Non renseignée"} />
          <Info label="Permis" value={customer.driver_license_number || "Non renseigné"} />
          <Info label="Pays du permis" value={customer.driver_license_country || "Non renseigné"} />
        </div>
        {customer.notes && (
          <p className="mt-6 text-sm leading-6 text-neutral-600">{customer.notes}</p>
        )}
      </section>
    </section>
  );
}
