import { db } from "@/lib/db";
import { reviews, places } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { approveReview, rejectReview, deleteReview } from "@/lib/admin/actions";
import { Star, Check, X, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const rows = await db
    .select({
      review: reviews,
      placeSlug: places.slug,
      placeName: places.nameRu,
    })
    .from(reviews)
    .innerJoin(places, eq(reviews.placeId, places.id))
    .orderBy(desc(reviews.createdAt));

  const pending = rows.filter((r) => !r.review.isApproved);
  const approved = rows.filter((r) => r.review.isApproved);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Отзывы</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ожидают модерации: <span className="font-semibold text-orange-600">{pending.length}</span>
          {" · "}
          Одобрено: <span className="font-semibold text-green-600">{approved.length}</span>
        </p>
      </div>

      {/* Ожидают одобрения */}
      {pending.length > 0 && (
        <section className="mb-10">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            Ожидают модерации ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map(({ review, placeSlug, placeName }) => (
              <ReviewRow
                key={review.id}
                review={review}
                placeSlug={placeSlug}
                placeName={placeName}
                status="pending"
              />
            ))}
          </div>
        </section>
      )}

      {/* Одобренные */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Одобренные ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет одобренных отзывов</p>
        ) : (
          <div className="space-y-3">
            {approved.map(({ review, placeSlug, placeName }) => (
              <ReviewRow
                key={review.id}
                review={review}
                placeSlug={placeSlug}
                placeName={placeName}
                status="approved"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ReviewRow({
  review,
  placeSlug,
  placeName,
  status,
}: {
  review: typeof reviews.$inferSelect;
  placeSlug: string;
  placeName: string;
  status: "pending" | "approved";
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 flex gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-medium text-sm text-foreground">{review.author}</span>
          {review.country && (
            <span className="text-xs text-muted-foreground">· {review.country}</span>
          )}
          <div className="flex items-center gap-0.5 ml-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{review.text}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-0.5 rounded-md">{placeName}</span>
          <span>{review.createdAt.toLocaleDateString("ru-RU")}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        {status === "pending" && (
          <form action={approveReview.bind(null, review.id)}>
            <button
              type="submit"
              title="Одобрить"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-medium rounded-lg transition-colors border border-green-200"
            >
              <Check className="h-3.5 w-3.5" />
              Одобрить
            </button>
          </form>
        )}
        {status === "approved" && (
          <form action={rejectReview.bind(null, review.id)}>
            <button
              type="submit"
              title="Снять с публикации"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs font-medium rounded-lg transition-colors border border-orange-200"
            >
              <X className="h-3.5 w-3.5" />
              Скрыть
            </button>
          </form>
        )}
        <form action={deleteReview.bind(null, review.id)}>
          <button
            type="submit"
            title="Удалить"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium rounded-lg transition-colors border border-red-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Удалить
          </button>
        </form>
      </div>
    </div>
  );
}
