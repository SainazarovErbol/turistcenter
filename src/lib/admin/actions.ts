"use server";

import { db } from "@/lib/db";
import { reviews, places, tours } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Auth ─────────────────────────────────────────────────────────────────────

const SESSION_VALUE = "admin-ok";

export async function loginAction(formData: FormData) {
  const password = (formData.get("password") as string ?? "").trim();
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();

  if (expected && password === expected) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: "/",
    });
    redirect("/admin/reviews");
  }
  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function approveReview(id: number) {
  await db.update(reviews).set({ isApproved: true }).where(eq(reviews.id, id));
  revalidatePath("/admin/reviews");
}

export async function rejectReview(id: number) {
  await db.update(reviews).set({ isApproved: false }).where(eq(reviews.id, id));
  revalidatePath("/admin/reviews");
}

export async function deleteReview(id: number) {
  await db.delete(reviews).where(eq(reviews.id, id));
  revalidatePath("/admin/reviews");
}

// ─── Places ───────────────────────────────────────────────────────────────────

export async function togglePlacePublished(id: number, isPublished: boolean) {
  await db.update(places).set({ isPublished, updatedAt: new Date() }).where(eq(places.id, id));
  revalidatePath("/admin/places");
}

export async function deletePlace(id: number) {
  await db.delete(places).where(eq(places.id, id));
  revalidatePath("/admin/places");
}

export async function addPlace(formData: FormData) {
  const slug = (formData.get("slug") as string).trim().toLowerCase().replace(/\s+/g, "-");

  const getString = (key: string) => (formData.get(key) as string ?? "").trim();

  await db.insert(places).values({
    slug,
    name: getString("name") || getString("nameRu"),
    nameRu: getString("nameRu"),
    nameKy: getString("nameKy") || null,
    region: getString("region"),
    category: getString("category") as "nature" | "history" | "sport" | "culture" | "lake",
    description: getString("description") || getString("descriptionRu"),
    descriptionRu: getString("descriptionRu") || null,
    descriptionKy: getString("descriptionKy") || null,
    longDescription: getString("longDescription") || null,
    longDescriptionRu: getString("longDescriptionRu") || null,
    longDescriptionKy: getString("longDescriptionKy") || null,
    imageUrl: getString("imageUrl") || null,
    longitude: parseFloat(getString("longitude")),
    latitude: parseFloat(getString("latitude")),
    bestSeason: getString("bestSeason") || null,
    difficulty: (getString("difficulty") || null) as "easy" | "medium" | "hard" | null,
    rating: 0,
    reviewCount: 0,
    gallery: [],
    facts: [],
    isPublished: true,
  });
  revalidatePath("/admin/places");
  redirect("/admin/places");
}

// ─── Tours ────────────────────────────────────────────────────────────────────

export async function toggleTourPublished(id: number, isPublished: boolean) {
  await db.update(tours).set({ isPublished, updatedAt: new Date() }).where(eq(tours.id, id));
  revalidatePath("/admin/tours");
}

export async function deleteTour(id: number) {
  await db.delete(tours).where(eq(tours.id, id));
  revalidatePath("/admin/tours");
}

export async function addTour(formData: FormData) {
  const slug = (formData.get("slug") as string).trim().toLowerCase().replace(/\s+/g, "-");
  const highlightsRaw = (formData.get("highlights") as string).trim();
  const highlights = highlightsRaw.split("\n").map((h) => h.trim()).filter(Boolean);

  const getStr = (key: string) => (formData.get(key) as string ?? "").trim();

  await db.insert(tours).values({
    slug,
    title: getStr("title"),
    titleEn: getStr("titleEn") || null,
    titleKy: getStr("titleKy") || null,
    duration: getStr("duration"),
    durationDays: parseInt(getStr("durationDays"), 10),
    price: parseInt(getStr("price"), 10),
    currency: "USD",
    rating: 0,
    reviewCount: 0,
    imageUrl: getStr("imageUrl") || null,
    highlights,
    operator: getStr("operator") || null,
    category: getStr("category") as "adventure" | "cultural" | "relaxation" | "trekking" | "family",
    isSponsored: formData.get("isSponsored") === "on",
    isPublished: true,
  });
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}
