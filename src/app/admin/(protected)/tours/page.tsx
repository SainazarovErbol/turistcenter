import { db } from "@/lib/db";
import { tours } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { toggleTourPublished, deleteTour } from "@/lib/admin/actions";
import Link from "next/link";
import Image from "next/image";
import { Plus, Eye, EyeOff, Trash2, BadgeCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  adventure: "Приключения",
  cultural: "Культурный",
  relaxation: "Отдых",
  trekking: "Треккинг",
  family: "Семейный",
};

export default async function AdminToursPage() {
  const allTours = await db.select().from(tours).orderBy(desc(tours.createdAt));
  const published = allTours.filter((t) => t.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Туры</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Всего: {allTours.length} · Опубликовано: <span className="text-green-600 font-semibold">{published}</span>
          </p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить тур
        </Link>
      </div>

      <div className="space-y-3">
        {allTours.map((tour) => (
          <div key={tour.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
              {tour.imageUrl && (
                <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" sizes="64px" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-medium text-sm text-foreground">{tour.title}</span>
                {tour.isSponsored && (
                  <span className="px-1.5 py-0.5 rounded text-xs bg-amber-50 text-amber-700 border border-amber-200">Реклама</span>
                )}
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                  tour.isPublished ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"
                }`}>
                  {tour.isPublished ? "Опубликовано" : "Скрыто"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="bg-muted px-2 py-0.5 rounded-md">{categoryLabels[tour.category] ?? tour.category}</span>
                <span>{tour.duration}</span>
                <span className="font-medium text-foreground">${tour.price}</span>
                {tour.operator && (
                  <span className="flex items-center gap-1">
                    <BadgeCheck className="h-3 w-3 text-primary" />
                    {tour.operator}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <form action={toggleTourPublished.bind(null, tour.id, !tour.isPublished)}>
                <button
                  type="submit"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    tour.isPublished
                      ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                      : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                  }`}
                >
                  {tour.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {tour.isPublished ? "Скрыть" : "Показать"}
                </button>
              </form>
              <form action={deleteTour.bind(null, tour.id)}>
                <button
                  type="submit"
                  className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
