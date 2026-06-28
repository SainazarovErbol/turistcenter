import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { attractions, categoryLabels, categoryColors, type Category } from "@/data/attractions";

export default function FeaturedPlaces() {
  return (
    <section id="places" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Куда поехать</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Популярные места
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Самые посещаемые и высокооценённые достопримечательности Кыргызстана
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 text-primary" nativeButton={false} render={<Link href="/places" />}>
            Все места <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["lake", "nature", "history", "sport", "culture"] as Category[]).map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${categoryColors[cat]}`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((place) => (
            <Link key={place.id} href={`/places/${place.id}`}>
            <article
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-0.5 h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={place.image}
                  alt={place.nameRu}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span
                  className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[place.category]}`}
                >
                  {categoryLabels[place.category]}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground leading-snug">{place.nameRu}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{place.region}</span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {place.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{place.bestSeason}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {place.reviewCount.toLocaleString()} отзывов
                  </span>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" nativeButton={false} render={<Link href="/places" />}>
            Все достопримечательности
          </Button>
        </div>
      </div>
    </section>
  );
}
