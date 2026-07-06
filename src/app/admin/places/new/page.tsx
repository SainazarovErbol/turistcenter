import { addPlace } from "@/lib/admin/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPlacePage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/places" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Назад к местам
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Новое место</h1>
      </div>

      <form action={addPlace} className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug (URL-идентификатор)" name="slug" placeholder="issyk-kul" required hint="Только латиница, цифры, дефис" />
          <Field label="Название EN" name="name" placeholder="Issyk-Kul Lake" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Название RU" name="nameRu" placeholder="Озеро Иссык-Куль" required />
          <Field label="Регион" name="region" placeholder="Иссык-Кульская область" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Категория"
            name="category"
            required
            options={[
              { value: "lake", label: "Озёра" },
              { value: "nature", label: "Природа" },
              { value: "history", label: "История" },
              { value: "sport", label: "Активный отдых" },
              { value: "culture", label: "Культура" },
            ]}
          />
          <SelectField
            label="Сложность"
            name="difficulty"
            options={[
              { value: "", label: "Не указана" },
              { value: "easy", label: "Лёгкая" },
              { value: "medium", label: "Средняя" },
              { value: "hard", label: "Сложная" },
            ]}
          />
        </div>

        <TextareaField label="Краткое описание" name="description" placeholder="2–3 предложения о месте" rows={2} required />
        <TextareaField label="Подробное описание" name="longDescription" placeholder="Полный текст (абзацы разделяются пустой строкой)" rows={6} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Долгота (Longitude)" name="longitude" type="number" placeholder="77.3" required />
          <Field label="Широта (Latitude)" name="latitude" type="number" placeholder="42.45" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Лучший сезон" name="bestSeason" placeholder="Июнь — Сентябрь" />
          <Field label="URL фото" name="imageUrl" placeholder="https://images.unsplash.com/..." />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Создать место
          </button>
          <Link
            href="/admin/places"
            className="px-5 py-2.5 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, name, placeholder, required, type = "text", hint,
}: {
  label: string; name: string; placeholder?: string; required?: boolean; type?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        step={type === "number" ? "any" : undefined}
        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
      />
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function TextareaField({
  label, name, placeholder, rows, required,
}: {
  label: string; name: string; placeholder?: string; rows?: number; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows ?? 3}
        required={required}
        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
      />
    </div>
  );
}

function SelectField({
  label, name, options, required,
}: {
  label: string; name: string; options: { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        required={required}
        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
