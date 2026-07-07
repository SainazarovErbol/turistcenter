/**
 * Хелперы для получения локализованного контента из БД.
 * Fallback цепочка: запрошенный язык → EN → RU → любое значение.
 */

type Locale = "ru" | "en" | "ky";

/** Получить локализованное название места */
export function placeName(
  place: { name: string; nameRu: string; nameKy?: string | null },
  locale: Locale
): string {
  if (locale === "ru") return place.nameRu || place.name;
  if (locale === "ky") return place.nameKy || place.name || place.nameRu;
  return place.name || place.nameRu;
}

/** Получить краткое описание места */
export function placeDescription(
  place: { description: string; descriptionRu?: string | null; descriptionKy?: string | null },
  locale: Locale
): string {
  if (locale === "ru") return place.descriptionRu || place.description;
  if (locale === "ky") return place.descriptionKy || place.description;
  return place.description;
}

/** Получить подробное описание места */
export function placeLongDescription(
  place: {
    longDescription?: string | null;
    longDescriptionRu?: string | null;
    longDescriptionKy?: string | null;
  },
  locale: Locale
): string {
  if (locale === "ru") return place.longDescriptionRu || place.longDescription || "";
  if (locale === "ky") return place.longDescriptionKy || place.longDescription || "";
  return place.longDescription || "";
}

/** Получить локализованное название тура */
export function tourTitle(
  tour: { title: string; titleEn?: string | null; titleKy?: string | null },
  locale: Locale
): string {
  if (locale === "en") return tour.titleEn || tour.title;
  if (locale === "ky") return tour.titleKy || tour.title;
  return tour.title;
}

/** Получить locale из параметров Next.js (с fallback на "ru") */
export function getLocale(params: { locale?: string } | undefined): Locale {
  const l = params?.locale;
  if (l === "en" || l === "ky" || l === "ru") return l;
  return "ru";
}
