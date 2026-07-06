import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { places, reviews } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

interface ReviewBody {
  placeId: string; // slug
  author: string;
  rating: number;
  text: string;
}

export async function POST(req: Request) {
  try {
    const body: ReviewBody = await req.json();

    if (!body.placeId || !body.author?.trim() || !body.text?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
    }
    if (body.text.trim().length < 10) {
      return NextResponse.json({ error: "Review text too short" }, { status: 400 });
    }

    const placeRows = await db
      .select({ id: places.id })
      .from(places)
      .where(eq(places.slug, body.placeId))
      .limit(1);

    if (!placeRows[0]) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    const [inserted] = await db
      .insert(reviews)
      .values({
        placeId: placeRows[0].id,
        author: body.author.trim(),
        rating: body.rating,
        text: body.text.trim(),
        isApproved: false, // после модерации
        isFeatured: false,
      })
      .returning({ id: reviews.id });

    return NextResponse.json({ success: true, id: inserted.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reviews]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
