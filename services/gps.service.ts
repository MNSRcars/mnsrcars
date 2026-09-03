import "server-only";
import { createClient } from "@/lib/supabase/server";

export type GpsDeviceListItem = {
  id: string;
  provider: string;
  device_identifier: string;
  label: string | null;
  is_active: boolean;
  vehicle: {
    brand: string;
    model: string;
    license_plate: string;
  } | null;
};

export type GpsDeviceDetails = {
  id: string;
  provider: string;
  device_identifier: string;
  label: string | null;
  is_active: boolean;
  vehicle_id: string | null;
  created_at: string;
};

export type GpsPosition = {
  id: string;
  device_id: string;
  vehicle_id: string | null;
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  battery_level: number | null;
  fuel_level: number | null;
  ignition: boolean | null;
  recorded_at: string;
  created_at: string;
};

export async function getGpsDevices(): Promise<GpsDeviceListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gps_devices")
    .select("id, provider, device_identifier, label, is_active, vehicle:vehicles(brand, model, license_plate)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Impossible de récupérer les appareils GPS.");
  }

  return (data ?? []).map((device: any) => ({
    id: device.id,
    provider: device.provider,
    device_identifier: device.device_identifier,
    label: device.label,
    is_active: device.is_active,
    vehicle: Array.isArray(device.vehicle) ? device.vehicle[0] ?? null : device.vehicle,
  }));
}

export async function getGpsDeviceById(id: string): Promise<GpsDeviceDetails | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gps_devices")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Erreur récupération appareil GPS");
  }

  return data;
}

export async function getLatestPositionByVehicleId(vehicleId: string): Promise<GpsPosition | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gps_positions")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error("Erreur récupération dernière position GPS");
  }

  return data;
}

export async function getPositionsForDevice(deviceId: string, limit = 100): Promise<GpsPosition[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gps_positions")
    .select("*")
    .eq("device_id", deviceId)
    .order("recorded_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error("Erreur récupération historique GPS");
  }

  return data ?? [];
}

export type GpsProviderName = "traccar" | "teltonika" | "coban" | "mock" | string;

export interface IGpsProviderAdapter {
  name: GpsProviderName;
  parsePayload(payload: any): { latitude: number; longitude: number; speed?: number };
}

export const MockGpsProvider: IGpsProviderAdapter = {
  name: "mock",
  parsePayload(payload: any) {
    return {
      latitude: payload.latitude,
      longitude: payload.longitude,
      speed: payload.speed ?? 0,
    };
  },
};

export function generateMockTelemetry(baseLat = 33.5731, baseLng = -7.5898) {
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;

  return {
    latitude: baseLat + latOffset,
    longitude: baseLng + lngOffset,
    speed: Math.floor(Math.random() * 90),
    heading: Math.floor(Math.random() * 360),
    battery_level: Math.floor(70 + Math.random() * 30),
    fuel_level: Math.floor(40 + Math.random() * 60),
    ignition: Math.random() > 0.3,
    recorded_at: new Date().toISOString(),
  };
}