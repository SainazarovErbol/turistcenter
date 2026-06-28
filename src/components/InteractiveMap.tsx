"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Layers, ZoomIn, Mountain } from "lucide-react";
import { attractions, categoryLabels, categoryColors, type Attraction } from "@/data/attractions";

const categoryIcons: Record<string, string> = {
  lake:    "🏞",
  nature:  "🌿",
  history: "🏛",
  sport:   "⛰",
  culture: "🏙",
};

const categoryMarkerColors: Record<string, string> = {
  lake:    "#3b82f6",
  nature:  "#22c55e",
  history: "#f59e0b",
  sport:   "#f97316",
  culture: "#a855f7",
};

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [selected, setSelected] = useState<Attraction | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [terrain3D, setTerrain3D] = useState(true);

  const flyTo = (place: Attraction) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: place.coordinates,
      zoom: 10,
      pitch: terrain3D ? 60 : 0,
      bearing: -10,
      duration: 1800,
    });
  };

  const handleSelect = (place: Attraction) => {
    setSelected((prev) => (prev?.id === place.id ? null : place));
    flyTo(place);
  };

  const toggle3D = () => {
    if (!mapRef.current) return;
    const next = !terrain3D;
    setTerrain3D(next);
    mapRef.current.easeTo({ pitch: next ? 60 : 0, duration: 800 });
  };

  useEffect(() => {
    // Флаг отмены — предотвращает двойную инициализацию в React Strict Mode
    let cancelled = false;

    const initMap = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;

        // Если cleanup уже запустился — не инициализируем
        if (cancelled || !mapContainer.current) return;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token || token === "pk.placeholder") {
          setMapError(true);
          return;
        }

        mapboxgl.accessToken = token;

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/outdoors-v12",
          center: [74.6, 41.8],
          zoom: 5.8,
          pitch: 45,
          bearing: -10,
          antialias: true,
        });

        // Если cleanup запустился пока создавали карту — убираем
        if (cancelled) {
          map.remove();
          return;
        }

        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.ScaleControl(), "bottom-right");

        map.on("load", () => {
          if (cancelled) return;

          map.resize();

          // 3D рельеф
          map.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          });
          map.setTerrain({ source: "mapbox-dem", exaggeration: 1.8 });

          // Атмосфера
          map.setFog({
            color: "rgb(220, 235, 255)",
            "high-color": "rgb(100, 160, 230)",
            "horizon-blend": 0.06,
            "space-color": "rgb(30, 50, 100)",
            "star-intensity": 0.15,
          });

          // Маркеры
          attractions.forEach((place) => {
            const color = categoryMarkerColors[place.category] ?? "#3b82f6";
            const icon = categoryIcons[place.category] ?? "📍";

            // Обёртка — Mapbox позиционирует её, трансформаций нет
            const wrapper = document.createElement("div");
            wrapper.style.cssText = "cursor:pointer;";

            // Визуальный маркер — круг с иконкой, hover через filter
            const el = document.createElement("div");
            el.style.cssText = [
              "width:38px", "height:38px",
              "border-radius:50%",
              `background:${color}`,
              "border:3px solid white",
              "box-shadow:0 2px 8px rgba(0,0,0,0.35)",
              "display:flex", "align-items:center", "justify-content:center",
              "font-size:16px",
              "transition:filter 0.15s, box-shadow 0.15s",
              "user-select:none",
            ].join(";");
            el.textContent = icon;

            el.addEventListener("mouseenter", () => {
              el.style.filter = "brightness(1.15)";
              el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.45)";
            });
            el.addEventListener("mouseleave", () => {
              el.style.filter = "";
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.35)";
            });

            wrapper.appendChild(el);
            wrapper.addEventListener("click", () => setSelected(place));

            const popup = new mapboxgl.Popup({ offset: 30, closeButton: false, maxWidth: "240px" })
              .setHTML(`
                <div style="font-family:system-ui,sans-serif;padding:4px">
                  <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:#111">${place.nameRu}</div>
                  <div style="font-size:11px;color:#666;margin-bottom:6px">${place.region}</div>
                  <div style="font-size:12px;color:#444;line-height:1.4">${place.description.slice(0, 90)}…</div>
                  <div style="margin-top:8px;display:flex;align-items:center;gap:4px">
                    <span style="color:#f59e0b;font-size:12px">★</span>
                    <span style="font-size:12px;font-weight:600">${place.rating}</span>
                    <span style="font-size:11px;color:#888">(${place.reviewCount} отзывов)</span>
                  </div>
                </div>
              `);

            new mapboxgl.Marker({ element: wrapper })
              .setLngLat(place.coordinates)
              .setPopup(popup)
              .addTo(map);
          });

          setMapLoaded(true);
        });

        map.on("error", (e) => {
          console.error("[Map error]", e);
          if (!cancelled) setMapError(true);
        });

      } catch (e) {
        console.error("[Map init error]", e);
        if (!cancelled) setMapError(true);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setMapLoaded(false);
      setMapError(false);
    };
  }, []);

  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary mb-2">Исследуй страну</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Интерактивная карта
          </h2>
          <p className="mt-2 text-muted-foreground">Выбирай регион, приближай карту и открывай новые места</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Карта */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-border" style={{ height: 500 }}>
            {/* Пустой контейнер для Mapbox */}
            <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

            {/* Оверлеи — отдельный слой, не внутри mapContainer */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
              {!mapLoaded && !mapError && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "var(--muted)", pointerEvents: "auto" }}>
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground">Загрузка карты...</p>
                </div>
              )}

              {mapError && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "var(--muted)", pointerEvents: "auto", padding: 32, textAlign: "center" }}>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">Карта недоступна</p>
                  <p className="text-sm text-muted-foreground">Проверьте токен в .env.local и перезапустите сервер</p>
                </div>
              )}

              {mapLoaded && (
                <button
                  onClick={toggle3D}
                  style={{ pointerEvents: "auto" }}
                  className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors backdrop-blur-sm ${
                    terrain3D ? "bg-primary text-primary-foreground border-primary" : "bg-background/80 text-foreground border-border"
                  }`}
                >
                  <Mountain className="h-3.5 w-3.5" />
                  3D рельеф
                </button>
              )}

              {mapLoaded && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-2.5 py-1.5">
                  <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Колёсико для зума · Клик на маркер</span>
                </div>
              )}
            </div>
          </div>

          {/* Сайдбар */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Места на карте</span>
            </div>
            {attractions.map((place) => (
              <button
                key={place.id}
                onClick={() => handleSelect(place)}
                className={`w-full text-left rounded-xl border p-3 transition-all ${
                  selected?.id === place.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5">{categoryIcons[place.category]}</span>
                    <div>
                      <p className="text-sm font-medium leading-snug">{place.nameRu}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{place.region}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs ${categoryColors[place.category]}`}>
                    {categoryLabels[place.category]}
                  </span>
                </div>
                {selected?.id === place.id && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-6">{place.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Легенда */}
        {mapLoaded && (
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(categoryMarkerColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full" style={{ background: color }} />
                <span className="text-xs text-muted-foreground">{categoryLabels[cat as keyof typeof categoryLabels]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
