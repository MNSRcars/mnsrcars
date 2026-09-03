import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateGpsDevice, deleteGpsDevice } from "@/actions/gps.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

export default async function EditGpsDeviceAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: device }, { data: vehicles }] = await Promise.all([
    supabase.from("gps_devices").select("*").eq("id", id).maybeSingle(),
    supabase.from("vehicles").select("id, brand, model, license_plate").order("brand", { ascending: true }),
  ]);

  if (!device) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateGpsDevice(id, formData);
    redirect("/admin/gps-devices");
  }

  async function handleDelete() {
    "use server";
    await deleteGpsDevice(id);
    redirect("/admin/gps-devices");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/gps-devices">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Modifier le boîtier GPS</h1>
            <p className="text-muted-foreground">
              Identifiant : {device.device_identifier} ({device.provider})
            </p>
          </div>
        </div>

        <form action={handleDelete}>
          <Button variant="destructive" size="sm" type="submit">
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres du boîtier</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} className="space-y-4" id="edit-gps-form">
            <div className="space-y-2">
              <Label htmlFor="provider">Fournisseur (lecture seule)</Label>
              <Input id="provider" value={device.provider} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="device_identifier">Identifiant IMEI / ID (lecture seule)</Label>
              <Input id="device_identifier" value={device.device_identifier} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Libellé</Label>
              <Input
                id="label"
                name="label"
                defaultValue={device.label ?? ""}
                placeholder="Ex: Traceur Boîtier Principal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Véhicule assigné</Label>
              <select
                id="vehicle_id"
                name="vehicle_id"
                defaultValue={device.vehicle_id ?? ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Aucun véhicule assigné</option>
                {(vehicles ?? []).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} ({v.license_plate})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                value="true"
                defaultChecked={device.is_active}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Appareil actif et opérationnel
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" asChild>
            <Link href="/admin/gps-devices">Annuler</Link>
          </Button>
          <Button type="submit" form="edit-gps-form">
            Enregistrer les modifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}