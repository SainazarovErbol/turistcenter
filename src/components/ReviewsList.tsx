"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, PenLine, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCard, { StarRating } from "@/components/ReviewCard";
import type { Review } from "@/data/reviews";

interface ReviewsListProps {
  placeId: string;
  placeName: string;
  overallRating: number;
  reviewCount: number;
  initialReviews?: Review[];
}

const INITIAL_SHOW = 4;

function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
  return dist;
}

export default function ReviewsList({
  placeId,
  placeName,
  overallRating,
  reviewCount,
  initialReviews = [],
}: ReviewsListProps) {
  const t = useTranslations("placePage");
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);

  const distribution = useMemo(() => getRatingDistribution(allReviews), [allReviews]);

  const filtered = filterRating
    ? allReviews.filter((r) => r.rating === filterRating)
    : allReviews;

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "ky" ? "ky-KG" : "en-US";

  function handleNewReview(review: Review) {
    setAllReviews((prev) => [review, ...prev]);
  }

  return (
    <section id="reviews" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {t("reviewsTitle")}{" "}
          <span className="text-muted-foreground font-normal text-base">
            ({reviewCount.toLocaleString(dateLocale)})
          </span>
        </h2>
        <Button size="sm" className="gap-1.5">
          <PenLine className="h-3.5 w-3.5" />
          {t("writeReview")}
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="text-center shrink-0">
            <p className="text-5xl font-bold text-foreground">{overallRating}</p>
            <StarRating rating={Math.round(overallRating)} />
            <p className="text-xs text-muted-foreground mt-1">
              {t("basedOnReviews", { count: allReviews.length })}
            </p>
          </div>

          <div className="flex-1 w-full space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star] || 0;
              const pct = allReviews.length ? Math.round((count / allReviews.length) * 100) : 0;
              return (
                <button
                  key={star}
                  onClick={() => setFilterRating(filterRating === star ? null : star)}
                  className={`flex items-center gap-2 w-full group rounded-md px-1 py-0.5 transition-colors ${
                    filterRating === star ? "bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-xs text-muted-foreground w-4 text-right">{star}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
                </button>
              );
            })}
          </div>
        </div>

        {filterRating && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("filterLabel")}</span>
            <button
              onClick={() => setFilterRating(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              {filterRating} <Star className="h-3 w-3 fill-primary" /> · {t("resetFilter")}
            </button>
          </div>
        )}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground text-sm">
          {t("noReviewsWithRating", { rating: filterRating ?? 0 })}
        </div>
      )}

      {!showAll && filtered.length > INITIAL_SHOW && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ChevronDown className="h-4 w-4" />
            {t("showMoreCount", { count: filtered.length - INITIAL_SHOW })}
          </button>
        </div>
      )}

      <WriteReviewForm placeId={placeId} placeName={placeName} onSubmitted={handleNewReview} />
    </section>
  );
}

interface WriteReviewFormProps {
  placeId: string;
  placeName: string;
  onSubmitted: (review: Review) => void;
}

function WriteReviewForm({ placeId, placeName, onSubmitted }: WriteReviewFormProps) {
  const t = useTranslations("placePage");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const ratingLabels = ["", t("r1"), t("r2"), t("r3"), t("r4"), t("r5")];

  async function handleSubmit() {
    if (rating === 0 || text.trim().length < 10 || !author.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId, author: author.trim(), rating, text: text.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Ошибка при отправке");
        return;
      }
      // Показываем оптимистично в UI (pending approval)
      onSubmitted({
        id: `temp-${Date.now()}`,
        placeId,
        authorName: author.trim(),
        authorCountry: "",
        rating,
        text: text.trim(),
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
      });
      setSubmitted(true);
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-green-700 font-medium mb-1">{t("thankYou")}</p>
        <p className="text-sm text-green-600">{t("afterModeration")}</p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">{t("shareText")}</p>
        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setOpen(true)}>
          <PenLine className="h-3.5 w-3.5" />
          {t("openFormText")} «{placeName}»
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold text-foreground">{t("formTitle")} «{placeName}»</h3>

      <div>
        <p className="text-sm text-muted-foreground mb-2">{t("ratingLabel")}</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i)}
              className="p-0.5"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  i <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">{ratingLabels[rating]}</span>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Ваше имя</p>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Имя или псевдоним"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">{t("textLabel")}</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={t("textPlaceholder")}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={rating === 0 || text.length < 10 || !author.trim() || loading}
          onClick={handleSubmit}
        >
          {loading ? "Отправка..." : t("submit")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
