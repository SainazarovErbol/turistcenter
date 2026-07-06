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
- [x] Деплой на Vercel ✅
- [x] База данных PostgreSQL — Drizzle ORM + Neon ✅
- [x] `npm run db:push` + `npm run db:seed` выполнены ✅ (6 мест, 8 туров, 15 отзывов)
- [x] API Routes: GET /api/places, GET /api/tours, GET /api/reviews/[placeId], POST /api/reviews ✅
- [x] Страницы /places, /tours, /places/[id] получают данные из БД (Server Components) ✅
- [x] Форма отзывов сохраняет в БД через POST /api/reviews (isApproved=false, после модерации) ✅
- [x] Админ-панель ✅ — /admin/login, /admin/reviews, /admin/places, /admin/tours
- [ ] Партнёрский портал для туроператоров
- [ ] Мультиязычность (i18n: ru/en/ky) — next-intl уже установлен
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
| БД | PostgreSQL (Neon) + Drizzle ORM | 🔧 Schema готова, нужен DATABASE_URL |
| ИИ | OpenAI API | 🔜 Фаза 3 |
| Хостинг | Vercel | ✅ Задеплоен |

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
├── drizzle/                    # SQL миграции (генерируются drizzle-kit)
├── drizzle.config.ts           # Drizzle конфиг (подключается к Neon)
└── .env.local                  # MAPBOX_TOKEN + DATABASE_URL
```

## Админ-панель

URL: `/admin` → редирект на `/admin/reviews`
Пароль: переменная `ADMIN_PASSWORD` в `.env.local` и Vercel env vars

| Страница | Функционал |
|---|---|
| `/admin/login` | Вход по паролю (cookie-сессия, 7 дней) |
| `/admin/reviews` | Одобрить / Скрыть / Удалить отзывы |
| `/admin/places` | Список мест, показать/скрыть, удалить |
| `/admin/places/new` | Форма добавления нового места |
| `/admin/tours` | Список туров, показать/скрыть, удалить |
| `/admin/tours/new` | Форма добавления нового тура |

Структура: `src/app/admin/(protected)/` — защищённые страницы (проверка cookie в layout).
`src/app/admin/login/` — страница входа (без проверки, вне route group).
Actions: `src/lib/admin/actions.ts` — Server Actions для всех операций.

---

## Команды БД

```bash
npm run db:generate   # Сгенерировать SQL миграцию из schema.ts
npm run db:push       # Применить schema к БД напрямую (dev)
npm run db:migrate    # Запустить миграции (prod)
npm run db:seed       # Наполнить БД мок-данными из src/data/
npm run db:studio     # Drizzle Studio — визуальный просмотр БД
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

*Последнее обновление: 6 июля 2026 — Админ-панель готова (/admin): вход по паролю, модерация отзывов, управление местами и турами (добавление, публикация, удаление)*
