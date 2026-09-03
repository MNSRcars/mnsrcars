import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/gps/simulate" });
}

export async function POST() {
  try {
    const supabase = await createClient();

    const { data: devices, error: devicesError } = await supabase
      .from("gps_devices")
      .select("id, vehicle_id, device_identifier, is_active")
      .eq("is_active", true)
      .not("vehicle_id", "is", null);

    if (devicesError) {
      console.error("simulate devicesError:", devicesError);
      return NextResponse.json(
        { message: "Erreur lecture gps_devices", details: devicesError.message, code: devicesError.code },
        { status: 500 }
      );
    }

    if (!devices?.length) {
      return NextResponse.json(
        { message: "Aucun appareil GPS actif avec véhicule. Assignez un véhicule au boîtier." },
        { status: 404 }
      );
    }

    const rows = devices.map((dev) => {
      const speed = Math.floor(Math.random() * 90);
      return {
        device_id: dev.id,
        vehicle_id: dev.vehicle_id,
        latitude: Number((33.5731 + (Math.random() - 0.5) * 0.05).toFixed(6)),
        longitude: Number((-7.5898 + (Math.random() - 0.5) * 0.05).toFixed(6)),
        speed,
        heading: Math.floor(Math.random() * 360),
        battery_level: Math.floor(70 + Math.random() * 30),
        fuel_level: Math.floor(40 + Math.random() * 60),
        ignition: speed > 0,
        recorded_at: new Date().toISOString(),
      };
    });

    const { error: insertError } = await supabase.from("gps_positions").insert(rows);

    if (insertError) {
      console.error("simulate insertError:", insertError);
      return NextResponse.json(
        {
          message: "Erreur insert gps_positions",
          details: insertError.message,
          code: insertError.code,
          hint: (insertError as any).hint ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${rows.length} position(s) simulée(s)`,
    });
  } catch (e: any) {
    console.error("simulate crash:", e);
    return NextResponse.json(
      { message: "Erreur interne simulate", details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}