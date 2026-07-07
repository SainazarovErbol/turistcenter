import { db } from "./index";
import { places, tours, reviews, tourPlaces } from "./schema";
import { eq, and, desc } from "drizzle-orm";
import type { Attraction, Tour as MockTour, Category, TourCategory } from "@/data/attractions";
import type { Review as MockReview } from "@/data/reviews";

// ─── Mappers: DB → существующие типы приложения ───────────────────────────────

export function dbPlaceToAttraction(p: typeof places.$inferSelect): Attraction {
  return {
    id: p.slug,
    name: p.name,
    nameRu: p.nameRu,
    nameKy: p.nameKy ?? undefined,
    region: p.region,
    category: p.category as Category,
    description: p.description,
    descriptionRu: p.descriptionRu ?? undefined,
    descriptionKy: p.descriptionKy ?? undefined,
    longDescription: p.longDescription ?? "",
    longDescriptionRu: p.longDescriptionRu ?? undefined,
    longDescriptionKy: p.longDescriptionKy ?? undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.imageUrl ?? "",
    gallery: (p.gallery as string[]) ?? [],
    coordinates: [p.longitude, p.latitude],
    bestSeason: p.bestSeason ?? "",
    difficulty: p.difficulty ?? undefined,
    facts: (p.facts as { label: string; value: string }[]) ?? [],
  };
}

export function dbTourToMock(t: typeof tours.$inferSelect): MockTour {
  return {
    id: t.slug,
    title: t.title,
    titleEn: t.titleEn ?? undefined,
    titleKy: t.titleKy ?? undefined,
    duration: t.duration,
    durationDays: t.durationDays,
    price: t.price,
    currency: t.currency,
    rating: t.rating,
    reviewCount: t.reviewCount,
    image: t.imageUrl ?? "",
    highlights: (t.highlights as string[]) ?? [],
    operator: t.operator ?? "",
    category: t.category as TourCategory,
    isSponsored: t.isSponsored,
  };
}

export function dbReviewToMock(r: typeof reviews.$inferSelect, placeSlug: string): MockReview {
  return {
    id: String(r.id),
    placeId: placeSlug,
    authorName: r.author,
    authorCountry: r.country ?? "",
    rating: r.rating,
    text: r.text,
    date: r.visitedAt?.toISOString().split("T")[0] ?? r.createdAt.toISOString().split("T")[0],
    helpful: 0,
  };
}

// ─── Запросы ──────────────────────────────────────────────────────────────────

export async function getPlaces(): Promise<Attraction[]> {
  const rows = await db
    .select()
    .from(places)
    .where(eq(places.isPublished, true))
    .orderBy(desc(places.rating));
  return rows.map(dbPlaceToAttraction);
}

export async function getPlaceBySlug(slug: string): Promise<Attraction | null> {
  const rows = await db
    .select()
    .from(places)
    .where(and(eq(places.slug, slug), eq(places.isPublished, true)))
    .limit(1);
  return rows[0] ? dbPlaceToAttraction(rows[0]) : null;
}

export async function getTours(): Promise<MockTour[]> {
  const rows = await db
    .select()
    .from(tours)
    .where(eq(tours.isPublished, true))
    .orderBy(desc(tours.rating));
  return rows.map(dbTourToMock);
}

export async function getReviewsByPlaceSlug(slug: string): Promise<MockReview[]> {
  const placeRows = await db
    .select({ id: places.id })
    .from(places)
    .where(eq(places.slug, slug))
    .limit(1);
  if (!placeRows[0]) return [];

  const rows = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.placeId, placeRows[0].id), eq(reviews.isApproved, true)))
    .orderBy(desc(reviews.createdAt));
  return rows.map((r) => dbReviewToMock(r, slug));
}

export async function getToursByPlaceSlug(slug: string): Promise<MockTour[]> {
  const placeRows = await db
    .select({ id: places.id })
    .from(places)
    .where(eq(places.slug, slug))
    .limit(1);
  if (!placeRows[0]) return [];

  const rows = await db
    .select({ tour: tours })
    .from(tourPlaces)
    .innerJoin(tours, eq(tourPlaces.tourId, tours.id))
    .where(and(eq(tourPlaces.placeId, placeRows[0].id), eq(tours.isPublished, true)))
    .orderBy(desc(tours.rating))
    .limit(3);
  return rows.map((r) => dbTourToMock(r.tour));
}

export async function getFeaturedReviews(count = 6): Promise<MockReview[]> {
  const rows = await db
    .select({ review: reviews, slug: places.slug })
    .from(reviews)
    .innerJoin(places, eq(reviews.placeId, places.id))
    .where(and(eq(reviews.isFeatured, true), eq(reviews.isApproved, true)))
    .orderBy(desc(reviews.createdAt))
    .limit(count);
  return rows.map((r) => dbReviewToMock(r.review, r.slug));
}
