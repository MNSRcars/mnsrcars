import Link from "next/link";
import { CustomerForm } from "./customer-form";

export default function NewCustomerPage() {
  return (
    <section className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8942e]">
          Portefeuille clients
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Ajouter un client
        </h1>
        <Link href="/admin/customers" className="mt-4 inline-block text-sm font-medium text-[#a9841c] hover:underline">
          Retour à la liste
        </Link>
      </header>
      <CustomerForm />
    </section>
  );
}
