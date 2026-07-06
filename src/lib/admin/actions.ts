"use server";

import { db } from "@/lib/db";
import { reviews, places, tours } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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

  await db.insert(places).values({
    slug,
    name: (formData.get("name") as string).trim(),
    nameRu: (formData.get("nameRu") as string).trim(),
    region: (formData.get("region") as string).trim(),
    category: formData.get("category") as "nature" | "history" | "sport" | "culture" | "lake",
    description: (formData.get("description") as string).trim(),
    longDescription: (formData.get("longDescription") as string).trim(),
    imageUrl: (formData.get("imageUrl") as string).trim() || null,
    longitude: parseFloat(formData.get("longitude") as string),
    latitude: parseFloat(formData.get("latitude") as string),
    bestSeason: (formData.get("bestSeason") as string).trim() || null,
    difficulty: (formData.get("difficulty") as string) as "easy" | "medium" | "hard" | null || null,
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

  await db.insert(tours).values({
    slug,
    title: (formData.get("title") as string).trim(),
    duration: (formData.get("duration") as string).trim(),
    durationDays: parseInt(formData.get("durationDays") as string, 10),
    price: parseInt(formData.get("price") as string, 10),
    currency: "USD",
    rating: 0,
    reviewCount: 0,
    imageUrl: (formData.get("imageUrl") as string).trim() || null,
    highlights,
    operator: (formData.get("operator") as string).trim() || null,
    category: formData.get("category") as "adventure" | "cultural" | "relaxation" | "trekking" | "family",
    isSponsored: formData.get("isSponsored") === "on",
    isPublished: true,
  });
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}
