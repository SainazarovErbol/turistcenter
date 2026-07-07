export type Category = "nature" | "history" | "sport" | "culture" | "lake";
export type TourDuration = "short" | "medium" | "long"; // 1-5 / 6-9 / 10+

import { extraAttractions } from "./places-extended";
import { extraTours } from "./tours-extended";

export interface Attraction {
  id: string;
  name: string;
  nameRu: string;
  nameKy?: string;
  region: string;
  category: Category;
  description: string;
  descriptionRu?: string;
  descriptionKy?: string;
  longDescription: string;
  longDescriptionRu?: string;
  longDescriptionKy?: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  coordinates: [number, number]; // [lng, lat]
  bestSeason: string;
  difficulty?: "easy" | "medium" | "hard";
  facts: { label: string; value: string }[];
}

export interface Tour {
  id: string;
  title: string;
  titleEn?: string;
  titleKy?: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  operator: string;
  category: "adventure" | "cultural" | "relaxation" | "trekking" | "family";
  isSponsored?: boolean;
}

export type TourCategory = Tour["category"];

export const tourCategoryLabels: Record<TourCategory, string> = {
  adventure: "Приключения",
  cultural: "Культурный",
  relaxation: "Отдых",
  trekking: "Треккинг",
  family: "Семейный",
};

