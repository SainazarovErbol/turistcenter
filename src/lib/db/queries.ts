import { db } from "./index";
import { places, tours, reviews, tourPlaces } from "./schema";
import { eq, and, desc, sql, count, avg } from "drizzle-orm";
import type { Attraction, Tour as MockTour, Category, TourCategory } from "@/data/attractions";
import type { Review as MockReview } from "@/data/reviews";

type ReviewStats = { rating: number; reviewCount: number };

// ─── Mappers: DB → существующие типы приложения ───────────────────────────────

export function dbPlaceToAttraction(
  p: typeof places.$inferSelect,
  stats?: ReviewStats
): Attraction {
  const reviewCount = stats?.reviewCount ?? 0;
  const rating = stats?.reviewCount ? stats.rating : 0;

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
    rating,
    reviewCount,
    viewCount: p.viewCount ?? 0,
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
    viewCount: t.viewCount ?? 0,
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

// ─── Review stats ─────────────────────────────────────────────────────────────

async function getPlaceReviewStatsMap(): Promise<Map<number, ReviewStats>> {
  const rows = await db
    .select({
      placeId: reviews.placeId,
      avgRating: avg(reviews.rating),
      reviewCount: count(reviews.id),
    })
    .from(reviews)
    .where(eq(reviews.isApproved, true))
    .groupBy(reviews.placeId);

  const map = new Map<number, ReviewStats>();
  for (const row of rows) {
    map.set(row.placeId, {
      rating: Math.round(Number(row.avgRating) * 10) / 10,
      reviewCount: Number(row.reviewCount),
    });
  }
  return map;
}

// ─── Запросы ──────────────────────────────────────────────────────────────────

export async function getPlaces(): Promise<Attraction[]> {
  const [rows, statsMap] = await Promise.all([
    db.select().from(places).where(eq(places.isPublished, true)).orderBy(desc(places.rating)),
    getPlaceReviewStatsMap(),
  ]);

  return rows
    .map((p) => {
      const stats = statsMap.get(p.id);
      return dbPlaceToAttraction(p, stats);
    })
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
}

export async function getPlaceBySlug(slug: string): Promise<Attraction | null> {
  const rows = await db
    .select()
    .from(places)
    .where(and(eq(places.slug, slug), eq(places.isPublished, true)))
    .limit(1);

  if (!rows[0]) return null;

  const statsRows = await db
    .select({
      avgRating: avg(reviews.rating),
      reviewCount: count(reviews.id),
    })
    .from(reviews)
    .where(and(eq(reviews.placeId, rows[0].id), eq(reviews.isApproved, true)));

  const stats: ReviewStats | undefined =
    statsRows[0] && Number(statsRows[0].reviewCount) > 0
      ? {
          rating: Math.round(Number(statsRows[0].avgRating) * 10) / 10,
          reviewCount: Number(statsRows[0].reviewCount),
        }
      : undefined;

  return dbPlaceToAttraction(rows[0], stats);
}

export async function incrementPlaceViews(slug: string): Promise<void> {
  await db
    .update(places)
    .set({ viewCount: sql`${places.viewCount} + 1` })
    .where(eq(places.slug, slug));
}

export async function incrementTourViews(slug: string): Promise<void> {
  await db
    .update(tours)
    .set({ viewCount: sql`${tours.viewCount} + 1` })
    .where(eq(tours.slug, slug));
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

  if (rows.length >= count) {
    return rows.map((r) => dbReviewToMock(r.review, r.slug));
  }

  const featuredIds = new Set(rows.map((r) => r.review.id));
  const extra = await db
    .select({ review: reviews, slug: places.slug })
    .from(reviews)
    .innerJoin(places, eq(reviews.placeId, places.id))
    .where(eq(reviews.isApproved, true))
    .orderBy(desc(reviews.createdAt))
    .limit(count * 2);

  const merged = [...rows];
  for (const row of extra) {
    if (merged.length >= count) break;
    if (!featuredIds.has(row.review.id)) merged.push(row);
  }

  return merged.slice(0, count).map((r) => dbReviewToMock(r.review, r.slug));
}

export async function getSiteStats() {
  const [placeCount, tourCount, reviewStats] = await Promise.all([
    db.select({ count: count() }).from(places).where(eq(places.isPublished, true)),
    db.select({ count: count() }).from(tours).where(eq(tours.isPublished, true)),
    db
      .select({
        total: count(reviews.id),
        avgRating: avg(reviews.rating),
      })
      .from(reviews)
      .where(eq(reviews.isApproved, true)),
  ]);

  const totalReviews = Number(reviewStats[0]?.total ?? 0);
  const avgRating =
    totalReviews > 0 ? Math.round(Number(reviewStats[0]?.avgRating) * 10) / 10 : 0;

  return {
    places: Number(placeCount[0]?.count ?? 0),
    tours: Number(tourCount[0]?.count ?? 0),
    reviews: totalReviews,
    avgRating,
  };
}
