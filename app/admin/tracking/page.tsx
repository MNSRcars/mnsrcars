import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, Gauge, BatteryCharging, Power, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GpsSimulateButton } from "@/components/gps/simulate-button";

interface VehicleTrackingItem {
  id: string;
  brand: string;
  model: string;
  license_plate: string;
  gps_devices: {
    id: string;
    device_identifier: string;
    is_active: boolean;
    label: string | null;
  }[];
  latest_position?: {
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    battery_level: number | null;
    fuel_level: number | null;
    ignition: boolean;
    recorded_at: string;
  } | null;
}

export default async function FleetTrackingAdminPage() {
  const supabase = await createClient();

  const { data: vehiclesData } = await supabase
    .from("vehicles")
    .select(`
      id,
      brand,
      model,
      license_plate,
      gps_devices (id, device_identifier, is_active, label)
    `);

  const vehicles: VehicleTrackingItem[] = await Promise.all(
    (vehiclesData ?? []).map(async (v: any) => {
      const { data: latestPos } = await supabase
        .from("gps_positions")
        .select("*")
        .eq("vehicle_id", v.id)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        ...v,
        latest_position: latestPos,
      };
    })
  );

  const trackedVehicles = vehicles.filter((v) => v.gps_devices && v.gps_devices.length > 0);
  const movingVehicles = trackedVehicles.filter((v) => (v.latest_position?.speed ?? 0) > 5);
  const stationaryVehicles = trackedVehicles.filter((v) => (v.latest_position?.speed ?? 0) <= 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Suivi de Flotte & Télématique</h1>
          <p className="text-muted-foreground">
            Surveillance en temps réel de la position et de l'état des véhicules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GpsSimulateButton />
          <Button variant="outline" asChild>
            <Link href="/admin/gps-devices">Gérer les boîtiers</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Véhicules Suivis</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trackedVehicles.length}</div>
            <p className="text-xs text-muted-foreground">Boîtiers GPS connectés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Mouvement</CardTitle>
            <Gauge className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{movingVehicles.length}</div>
            <p className="text-xs text-muted-foreground">Vitesse &gt; 5 km/h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À l'Arrêt</CardTitle>
            <Power className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stationaryVehicles.length}</div>
            <p className="text-xs text-muted-foreground">Moteur coupé ou stationné</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trackedVehicles.map((vehicle) => {
          const pos = vehicle.latest_position;
          const isMoving = (pos?.speed ?? 0) > 5;
          const mapUrl = pos
            ? `https://www.google.com/maps?q=${pos.latitude},${pos.longitude}`
            : "#";

          return (
            <Card key={vehicle.id} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {vehicle.brand} {vehicle.model}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {vehicle.license_plate}
                    </CardDescription>
                  </div>
                  <Badge variant={isMoving ? "default" : "secondary"}>
                    {isMoving ? "En route" : "Stationné"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-sm pb-4">
                {pos ? (
                  <div className="space-y-2 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Gauge className="h-4 w-4" /> Vitesse :
                      </span>
                      <span className="font-semibold">{Math.round(pos.speed)} km/h</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Power className="h-4 w-4" /> Contact :
                      </span>
                      <span className={pos.ignition ? "text-emerald-600 font-medium" : "text-muted-foreground"}>
                        {pos.ignition ? "Allumé" : "Coupé"}
                      </span>
                    </div>

                    {pos.battery_level !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <BatteryCharging className="h-4 w-4" /> Batterie :
                        </span>
                        <span className="font-medium">{pos.battery_level}%</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> Relevé :
                      </span>
                      <span>{new Date(pos.recorded_at).toLocaleTimeString("fr-FR")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    En attente du premier signal GPS...
                  </div>
                )}
              </CardContent>

              {pos && (
                <div className="p-4 pt-0">
                  <Button variant="secondary" className="w-full text-xs" asChild>
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Voir sur la carte ({pos.latitude.toFixed(4)}, {pos.longitude.toFixed(4)})
                    </a>
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {trackedVehicles.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Aucun véhicule n'est actuellement équipé d'un traceur GPS.
          </p>
          <Button asChild>
            <Link href="/admin/gps-devices/new">Configurer un traceur GPS</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}