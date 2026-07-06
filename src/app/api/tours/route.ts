import { NextResponse } from "next/server";
import { getTours } from "@/lib/db/queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const tours = await getTours();
    return NextResponse.json(tours);
  } catch (err) {
    console.error("[GET /api/tours]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
