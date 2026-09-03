import { getGpsDevices } from "@/services/gps.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function GpsDevicesPage() {
  const devices = await getGpsDevices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appareils GPS</h1>
          <p className="text-muted-foreground">
            Gérez vos dispositifs de géolocalisation
          </p>
        </div>
        <Button asChild>
          <Link href="/gps-devices/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau GPS
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Libellé</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Identifiant</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">
                {device.label || "Sans nom"}
              </TableCell>
              <TableCell>{device.provider}</TableCell>
              <TableCell className="font-mono text-sm">
                {device.device_identifier}
              </TableCell>
              <TableCell>
                {device.vehicle
                  ? `${device.vehicle.brand} ${device.vehicle.model} (${device.vehicle.license_plate})`
                  : "—"}
              </TableCell>
              <TableCell>
                <Badge variant={device.is_active ? "default" : "secondary"}>
                  {device.is_active ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/gps-devices/${device.id}`}>Modifier</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {devices.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucun appareil GPS trouvé
        </div>
      )}
    </div>
  );
}
