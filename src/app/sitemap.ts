import type { MetadataRoute } from "next";
import { attractions } from "@/data/attractions";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://turistcenter.kg";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/places", "/tours"];

  const staticPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.9,
    }))
  );

  const placesPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    attractions.map((place) => ({
      url: `${BASE_URL}/${locale}/places/${place.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...placesPages];
}
