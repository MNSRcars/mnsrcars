export const siteConfig = {
  name: "MNSRcars",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "MNSRcars, agence de location de voitures a Casablanca. Vehicules economiques et premium, reservation rapide et service professionnel.",
  phoneDisplay: "+212 6 00 00 00 00",
  phoneHref: "tel:+212600000000",
  whatsappNumber: "212600000000",
  email: "contact@mnsrcars.ma",
  city: "Casablanca",
  country: "Maroc",
  address: "Casablanca, Maroc",
  instagramUrl: "#",
  facebookUrl: "#",
};

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  "Bonjour MNSRcars, je souhaite reserver un vehicule."
)}`;