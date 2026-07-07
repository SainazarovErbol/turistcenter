/**
 * Скрипт перевода контента из БД (БЕСПЛАТНО).
 * Берёт places/tours с пустыми переводами → переводит через MyMemory → обновляет БД.
 *
 * Запуск: npm run translate:db
 * Требует: DATABASE_URL в .env.local
 * API-ключ НЕ нужен.
 *
 * Альтернатива: заполняй переводы вручную через /admin/places/new
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, isNull, or } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

const DATABASE_URL = process.env.DATABASE_URL;

async function translate(text: string, toLang: "en" | "ru" | "ky"): Promise<string> {
  if (!text?.trim()) return "";

  const from = toLang === "ru" ? "en" : "ru";
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${toLang}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory error ${res.status}`);
  const data = (await res.json()) as { responseData: { translatedText: string } };

  await new Promise((r) => setTimeout(r, 600)); // rate limit
  return data.responseData.translatedText;
}

async function main() {
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL не найден в .env.local");
    process.exit(1);
  }

  console.log("🆓 Режим: MyMemory (бесплатно, без API-ключа)\n");

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql, { schema });

  // ─── Места ──────────────────────────────────────────────────────────────────
  console.log("📍 Переводим места...");

  const placesToTranslate = await db
    .select()
    .from(schema.places)
    .where(or(isNull(schema.places.descriptionRu), isNull(schema.places.nameKy)));

  console.log(`  Найдено ${placesToTranslate.length} мест\n`);

  for (const place of placesToTranslate) {
    console.log(`  → ${place.nameRu}`);
    const updates: Record<string, string> = {};

    if (!place.descriptionRu && place.description) {
      process.stdout.write("    description RU ... ");
      updates.descriptionRu = await translate(place.description, "ru");
      console.log("✓");
    }
    if (!place.descriptionKy && place.description) {
      process.stdout.write("    description KY ... ");
      updates.descriptionKy = await translate(place.description, "ky");
      console.log("✓");
    }
    if (!place.nameKy && place.nameRu) {
      process.stdout.write("    nameKy ... ");
      updates.nameKy = await translate(place.nameRu, "ky");
      console.log("✓");
    }
    if (!place.longDescriptionRu && place.longDescription) {
      process.stdout.write("    longDescription RU ... ");
      updates.longDescriptionRu = await translate(place.longDescription, "ru");
      console.log("✓");
    }
    if (!place.longDescriptionKy && place.longDescription) {
      process.stdout.write("    longDescription KY ... ");
      updates.longDescriptionKy = await translate(place.longDescription, "ky");
      console.log("✓");
    }

    if (Object.keys(updates).length > 0) {
      await db
        .update(schema.places)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.places.id, place.id));
    }
  }

  // ─── Туры ───────────────────────────────────────────────────────────────────
  console.log("\n🗺️  Переводим туры...");

  const toursToTranslate = await db
    .select()
    .from(schema.tours)
    .where(isNull(schema.tours.titleEn));

  console.log(`  Найдено ${toursToTranslate.length} туров\n`);

  for (const tour of toursToTranslate) {
    process.stdout.write(`  → ${tour.title} ... `);
    const titleEn = await translate(tour.title, "en");
    const titleKy = await translate(tour.title, "ky");

    await db
      .update(schema.tours)
      .set({ titleEn, titleKy, updatedAt: new Date() })
      .where(eq(schema.tours.id, tour.id));

    console.log("✓");
  }

  console.log("\n🎉 Готово!");
}

main().catch((e) => {
  console.error("❌ Ошибка:", e.message);
  process.exit(1);
});
