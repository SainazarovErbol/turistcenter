import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { getFeaturedReviews } from "@/data/reviews";
import { attractions } from "@/data/attractions";

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-teal-100 text-teal-700",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

export default function ReviewsSection() {
  const featured = getFeaturedReviews(6);

  return (
    <section id="reviews" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2">Живые отзывы</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Что говорят путешественники
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Реальные отзывы туристов со всего мира, которые уже побывали в Кыргызстане
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {featured.map((review) => {
            const place = attractions.find((a) => a.id === review.placeId);
            return (
              <div
                key={review.id}
                className="break-inside-avoid rounded-xl border border-border bg-card p-5 space-y-3"
              >
                {/* Quote icon */}
                <Quote className="h-5 w-5 text-primary/30" />

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>

                {/* Place link */}
                {place && (
                  <Link
                    href={`/places/${place.id}`}
                    className="inline-block text-xs text-primary hover:underline"
                  >
                    📍 {place.nameRu}
                  </Link>
                )}

                {/* Author */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                  <AuthorAvatar name={review.authorName} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.authorName}</p>
                    <p className="text-xs text-muted-foreground">{review.authorCountry}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "4.8", label: "Средняя оценка" },
            { value: "9 700+", label: "Отзывов на сайте" },
            { value: "63", label: "Стран туристов" },
            { value: "98%", label: "Рекомендуют Кыргызстан" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-2xl font-bold text-primary mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
