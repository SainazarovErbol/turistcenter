import { db } from "@/lib/db";
import { places } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { togglePlacePublished, deletePlace } from "@/lib/admin/actions";
import Link from "next/link";
import Image from "next/image";
import { Plus, Eye, EyeOff, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  nature: "Природа",
  history: "История",
  sport: "Активный отдых",
  culture: "Культура",
  lake: "Озёра",
};

export default async function AdminPlacesPage() {
  const allPlaces = await db.select().from(places).orderBy(desc(places.createdAt));
  const published = allPlaces.filter((p) => p.isPublished).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Места</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Всего: {allPlaces.length} · Опубликовано: <span className="text-green-600 font-semibold">{published}</span>
          </p>
        </div>
        <Link
          href="/admin/places/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить место
        </Link>
      </div>

      <div className="space-y-3">
        {allPlaces.map((place) => (
          <div key={place.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
              {place.imageUrl && (
                <Image src={place.imageUrl} alt={place.nameRu} fill className="object-cover" sizes="64px" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm text-foreground">{place.nameRu}</span>
                <span className="text-xs text-muted-foreground">/ {place.name}</span>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                  place.isPublished ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"
                }`}>
                  {place.isPublished ? "Опубликовано" : "Скрыто"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-0.5 rounded-md">{categoryLabels[place.category] ?? place.category}</span>
                <span>{place.region}</span>
                <span>★ {place.rating} ({place.reviewCount} отзывов)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <form action={togglePlacePublished.bind(null, place.id, !place.isPublished)}>
                <button
                  type="submit"
                  title={place.isPublished ? "Скрыть" : "Опубликовать"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    place.isPublished
                      ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                      : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                  }`}
                >
                  {place.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {place.isPublished ? "Скрыть" : "Показать"}
                </button>
              </form>
              <form action={deletePlace.bind(null, place.id)}>
                <button
                  type="submit"
                  title="Удалить"
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
