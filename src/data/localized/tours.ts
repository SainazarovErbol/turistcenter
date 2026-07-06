export type LocalizedTourFields = {
  title: string;
  duration: string;
  highlights: string[];
};

export const tourTranslations: Record<
  string,
  { en: LocalizedTourFields; ky: LocalizedTourFields }
> = {
  "issyk-kul-classic": {
    en: {
      title: "Issyk-Kul Classic",
      duration: "7 days",
      highlights: ["Issyk-Kul beaches", "Hot springs", "Horseback riding", "Yurt camp"],
    },
    ky: {
      title: "Ысык-Көл классикасы",
      duration: "7 күн",
      highlights: ["Ысык-Көл пляждары", "Ысык булактар", "Ат минүү", "Боз үй лагери"],
    },
  },
  "silk-road": {
    en: {
      title: "Great Silk Road",
      duration: "10 days",
      highlights: ["Tash-Rabat", "Naryn", "Son-Kul", "Yurt camp", "Bishkek"],
    },
    ky: {
      title: "Улуу Жибек жолу",
      duration: "10 күн",
      highlights: ["Таш-Рабат", "Нарын", "Сон-Көл", "Боз үй лагери", "Бишкек"],
    },
  },
  "mountain-trekking": {
    en: {
      title: "Tian Shan Trekking",
      duration: "5 days",
      highlights: ["Ala-Archa", "Semenov Glacier", "Mountain huts", "Alpine lakes"],
    },
    ky: {
      title: "Тянь-Шаньда треккинг",
      duration: "5 күн",
      highlights: ["Ала-Арча", "Семёнов муздагы", "Тоо үйлөрү", "Альпи көлдөрү"],
    },
  },
  "son-kul-nomad": {
    en: {
      title: "Son-Kul Nomads",
      duration: "3 days",
      highlights: ["High-altitude lake", "Yurt life", "Horseback riding", "Sunset at 3,000 m"],
    },
    ky: {
      title: "Сон-Көл кочмондору",
      duration: "3 күн",
      highlights: ["Тоолук көл", "Боз үйдө турмуш", "Ат минүү", "3 000 мде күн батышы"],
    },
  },
  "bishkek-karakol": {
    en: {
      title: "Bishkek — Karakol",
      duration: "4 days",
      highlights: ["Osh Bazaar", "Karakol", "Altyn-Arashan", "Hot springs"],
    },
    ky: {
      title: "Бишкек — Каракол",
      duration: "4 күн",
      highlights: ["Ош базары", "Каракол", "Алтын-Арашан", "Ысык булактар"],
    },
  },
  "kyrgyzstan-grand": {
    en: {
      title: "Grand Kyrgyzstan Tour",
      duration: "14 days",
      highlights: ["Issyk-Kul", "Karakol", "Son-Kul", "Tash-Rabat", "Ala-Archa", "Osh"],
    },
    ky: {
      title: "Кыргызстан боюнча чоң саякат",
      duration: "14 күн",
      highlights: ["Ысык-Көл", "Каракол", "Сон-Көл", "Таш-Рабат", "Ала-Арча", "Ош"],
    },
  },
  "family-summer": {
    en: {
      title: "Family Summer at Issyk-Kul",
      duration: "5 days",
      highlights: ["Beach vacation", "Water activities", "Kids program", "Excursions"],
    },
    ky: {
      title: "Ысык-Көлдө үй-бүлөлүк жай",
      duration: "5 күн",
      highlights: ["Пляжда эс алуу", "Суу оюн-завуктары", "Балдар программасы", "Экскурсиялар"],
    },
  },
  "ala-archa-day": {
    en: {
      title: "Ala-Archa Day Hike",
      duration: "1 day",
      highlights: ["National park", "Waterfall", "Mountain views", "Guide included"],
    },
    ky: {
      title: "Ала-Арча бир күнүк треккинг",
      duration: "1 күн",
      highlights: ["Улуттук парк", "Шарапат", "Тоо көрүнүштөрү", "Гид киргизилген"],
    },
  },
};
