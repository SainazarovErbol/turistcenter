import { attractions, type Attraction, type Tour } from "@/data/attractions";
import { placeTranslations, type LocalizedPlaceFields } from "@/data/localized/places";
import { tourTranslations, type LocalizedTourFields } from "@/data/localized/tours";

export type AppLocale = "ru" | "en" | "ky";

function getRuPlace(place: Attraction): LocalizedPlaceFields {
  return {
    name: place.nameRu,
    region: place.region,
    description: place.descriptionRu ?? place.description,
    longDescription: place.longDescriptionRu ?? place.longDescription,
    bestSeason: place.bestSeason,
    facts: place.facts,
  };
}

function getEnPlace(place: Attraction): LocalizedPlaceFields {
  const staticLocalized = placeTranslations[place.id]?.en;
  if (staticLocalized) return staticLocalized;
  return {
    name: place.name,
    region: place.region,
    description: place.description,
    longDescription: place.longDescription,
    bestSeason: place.bestSeason,
    facts: place.facts,
  };
}

function getKyPlace(place: Attraction): LocalizedPlaceFields {
  const staticLocalized = placeTranslations[place.id]?.ky;
  if (staticLocalized) return staticLocalized;
  return {
    name: place.nameKy ?? place.nameRu,
    region: place.region,
    description: place.descriptionKy ?? place.descriptionRu ?? place.description,
    longDescription: place.longDescriptionKy ?? place.longDescriptionRu ?? place.longDescription,
    bestSeason: place.bestSeason,
    facts: place.facts,
  };
}

function getRuTour(tour: Tour): LocalizedTourFields {
  return {
    title: tour.title,
    duration: tour.duration,
    highlights: tour.highlights,
  };
}

function getEnTour(tour: Tour): LocalizedTourFields {
  const staticLocalized = tourTranslations[tour.id]?.en;
  if (staticLocalized) return staticLocalized;
  return {
    title: tour.titleEn ?? tour.title,
    duration: tour.duration,
    highlights: tour.highlights,
  };
}

function getKyTour(tour: Tour): LocalizedTourFields {
  const staticLocalized = tourTranslations[tour.id]?.ky;
  if (staticLocalized) return staticLocalized;
  return {
    title: tour.titleKy ?? tour.title,
    duration: tour.duration,
    highlights: tour.highlights,
  };
}

export function getLocalizedPlace(place: Attraction, locale: AppLocale): LocalizedPlaceFields {
  if (locale === "ru") return getRuPlace(place);
  if (locale === "en") return getEnPlace(place);
  return getKyPlace(place);
}

export function getLocalizedTour(tour: Tour, locale: AppLocale): LocalizedTourFields {
  if (locale === "ru") return getRuTour(tour);
  if (locale === "en") return getEnTour(tour);
  return getKyTour(tour);
}

export function getPlaceSearchText(place: Attraction, locale: AppLocale): string {
  const p = getLocalizedPlace(place, locale);
  return [p.name, p.region, p.description, place.name, place.nameRu].join(" ").toLowerCase();
}

export function getTourSearchText(tour: Tour, locale: AppLocale): string {
  const t = getLocalizedTour(tour, locale);
  return [t.title, tour.operator, ...t.highlights, tour.title].join(" ").toLowerCase();
}

const countryNames: Record<string, Record<AppLocale, string>> = {
  Россия: { ru: "Россия", en: "Russia", ky: "Россия" },
  Италия: { ru: "Италия", en: "Italy", ky: "Италия" },
  Казахстан: { ru: "Казахстан", en: "Kazakhstan", ky: "Казакстан" },
  Германия: { ru: "Германия", en: "Germany", ky: "Германия" },
  Кыргызстан: { ru: "Кыргызстан", en: "Kyrgyzstan", ky: "Кыргызстан" },
  "Великобритания": { ru: "Великобритания", en: "United Kingdom", ky: "Улуу Британия" },
  Франция: { ru: "Франция", en: "France", ky: "Франция" },
  Украина: { ru: "Украина", en: "Ukraine", ky: "Украина" },
  Япония: { ru: "Япония", en: "Japan", ky: "Япония" },
  США: { ru: "США", en: "USA", ky: "АКШ" },
  Беларусь: { ru: "Беларусь", en: "Belarus", ky: "Беларусь" },
};

export function getLocalizedCountry(country: string, locale: AppLocale): string {
  return countryNames[country]?.[locale] ?? country;
}

export function localeToDateLocale(locale: AppLocale): string {
  return locale === "ru" ? "ru-RU" : locale === "ky" ? "ky-KG" : "en-US";
}
