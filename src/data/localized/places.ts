export type LocalizedPlaceFields = {
  name: string;
  region: string;
  description: string;
  longDescription: string;
  bestSeason: string;
  facts: { label: string; value: string }[];
};

export const placeTranslations: Record<
  string,
  { en: LocalizedPlaceFields; ky: LocalizedPlaceFields }
> = {
  "issyk-kul": {
    en: {
      name: "Issyk-Kul Lake",
      region: "Issyk-Kul Region",
      description:
        "The world's second-largest alpine lake and one of the deepest. It never freezes, surrounded by the snow-capped peaks of the Tian Shan.",
      longDescription:
        "Issyk-Kul is the jewel of Kyrgyzstan and one of the largest mountain lakes in the world. It stretches 182 km in length, up to 60 km in width, and reaches a depth of 668 m. Thanks to its high salinity and geothermal activity, the lake does not freeze even in the harshest winters — hence its name \"Issyk-Kul,\" meaning \"warm lake\" in Kyrgyz.\n\nThe shores of Issyk-Kul are lined with sandy beaches, and the water is remarkably clear and clean. Resorts, yurt camps, and sanatoriums dot the lakeside. In summer, visitors can swim, ride horses, windsurf, and dive. The ruins of ancient cities flooded thousands of years ago lie on the lakebed.",
      bestSeason: "June — September",
      facts: [
        { label: "Elevation", value: "1,607 m" },
        { label: "Length", value: "182 km" },
        { label: "Maximum depth", value: "668 m" },
        { label: "Area", value: "6,236 km²" },
      ],
    },
    ky: {
      name: "Ысык-Көл",
      region: "Ысык-Көл облусу",
      description:
        "Дүйнөдөгү экинчи чоң тоолук көл жана эң тереңдердин бири. Тянь-Шаньдын карлуу чокулары менен курчалган, муздабай турган көл.",
      longDescription:
        "Ысык-Көл — Кыргызстандын жемчугү жана дүйнөдөгү эң чоң тоолук көлдөрдүн бири. Узундугу 182 км, туурасы 60 кмге чейин, тереңдиги 668 м. Жогорку туздуулук жана геотермалдык активдүүлүк аркасында көл эң катуу кышында да муздабайт — ошондуктан кыргызча «Ысык-Көл» деп аталып, «ысык көл» дегенди билдирет.\n\nЫсык-Көлдүн жээги кумдуу пляждар менен капталган, суусу абдан таза жана тунук. Көлдүн аймагында эс алуу жайлары, боз үй лагерлери жана санаторийлер жайгашкан. Жайында сууга чумулуу, ат минүү, виндсёрфинг жана дайвинг менен алек болсо болот. Көлдүн түбүндө миң жылдар мурун суга чөгүп калган байыркы шаарлардын уруктары жатат.",
      bestSeason: "Июнь — Сентябрь",
      facts: [
        { label: "Деңиз деңгээлинен бийиктиги", value: "1 607 м" },
        { label: "Узундугу", value: "182 км" },
        { label: "Максималдуу тереңдик", value: "668 м" },
        { label: "Аянты", value: "6 236 км²" },
      ],
    },
  },
  "ala-archa": {
    en: {
      name: "Ala-Archa",
      region: "Chuy Region",
      description:
        "National park 40 km from Bishkek. Mountain rivers, glaciers, alpine meadows, and peaks up to 4,900 m.",
      longDescription:
        "Ala-Archa National Park lies 40 km south of Bishkek in the Ala-Archa River gorge. It is one of the most accessible and scenic places in Kyrgyzstan, where city dwellers come on weekends for relaxation and trekking.\n\nThe park covers about 200 km² and includes alpine meadows, spruce forests, glaciers, and mountain summits. The main trail leads to the Ratsek mountain hut at 3,450 m, offering breathtaking views of glaciers and peaks. Experienced climbers can tackle the Korona (4,860 m) and Semenov-Tian-Shansky (4,895 m) summits.\n\nThe park is home to argali sheep, wolves, foxes, and many bird species. Easy walking trails run along the river in the lower valley, suitable for all ages.",
      bestSeason: "May — October",
      facts: [
        { label: "Distance from Bishkek", value: "40 km" },
        { label: "Park area", value: "~200 km²" },
        { label: "Maximum elevation", value: "4,895 m" },
        { label: "Ratsek Hut", value: "3,450 m" },
      ],
    },
    ky: {
      name: "Ала-Арча",
      region: "Чүй облусу",
      description:
        "Бишкектен 40 км аралыктагы улуттук парк. Тоолук дарыялар, муздактар, альпи далалары жана 4 900 м чейинки чокулар.",
      longDescription:
        "Ала-Арча улуттук парки Бишкектен 40 км түштүктө, Ала-Арча дарыясынын оодонунда жайгашкан. Бул Кыргызстандын эң жеткиликтүү жана кооз жерлеринин бири — шаар тургундары дем алыш күндөрү эс алууга жана треккингге келишет.\n\nПарк 200 км² аянтты камтыйт: альпи далалары, чырма бактары, муздактар жана тоо чокулары. Негизги маршрут 3 450 м бийиктиктеги «Рацек» тоо үйүнө жетет — андан муздактарга жана чокуларга керемет көрүнүш ачылат. Тажрыйбалуу альпинисттер Корона (4 860 м) жана Семёнов-Тянь-Шанский (4 895 м) чокуларына чыга алат.\n\nПаркта аркарлар, курттар, түлкүлөр жана көптөгөн куш түрлөрү жашайт. Долонун төмөнкү бөлүгүндө дарыя бойунда бардык курак үчүн ылайык жеңил жөө маршруттар бар.",
      bestSeason: "Май — Октябрь",
      facts: [
        { label: "Бишкектен аралыгы", value: "40 км" },
        { label: "Парк аянты", value: "~200 км²" },
        { label: "Максималдуу бийиктик", value: "4 895 м" },
        { label: "Рацек үйү", value: "3 450 м" },
      ],
    },
  },
  "tash-rabat": {
    en: {
      name: "Tash-Rabat",
      region: "Naryn Region",
      description:
        "A 15th-century medieval caravanserai on the Great Silk Road. A well-preserved stone fortress at 3,200 m elevation.",
      longDescription:
        "Tash-Rabat is one of the best-preserved medieval monuments in Central Asia. This 15th-century stone caravanserai stands in a secluded mountain valley at 3,200 m above sea level, 90 km southwest of Naryn.\n\nThe complex was built as a fortified inn for merchants and travelers on the Great Silk Road. Its massive stone walls, domed halls, prison cells, and central hall with a main dome remain remarkably intact.\n\nThe building contains more than 30 rooms of various purposes: living quarters, stables, and storage. Yurt camps spread across the wide steppe valley around the caravanserai, where visitors can stay overnight and watch the starry sky far from city lights.",
      bestSeason: "June — September",
      facts: [
        { label: "Built", value: "15th century" },
        { label: "Elevation", value: "3,200 m" },
        { label: "Distance from Naryn", value: "90 km" },
        { label: "Number of rooms", value: "30+" },
      ],
    },
    ky: {
      name: "Таш-Рабат",
      region: "Нарын облусу",
      description:
        "Улуу Жибек жолундагы XV кылымдын орто аскы караван-сарайы. 3 200 м бийиктикте жакшы сакталган таш замок.",
      longDescription:
        "Таш-Рабат — Борбордук Азиядагы эң жакшы сакталган орто аскы эскерткичтердин бири. Бул XV кылымдын таш караван-сарайы 3 200 м бийиктиктеги тоолук долоодо, Нарын шаарынан 90 км түйшүктө жайгашкан.\n\nКомплекс Улуу Жибек жолундагы соодачылар жана саякатчылар үчүн бекемдиктүү мейманкана катары курулган. Калың таш дубалдар, куполдуу залдар, темницалар жана негизги куполдуу борбордук зал бүгүнкү күнгө чейин жакшы сакталган.\n\nИмараттын ичинде 30дан ашык бөлмө бар: жашоо бөлмөлөр, атканаалар, кампалар. Караван-сарайдын аймагында кең далада боз үй лагерлери жайгашкан — түнүп, шаар жарыгынан алыс жылдыздуу асманды көрсө болот.",
      bestSeason: "Июнь — Сентябрь",
      facts: [
        { label: "Курулган жылы", value: "XV кылым" },
        { label: "Бийиктиги", value: "3 200 м" },
        { label: "Нарындан аралыгы", value: "90 км" },
        { label: "Бөлмөлөрдүн саны", value: "30дан ашык" },
      ],
    },
  },
  "son-kul": {
    en: {
      name: "Son-Kul Lake",
      region: "Naryn Region",
      description:
        "A high-altitude lake at 3,016 m. In summer, herds of horses graze here and nomads' yurts dot the shore.",
      longDescription:
        "Son-Kul is a high-altitude freshwater lake in the heart of Kyrgyzstan, at 3,016 m above sea level. It covers about 270 km², surrounded by vast alpine meadows known as jailoo.\n\nEvery summer, from June to August, Kyrgyz shepherds arrive on the shores of Son-Kul with their families, horse herds, and livestock. White yurts are scattered around the lake, and guests can stay in one to live for a few days as nomads do: drink kumis, learn to ride horses, and help herd the animals.\n\nThe landscapes of Son-Kul are truly unique: a vast blue lake against endless green meadows with not a single tree to the horizon. Sunsets and sunrises here are unforgettable. The road to the lake passes through scenic mountain passes.",
      bestSeason: "June — August",
      facts: [
        { label: "Elevation", value: "3,016 m" },
        { label: "Area", value: "~270 km²" },
        { label: "Length", value: "29 km" },
        { label: "Yurt season", value: "June — August" },
      ],
    },
    ky: {
      name: "Сон-Көл",
      region: "Нарын облусу",
      description:
        "3 016 м бийиктиктеги тоолук көл. Жайында ат табундары жайылып, кочмондордун боз үйлөрү турат.",
      longDescription:
        "Сон-Көл — Кыргызстандын борборунда, 3 016 м бийиктикте жайгашкан тоолук тузсуз көл. Аyanты 270 km² chамasında, jeeghи keng al'pi dalalar menen kurchalган.\n\nАр jайda, iyundan avgustka cheyin, kyrgyz malchylary üy-bülölörü, at tabундары jana mal stadaları menen Son-Köldün jeeghine keleşet. Ak boz üylör köldün aymağında jaygashkan — konoktor bir neche kün kochmon jashoo usulunda turoo, kymyz ichip, at minuunu uyroonup, mal bakkaga jardam bera alat.\n\nSon-Köldün peizajdary абdan özгöchö: cheksiz jashıl dalalar fonunda chong kök köl, gorizontko cheyin bir darak jok. Bul jerdegi kün batyshy jana tang atqyсы este kalat. Kölge baruuchu jol kooz too ötköldör arkyly ötöt.",
      bestSeason: "Июнь — Август",
      facts: [
        { label: "Бийиктиги", value: "3 016 м" },
        { label: "Аянты", value: "~270 км²" },
        { label: "Узундугу", value: "29 км" },
        { label: "Боз үй сезону", value: "Июнь — Август" },
      ],
    },
  },
  "bishkek": {
    en: {
      name: "Bishkek",
      region: "Chuy Region",
      description:
        "The capital of Kyrgyzstan: Soviet-era architecture, modern restaurants, the famous Osh Bazaar, and the National Museum.",
      longDescription:
        "Bishkek is a young and dynamic capital of Kyrgyzstan with a population of about 1.1 million. Founded in 1825 as the Kokand fortress of Pishpek, the city took its modern shape during the Soviet era, when wide avenues, parks, and monumental buildings were laid out.\n\nToday, Bishkek surprises visitors with its blend of Soviet heritage and contemporary life. Stylish cafés and restaurants serving cuisine from around the world, galleries, and art spaces thrive here. The main attraction is the Osh Bazaar, where you can taste all the dishes of Kyrgyz cuisine and buy dried fruits, spices, and felt crafts.\n\nThe National Historical Museum holds unique exhibits on nomadic culture and the history of Kyrgyzstan. Ala-Too Square with the Manas monument is the center of city life. From Bishkek, it is easy to reach the mountains: Ala-Archa National Park is just 40 minutes away by car.",
      bestSeason: "April — October",
      facts: [
        { label: "Population", value: "~1.1 million" },
        { label: "Elevation", value: "800 m" },
        { label: "Founded", value: "1825" },
        { label: "To Ala-Archa", value: "40 km" },
      ],
    },
    ky: {
      name: "Бишкек",
      region: "Чүй облусу",
      description:
        "Кыргызстандын борбору: советтик архитектура, заманбап ресторандар, атактуу Ош базары жана Улуттук музей.",
      longDescription:
        "Бишкек — 1,1 million chamasynda turgunu bar Кыргызstannyn jash жана dinamikduu borborsu. 1825-jyly Кокonduu Пишpek bekinishi katary negizdelgen, замanbiy körünüşün sovettik mezgilde algan — oshol uchurda keng prospektter, parktar жана monumentalduu imarattar kuruulgan.\n\nBügün Бишкек sovettik murastyn жана замanbiy turmushtun aralasmasy menen tañ kaldyrat. Stilduu kofeynyalar, düynölük ashkana sunuuchu restoranlar, galereyalar жана art-prostranstvolar ishteit. Negizgi körüüchü jer — Оsh bazary, anda kyrgyz ashkanasynyn barдыk tamaktaryn dañtaylap, kuruu jemişter, spiceler жана felt izdeliyelerdi satyp alsa bolot.\n\nUluttuk taryhyy muzey kochmonduk madaniyat жана Кыргызstannyn taryhy tuuraluu unikalduu eksponattardy saktait. Manas eskertkichi bar Ala-Too alangy shaardyn turmushunun borbory. Бишkектен toolorgo oson chyguu mumkun: Ala-Archa uluttuk parki mashinada 40 münöt.",
      bestSeason: "Апрель — Октябрь",
      facts: [
        { label: "Калкы", value: "~1,1 млн адам" },
        { label: "Бийиктиги", value: "800 м" },
        { label: "Негизделген", value: "1825-жыл" },
        { label: "Ала-Арчага", value: "40 км" },
      ],
    },
  },
  "karakol": {
    en: {
      name: "Karakol",
      region: "Issyk-Kul Region",
      description:
        "A hub for mountain tourism: ski resort, trekking in the Altyn-Arashan and Karakol gorges, and horseback riding.",
      longDescription:
        "Karakol is Kyrgyzstan's fourth-largest city and the country's main center for mountain tourism. Located on the eastern shore of Issyk-Kul at the foot of the Tian Shan, it serves as the gateway to some of the region's best routes.\n\nIn winter, Karakol attracts skiers: the local resort offers slopes for all skill levels with snow cover from December to March. In summer, the city becomes a base for trekkers: the Altyn-Arashan gorge with hot springs and the Karakol gorge with glacial lakes are among the most beautiful in Kyrgyzstan.\n\nIn Karakol itself, visit the wooden Orthodox church built in 1895 and the Dungan Mosque — a unique monument of Chinese architecture. The Sunday market is one of the best places to immerse yourself in local life. Horseback tours to nomadic camps are organized in the surrounding area.",
      bestSeason: "December — March (skiing), June — September (trekking)",
      facts: [
        { label: "Distance from Bishkek", value: "400 km" },
        { label: "Elevation", value: "1,770 m" },
        { label: "Ski season", value: "December — March" },
        { label: "Trekking", value: "June — September" },
      ],
    },
    ky: {
      name: "Каракол",
      region: "Ысык-Көл облусу",
      description:
        "Тоолук туризмдин борбору: лыжа курорту, Алтын-Арашан жана Каракол кanyonунда треккинг, ат минүү.",
      longDescription:
        "Каракол — Кыргызстандын төртүнчү чоң шаары жана тоолук туризмдин негизги борбору. Ысык-Көлдүн чыгыш жээгинде, Тянь-Шань тоолорунун астында жайгашкан — аймактын эң мыкты маршруттарына кирүү эшиги катары кызмат кылат.\n\nКышында Каракол лыжачыларды тартат: жергиликтүү курорт декабрдан мартка чейин кар менен бардык деңгээл үчүн трасалар сунат. Жайында шаар треккерлер үчүн база болот: ысык булактуу Алтын-Арашан каньоны жана муздак көлдөрү бар Каракол каньоны Кыргызстандын эң кооз жерлеринин катарында.\n\nКараколдун өзүндө 1895-жылы курулган жыгач Православ черкөвүн жана Дунган мечитин — кытай архитектурасынын уникалдуу эскерткичин — көрүңүз. Жекшемби базары жергиликтүү турмушка батуу үчүн эң жакшы жерлердин бири. Шаардын аймагында кочмон стойбиштерге ат минүү турлары уюштурулат.",
      bestSeason: "Декабрь — Март (лыжа), Июнь — Сентябрь (треккинг)",
      facts: [
        { label: "Бишкектен аралыгы", value: "400 км" },
        { label: "Бийиктиги", value: "1 770 м" },
        { label: "Лыжа сезону", value: "Декабрь — Март" },
        { label: "Треккинг", value: "Июнь — Сентябрь" },
      ],
    },
  },
};
