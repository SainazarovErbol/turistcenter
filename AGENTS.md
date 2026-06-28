# Turistcenter Kyrgyzstan — Контекст проекта

> Этот файл читается AI-агентом в начале каждого нового чата.
> Обновляй его в конце каждой рабочей сессии командой: "Обнови AGENTS.md"

---

## Что это за проект

Туристическая веб-платформа для Кыргызстана:
- Интерактивная карта достопримечательностей (главная фишка)
- Агрегатор туров с рекламой туроператоров
- Отзывы туристов
- ИИ-ассистент для планирования поездок
- Мультиязычность: KY / RU / EN

**Целевая аудитория:** иностранные туристы, туристы из СНГ, местные жители.

---

## Текущий статус

**Фаза:** Фаза 1 — ЗАВЕРШЕНА ✅ / Фаза 2 — начинаем

**Что сделано (Фаза 1):**
- [x] Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui (Base UI)
- [x] Брендовые цвета (тил/синий — цвет Иссык-Куля) в globals.css
- [x] Layout с кириллическими шрифтами Inter + Playfair Display
- [x] Navbar — липкая навигация, ссылки на /places и /tours, переключатель языка RU/EN/KY
- [x] Hero секция — полноэкранный hero с поиском и статистикой
- [x] FeaturedPlaces — карточки кликабельны, ведут на /places/[id]
- [x] InteractiveMap — Mapbox карта с 3D-рельефом, маркеры по категориям, попапы ✅
- [x] ToursSection — карточки туров, кнопка "Все туры" → /tours
- [x] ReviewsSection — masonry-сетка лучших отзывов + блок статистики на главной
- [x] Footer — ссылки, контакты
- [x] /places — каталог с поиском, фильтрами по категориям, сортировкой
- [x] /places/[id] — страница места: hero, описание, галерея, факты, карта, туры, отзывы
- [x] /tours — каталог с поиском, фильтрами (тип/бюджет/длительность), сортировкой
- [x] Layouts для /places и /tours (Navbar + Footer через layout.tsx)
- [x] Система отзывов: ReviewCard, ReviewsList (с фильтром по звёздам и формой), ReviewsSection
- [x] src/data/reviews.ts — 15 реальных отзывов на 6 мест (RU/EN/FR)
- [x] src/data/attractions.ts — 6 мест (с longDescription, gallery, facts) + 8 туров (с category, durationDays)
- [x] SEO: sitemap.ts, robots.ts, metadataBase, title template, og:image, Twitter card
- [x] Mapbox токен в .env.local: NEXT_PUBLIC_MAPBOX_TOKEN

**Приоритеты Фазы 2:**
- [ ] Деплой на Vercel (домен turistcenter.kg)
- [ ] База данных PostgreSQL + PostGIS (Railway)
- [ ] API: Fastify backend для реальных данных
- [ ] Реальная форма отзывов (сохранение в БД)
- [ ] Партнёрский портал для туроператоров
- [ ] Мультиязычность (i18n: ru/en/ky)
- [ ] Аналитика (Plausible или Vercel Analytics)
- [ ] Больше мест (20+) и туров (30+)

---

## Технологический стек

| Слой | Технология | Статус |
|---|---|---|
| Frontend | Next.js 16 + TypeScript | ✅ Работает |
| Стили | Tailwind v4 + Base UI | ✅ Работает |
| Карта | Mapbox GL JS | ✅ Токен в .env.local |
| Иконки | lucide-react | ✅ Работает |
| Backend | Node.js + Fastify | ⏳ Не начат |
| БД | PostgreSQL + PostGIS | ⏳ Не начата |
| ИИ | OpenAI API | 🔜 Фаза 3 |
| Хостинг | Vercel + Railway | ⏳ Не настроен |

---

## Структура проекта (текущая)

```
turistcenter/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Шрифты, SEO метаданные, metadataBase
│   │   ├── page.tsx            # Главная страница
│   │   ├── globals.css         # Брендовые цвета
│   │   ├── sitemap.ts          # /sitemap.xml — авто, включает все места
│   │   ├── robots.ts           # /robots.txt
│   │   ├── places/
│   │   │   ├── layout.tsx      # Navbar + Footer для всех /places/*
│   │   │   ├── page.tsx        # /places — каталог с поиском и фильтрами
│   │   │   └── [id]/
│   │   │       └── page.tsx    # /places/[id] — детальная страница места
│   │   └── tours/
│   │       ├── layout.tsx      # Navbar + Footer для /tours
│   │       └── page.tsx        # /tours — каталог с фильтрами
│   ├── components/
│   │   ├── ui/                 # Base UI компоненты (button.tsx)
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── FeaturedPlaces.tsx
│   │   ├── InteractiveMap.tsx
│   │   ├── MapWrapper.tsx      # "use client" wrapper для SSR
│   │   ├── ToursSection.tsx
│   │   ├── ReviewsSection.tsx  # Секция на главной (masonry + статистика)
│   │   ├── ReviewCard.tsx      # Карточка одного отзыва
│   │   ├── ReviewsList.tsx     # Список + рейтинг + форма на /places/[id]
│   │   └── Footer.tsx
│   └── data/
│       ├── attractions.ts      # 6 мест + 8 туров, типы, хелперы
│       └── reviews.ts          # 15 отзывов, getReviewsByPlace, getFeaturedReviews
├── next.config.ts
├── AGENTS.md
└── .env.local                  # NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
```

## Важные детали

- **Button (Base UI):** НЕ поддерживает `asChild`. Для ссылок используй `render={<Link href="..." />}` + `nativeButton={false}`
- **MapWrapper.tsx** — обёртка "use client" для InteractiveMap (обязательно из-за ssr:false)
- **lucide-react** — безопасные иконки: Map, MapPin, Search, Star, Clock, Menu, X, ArrowRight, BadgeCheck, Globe, Mail, Phone, Layers, ZoomIn, Mountain, ChevronRight, ChevronDown, SlidersHorizontal, Users, Sparkles, Quote, ThumbsUp, PenLine
- **Шрифты:** `var(--font-sans)` = Inter, `var(--font-heading)` = Playfair Display
- **Цвета:** primary = oklch(0.52 0.14 220) — тил/синий цвет Иссык-Куля
- Язык интерфейса: русский

---

## Роадмап

### Фаза 1 — Фундамент ✅ ЗАВЕРШЕНА
- [x] UI оболочка и главная страница
- [x] Страницы мест (/places, /places/[id]) и туров (/tours)
- [x] Система отзывов (мок-данные + компоненты)
- [x] SEO (sitemap, robots, OG, Twitter card)

### Фаза 2 — Ядро продукта ← СЕЙЧАС
- [ ] Деплой на Vercel
- [ ] PostgreSQL + PostGIS (Railway)
- [ ] Fastify backend API
- [ ] Реальная система отзывов (БД)
- [ ] Партнёрский портал для туроператоров
- [ ] Мультиязычность (i18n)
- [ ] Аналитика

### Фаза 3 — ИИ и монетизация
- [ ] ИИ-ассистент (OpenAI API)
- [ ] Онлайн-бронирование туров

### Фаза 4 — Масштабирование
- [ ] Мобильное приложение, оффлайн-карты, API

---

## Как продолжить в новом чате

Напиши:
> "Прочитай AGENTS.md и продолжим разработку Turistcenter"

---

*Последнее обновление: 28 июня 2026 — Фаза 1 полностью завершена*
