import { FaWhatsapp } from "react-icons/fa";
import { whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter MNSRcars sur WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(16,185,129,0.35)] transition hover:scale-[1.02] hover:bg-emerald-400"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <FaWhatsapp className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}