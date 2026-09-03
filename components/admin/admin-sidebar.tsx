"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CarFront,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Navigation,
  Satellite,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Véhicules", href: "/admin/vehicles", icon: CarFront },
  { name: "Suivi GPS", href: "/admin/tracking", icon: Navigation },
  { name: "Boîtiers GPS", href: "/admin/gps-devices", icon: Satellite },
  { name: "Réservations", href: "/admin/reservations", icon: ClipboardList },
  { name: "Clients", href: "/admin/customers", icon: Users },
  { name: "Paiements", href: "/admin/payments", icon: CreditCard },
  { name: "Maintenance", href: "/admin/maintenance", icon: Wrench },
  { name: "Utilisateurs", href: "/admin/users", icon: ShieldCheck },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
  { name: "Audit logs", href: "/admin/audit-logs", icon: Activity },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 flex-col bg-neutral-950 text-white lg:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d4af37]">
          Casablanca
        </p>
        <Link href="/admin" className="mt-1 block text-2xl font-semibold">
          MNSRcars
        </Link>
        <p className="mt-1 text-sm text-neutral-400">Administration</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-[#d4af37] text-neutral-950"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-xs text-neutral-500">
          MNSRcars · Location voiture Casablanca
        </p>
      </div>
    </aside>
  );
}