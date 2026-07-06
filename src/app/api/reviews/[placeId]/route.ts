import { NextResponse } from "next/server";
import { getReviewsByPlaceSlug } from "@/lib/db/queries";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ placeId: string }> }
) {
  try {
    const { placeId } = await params;
    const reviews = await getReviewsByPlaceSlug(placeId);
    return NextResponse.json(reviews);
  } catch (err) {
    console.error("[GET /api/reviews/:placeId]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
