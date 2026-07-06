"use client";

import { Star, ThumbsUp } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { Review } from "@/data/reviews";
import { getLocalizedCountry, localeToDateLocale, type AppLocale } from "@/lib/content";

interface ReviewCardProps {
  review: Review;
  showPlace?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

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
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations("placePage");
  const locale = useLocale() as AppLocale;

  const formattedDate = new Date(review.date).toLocaleDateString(localeToDateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <AuthorAvatar name={review.authorName} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-foreground text-sm">{review.authorName}</p>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {getLocalizedCountry(review.authorCountry, locale)} · {formattedDate}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
        {review.text}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border">
        <ThumbsUp className="h-3.5 w-3.5" />
        <span>{review.helpful} {t("helpful")}</span>
      </div>
    </div>
  );
}

export { StarRating, AuthorAvatar };
