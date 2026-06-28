import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Mountain,
  ChevronRight,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { attractions, tours, categoryLabels, categoryColors } from "@/data/attractions";
import ReviewsList from "@/components/ReviewsList";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return attractions.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const place = attractions.find((a) => a.id === id);
  if (!place) return { title: "Место не найдено" };
  return {
    title: `${place.nameRu} — TuristCenter.kg`,
    description: place.description,
    openGraph: {
      title: place.nameRu,
      description: place.description,
      images: [place.image],
    },
  };
}

const difficultyLabels = { easy: "Лёгкий", medium: "Средний", hard: "Сложный" };
const difficultyColors = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

export default async function PlaceDetailPage({ params }: Props) {
  const { id } = await params;
  const place = attractions.find((a) => a.id === id);
  if (!place) notFound();

  const relatedTours = tours
    .filter((t) =>
      t.highlights.some((h) =>
        h.toLowerCase().includes(place.nameRu.split(" ")[0].toLowerCase())
      ) || place.id === "issyk-kul"
        ? ["issyk-kul-classic", "kyrgyzstan-grand", "family-summer"].includes(t.id)
        : ["kyrgyzstan-grand", "silk-road"].includes(t.id)
    )
    .slice(0, 3);

  const mapsUrl = `https://www.google.com/maps?q=${place.coordinates[1]},${place.coordinates[0]}`;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[360px] bg-muted overflow-hidden">
        <Image
          src={place.image}
          alt={place.nameRu}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8">
          <Link
            href="/places"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все места
          </Link>
        </div>

        {/* Place title on hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-16 pb-8">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-white/70 text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/places" className="hover:text-white transition-colors">Места</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{place.nameRu}</span>
            </nav>

            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[place.category]}`}>
                    {categoryLabels[place.category]}
                  </span>
                  {place.difficulty && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[place.difficulty]}`}>
                      {difficultyLabels[place.difficulty]}
                    </span>
                  )}
                </div>
                <h1
                  className="text-3xl sm:text-5xl font-bold text-white drop-shadow-sm"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {place.nameRu}
                </h1>
              </div>

              {/* Rating pill */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-lg leading-none">{place.rating}</p>
                  <p className="text-white/70 text-xs">{place.reviewCount.toLocaleString("ru-RU")} отзывов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: description + gallery */}
          <div className="lg:col-span-2 space-y-10">

            {/* Quick meta */}
            <div className="flex flex-wrap gap-6 pb-8 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{place.region}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{place.bestSeason}</span>
              </div>
              {place.difficulty && (
                <div className="flex items-center gap-2 text-sm">
                  <Mountain className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Сложность: {difficultyLabels[place.difficulty]}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Об этом месте</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {place.longDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {place.gallery.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Фотографии</h2>
                <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                  {place.gallery.map((img, i) => (
                    <div key={i} className={`relative bg-muted overflow-hidden ${i === 0 ? "col-span-2 row-span-2 h-64" : "h-[7.75rem]"}`}>
                      <Image
                        src={img}
                        alt={`${place.nameRu} ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related tours */}
            {relatedTours.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Туры к этому месту</h2>
                  <Link href="/tours" className="text-sm text-primary hover:underline">Все туры</Link>
                </div>
                <div className="space-y-3">
                  {relatedTours.map((tour) => (
                    <div key={tour.id} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                      <div className="relative h-16 w-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image src={tour.image} alt={tour.title} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm leading-snug">{tour.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tour.duration} · {tour.operator}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-bold text-foreground text-sm">${tour.price}</p>
                        <p className="text-xs text-muted-foreground">/ чел.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Reviews */}
            <ReviewsList
              placeId={place.id}
              placeName={place.nameRu}
              overallRating={place.rating}
              reviewCount={place.reviewCount}
            />
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">

            {/* Facts card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Факты о месте</h3>
              <dl className="space-y-3">
                {place.facts.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium text-foreground text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map CTA */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-1">Расположение</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {place.coordinates[1].toFixed(4)}° с.ш., {place.coordinates[0].toFixed(4)}° в.д.
              </p>
              {/* Map preview placeholder */}
              <div className="relative h-36 rounded-lg overflow-hidden bg-muted mb-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{place.nameRu}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-100/30" />
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1.5" nativeButton={false} render={<a href={mapsUrl} target="_blank" rel="noopener noreferrer" />}>
                <Map className="h-4 w-4" />
                Открыть на карте
              </Button>
            </div>

            {/* CTA — plan trip */}
            <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 text-center">
              <p className="font-semibold text-foreground mb-1">Хотите сюда попасть?</p>
              <p className="text-xs text-muted-foreground mb-4">Подберём тур или маршрут под ваш бюджет</p>
              <Button className="w-full" nativeButton={false} render={<Link href="/tours" />}>
                Найти тур
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
