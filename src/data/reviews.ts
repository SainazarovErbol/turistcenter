export interface Review {
  id: string;
  placeId: string;
  authorName: string;
  authorCountry: string;
  rating: number;
  text: string;
  date: string; // ISO date string
  helpful: number;
}

export const reviews: Review[] = [
  // Иссык-Куль
  {
    id: "r1",
    placeId: "issyk-kul",
    authorName: "Анна К.",
    authorCountry: "Россия",
    rating: 5,
    text: "Иссык-Куль превзошёл все ожидания! Вода кристально чистая, горы вокруг создают невероятный пейзаж. Были в июле — жара комфортная, пляжи не переполнены. Обязательно вернёмся.",
    date: "2026-07-15",
    helpful: 34,
  },
  {
    id: "r2",
    placeId: "issyk-kul",
    authorName: "Marco B.",
    authorCountry: "Италия",
    rating: 5,
    text: "One of the most beautiful lakes I've ever seen. The combination of turquoise water and snow-capped peaks is simply magical. Stayed in a yurt camp — an unforgettable experience!",
    date: "2026-06-20",
    helpful: 21,
  },
  {
    id: "r3",
    placeId: "issyk-kul",
    authorName: "Дмитрий С.",
    authorCountry: "Казахстан",
    rating: 4,
    text: "Красивое место, но в разгар сезона (август) на популярных пляжах многолюдно. Советую ехать в июне или сентябре. Восток озера значительно тише и красивее запада.",
    date: "2026-08-10",
    helpful: 18,
  },

  // Ала-Арча
  {
    id: "r4",
    placeId: "ala-archa",
    authorName: "Sarah M.",
    authorCountry: "Германия",
    rating: 5,
    text: "Incredible national park so close to the city! Did the hike to Ak-Say glacier — tough but absolutely worth it. The scenery is breathtaking. A must for anyone visiting Bishkek.",
    date: "2026-05-28",
    helpful: 27,
  },
  {
    id: "r5",
    placeId: "ala-archa",
    authorName: "Елена Р.",
    authorCountry: "Россия",
    rating: 5,
    text: "Были с семьёй, дети 8 и 12 лет. Нижняя часть маршрута лёгкая и очень красивая. Река бурная, воздух чистейший. Уехали совершенно счастливые. До парка 40 минут от Бишкека — это невероятная роскошь.",
    date: "2026-06-05",
    helpful: 15,
  },
  {
    id: "r6",
    placeId: "ala-archa",
    authorName: "Алибек Т.",
    authorCountry: "Кыргызстан",
    rating: 4,
    text: "Наш любимый парк для выходных. Отличные тропы, всегда свежий воздух. Небольшой минус — в выходные парковка переполнена, лучше приезжать пораньше.",
    date: "2026-04-18",
    helpful: 11,
  },

  // Таш-Рабат
  {
    id: "r7",
    placeId: "tash-rabat",
    authorName: "James W.",
    authorCountry: "Великобритания",
    rating: 5,
    text: "This place is pure magic. A 15th century caravanserai in the middle of nowhere, perfectly preserved. The silence, the history, the landscape — completely overwhelmed. Slept in a yurt nearby and watched the Milky Way.",
    date: "2026-07-02",
    helpful: 42,
  },
  {
    id: "r8",
    placeId: "tash-rabat",
    authorName: "Наталья В.",
    authorCountry: "Россия",
    rating: 5,
    text: "Таш-Рабат — одно из самых атмосферных мест, где мне доводилось бывать. Камни, история, тишина. Дорога сложная, но виды по пути компенсируют всё. Ночь в юрте рядом с каравансараем — незабываемо.",
    date: "2026-08-01",
    helpful: 29,
  },
  {
    id: "r9",
    placeId: "tash-rabat",
    authorName: "Чингиз А.",
    authorCountry: "Кыргызстан",
    rating: 4,
    text: "Обязательное место для каждого кыргызстанца. Наша история, наша гордость. Дорога последние 20 км грунтовая — лучше на внедорожнике, хотя на обычной машине тоже проехали.",
    date: "2026-06-14",
    helpful: 16,
  },

  // Сон-Куль
  {
    id: "r10",
    placeId: "son-kul",
    authorName: "Lena F.",
    authorCountry: "Франция",
    rating: 5,
    text: "Son-Kul est un endroit hors du temps. Des chevaux partout, des yourtes, un lac immense et un ciel d'une pureté absolue. Trois jours passés là-bas ont été les plus beaux de mon voyage.",
    date: "2026-07-18",
    helpful: 33,
  },
  {
    id: "r11",
    placeId: "son-kul",
    authorName: "Игорь М.",
    authorCountry: "Украина",
    rating: 5,
    text: "Сон-Куль — это другой мир. Стада лошадей, юрты, ни одного дерева, только небо и трава. Жили у местной семьи три дня, ели баранину и пили кумыс. Один из лучших опытов в жизни.",
    date: "2026-07-25",
    helpful: 38,
  },

  // Бишкек
  {
    id: "r12",
    placeId: "bishkek",
    authorName: "Тимур К.",
    authorCountry: "Казахстан",
    rating: 4,
    text: "Приятный город, намного зеленее и спокойнее Алматы. Ошский базар — огонь, особенно утром. Еда везде вкусная и дешёвая. Хорошая база для поездок в горы.",
    date: "2026-05-10",
    helpful: 22,
  },
  {
    id: "r13",
    placeId: "bishkek",
    authorName: "Yuki T.",
    authorCountry: "Япония",
    rating: 4,
    text: "Bishkek surprised me! Very green city with wide boulevards. The food market is amazing — tried so many new things. People are very friendly and welcoming to tourists.",
    date: "2026-04-22",
    helpful: 19,
  },

  // Каракол
  {
    id: "r14",
    placeId: "karakol",
    authorName: "Alex P.",
    authorCountry: "США",
    rating: 5,
    text: "Karakol is the adventure capital of Kyrgyzstan and it delivers! Did 3-day trek in Karakol gorge — absolute paradise. The town itself is charming with wooden houses and the Dungan mosque.",
    date: "2026-07-08",
    helpful: 31,
  },
  {
    id: "r15",
    placeId: "karakol",
    authorName: "Ольга Н.",
    authorCountry: "Беларусь",
    rating: 5,
    text: "Каракол — идеальная база для треккинга. Алтын-Арашан просто сказка: термальные источники среди гор. Горнолыжный курорт тоже советую — трассы отличные, цены приятные. Вернусь зимой!",
    date: "2026-06-30",
    helpful: 25,
  },
];

export function getReviewsByPlace(placeId: string): Review[] {
  return reviews.filter((r) => r.placeId === placeId);
}

export function getFeaturedReviews(count = 6): Review[] {
  return reviews
    .filter((r) => r.rating === 5)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, count);
}

export function getAverageRating(placeId: string): number {
  const placeReviews = getReviewsByPlace(placeId);
  if (!placeReviews.length) return 0;
  const sum = placeReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / placeReviews.length) * 10) / 10;
}

export function getRatingDistribution(placeId: string): Record<number, number> {
  const placeReviews = getReviewsByPlace(placeId);
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  placeReviews.forEach((r) => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
  return dist;
}