const baseAttractions: Attraction[] = [
  {
    id: "issyk-kul",
    name: "Issyk-Kul Lake",
    nameRu: "Озеро Иссык-Куль",
    region: "Иссык-Кульская область",
    category: "lake",
    description:
      "Второе по величине горное озеро в мире и одно из самых глубоких. Незамерзающее, окружённое снежными пиками Тянь-Шаня.",
    longDescription:
      "Иссык-Куль — жемчужина Кыргызстана и одно из крупнейших горных озёр мира. Его длина составляет 182 км, ширина — до 60 км, а глубина достигает 668 м. Благодаря высокой солёности и геотермальной активности озеро не замерзает даже в самые суровые зимы — отсюда и его название «Иссык-Куль», что означает «тёплое озеро» на кыргызском языке.\n\nПобережье Иссык-Куля покрыто песчаными пляжами, а сама вода удивительно прозрачна и чиста. Вокруг озера расположены многочисленные курорты, юрточные лагеря и санатории. Летом здесь можно купаться, кататься на лошадях, заниматься виндсёрфингом и дайвингом. На дне озера покоятся руины древних городов, затопленных тысячелетия назад.",
    rating: 4.9,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    ],
    coordinates: [77.3, 42.45],
    bestSeason: "Июнь — Сентябрь",
    facts: [
      { label: "Высота над уровнем моря", value: "1 607 м" },
      { label: "Длина", value: "182 км" },
      { label: "Максимальная глубина", value: "668 м" },
      { label: "Площадь", value: "6 236 км²" },
    ],
  },
  {
    id: "ala-archa",
    name: "Ala-Archa",
    nameRu: "Ала-Арча",
    region: "Чуйская область",
    category: "nature",
    description:
      "Национальный парк в 40 км от Бишкека. Горные реки, ледники, альпийские луга и пики высотой до 4 900 м.",
    longDescription:
      "Национальный парк Ала-Арча расположен в 40 км к югу от Бишкека в ущелье реки Ала-Арча. Это одно из самых доступных и живописных мест Кыргызстана, куда горожане едут на выходные для отдыха и треккинга.\n\nПарк охватывает площадь около 200 км² и включает альпийские луга, еловые леса, ледники и горные вершины. Главный маршрут ведёт к горной хижине «Рацек» на высоте 3 450 м, откуда открываются захватывающие виды на ледники и пики. Для опытных альпинистов доступны вершины Корона (4 860 м) и Семёнова-Тянь-Шанского (4 895 м).\n\nВ парке обитают архары, волки, лисы и многочисленные виды птиц. В нижней части долины вдоль реки проложены лёгкие прогулочные тропы, доступные для всех возрастов.",
    rating: 4.8,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    ],
    coordinates: [74.48, 42.56],
    bestSeason: "Май — Октябрь",
    difficulty: "medium",
    facts: [
      { label: "Расстояние от Бишкека", value: "40 км" },
      { label: "Площадь парка", value: "~200 км²" },
      { label: "Максимальная высота", value: "4 895 м" },
      { label: "Хижина Рацека", value: "3 450 м" },
    ],
  },
  {
    id: "tash-rabat",
    name: "Tash-Rabat",
    nameRu: "Таш-Рабат",
    region: "Нарынская область",
    category: "history",
    description:
      "Средневековый каравансарай XV века на Великом шёлковом пути. Хорошо сохранившийся каменный замок на высоте 3 200 м.",
    longDescription:
      "Таш-Рабат — один из наиболее хорошо сохранившихся средневековых памятников Центральной Азии. Этот каменный каравансарай XV века расположен в уединённой горной долине на высоте 3 200 м над уровнем моря, в 90 км к юго-западу от Нарына.\n\nКомплекс был возведён как укреплённый постоялый двор для торговцев и путешественников, двигавшихся по Великому шёлковому пути. Массивные каменные стены, купольные залы, темницы и центральный зал с главным куполом прекрасно сохранились до наших дней.\n\nВнутри здания насчитывается более 30 комнат различного назначения: жилые помещения, конюшни, склады. Вокруг каравансарая раскинулась широкая степная долина с юрточными лагерями, где можно остановиться на ночь и понаблюдать за звёздным небом вдали от городских огней.",
    rating: 4.7,
    reviewCount: 934,
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    ],
    coordinates: [75.23, 40.82],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "medium",
    facts: [
      { label: "Год постройки", value: "XV век" },
      { label: "Высота", value: "3 200 м" },
      { label: "Расстояние от Нарына", value: "90 км" },
      { label: "Количество комнат", value: "более 30" },
    ],
  },
  {
    id: "son-kul",
    name: "Son-Kul Lake",
    nameRu: "Сон-Куль",
    region: "Нарынская область",
    category: "lake",
    description:
      "Высокогорное озеро на высоте 3 016 м. Летом здесь пасутся табуны лошадей и стоят юрты кочевников.",
    longDescription:
      "Сон-Куль — высокогорное пресноводное озеро в центре Кыргызстана, на высоте 3 016 м над уровнем моря. Его площадь составляет около 270 км², а берега окружены просторными альпийскими лугами — джайлоо.\n\nКаждое лето, с июня по август, на берега Сон-Куля приходят кыргызские пастухи со своими семьями, табунами лошадей и стадами скота. Белые юрты разбросаны по всему периметру озера, и гости могут остановиться в одной из них, чтобы прожить несколько дней по законам кочевников: пить кумыс, учиться верховой езде и помогать пасти лошадей.\n\nПейзажи Сон-Куля совершенно особенные: огромное синее озеро на фоне бескрайних зелёных лугов, без единого дерева до горизонта. Закаты и рассветы здесь незабываемы. Дорога к озеру проходит через живописные горные перевалы.",
    rating: 4.8,
    reviewCount: 1102,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    ],
    coordinates: [74.7, 41.83],
    bestSeason: "Июнь — Август",
    difficulty: "medium",
    facts: [
      { label: "Высота", value: "3 016 м" },
      { label: "Площадь", value: "~270 км²" },
      { label: "Длина", value: "29 км" },
      { label: "Сезон юрт", value: "Июнь — Август" },
    ],
  },
  {
    id: "bishkek",
    name: "Bishkek",
    nameRu: "Бишкек",
    region: "Чуйская область",
    category: "culture",
    description:
      "Столица Кыргызстана: советская архитектура, современные рестораны, знаменитый Ошский базар и Национальный музей.",
    longDescription:
      "Бишкек — молодая и динамичная столица Кыргызстана с населением около 1,1 млн человек. Город основан в 1825 году как кокандская крепость Пишпек, а современный облик приобрёл в советское время, когда были проложены широкие проспекты, разбиты парки и возведены монументальные здания.\n\nСегодня Бишкек удивляет сочетанием советского наследия и современной жизни. Здесь работают стильные кофейни и рестораны с кухней со всего мира, галереи и арт-пространства. Главная достопримечательность — Ошский базар, где можно попробовать все блюда кыргызской кухни и купить сухофрукты, специи и войлочные изделия.\n\nНациональный исторический музей хранит уникальные экспонаты о кочевой культуре и истории Кыргызстана. Площадь Ала-Тоо с памятником Манасу — центр городской жизни. Из Бишкека удобно выезжать в горы: национальный парк Ала-Арча всего в 40 минутах езды.",
    rating: 4.5,
    reviewCount: 3210,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    coordinates: [74.59, 42.87],
    bestSeason: "Апрель — Октябрь",
    facts: [
      { label: "Население", value: "~1,1 млн чел." },
      { label: "Высота", value: "800 м" },
      { label: "Основан", value: "1825 год" },
      { label: "До Ала-Арчи", value: "40 км" },
    ],
  },
  {
    id: "karakol",
    name: "Karakol",
    nameRu: "Каракол",
    region: "Иссык-Кульская область",
    category: "sport",
    description:
      "Центр горного туризма: лыжный курорт, треккинг в ущельях Алтын-Арашан и Каракол, конные прогулки.",
    longDescription:
      "Каракол — четвёртый по величине город Кыргызстана и главный центр горного туризма страны. Расположенный на восточном берегу Иссык-Куля у подножия Тянь-Шаня, он служит воротами в одни из лучших маршрутов региона.\n\nЗимой Каракол привлекает горнолыжников: местный курорт располагает трассами для любого уровня подготовки со снежным покровом с декабря по март. Летом город становится базой для трекеров: ущелья Алтын-Арашан с горячими источниками и Каракол с ледниковыми озёрами — одни из красивейших в Кыргызстане.\n\nВ самом Карколе стоит осмотреть деревянную Православную церковь 1895 года постройки и Дунганскую мечеть — уникальный памятник китайской архитектуры. Воскресный рынок — одно из лучших мест для погружения в местную жизнь. В окрестностях города организуют конные туры к кочевым стойбищам.",
    rating: 4.6,
    reviewCount: 1456,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    coordinates: [78.39, 42.49],
    bestSeason: "Декабрь — Март (лыжи), Июнь — Сентябрь (треккинг)",
    difficulty: "hard",
    facts: [
      { label: "Расстояние от Бишкека", value: "400 км" },
      { label: "Высота", value: "1 770 м" },
      { label: "Лыжный сезон", value: "Декабрь — Март" },
      { label: "Треккинг", value: "Июнь — Сентябрь" },
    ],
  },
];

