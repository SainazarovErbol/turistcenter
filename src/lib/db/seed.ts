/**
 * Seed script — переносит все мок-данные из src/data/ в базу данных.
 * Запуск: npm run db:seed
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { attractions } from "../../data/attractions";
import { reviews as mockReviews } from "../../data/reviews";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set in .env.local");

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log("🌱 Начинаем seed...\n");

  // ─── 1. Очистка существующих данных ─────────────────────────────────────────
  console.log("🗑️  Очищаем таблицы...");
  await db.delete(schema.reviews);
  await db.delete(schema.tourPlaces);
  await db.delete(schema.tours);
  await db.delete(schema.places);

  // ─── 2. Места ────────────────────────────────────────────────────────────────
  console.log("📍 Добавляем места...");
  const insertedPlaces = await db
    .insert(schema.places)
    .values(
      attractions.map((a) => ({
        slug: a.id,
        name: a.name,
        nameRu: a.nameRu,
        nameKy: a.nameKy ?? null,
        region: a.region,
        category: a.category,
        description: a.description,
        descriptionRu: a.descriptionRu ?? a.description,
        descriptionKy: a.descriptionKy ?? null,
        longDescription: a.longDescription,
        longDescriptionRu: a.longDescriptionRu ?? a.longDescription,
        longDescriptionKy: a.longDescriptionKy ?? null,
        rating: a.rating,
        reviewCount: a.reviewCount,
        imageUrl: a.image,
        gallery: a.gallery,
        longitude: a.coordinates[0],
        latitude: a.coordinates[1],
        bestSeason: a.bestSeason,
        difficulty: a.difficulty ?? null,
        facts: a.facts,
        viewCount: 0,
      }))
    )
    .returning({ id: schema.places.id, slug: schema.places.slug });

  console.log(`   ✅ Добавлено ${insertedPlaces.length} мест`);

  // Карта slug → id для ссылок
  const placeIdBySlug = Object.fromEntries(
    insertedPlaces.map((p) => [p.slug, p.id])
  );

  // ─── 3. Туры ─────────────────────────────────────────────────────────────────
  // Импортируем tours отдельно, так как имя конфликтует с таблицей
  const { tours: mockTours } = await import("../../data/attractions");

  console.log("🗺️  Добавляем туры...");
  const insertedTours = await db
    .insert(schema.tours)
    .values(
      mockTours.map((t) => ({
        slug: t.id,
        title: t.title,
        titleEn: t.titleEn ?? null,
        titleKy: t.titleKy ?? null,
        duration: t.duration,
        durationDays: t.durationDays,
        price: t.price,
        currency: t.currency,
        rating: t.rating,
        reviewCount: t.reviewCount,
        imageUrl: t.image,
        highlights: t.highlights,
        operator: t.operator,
        category: t.category,
        isSponsored: t.isSponsored ?? false,
        viewCount: 0,
      }))
    )
    .returning({ id: schema.tours.id, slug: schema.tours.slug });

  console.log(`   ✅ Добавлено ${insertedTours.length} туров`);

  // ─── 4. Связи тур ↔ место ────────────────────────────────────────────────────
  // Определяем, какие места относятся к каким турам (по ключевым словам в highlights)
  const tourPlaceLinks: { tourId: number; placeId: number }[] = [];

  const tourSlugToPlaceSlugs: Record<string, string[]> = {
    "issyk-kul-classic": ["issyk-kul"],
    "silk-road": ["tash-rabat", "son-kul", "bishkek"],
    "mountain-trekking": ["ala-archa"],
    "son-kul-nomad": ["son-kul"],
    "bishkek-karakol": ["bishkek", "karakol"],
    "kyrgyzstan-grand": ["issyk-kul", "karakol", "son-kul", "tash-rabat", "ala-archa"],
    "family-summer": ["issyk-kul"],
    "ala-archa-day": ["ala-archa"],
    "osh-sulaiman-sacred": ["sulaiman-too", "osh-city"],
    "arslanbob-walnut-forest": ["arslanbob"],
    "arslanbob-cascades-trek": ["arslanbob"],
    "jeti-oguz-seven-bulls": ["jeti-oguz"],
    "skazka-fairy-tale-canyon": ["skazka-canyon"],
    "altyn-arashan-trek": ["altyn-arashan", "karakol"],
    "sary-chelek-biosphere": ["sary-chelek"],
    "chon-kemin-valley": ["chon-kemin"],
    "konorchek-canyon-hike": ["konorchek-canyon"],
    "chatyr-kul-highland": ["chatyr-kul"],
    "kyzart-waterfall-trek": ["kyzart"],
    "tian-shan-horse-riding": ["son-kul", "kyzart"],
    "yurt-camp-experience": ["son-kul"],
    "kyrgyzstan-photo-safari": ["jeti-oguz", "skazka-canyon", "son-kul"],
    "karakol-ski-winter": ["karakol"],
    "bishkek-weekend": ["bishkek", "ala-archa", "burana-tower"],
    "osh-food-tour": ["osh-city", "sulaiman-too"],
    "family-issyk-kul-beach": ["issyk-kul"],
    "grand-tour-12-days": [
      "bishkek", "ala-archa", "issyk-kul", "karakol", "jeti-oguz",
      "son-kul", "tash-rabat", "osh-city", "sulaiman-too",
    ],
    "budget-backpacker": ["bishkek", "ala-archa", "son-kul", "karakol"],
    "hot-springs-relax": ["altyn-arashan"],
    "eagle-hunting-demo": ["issyk-kul", "kyzart"],
    "lake-hopping-tour": ["issyk-kul", "sary-chelek", "kol-tor-lake", "chatyr-kul"],
    "nomad-lifestyle-week": ["son-kul", "kyzart"],
  };

  const tourIdBySlug = Object.fromEntries(
    insertedTours.map((t) => [t.slug, t.id])
  );

  for (const [tourSlug, placeSlugs] of Object.entries(tourSlugToPlaceSlugs)) {
    const tourId = tourIdBySlug[tourSlug];
    if (!tourId) continue;
    for (const placeSlug of placeSlugs) {
      const placeId = placeIdBySlug[placeSlug];
      if (placeId) tourPlaceLinks.push({ tourId, placeId });
    }
  }

  if (tourPlaceLinks.length > 0) {
    await db.insert(schema.tourPlaces).values(tourPlaceLinks);
    console.log(`   ✅ Создано ${tourPlaceLinks.length} связей тур↔место`);
  }

  // ─── 5. Отзывы ───────────────────────────────────────────────────────────────
  console.log("💬 Добавляем отзывы...");

  const reviewsToInsert = mockReviews
    .filter((r) => placeIdBySlug[r.placeId] !== undefined)
    .map((r) => ({
      placeId: placeIdBySlug[r.placeId],
      author: r.authorName,
      country: r.authorCountry,
      rating: r.rating,
      text: r.text,
      language: detectLanguage(r.text),
      isFeatured: r.rating === 5 && r.helpful >= 25,
      isApproved: true,
      visitedAt: new Date(r.date),
    }));

  const insertedReviews = await db
    .insert(schema.reviews)
    .values(reviewsToInsert)
    .returning({ id: schema.reviews.id });

  console.log(`   ✅ Добавлено ${insertedReviews.length} отзывов`);

  // ─── Итог ────────────────────────────────────────────────────────────────────
  console.log("\n✨ Seed завершён успешно!");
  console.log(`   Мест: ${insertedPlaces.length}`);
  console.log(`   Туров: ${insertedTours.length}`);
  console.log(`   Отзывов: ${insertedReviews.length}`);
  console.log(`   Связей тур↔место: ${tourPlaceLinks.length}`);

  process.exit(0);
}

function detectLanguage(text: string): string {
  // Определение языка по символам
  if (/[а-яёА-ЯЁ]/.test(text)) return "ru";
  if (/[àâäéèêëîïôùûüÀÂÄÉÈÊËÎÏÔÙÛÜ]/.test(text)) return "fr";
  return "en";
}

main().catch((err) => {
  console.error("❌ Ошибка seed:", err);
  process.exit(1);
});
