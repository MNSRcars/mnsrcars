"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { WhatsAppFloat } from "@/components/marketing/whatsapp-float";

export function PublicSiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideChrome =
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname.startsWith("/tracking") ||
    pathname.startsWith("/gps-devices");

  return (
    <>
      {!hideChrome && <SiteHeader />}
      {children}
      {!hideChrome && <SiteFooter />}
      {!hideChrome && <WhatsAppFloat />}
    </>
  );
}