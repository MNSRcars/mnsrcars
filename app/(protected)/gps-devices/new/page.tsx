import { createClient } from "@/lib/supabase/server";
import { createGpsDevice } from "@/actions/gps.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function NewGpsDevicePage() {
  const supabase = await createClient();

  const { data: vehicles, error: vehiclesError } = await supabase
    .from("vehicles")
    .select("id, brand, model, license_plate")
    .order("brand", { ascending: true });

  if (vehiclesError) {
    console.error("vehicles fetch error:", vehiclesError);
  }

  const vehicleList = vehicles ?? [];

  async function handleCreate(formData: FormData) {
    "use server";
    await createGpsDevice(formData);
    redirect("/gps-devices");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/gps-devices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Ajouter un traceur GPS</h1>
          <p className="text-muted-foreground">
            Associez un nouveau boîtier GPS à un véhicule
          </p>
        </div>
      </div>

      {vehicleList.length === 0 && (
        <Card className="border-amber-300 bg-amber-50">
          <CardContent className="pt-6 text-sm text-amber-900">
            Aucun véhicule trouvé.{" "}
            <Link href="/vehicles" className="underline font-medium">
              Créer un véhicule d&apos;abord
            </Link>
            , puis revenez ici. Vous pouvez aussi enregistrer le boîtier sans véhicule.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informations du boîtier</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Fournisseur / Protocole</Label>
              <Input
                id="provider"
                name="provider"
                placeholder="Ex: Traccar, Teltonika, Coban..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="device_identifier">Identifiant unique (IMEI / ID)</Label>
              <Input
                id="device_identifier"
                name="device_identifier"
                placeholder="Ex: 864201041234567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Libellé (optionnel)</Label>
              <Input
                id="label"
                name="label"
                placeholder="Ex: Traceur Boîtier Principal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Véhicule assigné (optionnel)</Label>
              <select
                id="vehicle_id"
                name="vehicle_id"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Aucun véhicule assigné</option>
                {vehicleList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} ({v.license_plate})
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {vehicleList.length} véhicule(s) disponible(s)
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" asChild type="button">
                <Link href="/gps-devices">Annuler</Link>
              </Button>
              <Button type="submit">Enregistrer le boîtier</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}