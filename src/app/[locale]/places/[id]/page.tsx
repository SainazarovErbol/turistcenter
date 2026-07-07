import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, Mountain, ChevronRight, Map } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { categoryColors } from "@/data/attractions";
import ReviewsList from "@/components/ReviewsList";
import { getLocalizedPlace, getLocalizedTour, localeToDateLocale, type AppLocale } from "@/lib/content";
import { getPlaceBySlug, getToursByPlaceSlug, getReviewsByPlaceSlug, incrementPlaceViews } from "@/lib/db/queries";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const place = await getPlaceBySlug(id);
  const t = await getTranslations({ locale, namespace: "placePage" });
  if (!place) return { title: t("notFound") };
  const localized = getLocalizedPlace(place, locale as AppLocale);
  return {
    title: localized.name,
    description: localized.description,
    openGraph: { title: localized.name, description: localized.description, images: [place.image] },
  };
}

const difficultyColors = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

export default async function PlaceDetailPage({ params }: Props) {
  const { id, locale: localeParam } = await params;
  const locale = localeParam as AppLocale;

  const [place, relatedTours, reviews] = await Promise.all([
    getPlaceBySlug(id),
    getToursByPlaceSlug(id),
    getReviewsByPlaceSlug(id),
  ]);

  if (!place) notFound();

  await incrementPlaceViews(id);
  place.viewCount = (place.viewCount ?? 0) + 1;

  const t = await getTranslations("placePage");
  const tCat = await getTranslations("categories");
  const tTours = await getTranslations("tours");
  const localized = getLocalizedPlace(place, locale);

  const mapsUrl = `https://www.google.com/maps?q=${place.coordinates[1]},${place.coordinates[0]}`;

  const difficultyLabel = place.difficulty
    ? { easy: t("diffEasy"), medium: t("diffMedium"), hard: t("diffHard") }[place.difficulty]
    : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="relative h-[55vh] min-h-[360px] bg-muted overflow-hidden">
        <Image src={place.image} alt={localized.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute top-6 left-4 sm:left-8">
          <Link href="/places" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm hover:bg-black/60 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t("backToPlaces")}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-16 pb-8">
          <div className="mx-auto max-w-5xl">
            <nav className="flex items-center gap-1 text-white/70 text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">{t("home")}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/places" className="hover:text-white transition-colors">{t("places")}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{localized.name}</span>
            </nav>

            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[place.category]}`}>
                    {tCat(place.category)}
                  </span>
                  {place.difficulty && difficultyLabel && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[place.difficulty]}`}>
                      {difficultyLabel}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  {localized.name}
                </h1>
              </div>
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <div>
                  <p className="text-white font-bold text-lg leading-none">
                    {place.reviewCount > 0 ? place.rating : "—"}
                  </p>
                  <p className="text-white/70 text-xs">
                    {place.reviewCount > 0
                      ? `${place.reviewCount} ${t("reviews")}`
                      : t("noReviewsYet")}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-white font-bold text-lg leading-none">
                    {(place.viewCount ?? 0).toLocaleString(localeToDateLocale(locale))}
                  </p>
                  <p className="text-white/70 text-xs">{t("views")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-wrap gap-6 pb-8 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{localized.region}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{localized.bestSeason}</span>
              </div>
              {place.difficulty && difficultyLabel && (
                <div className="flex items-center gap-2 text-sm">
                  <Mountain className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{t("difficulty")}: {difficultyLabel}</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t("about")}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {localized.longDescription.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>

            {place.gallery.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t("photos")}</h2>
                <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                  {place.gallery.map((img, i) => (
                    <div key={i} className={`relative bg-muted overflow-hidden ${i === 0 ? "col-span-2 row-span-2 h-64" : "h-[7.75rem]"}`}>
                      <Image src={img} alt={`${localized.name} ${i + 1}`} fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {relatedTours.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">{t("toursTitle")}</h2>
                  <Link href="/tours" className="text-sm text-primary hover:underline">{t("allTours")}</Link>
                </div>
                <div className="space-y-3">
                  {relatedTours.map((tour) => {
                    const tourLocalized = getLocalizedTour(tour, locale);
                    return (
                      <div key={tour.id} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                        <div className="relative h-16 w-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image src={tour.image} alt={tourLocalized.title} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm leading-snug">{tourLocalized.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{tourLocalized.duration} · {tour.operator}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-bold text-foreground text-sm">${tour.price}</p>
                          <p className="text-xs text-muted-foreground">{tTours("perPerson")}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <ReviewsList
              placeId={place.id}
              placeName={localized.name}
              overallRating={reviews.length > 0
                ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
                : 0}
              reviewCount={reviews.length}
              initialReviews={reviews}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">{t("factsTitle")}</h3>
              <dl className="space-y-3">
                {localized.facts.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium text-foreground text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-1">{t("locationTitle")}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t("coordinates", {
                  lat: place.coordinates[1].toFixed(4),
                  lng: place.coordinates[0].toFixed(4),
                })}
              </p>
              <div className="relative h-36 rounded-lg overflow-hidden bg-muted mb-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{localized.name}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-100/30" />
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1.5" nativeButton={false} render={<a href={mapsUrl} target="_blank" rel="noopener noreferrer" />}>
                <Map className="h-4 w-4" />
                {t("openMap")}
              </Button>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 text-center">
              <p className="font-semibold text-foreground mb-1">{t("ctaTitle")}</p>
              <p className="text-xs text-muted-foreground mb-4">{t("ctaSubtitle")}</p>
              <Button className="w-full" nativeButton={false} render={<Link href="/tours" />}>
                {t("ctaButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
