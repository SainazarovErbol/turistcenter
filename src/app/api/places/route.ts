import { NextResponse } from "next/server";
import { getPlaces } from "@/lib/db/queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const places = await getPlaces();
    return NextResponse.json(places);
  } catch (err) {
    console.error("[GET /api/places]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
