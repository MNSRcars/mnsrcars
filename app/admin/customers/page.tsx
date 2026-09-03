import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { getCustomers } from "@/services/customer.service";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">
            Portefeuille clients
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            Clients
          </h1>
          <p className="mt-2 text-neutral-600">
            Gérez les clients de MNSRcars et leur historique de location.
          </p>
        </div>
        <Link
          href="/admin/customers/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus className="size-4" />
          Ajouter un client
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {customers.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
              <Users className="size-7 text-neutral-500" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-neutral-950">
              Aucun client pour le moment
            </h2>
            <p className="mt-2 max-w-md text-sm text-neutral-500">
              Ajoutez votre premier client pour commencer les réservations.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Téléphone</th>
                  <th className="px-6 py-4 font-medium">Ville</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="transition hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="font-semibold text-neutral-950 hover:text-[#a9841c]"
                      >
                        {customer.first_name} {customer.last_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-neutral-700">{customer.email || "—"}</td>
                    <td className="px-6 py-4 text-neutral-700">{customer.phone || "—"}</td>
                    <td className="px-6 py-4 text-neutral-700">
                      {customer.city || customer.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