export const attractions: Attraction[] = [...baseAttractions, ...extraAttractions];

const baseTours: Tour[] = [
  {
    id: "issyk-kul-classic",
    title: "Иссык-Куль Классик",
    duration: "7 дней",
    durationDays: 7,
    price: 350,
    currency: "USD",
    rating: 4.9,
    reviewCount: 287,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Пляжи Иссык-Куля", "Горячие источники", "Конные прогулки", "Юрточный лагерь"],
    operator: "Nomad Travel",
    category: "relaxation",
    isSponsored: true,
  },
  {
    id: "silk-road",
    title: "Великий шёлковый путь",
    duration: "10 дней",
    durationDays: 10,
    price: 580,
    currency: "USD",
    rating: 4.8,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
    highlights: ["Таш-Рабат", "Нарын", "Сон-Куль", "Юрточный лагерь", "Бишкек"],
    operator: "Silk Road Adventure",
    category: "cultural",
  },
  {
    id: "mountain-trekking",
    title: "Треккинг в Тянь-Шане",
    duration: "5 дней",
    durationDays: 5,
    price: 280,
    currency: "USD",
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    highlights: ["Ала-Арча", "Ледник Семёнова", "Горные хижины", "Альпийские озёра"],
    operator: "Kyrgyz Summit",
    category: "trekking",
  },
  {
    id: "son-kul-nomad",
    title: "Кочевники Сон-Куля",
    duration: "3 дня",
    durationDays: 3,
    price: 180,
    currency: "USD",
    rating: 4.8,
    reviewCount: 211,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Высокогорное озеро", "Жизнь в юрте", "Верховая езда", "Закат на 3000 м"],
    operator: "Nomad Travel",
    category: "adventure",
    isSponsored: true,
  },
  {
    id: "bishkek-karakol",
    title: "Бишкек — Каракол",
    duration: "4 дня",
    durationDays: 4,
    price: 220,
    currency: "USD",
    rating: 4.6,
    reviewCount: 74,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    highlights: ["Ошский базар", "Каракол", "Алтын-Арашан", "Горячие источники"],
    operator: "Visit Kyrgyzstan",
    category: "cultural",
  },
  {
    id: "kyrgyzstan-grand",
    title: "Большое путешествие по Кыргызстану",
    duration: "14 дней",
    durationDays: 14,
    price: 890,
    currency: "USD",
    rating: 4.9,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    highlights: ["Иссык-Куль", "Каракол", "Сон-Куль", "Таш-Рабат", "Ала-Арча", "Ош"],
    operator: "Silk Road Adventure",
    category: "adventure",
  },
  {
    id: "family-summer",
    title: "Семейное лето на Иссык-Куле",
    duration: "5 дней",
    durationDays: 5,
    price: 290,
    currency: "USD",
    rating: 4.7,
    reviewCount: 163,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Пляжный отдых", "Водные развлечения", "Детская программа", "Экскурсии"],
    operator: "Kyrgyz Holiday",
    category: "family",
  },
  {
    id: "ala-archa-day",
    title: "Однодневный поход Ала-Арча",
    duration: "1 день",
    durationDays: 1,
    price: 45,
    currency: "USD",
    rating: 4.8,
    reviewCount: 432,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    highlights: ["Национальный парк", "Водопад", "Горные виды", "Гид включён"],
    operator: "Kyrgyz Summit",
    category: "trekking",
  },
];

export const tours: Tour[] = [...baseTours, ...extraTours];

export const categoryLabels: Record<Category, string> = {
  nature: "Природа",
  history: "История",
  sport: "Активный отдых",
  culture: "Культура",
  lake: "Озёра",
};

export const categoryColors: Record<Category, string> = {
  nature: "bg-green-100 text-green-700",
  history: "bg-amber-100 text-amber-700",
  sport: "bg-orange-100 text-orange-700",
  culture: "bg-purple-100 text-purple-700",
  lake: "bg-blue-100 text-blue-700",
};
