import { cn } from "@/lib/utils";

type VehicleIllustrationProps = {
  slug?: string;
  brand: string;
  model: string;
  premium?: boolean;
  className?: string;
};

const themes: Record<
  string,
  { body: string; roof: string; glow: string; wheel: string; accent: string }
> = {
  "dacia-logan": {
    body: "#7b8794",
    roof: "#d8dee7",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#1f1f1f",
    accent: "#d4af37",
  },
  "dacia-sandero": {
    body: "#737b86",
    roof: "#d9e1ea",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#1f1f1f",
    accent: "#d4af37",
  },
  "renault-clio-5-gris": {
    body: "#8d99a8",
    roof: "#e4e9ef",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#1f1f1f",
    accent: "#d4af37",
  },
  "renault-clio-5-blanche": {
    body: "#e5e7eb",
    roof: "#ffffff",
    glow: "rgba(212,175,55,0.20)",
    wheel: "#1f1f1f",
    accent: "#d4af37",
  },
  "peugeot-208-noire": {
    body: "#444750",
    roof: "#b8c0ca",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#111111",
    accent: "#d4af37",
  },
  "peugeot-208-grise": {
    body: "#9aa3ad",
    roof: "#e6ebf0",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#111111",
    accent: "#d4af37",
  },
  "peugeot-208-pistache": {
    body: "#9db474",
    roof: "#dce7c7",
    glow: "rgba(212,175,55,0.24)",
    wheel: "#111111",
    accent: "#d4af37",
  },
  "volkswagen-touareg-r-line": {
    body: "#59616e",
    roof: "#d2d8e0",
    glow: "rgba(212,175,55,0.36)",
    wheel: "#111111",
    accent: "#f5de87",
  },
  "volkswagen-t-roc": {
    body: "#6b7280",
    roof: "#d4dbe4",
    glow: "rgba(212,175,55,0.32)",
    wheel: "#111111",
    accent: "#f5de87",
  },
  "hyundai-tucson": {
    body: "#606876",
    roof: "#d0d7e0",
    glow: "rgba(212,175,55,0.32)",
    wheel: "#111111",
    accent: "#f5de87",
  },
};

function fallbackTheme(premium?: boolean) {
  return premium
    ? {
        body: "#5d6570",
        roof: "#d3d9e2",
        glow: "rgba(212,175,55,0.34)",
        wheel: "#111111",
        accent: "#f5de87",
      }
    : {
        body: "#8b95a3",
        roof: "#dfe6ee",
        glow: "rgba(212,175,55,0.22)",
        wheel: "#1f1f1f",
        accent: "#d4af37",
      };
}

function isSuvVehicle(slug?: string, model?: string, premium?: boolean) {
  const s = (slug ?? "").toLowerCase();
  const m = (model ?? "").toLowerCase();
  return (
    premium ||
    s.includes("touareg") ||
    s.includes("t-roc") ||
    s.includes("tucson") ||
    s.includes("duster") ||
    m.includes("touareg") ||
    m.includes("tucson") ||
    m.includes("t-roc") ||
    m.includes("duster")
  );
}

export function VehicleIllustration({
  slug,
  brand,
  model,
  premium = false,
  className,
}: VehicleIllustrationProps) {
  const theme = (slug && themes[slug]) || fallbackTheme(premium);
  const suv = isSuvVehicle(slug, model, premium);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[inherit] border border-white/10 bg-[linear-gradient(135deg,#171717,#090909)]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 32% 36%, ${theme.glow}, transparent 34%)`,
        }}
      />

      <div className="absolute inset-x-10 bottom-7 h-10 rounded-full bg-black/60 blur-2xl" />

      <svg
        viewBox="0 0 900 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {suv ? (
          <>
            <path
              d="M128 270L170 225C205 187 255 165 320 157L470 144C562 136 637 159 702 220L772 270V300H128V270Z"
              fill={theme.body}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="4"
            />
            <path
              d="M294 158C332 112 378 92 455 89H542C602 89 650 111 689 156L725 221H254L294 158Z"
              fill={theme.roof}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="4"
            />
            <path
              d="M325 120H552"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M282 225H724"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M352 162L310 219" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
            <path d="M575 162L640 220" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
          </>
        ) : (
          <>
            <path
              d="M135 274L176 236C216 199 267 176 329 168L462 158C543 152 611 171 672 215L750 254V298H135V274Z"
              fill={theme.body}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="4"
            />
            <path
              d="M322 168C357 128 404 109 468 108H526C578 108 623 124 663 164L704 225H282L322 168Z"
              fill={theme.roof}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="4"
            />
            <path
              d="M344 136H540"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M301 225H702"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M364 171L324 221" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
            <path d="M556 165L620 223" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
          </>
        )}

        <path
          d="M145 246H171"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M750 246H779"
          stroke={theme.accent}
          strokeWidth="7"
          strokeLinecap="round"
        />

        <circle cx="278" cy="300" r="42" fill={theme.wheel} />
        <circle cx="278" cy="300" r="22" fill="#7a7a7a" />
        <circle cx="640" cy="300" r="42" fill={theme.wheel} />
        <circle cx="640" cy="300" r="22" fill="#7a7a7a" />
      </svg>

      <div className="absolute left-5 top-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
          {brand}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {model}
        </p>
      </div>

      <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-300">
        {premium ? "Premium" : "Concept"}
      </div>
    </div>
  );
}