import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/gps/webhook" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const deviceIdentifier = String(body?.device_identifier ?? "").trim();
    const latitude = body?.latitude;
    const longitude = body?.longitude;

    if (!deviceIdentifier || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "device_identifier, latitude, longitude requis" },
        { status: 400 }
      );
    }

    // Client admin = bypass RLS (les boîtiers n'ont pas de session user)
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = await createClient();
    }

    const { data: device, error: deviceError } = await supabase
      .from("gps_devices")
      .select("id, vehicle_id, is_active, device_identifier")
      .eq("device_identifier", deviceIdentifier)
      .maybeSingle();

    if (deviceError) {
      return NextResponse.json(
        { error: "Erreur lecture gps_devices", details: deviceError.message, code: deviceError.code },
        { status: 500 }
      );
    }

    if (!device) {
      return NextResponse.json(
        {
          error: "Appareil GPS introuvable",
          device_identifier: deviceIdentifier,
          hint: "Vérifiez l'IMEI dans /gps-devices",
        },
        { status: 404 }
      );
    }

    if (!device.is_active) {
      return NextResponse.json({ error: "Appareil GPS désactivé" }, { status: 403 });
    }

    const recordedAt = body.recorded_at
      ? new Date(body.recorded_at).toISOString()
      : new Date().toISOString();

    const { error: insertError } = await supabase.from("gps_positions").insert({
      device_id: device.id,
      vehicle_id: device.vehicle_id,
      latitude: Number(latitude),
      longitude: Number(longitude),
      speed: Number(body.speed ?? 0),
      heading: Number(body.heading ?? 0),
      battery_level: body.battery_level ?? null,
      fuel_level: body.fuel_level ?? null,
      ignition: Boolean(body.ignition ?? false),
      recorded_at: recordedAt,
    });

    if (insertError) {
      return NextResponse.json(
        { error: "Erreur insert gps_positions", details: insertError.message, code: insertError.code },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Point GPS enregistré avec succès",
      device_id: device.id,
      vehicle_id: device.vehicle_id,
      recorded_at: recordedAt,
    });
  } catch (error) {
    console.error("gps webhook error:", error);
    return NextResponse.json({ error: "Erreur interne webhook" }, { status: 500 });
  }
}