import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireRole } from "@/lib/auth/session";
import type { UserRole } from "@/lib/auth/roles";

const ALL_STAFF: UserRole[] = [
  "super_admin",
  "admin",
  "manager",
  "agent",
  "accountant",
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole(ALL_STAFF);

  return (
    <div className="min-h-screen bg-neutral-50 lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <Link
              href="/admin"
              className="text-lg font-semibold text-neutral-950 lg:hidden"
            >
              MNSRcars Admin
            </Link>

            <div className="hidden lg:block">
              <p className="text-sm text-neutral-500">
                Gestion de votre agence de location
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">
                {profile.first_name || "Utilisateur"} {profile.last_name}
              </p>
              <p className="text-xs capitalize text-neutral-500">
                {profile.role.replace("_", " ")}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
