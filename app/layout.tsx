import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { PublicSiteShell } from "@/components/marketing/public-site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MNSRcars - Location de voitures a Casablanca",
    template: "%s | MNSRcars",
  },
  description:
    "MNSRcars, agence de location de voitures premium et economiques a Casablanca. Reservation rapide, vehicules recents et service professionnel.",
  keywords: [
    "location voiture Casablanca",
    "location voitures Casablanca",
    "agence location voiture Casablanca",
    "SUV premium Casablanca",
    "location Dacia Casablanca",
    "location Renault Casablanca",
    "location Peugeot Casablanca",
  ],
  openGraph: {
    title: "MNSRcars - Location de voitures a Casablanca",
    description:
      "Vehicules economiques et premium a Casablanca avec reservation rapide et service professionnel.",
    url: siteConfig.url,
    siteName: "MNSRcars",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MNSRcars - Location de voitures a Casablanca",
    description:
      "Vehicules economiques et premium a Casablanca avec reservation rapide et service professionnel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-900">
        <PublicSiteShell>{children}</PublicSiteShell>
      </body>
    </html>
  );
}