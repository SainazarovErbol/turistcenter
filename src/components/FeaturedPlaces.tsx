import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { attractions, categoryColors, type Category } from "@/data/attractions";
import { getLocalizedPlace, type AppLocale } from "@/lib/content";

export default async function FeaturedPlaces() {
  const t = await getTranslations("featured");
  const tCat = await getTranslations("categories");
  const locale = (await getLocale()) as AppLocale;

  const categoryKeys: Category[] = ["lake", "nature", "history", "sport", "culture"];

  return (
    <section id="places" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary mb-2">{t("label")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md">{t("subtitle")}</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 text-primary" nativeButton={false} render={<Link href="/places" />}>
            {t("viewAll")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categoryKeys.map((cat) => (
            <button key={cat} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${categoryColors[cat]}`}>
              {tCat(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((place) => {
            const localized = getLocalizedPlace(place, locale);
            return (
              <Link key={place.id} href={`/places/${place.id}`}>
                <article className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-0.5 h-full">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image src={place.image} alt={localized.name} fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[place.category]}`}>
                      {tCat(place.category)}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground leading-snug">{localized.name}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{place.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{localized.region}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{localized.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{localized.bestSeason}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {place.reviewCount.toLocaleString()} {t("reviews")}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" nativeButton={false} render={<Link href="/places" />}>
            {t("viewAllMobile")}
          </Button>
        </div>
      </div>
    </section>
  );
}
