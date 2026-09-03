"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw, Play } from "lucide-react";

export function GpsSimulateButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSimulate() {
    try {
      setLoading(true);
      const res = await fetch("/api/gps/simulate", { method: "POST" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || "Erreur lors de la simulation");
      }
    } catch (err) {
      alert("Erreur réseau lors de la simulation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleSimulate}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4 text-emerald-600" />
      )}
      {loading ? "Génération..." : "Simuler un relevé GPS"}
    </Button>
  );
}
