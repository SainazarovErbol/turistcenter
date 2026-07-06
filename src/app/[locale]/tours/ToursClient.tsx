"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Search, Star, Clock, BadgeCheck, SlidersHorizontal, ArrowLeft, ChevronDown, Users, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { type Tour, type TourCategory } from "@/data/attractions";
import { getLocalizedTour, getTourSearchText, type AppLocale } from "@/lib/content";

type SortOption = "rating" | "price_asc" | "price_desc" | "reviews";
type PriceRange = "all" | "budget" | "mid" | "premium";

const categoryColors: Record<TourCategory, string> = {
  adventure: "bg-orange-100 text-orange-700",
  cultural: "bg-purple-100 text-purple-700",
  relaxation: "bg-blue-100 text-blue-700",
  trekking: "bg-green-100 text-green-700",
  family: "bg-pink-100 text-pink-700",
};

interface Props {
  tours: Tour[];
}

export default function ToursClient({ tours }: Props) {
  const t = useTranslations("toursPage");
  const tCat = useTranslations("tourCategories");
  const locale = useLocale() as AppLocale;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<TourCategory | "all">("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [duration, setDuration] = useState("all");
  const [sort, setSort] = useState<SortOption>("rating");
  const [sortOpen, setSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    rating: t("sortRating"),
    price_asc: t("sortPriceAsc"),
    price_desc: t("sortPriceDesc"),
    reviews: t("sortReviews"),
  };

  const priceRanges = [
    { key: "all" as PriceRange, label: t("anyBudget"), hint: "" },
    { key: "budget" as PriceRange, label: t("budgetLow"), hint: t("budgetHintLow") },
    { key: "mid" as PriceRange, label: t("budgetMid"), hint: t("budgetHintMid") },
    { key: "premium" as PriceRange, label: t("budgetHigh"), hint: t("budgetHintHigh") },
  ];

  const durationOptions = [
    { key: "all", label: t("anyDuration") },
    { key: "short", label: t("dur15") },
    { key: "medium", label: t("dur69") },
    { key: "long", label: t("dur10") },
  ];

  const categoryOptions: Array<{ key: TourCategory | "all"; label: string }> = [
    { key: "all", label: tCat("all") },
    { key: "adventure", label: tCat("adventure") },
    { key: "cultural", label: tCat("cultural") },
    { key: "relaxation", label: tCat("relaxation") },
    { key: "trekking", label: tCat("trekking") },
    { key: "family", label: tCat("family") },
  ];

  const filtered = useMemo(() => {
    let result = [...tours];
    if (activeCategory !== "all") result = result.filter((t) => t.category === activeCategory);
    if (priceRange !== "all") {
      result = result.filter((t) => {
        if (priceRange === "budget") return t.price < 200;
        if (priceRange === "mid") return t.price >= 200 && t.price <= 500;
        return t.price > 500;
      });
    }
    if (duration !== "all") {
      result = result.filter((t) => {
        if (duration === "short") return t.durationDays <= 5;
        if (duration === "medium") return t.durationDays >= 6 && t.durationDays <= 9;
        return t.durationDays >= 10;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((tour) => getTourSearchText(tour, locale).includes(q));
    }
    result.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviewCount - a.reviewCount;
      if (sort === "price_asc") return a.price - b.price;
      return b.price - a.price;
    });
    return result;
  }, [search, activeCategory, priceRange, duration, sort, locale, tours]);

  const minPrice = Math.min(...tours.map((tour) => tour.price));
  const maxPrice = Math.max(...tours.map((tour) => tour.price));
  const countLabel =
    filtered.length === 1 ? t("countOne") : filtered.length < 5 ? t("countFew") : t("countMany");

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
            <ArrowLeft className="h-4 w-4" />
            {t("backHome")}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {t("title")}
          </h1>
          <p className="text-muted-foreground">
            {tours.length} {t("subtitle")} — {t("priceRange", { min: minPrice, max: maxPrice })}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder={t("searchPlaceholder")} value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
          </div>
          <div className="relative">
            <button onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border border-input bg-background hover:bg-muted transition-colors min-w-[180px] justify-between">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                {sortLabels[sort]}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 rounded-lg border border-border bg-popover shadow-md z-10 overflow-hidden">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button key={key} onClick={() => { setSort(key); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted ${sort === key ? "text-primary font-medium bg-accent" : "text-foreground"}`}>
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-8 p-4 rounded-xl bg-muted/40 border border-border">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("typeLabel")}</p>
            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map(({ key, label }) => (
                <button key={key} onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${activeCategory === key ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("budgetLabel")}</p>
            <div className="flex flex-wrap gap-1.5">
              {priceRanges.map(({ key, label, hint }) => (
                <button key={key} onClick={() => setPriceRange(key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${priceRange === key ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`}>
                  {label}{hint && <span className="ml-1 opacity-70">{hint}</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("durationLabel")}</p>
            <div className="flex flex-wrap gap-1.5">
              {durationOptions.map(({ key, label }) => (
                <button key={key} onClick={() => setDuration(key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${duration === key ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length === 0 ? t("notFound") : `${t("found")}: ${filtered.length} ${countLabel}`}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => {
              const localized = getLocalizedTour(tour, locale);
              return (
              <article key={tour.id} className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
                <div className="relative h-52 overflow-hidden bg-muted shrink-0">
                  <Image src={tour.image} alt={localized.title} fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[tour.category]}`}>
                    {tCat(tour.category)}
                  </span>
                  {tour.isSponsored && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      {t("ad")}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-baseline gap-1 bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                      <span className="text-lg font-bold text-foreground">${tour.price}</span>
                      <span className="text-xs text-muted-foreground">{t("perPerson")}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h2 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{localized.title}</h2>
                    <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-700">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{localized.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BadgeCheck className="h-3 w-3 text-primary" />
                      <span>{tour.operator}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {localized.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{h}</span>
                    ))}
                    {localized.highlights.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">+{localized.highlights.length - 3}</span>
                    )}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{tour.reviewCount} {t("reviews")}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">{t("details")}</Button>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{t("notFound")}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">{t("tryAgain")}</p>
            <button onClick={() => { setSearch(""); setActiveCategory("all"); setPriceRange("all"); setDuration("all"); }}
              className="mt-4 text-sm text-primary hover:underline">{t("resetFilters")}</button>
          </div>
        )}

        <div className="mt-14 rounded-2xl bg-primary/5 border border-primary/15 p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{t("ctaTitle")}</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">{t("ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>{t("ctaButton")}</Button>
            <Button variant="outline">{t("ctaConditions")}</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
