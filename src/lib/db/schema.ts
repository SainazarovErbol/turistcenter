import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  jsonb,
  timestamp,
  pgEnum,
  serial,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const categoryEnum = pgEnum("category", [
  "nature",
  "history",
  "sport",
  "culture",
  "lake",
]);

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const tourCategoryEnum = pgEnum("tour_category", [
  "adventure",
  "cultural",
  "relaxation",
  "trekking",
  "family",
]);

// ─── Places (Attractions) ─────────────────────────────────────────────────────

export const places = pgTable(
  "places",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    nameRu: varchar("name_ru", { length: 200 }).notNull(),
    nameKy: varchar("name_ky", { length: 200 }),
    region: varchar("region", { length: 200 }).notNull(),
    category: categoryEnum("category").notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description"),
    rating: real("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    imageUrl: text("image_url"),
    gallery: jsonb("gallery").$type<string[]>().default([]),
    // Координаты хранятся как обычные числа (PostGIS добавим позже через миграцию)
    longitude: real("longitude").notNull(),
    latitude: real("latitude").notNull(),
    bestSeason: varchar("best_season", { length: 100 }),
    difficulty: difficultyEnum("difficulty"),
    facts: jsonb("facts").$type<{ label: string; value: string }[]>().default([]),
    isPublished: boolean("is_published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("places_category_idx").on(t.category),
    index("places_slug_idx").on(t.slug),
  ]
);

// ─── Tours ────────────────────────────────────────────────────────────────────

export const tours = pgTable(
  "tours",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: varchar("title", { length: 300 }).notNull(),
    duration: varchar("duration", { length: 50 }).notNull(),
    durationDays: integer("duration_days").notNull(),
    price: integer("price").notNull(),
    currency: varchar("currency", { length: 10 }).notNull().default("USD"),
    rating: real("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    imageUrl: text("image_url"),
    highlights: jsonb("highlights").$type<string[]>().default([]),
    operator: varchar("operator", { length: 200 }),
    category: tourCategoryEnum("category").notNull(),
    isSponsored: boolean("is_sponsored").notNull().default(false),
    isPublished: boolean("is_published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("tours_category_idx").on(t.category),
    index("tours_price_idx").on(t.price),
    index("tours_duration_idx").on(t.durationDays),
  ]
);

// ─── Tour ↔ Place junction ────────────────────────────────────────────────────

export const tourPlaces = pgTable("tour_places", {
  tourId: integer("tour_id")
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  placeId: integer("place_id")
    .notNull()
    .references(() => places.id, { onDelete: "cascade" }),
});

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    placeId: integer("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    author: varchar("author", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }),
    rating: integer("rating").notNull(),
    text: text("text").notNull(),
    language: varchar("language", { length: 5 }).notNull().default("ru"),
    isFeatured: boolean("is_featured").notNull().default(false),
    isApproved: boolean("is_approved").notNull().default(false),
    visitedAt: timestamp("visited_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("reviews_place_idx").on(t.placeId),
    index("reviews_featured_idx").on(t.isFeatured),
  ]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const placesRelations = relations(places, ({ many }) => ({
  reviews: many(reviews),
  tourPlaces: many(tourPlaces),
}));

export const toursRelations = relations(tours, ({ many }) => ({
  tourPlaces: many(tourPlaces),
}));

export const tourPlacesRelations = relations(tourPlaces, ({ one }) => ({
  tour: one(tours, { fields: [tourPlaces.tourId], references: [tours.id] }),
  place: one(places, { fields: [tourPlaces.placeId], references: [places.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  place: one(places, { fields: [reviews.placeId], references: [places.id] }),
}));

// ─── Types ────────────────────────────────────────────────────────────────────

export type Place = typeof places.$inferSelect;
export type NewPlace = typeof places.$inferInsert;
export type Tour = typeof tours.$inferSelect;
export type NewTour = typeof tours.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
