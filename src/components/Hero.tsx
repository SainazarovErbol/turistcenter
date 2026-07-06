import { Search, MapPin, Star, Users } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.7 0.1 220) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
            <MapPin className="h-3 w-3" />
            {t("badge")}
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h1>

          <p className="text-lg text-background/70 max-w-xl mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex gap-2 p-1.5 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20 max-w-lg mb-12">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-4 w-4 text-background/50 shrink-0" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="flex-1 bg-transparent text-sm text-background placeholder:text-background/40 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              {t("searchButton")}
            </button>
          </div>

          <div className="flex flex-wrap gap-8">
            {[
              { icon: MapPin, value: "200+", label: t("statsPlaces") },
              { icon: Star, value: "50+", label: t("statsTours") },
              { icon: Users, value: "9 700+", label: t("statsReviews") },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-background font-bold">{value}</span>
                <span className="text-background/50 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
