import Link from "next/link";
import Image from "next/image";
import { Star, Clock, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/attractions";

export default function ToursSection() {
  return (
    <section id="tours" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Готовые маршруты</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Актуальные туры
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Проверенные туроператоры, реальные цены, живые отзывы
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 text-primary" nativeButton={false} render={<Link href="/tours" />}>
            Все туры <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Tours grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-muted">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {tour.isSponsored && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    Реклама
                  </span>
                )}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                    <span className="text-lg font-bold text-foreground">${tour.price}</span>
                    <span className="text-xs text-muted-foreground">/ чел.</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground leading-snug">{tour.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BadgeCheck className="h-3 w-3" />
                    <span>{tour.operator}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tour.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                      {h}
                    </span>
                  ))}
                  {tour.highlights.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                      +{tour.highlights.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {tour.reviewCount} отзывов
                  </span>
                  <Button size="sm" variant="outline">
                    Подробнее
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Operator CTA */}
        <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/15 p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Вы туроператор?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Разместите ваши туры на TuristCenter.kg и получите доступ к тысячам туристов.
            Первые 3 месяца — бесплатно.
          </p>
          <Button>Разместить туры</Button>
        </div>
      </div>
    </section>
  );
}
