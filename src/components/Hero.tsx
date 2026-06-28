import Link from "next/link";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "100+", label: "Достопримечательностей" },
  { value: "50+", label: "Туроператоров" },
  { value: "4 800+", label: "Отзывов туристов" },
  { value: "7", label: "Регионов" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient — placeholder until real photo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.30 0.12 210) 40%, oklch(0.25 0.10 180) 100%)",
        }}
      />
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.60 0.14 220 / 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, oklch(0.55 0.12 180 / 0.3) 0%, transparent 40%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 mb-6">
            <MapPin className="h-3.5 w-3.5 text-blue-300" />
            <span className="text-xs text-white/80 font-medium">Кыргызстан — сердце Центральной Азии</span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Открой
            <br />
            <span className="text-blue-300">Кыргызстан</span>
          </h1>

          <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
            Интерактивная карта, лучшие туры и сотни мест, которые стоит увидеть.
            Планируй поездку вместе с ИИ-ассистентом.
          </p>

          {/* Search bar */}
          <div className="flex gap-2 max-w-lg mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск мест, туров, регионов..."
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
              />
            </div>
            <Button size="lg" className="h-11 px-5">
              Найти
            </Button>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href="#map">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                <MapPin className="h-4 w-4 mr-1.5" />
                Открыть карту
              </Button>
            </Link>
            <Link href="#tours">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Смотреть туры
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick review snippet */}
        <div className="mt-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white/30 bg-gradient-to-br from-blue-400 to-teal-500"
                style={{ background: `oklch(${0.55 + i * 0.05} 0.15 ${200 + i * 15})` }}
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-white/60">4 800+ туристов уже побывали</p>
          </div>
        </div>
      </div>
    </section>
  );
}
