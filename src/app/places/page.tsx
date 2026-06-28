"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, MapPin, Clock, SlidersHorizontal, ArrowLeft, ChevronDown } from "lucide-react";
import { attractions, categoryLabels, categoryColors, type Category } from "@/data/attractions";

type SortOption = "rating" | "reviews" | "name";

const sortLabels: Record<SortOption, string> = {
  rating: "По рейтингу",
  reviews: "По отзывам",
  name: "По алфавиту",
};

const difficultyLabels = {
  easy: "Лёгкий",
  medium: "Средний",
  hard: "Сложный",
};

const difficultyColors = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

export default function PlacesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("rating");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...attractions];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nameRu.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviewCount - a.reviewCount;
      return a.nameRu.localeCompare(b.nameRu, "ru");
    });

    return result;
  }, [search, activeCategory, sort]);

  const categories: Array<{ key: Category | "all"; label: string }> = [
    { key: "all", label: "Все места" },
    { key: "lake", label: categoryLabels.lake },
    { key: "nature", label: categoryLabels.nature },
    { key: "history", label: categoryLabels.history },
    { key: "sport", label: categoryLabels.sport },
    { key: "culture", label: categoryLabels.culture },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>

          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Достопримечательности
          </h1>
          <p className="text-muted-foreground">
            {attractions.length} мест Кыргызстана — природа, история, культура
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию, региону..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border border-input bg-background hover:bg-muted transition-colors min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                {sortLabels[sort]}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-popover shadow-md z-10 overflow-hidden">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSort(key); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                      sort === key ? "text-primary font-medium bg-accent" : "text-foreground"
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeCategory === key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length === 0
            ? "Ничего не найдено"
            : `Найдено: ${filtered.length} ${filtered.length === 1 ? "место" : filtered.length < 5 ? "места" : "мест"}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((place) => (
              <Link key={place.id} href={`/places/${place.id}`}>
                <article className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                      src={place.image}
                      alt={place.nameRu}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Category badge */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[place.category]}`}>
                      {categoryLabels[place.category]}
                    </span>
                    {/* Difficulty badge */}
                    {place.difficulty && (
                      <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[place.difficulty]}`}>
                        {difficultyLabels[place.difficulty]}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h2 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {place.nameRu}
                      </h2>
                      <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-0.5 rounded-md">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-700">{place.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{place.region}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{place.bestSeason}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {place.reviewCount.toLocaleString("ru-RU")} отзывов
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Ничего не найдено</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Попробуйте изменить запрос или выбрать другую категорию
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
