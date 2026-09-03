"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/vehicles", label: "Flotte" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-sm font-semibold text-[#f5de87]">
              M
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#d4af37]">
                {siteConfig.name}
              </p>
              <p className="text-xs text-neutral-400">Casablanca</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "text-white" : "text-neutral-300 transition hover:text-white"}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 transition hover:text-white"
            >
              WhatsApp
            </a>

            <Link href="/login" className="text-neutral-300 transition hover:text-white">
              Admin
            </Link>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={siteConfig.phoneHref}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Appeler
            </a>
            <Link
              href="/vehicles"
              className="rounded-xl bg-[#d4af37] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#c9a62f]"
            >
              Voir la flotte
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={active ? "text-white" : "text-neutral-300"}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300"
                onClick={() => setOpen(false)}
              >
                WhatsApp
              </a>

              <Link href="/login" className="text-neutral-300" onClick={() => setOpen(false)}>
                Admin
              </Link>

              <div className="mt-2 flex flex-col gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Appeler
                </a>
                <Link
                  href="/vehicles"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-[#d4af37] px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-[#c9a62f]"
                >
                  Voir la flotte
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}