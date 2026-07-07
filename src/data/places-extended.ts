import type { Attraction } from "./attractions";

export const extraAttractions: Attraction[] = [
  {
    id: "sulaiman-too",
    name: "Sulaiman-Too Sacred Mountain",
    nameRu: "Сулейман-Тоо",
    region: "Ошская область",
    category: "history",
    description:
      "UNESCO World Heritage sacred mountain in the heart of Osh. A pilgrimage site for over a thousand years with caves, petroglyphs, and a museum.",
    descriptionRu:
      "Священная гора в центре Оша — объект UNESCO. Место паломничества более тысячи лет: пещеры, петроглифы и музей на склоне.",
    longDescription:
      "Sulaiman-Too rises above the ancient city of Osh as a solitary limestone peak that has been venerated for over a millennium. According to legend, the prophet Sulaiman (Solomon) once prayed here, and the mountain became a sacred site for Muslims, Christians, and local spiritual traditions alike. Today it is inscribed on the UNESCO World Heritage List as an outstanding example of a living sacred landscape.\n\nA network of trails leads visitors past ancient petroglyphs, ritual caves, and the modern Sulaiman-Too Museum built into the mountainside. From the summit at 162 metres above the city, panoramic views stretch across the Fergana Valley. The mountain remains an active place of worship — pilgrims tie ribbons to trees and visit the Babur House, where the future Mughal emperor Babur is said to have stayed.",
    longDescriptionRu:
      "Сулейман-Тоо возвышается над древним городом Ош — одинокий известняковый холм, которому поклонялись более тысячи лет. По легенде, здесь молился пророк Сулейман, и гора стала священным местом для мусульман, христиан и местных духовных традиций. Сегодня она включена в список UNESCO как выдающийся пример живого священного ландшафта.\n\nПо склону проложена сеть троп, ведущих мимо древних петроглифов, ритуальных пещер и современного музея, встроенного в гору. С вершины, возвышающейся на 162 м над городом, открывается панорама Ферганской долины. Гора по-прежнему остаётся местом паломничества — верующие привязывают ленты к деревьям и посещают дом Бабура, где, по преданию, останавливался будущий император Великих Моголов.",
    rating: 4.7,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    coordinates: [72.57, 40.53],
    bestSeason: "Апрель — Октябрь",
    difficulty: "easy",
    facts: [
      { label: "Статус UNESCO", value: "с 2009 года" },
      { label: "Высота над городом", value: "162 м" },
      { label: "Возраст петроглифов", value: "до III тыс. до н.э." },
      { label: "Музей на склоне", value: "открыт в 2000 г." },
    ],
  },
  {
    id: "arslanbob",
    name: "Arslanbob Walnut Forest",
    nameRu: "Арсланбоб",
    region: "Джалал-Абадская область",
    category: "nature",
    description:
      "The world's largest natural walnut forest covering over 6,000 hectares. Waterfalls, hiking trails, and traditional village life in the Fergana foothills.",
    descriptionRu:
      "Крупнейший в мире природный ореховый лес площадью более 6 000 га. Водопады, тропы и жизнь горных сёл у подножия Ферганского хребта.",
    longDescription:
      "Arslanbob is home to the largest natural walnut forest on Earth, a vast green canopy stretching across more than 6,000 hectares of the Babash-Ata mountains. Local legend holds that Alexander the Great planted the first trees here, though botanists confirm some specimens are over a thousand years old. The forest produces roughly 1,500 tonnes of walnuts annually and sustains the livelihood of several mountain villages.\n\nBeyond the nut groves, Arslanbob offers two spectacular waterfalls — the Big Falls (80 m) and the Small Falls (35 m) — reachable via scenic hiking trails through mossy gorges. Guesthouses in the village serve home-cooked meals and organize horseback rides deeper into the forest. Autumn, when walnuts rain down from the canopy, is a particularly magical time to visit.",
    longDescriptionRu:
      "Арсланбоб — родина крупнейшего в мире природного орехового леса, простирающегося более чем на 6 000 гектаров гор Бабаш-Ата. Местная легенда гласит, что первые деревья посадил Александр Македонский, хотя ботаники подтверждают: некоторым экземплярам более тысячи лет. Лес ежегодно даёт около 1 500 тонн грецких орехов и обеспечивает пропитание нескольким горным сёлам.\n\nПомимо ореховых рощ, здесь два живописных водопада — Большой (80 м) и Малый (35 м), к которым ведут тропы через заросшие мхом ущелья. В селе работают гостевые дома с домашней кухней и конные прогулки вглубь леса. Осень, когда орехи сыплются с деревьев, — особенно волшебное время для визита.",
    rating: 4.8,
    reviewCount: 634,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    ],
    coordinates: [71.18, 41.17],
    bestSeason: "Май — Октябрь",
    difficulty: "medium",
    facts: [
      { label: "Площадь леса", value: "более 6 000 га" },
      { label: "Большой водопад", value: "80 м" },
      { label: "Ежегодный урожай", value: "~1 500 т" },
      { label: "Возраст деревьев", value: "до 1 000 лет" },
    ],
  },
  {
    id: "burana-tower",
    name: "Burana Tower",
    nameRu: "Башня Бурана",
    region: "Чуйская область",
    category: "history",
    description:
      "Ruins of the ancient city of Balasagun with a 25-metre minaret from the 11th century. One of the oldest Islamic monuments in Central Asia.",
    descriptionRu:
      "Руины древнего Баласагуна с 25-метровым минаретом XI века. Один из древнейших исламских памятников Центральной Азии.",
    longDescription:
      "Burana Tower stands as the last sentinel of Balasagun, once a flourishing city on the Silk Road and capital of the Karakhanid Khanate. Built in the 11th century, the minaret originally reached 45 metres, though earthquakes over the centuries reduced it to its current 25-metre height. The name 'Burana' is a corruption of 'Balasagun' — the city that once surrounded this tower.\n\nToday the archaeological site includes balbals (stone warrior statues from the Turkic era), a small museum with artefacts excavated from the ruins, and foundations of ancient buildings scattered across the steppe. The tower is just 80 km from Bishkek, making it one of the most accessible historical sites in the country. Climbing the internal spiral staircase rewards visitors with sweeping views of the Chuy Valley.",
    longDescriptionRu:
      "Башня Бурана — последний страж Баласагуна, некогда процветавшего города на Великом шёлковом пути и столицы Караханидского ханства. Минарет XI века первоначально достигал 45 м, но землетрясения со временем уменьшили его до нынешних 25 м. Название «Бурана» — искажённое «Баласагун», город, который когда-то окружал эту башню.\n\nСегодня на археологическом комплексе — балбалы (каменные статуи воинов тюркской эпохи), небольшой музей с находками раскопок и фундаменты древних построек, разбросанные по степи. Башня всего в 80 км от Бишкека — один из самых доступных исторических памятников страны. Подъём по внутренней винтовой лестнице открывает панораму Чуйской долины.",
    rating: 4.6,
    reviewCount: 1243,
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    ],
    coordinates: [75.25, 42.75],
    bestSeason: "Апрель — Октябрь",
    difficulty: "easy",
    facts: [
      { label: "Год постройки", value: "XI век" },
      { label: "Текущая высота", value: "25 м" },
      { label: "Первоначальная высота", value: "45 м" },
      { label: "Расстояние от Бишкека", value: "80 км" },
    ],
  },
  {
    id: "jeti-oguz",
    name: "Jeti-Ögüz Gorge",
    nameRu: "Джеты-Огуз",
    region: "Иссык-Кульская область",
    category: "nature",
    description:
      "A dramatic red rock gorge named 'Seven Bulls' with a health resort, hot springs, and the iconic Broken Heart cliff nearby.",
    descriptionRu:
      "Красное скальное ущелье «Семь быков» с санаторием, горячими источниками и знаменитой скалой «Разбитое сердце».",
    longDescription:
      "Jeti-Ögüz — 'Seven Bulls' in Kyrgyz — is one of the most photographed landscapes in the country. Towering red sandstone cliffs, eroded into shapes resembling seven bulls standing shoulder to shoulder, rise above a lush green valley just 28 km from Karakol. The vivid contrast between crimson rock and emerald meadows creates a scene of almost unreal beauty.\n\nThe gorge has been a health resort since Soviet times, thanks to geothermal springs rich in radon and minerals. A short walk from the main cliffs leads to the 'Broken Heart' rock — a split crimson formation with its own romantic legend. Hiking trails continue up the valley through pine forests to alpine meadows, and the area serves as a gateway to multi-day treks toward Lake Ala-Kul.",
    longDescriptionRu:
      "Джеты-Огуз — «Семь быков» по-кырgyzски — один из самых фотографируемых ландшафтов страны. Красные песчаниковые скалы, выветренные в форму семи быков плечом к плечу, возвышаются над зелёной долиной всего в 28 км от Каракола. Яркий контраст багряных скал и изумрудных лугов создаёт почти нереальную красоту.\n\nУщелье — курорт с советских времён благодаря геотермальным источникам, богатым радоном и минералами. Недалеко от главных скал — «Разбитое сердце», расколотая багряная скала с романтической легендой. Тропы ведут вверх по долине через сосновые леса к альпийским лугам и дальше к многодневным маршрутам к озеру Ала-Куль.",
    rating: 4.8,
    reviewCount: 1567,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    ],
    coordinates: [78.16, 42.35],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "easy",
    facts: [
      { label: "Расстояние от Каракола", value: "28 км" },
      { label: "Высота скал", value: "до 50 м" },
      { label: "Горячие источники", value: "есть" },
      { label: "Скала «Разбитое сердце»", value: "рядом" },
    ],
  },
  {
    id: "skazka-canyon",
    name: "Skazka Canyon",
    nameRu: "Каньон Сказка",
    region: "Иссык-Кульская область",
    category: "nature",
    description:
      "A fantastical red and yellow clay canyon on the southern shore of Issyk-Kul. Eroded formations resemble castles, animals, and mythical creatures.",
    descriptionRu:
      "Причудливый красно-жёлтый глиняный каньон на южном берегу Иссык-Куля. Выветренные формы напоминают замки, животных и мифических существ.",
    longDescription:
      "Skazka — 'Fairy Tale' — lives up to its name. This open-air gallery of eroded clay and sandstone on the southern shore of Issyk-Kul looks like the set of a fantasy film. Wind and water have sculpted the soft rock into towers, arches, and figures that locals liken to dragons, elephants, and ancient fortresses. The palette shifts from deep red to golden yellow depending on the angle of the sun.\n\nThe canyon is easily reached by a short walk from the main road between Bokonbayevo and Tosor, making it a popular stop for travellers circumnavigating the lake. There are no marked trails — visitors wander freely among the formations, which glow intensely at sunrise and sunset. The site is best visited in dry weather, as clay paths become slippery after rain.",
    longDescriptionRu:
      "Сказка — название, которое оправдывает себя. Эта галерея под открытым небом из выветренной глины и песчаника на южном берегу Иссык-Куля похожа на декорации фэнтезийного фильма. Ветер и вода создали башни, арки и фигуры, которые местные сравнивают с драконами, слонами и древними крепостями. Палитра меняется от тёмно-красного до золотисто-жёлтого в зависимости от солнца.\n\nКаньон легко достичь короткой прогулкой от дороги между Боконбаево и Тосор — популярная остановка для путешественников, объезжающих озеро. Троп нет — гости свободно бродят среди причудливых скал, которые особенно ярки на рассвете и закате. Лучше приезжать в сухую погоду: глиняные тропы скользкие после дождя.",
    rating: 4.7,
    reviewCount: 978,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    ],
    coordinates: [77.12, 42.48],
    bestSeason: "Май — Октябрь",
    difficulty: "easy",
    facts: [
      { label: "Расположение", value: "южный берег Иссык-Куля" },
      { label: "Тип породы", value: "глина, песчаник" },
      { label: "Лучшее время", value: "рассвет и закат" },
      { label: "Вход", value: "символический" },
    ],
  },
  {
    id: "altyn-arashan",
    name: "Altyn-Arashan Hot Springs",
    nameRu: "Алтын-Арашан",
    region: "Иссык-Кульская область",
    category: "sport",
    description:
      "A legendary trekking destination with natural hot springs at 2,600 m. Alpine meadows, snow-capped peaks, and rustic guesthouses in the gorge.",
    descriptionRu:
      "Легендарное место для треккинга с горячими источниками на высоте 2 600 м. Альпийские луга, снежные вершины и гостевые дома в ущелье.",
    longDescription:
      "Altyn-Arashan — 'Golden Spa' — is reached by a demanding 15-km trek or jeep ride from Ak-Suu village near Karakol. The gorge opens into a high-altitude valley at 2,600 m, where natural hot springs bubble up at 35–40°C against a backdrop of the 5,020-m Peak Palatka. Rustic guesthouses offer basic accommodation and home-cooked meals for trekkers who come to soak their muscles after long days on the trail.\n\nThe valley serves as a base camp for ascents to Ala-Kul lake and the Ala-Kul Pass (3,860 m), one of the most spectacular day hikes in Kyrgyzstan. Wildflowers carpet the meadows in July, and the surrounding Terskey Ala-Too range offers routes for all levels. Winter visits are possible for ski touring, though access requires snowshoes or skis.",
    longDescriptionRu:
      "Алтын-Арашан — «Золотой источник» — добираются пешком 15 км или на джипе из села Ак-Сuu у Каракола. Ущелье выходит в высокогорную долину на 2 600 м, где горячие источники 35–40°C бьют на фоне пика Палатка (5 020 м). Простые гостевые дома принимают тrekkerов после долгих дней в горах.\n\nДолина — базовый лагерь для восхождений к озеру Ала-Куль и перевалу Ала-Куль (3 860 м), одному из лучших однодневных маршрутов Кыргызстана. В июле луга покрыты дикими цветами, а хребет Терскей Ала-Тoo предлагает тропы для любого уровня. Зимой возможен лыжный туризм, но нужны лыжи или снегоступы.",
    rating: 4.9,
    reviewCount: 1124,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    ],
    coordinates: [78.65, 42.52],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "hard",
    facts: [
      { label: "Высота", value: "2 600 м" },
      { label: "Температура источников", value: "35–40°C" },
      { label: "Пик Палатка", value: "5 020 м" },
      { label: "Трек от Ак-Сuu", value: "15 км" },
    ],
  },
  {
    id: "barskoon-waterfall",
    name: "Barskoon Waterfalls",
    nameRu: "Барскон — водопады",
    region: "Иссык-Кульская область",
    category: "nature",
    description:
      "A series of stunning waterfalls in the Barskoon Gorge on Issyk-Kul's southern shore. Yuri Gagarin's favourite retreat in Kyrgyzstan.",
    descriptionRu:
      "Каскад живописных водопадов в ущелье Барскон на южном берегу Иссык-Куля. Любимое место отдыха Юрия Гагарина в Кыргызстане.",
    longDescription:
      "The Barskoon Gorge, entering the Terskey Ala-Too mountains from Issyk-Kul's southern shore, hides some of the most accessible yet impressive waterfalls in the country. The main cascade drops 24 metres over a wide rock face, while smaller falls dot the gorge further upstream. A well-maintained trail follows the Barskoon River through spruce forest, with picnic spots along the way.\n\nThe gorge gained fame when cosmonaut Yuri Gagarin visited after his space flight and declared Kyrgyzstan's nature his favourite on Earth — a monument to him stands at the gorge entrance. The area is also known for its gold mine (Kumtor is nearby) and as the starting point for treks to the Barskoon Pass and glacial lakes. Summer weekends can be busy with local families, but weekday visits offer solitude.",
    longDescriptionRu:
      "Ущелье Барскон, входящее в горы Терскей Ала-Тoo с южного берега Иссык-Куля, скрывает одни из самых доступных и впечатляющих водопадов страны. Главный каскад сбрасывает 24 м по широкой скале, выше по течению — меньшие водопады. Ухоженная тропа идёт вдоль реки через еловый лес с местами для пикника.\n\nУщелье прославилось визитом Юрия Гагарина после полёта в космос — он назвал природу Кыргызстана любимой на Земле; у входа стоит памятник. Рядом расположен золотой рудник Кумтор, а также начало маршрутов к перевалу Барскон и ледниковым озёрам. В выходные бывает многолюдно, в будни — уединённо.",
    rating: 4.6,
    reviewCount: 756,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    ],
    coordinates: [77.77, 42.21],
    bestSeason: "Май — Сентябрь",
    difficulty: "easy",
    facts: [
      { label: "Высота главного водопада", value: "24 м" },
      { label: "Памятник Гагарину", value: "у входа в ущелье" },
      { label: "Расстояние от Бокonbayevo", value: "~30 км" },
      { label: "Тип ландшафта", value: "еловый лес, река" },
    ],
  },
  {
    id: "sary-chelek",
    name: "Sary-Chelek Lake",
    nameRu: "Сary-Чelek",
    region: "Джalal-Аbadская область",
    category: "lake",
    description:
      "A pristine alpine lake in a UNESCO biosphere reserve. Deep blue water surrounded by dense forest and snow-capped peaks up to 4,000 m.",
    descriptionRu:
      "Чистейшее горное озеро в биосферном заповеднике UNESCO. Глубокая синяя вода, густой лес и снежные вершины до 4 000 м.",
    longDescription:
      "Sary-Chelek — 'Yellow Bucket' — is the jewel of a UNESCO Biosphere Reserve in the western Tien Shan. The lake sits at 1,873 m, stretching 7.5 km through a forested gorge with depths reaching 234 m. Its water shifts from turquoise to deep sapphire depending on the light, and the surrounding slopes are covered in walnut, apple, and wild fruit forests that bloom spectacularly in spring.\n\nAccess requires a permit from the reserve office in Arkyt village, and overnight stays are restricted to designated camping zones. A network of trails connects Sary-Chelek with six smaller lakes in the reserve. The area sees far fewer tourists than Issyk-Kul or Son-Kul, offering a genuine wilderness experience with opportunities to spot bears, lynx, and golden eagles.",
    longDescriptionRu:
      "Сary-Чelek — «Жёлтое ведро» — жемчужина биосферного заповедника ЮНЕСКО в западном Тянь-Шане. Озеро расположено на высоте 1 873 м, его длина 7,5 км, а глубина достигает 234 м. Вода меняет оттенок от бирюзового до сапфирового, а склоны покрыты ореховыми, яблоневыми и дикими фруктовыми лесами, особенно красивыми весной.\n\nДля посещения нужен пропуск в офисе заповедника в селе Аркыт, ночлег разрешён только в специально отведённых зонах. Тропы связывают Сary-Чelek с шестью меньшими озёрами заповедника. Здесь гораздо меньше туристов, чем на Иссыk-Kule или Сon-Kule — настоящая дикая природа, где можно увидеть медведей, рysей и berkutov.",
    rating: 4.9,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    ],
    coordinates: [71.8, 41.87],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "medium",
    facts: [
      { label: "Статус", value: "UNESCO Biosphere Reserve" },
      { label: "Высота", value: "1 873 м" },
      { label: "Максимальная глубина", value: "234 м" },
      { label: "Длина", value: "7,5 км" },
    ],
  },
  {
    id: "chon-kemin",
    name: "Chon-Kemin Valley",
    nameRu: "Чon-Кemin",
    region: "Чuyская область",
    category: "nature",
    description:
      "A wide alpine valley and national park between two mountain ranges. Horse trekking, yurt stays, and pristine rivers 150 km from Bishkek.",
    descriptionRu:
      "Широкая альпийская долина и национальный парк между двумя хребтами. Конный тrekking, юрты и чистые реки в 150 км от Бишкека.",
    longDescription:
      "The Chon-Kemin Valley is a 120-km-long corridor of meadows and rivers nestled between the Kungey Ala-Too and Zailiysky Ala-Too ranges. Designated a national park in 1997, it preserves some of the most biodiverse grasslands in Central Asia, home to deer, marmots, and over 150 bird species. The Chon-Kemin River, a tributary of the Chu, runs crystal-clear through the valley.\n\nThis is prime horse trekking country — local guides lead multi-day rides across jailoo (summer pastures) where nomadic families still graze their flocks. Several community-based tourism projects offer yurt homestays and traditional meals. The valley is also historically significant: the Battle of Makhram took place here in 1860. Easy access from Bishkek (2.5 hours) makes it ideal for weekend escapes.",
    longDescriptionRu:
      "Долина Чon-Кemin — 120-километровый коридор лугов и рек между хребтами Kungey Ala-Too и Zailiysky Ala-Too. Национальный парк с 1997 года, одни из самых biodiverse степей Центральной Азии: оlenи, сурки, более 150 видов птиц. Река Chon-Kemin — приток Chu — течёт crystal-clear по долине.\n\nИдеальная страна для конного trekking — гиды ведут многодневные поездки по jailoo, где кочевники пасут стada. Community-based проекты предлагают юрты и традиционную кухню. Исторически значимо: здесь была битва при Makhram в 1860 году. От Бишкека 2,5 часа — отличный weekend.",
    rating: 4.7,
    reviewCount: 523,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    ],
    coordinates: [75.8, 42.75],
    bestSeason: "Май — Октябрь",
    difficulty: "easy",
    facts: [
      { label: "Длина долины", value: "120 км" },
      { label: "Национальный парк", value: "с 1997 года" },
      { label: "Расстояние от Бишкека", value: "150 км" },
      { label: "Виды птиц", value: "более 150" },
    ],
  },
  {
    id: "konorchek-canyon",
    name: "Konorchek Canyon",
    nameRu: "Конorchek",
    region: "Чuyская область",
    category: "nature",
    description:
      "Martian landscapes of red volcanic canyons 125 km from Bishkek. Towering clay columns and labyrinths formed over millions of years.",
    descriptionRu:
      "Марсианские пейзажи красных вулканических каньонов в 125 км от Бишкека. Глиняные столбы и лабиринты, формировавшиеся миллионы лет.",
    longDescription:
      "Konorchek Canyon looks like it belongs on another planet. Located in the Boom Gorge east of Bishkek, this geological wonder consists of red-brown volcanic tuff eroded over 2–3 million years into a maze of towers, walls, and narrow passages. Some columns rise 200 metres above the canyon floor, their layered strata telling the story of ancient eruptions.\n\nThe canyon is divided into two sections: the lower, more accessible area (a 2-hour walk from the parking lot) and the upper canyon, which requires a full day to explore. There is no shade and no water on the trail, so visits demand sun protection and plenty of supplies. Spring and autumn offer the most comfortable temperatures; summer heat can exceed 40°C. The nearby Boom Gorge itself is a dramatic gateway between the Chuy Valley and Issyk-Kul.",
    longDescriptionRu:
      "Каньон Konorchek будто с другой пlanеты. В ущелье Boom к востоку от Бишкека — красно-коричневый вулканический tuff, выветренный за 2–3 млн лет в лабиринт башен, стен и узких проходов. Столбы до 200 м рассказывают об ancient eruptions.\n\nДва сектора: нижний (2 часа от парковки) и верхний — на целый день. Нет тени и воды — нужны sun protection и запасы. Весна и осень комfortнее; летом жара до 40°C. Рядом ущелье Boom — dramatic ворота между Chuy Valley и Issyk-Kul.",
    rating: 4.8,
    reviewCount: 689,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    ],
    coordinates: [74.53, 42.35],
    bestSeason: "Март — Май, Сентябрь — Октябрь",
    difficulty: "medium",
    facts: [
      { label: "Расстояние от Бишкека", value: "125 км" },
      { label: "Высота столбов", value: "до 200 м" },
      { label: "Возраст пород", value: "2–3 млн лет" },
      { label: "Тип породы", value: "вулканический tuff" },
    ],
  },
  {
    id: "chatyr-kul",
    name: "Chatyr-Kul Lake",
    nameRu: "Чatyr-Kul",
    region: "Narynская область",
    category: "lake",
    description:
      "A remote high-altitude lake at 3,530 m on the Torugart Pass route. One of the largest and highest lakes in Kyrgyzstan, fringed by barren peaks.",
    descriptionRu:
      "Удалённое высокогорное озеро на 3 530 м на пути к перевалу Torugart. Одно из крупнейших и highest озёр Кыргызstan, в окружении голых вершин.",
    longDescription:
      "Chatyr-Kul — 'Celestial Lake' — lies in a treeless basin at 3,530 m on the road to the Torugart Pass and China. Covering 175 km², it is one of the largest high-altitude lakes in Central Asia, yet remains remarkably untouched due to its remote location and harsh climate. The lake freezes from October to April, and even in summer, temperatures rarely exceed 10°C.\n\nThe drive to Chatyr-Kul is an adventure in itself, crossing the Dolon Pass (3,030 m) with sweeping views of the At-Bashi range. Wildlife includes wild yaks, Tibetan gazelles, and numerous bird species — the lake is part of the Chatyr-Kul Ramsar wetland site. A border zone permit is required, obtainable in Naryn. There are no facilities at the lake; travellers must bring camping gear and supplies.",
    longDescriptionRu:
      "Чatyr-Kul — «Небесное озеро» — в безлесном basin на 3 530 м на дороге к Torugart и Китаю. Площадь 175 km² — одно из крупнейших high-altitude озёр Центральной Азии, мало trodden из-за remoteness и сурового климата. Замерзает с октября по апрель, летом редко выше 10°C.\n\nДорога — приключение: перевал Dolon (3 030 м), виды на At-Bashi. Дикие yaks, Tibetan gazelles, птицы — Ramsar site. Нужен border permit в Naryn. У озера нет инфраструктуры — палатка и запасы обязательны.",
    rating: 4.7,
    reviewCount: 287,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    ],
    coordinates: [75.2, 40.62],
    bestSeason: "Июнь — Август",
    difficulty: "hard",
    facts: [
      { label: "Высота", value: "3 530 м" },
      { label: "Площадь", value: "175 km²" },
      { label: "Статус", value: "Ramsar wetland" },
      { label: "Перевал Torugart", value: "рядом" },
    ],
  },
  {
    id: "kyzart",
    name: "Kyzart Village",
    nameRu: "Kyzart",
    region: "Narynская область",
    category: "culture",
    description:
      "A mountain village and gateway to Son-Kul Lake. Experience authentic nomadic hospitality, horse games, and the Kyzart Pass trek.",
    descriptionRu:
      "Горное село — ворота к Son-Kul. Authentic nomadic гостеприимство, конные игры и trek через перевал Kyzart.",
    longDescription:
      "Kyzart is a small village at 2,200 m in the Tian Shan foothills, increasingly popular as an alternative starting point for treks to Son-Kul Lake. Unlike the main road approach, the Kyzart route follows ancient shepherd trails through wildflower meadows and over the 3,400-m Kyzart Pass, offering a more immersive multi-day experience.\n\nThe village itself is a window into rural Kyrgyz life. Community tourism initiatives welcome guests into family homes and yurts, serving beshbarmak, kumys, and fresh dairy products. Summer brings horse games and festivals on the jailoo. Kyzart is also a birdwatcher's paradise — black storks, griffon vultures, and golden eagles nest on the surrounding cliffs. The village is reachable from Bishkek in about 5 hours via Kochkor.",
    longDescriptionRu:
      "Kyzart — село на 2 200 м у подножия Tian Shan, популярная альтернативная база для trek к Son-Kul. Маршрут через Kyzart идёт по shepherd trails через луга и перевал Kyzart (3 400 м) — более immersive многодневный опыт.\n\nСело — окно в rural Kyrgyz life. Community tourism: дома и юрты, beshbarmak, kumys, молочные продукты. Летом — конные игры и festivals на jailoo. Район для birdwatching: black storks, griffon vultures, berkutы на скалах. От Бишкека через Kochkor ~5 часов.",
    rating: 4.6,
    reviewCount: 345,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    ],
    coordinates: [75.58, 42.28],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "medium",
    facts: [
      { label: "Высота", value: "2 200 м" },
      { label: "Перевал Kyzart", value: "3 400 м" },
      { label: "До Son-Kul", value: "2–3 дня пешком" },
      { label: "От Бишкека", value: "~5 часов" },
    ],
  },
  {
    id: "uzgen-minaret",
    name: "Uzgen Minaret",
    nameRu: "Uzgen minaret",
    region: "Oshская область",
    category: "history",
    description:
      "An 11th-century Karakhanid minaret and three mausoleums in the ancient city of Uzgen. Intricate brickwork and Silk Road history.",
    descriptionRu:
      "Минарет Karakhanid XI века и три mausolea в дrevnem Uzgen. Изысканная кирпичная кладка и история Silk Road.",
    longDescription:
      "The Uzgen Historical-Architectural Complex preserves some of the finest Karakhanid architecture in Central Asia. The 27.5-metre minaret, built in the 11th–12th centuries, features exquisite terracotta ornamentation with geometric and floral patterns that have survived nearly a millennium. Three mausoleums of varying sizes stand nearby, believed to be tombs of Karakhanid rulers.\n\nUzgen was an important Silk Road trading centre before the Mongol invasions shifted trade routes. The site sits on a high bank above the Kara-Darya river, 54 km from Osh. A small museum displays artefacts from excavations in the area. The complex is compact and can be explored in an hour, making it an easy cultural stop for travellers heading between Osh and the Fergana Valley.",
    longDescriptionRu:
      "Uzgen Historical-Architectural Complex — одна из лучших Karakhanid построек Центральной Азии. Минарет 27,5 м (XI–XII вв.) с terracotta ornamentation: geometric и floral узоры почти тысячу лет. Три mausolea nearby — предполагаемые tombы правителей.\n\nUzgen — важный Silk Road центр до Mongol invasions. На высоком берегу Kara-Darya, 54 km от Osh. Музей с находками раскопок. Компактный — час на осмотр, удобная культурная остановка между Osh и Fergana Valley.",
    rating: 4.5,
    reviewCount: 478,
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    ],
    coordinates: [72.75, 40.77],
    bestSeason: "Апрель — Октябрь",
    difficulty: "easy",
    facts: [
      { label: "Высота минарета", value: "27,5 м" },
      { label: "Период постройки", value: "XI–XII век" },
      { label: "Расстояние от Osh", value: "54 km" },
      { label: "Mausolea", value: "3 здания" },
    ],
  },
  {
    id: "kol-tor-lake",
    name: "Köl-Tör Lake",
    nameRu: "Köl-Tör",
    region: "Chuyская область",
    category: "lake",
    description:
      "A stunning turquoise alpine lake at 2,724 m, reached by a moderate 2-hour hike from Kegety Gorge. One of Bishkek's best day trips.",
    descriptionRu:
      "Бирюзовое alpine озеро на 2 724 м — уmerенный 2-часовой hike из Kegety Gorge. Один из лучших day trips из Бишкека.",
    longDescription:
      "Köl-Tör — 'Blue Lake' — has become one of the most popular day hikes from Bishkek thanks to its extraordinary colour and relatively accessible trail. Starting from the Kegety Gorge, 90 km east of the capital, the path climbs through spruce forest and alpine meadows to the lake at 2,724 m. The water shifts from emerald to turquoise depending on the season and light.\n\nThe round-trip hike takes 4–5 hours at a moderate pace, making it achievable for fit beginners. The trail is well-trodden but unmarked in places — hiring a local guide from the Kegety village is recommended. Summer weekends draw crowds, so early morning starts offer the best experience. Wild horses and marmots are common sights along the route. The lake is frozen and inaccessible from November to May.",
    longDescriptionRu:
      "Köl-Tör — «Гoluboe озеро» — популярный day hike из Бишкека: extraordinary colour и доступная тропа. Старт из Kegety Gorge, 90 km к востоку от столицы, через еловый лес и луга к озеру на 2 724 м. Вода от emerald до turquoise.\n\nКруговой маршрут 4–5 часов — achievable для подготовленных новичков. Тропа без разmetки — лучше гид из Kegety. В выходные многолюдно — ранний старт. Дикие лошади и сурки по пути. С ноября по май замёрзшее и недоступное.",
    rating: 4.8,
    reviewCount: 1345,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    coordinates: [74.69, 42.74],
    bestSeason: "Июнь — Сентябрь",
    difficulty: "medium",
    facts: [
      { label: "Высота", value: "2 724 м" },
      { label: "Hike от парковки", value: "~2 часа" },
      { label: "Расстояние от Бишкека", value: "90 km" },
      { label: "Тип маршрута", value: "круговой, 4–5 ч" },
    ],
  },
  {
    id: "osh-city",
    name: "Osh — Ancient City",
    nameRu: "Osh",
    region: "Oshская область",
    category: "culture",
    description:
      "Kyrgyzstan's second city and the cultural capital of the south. A 3,000-year-old bazaar, diverse cuisine, and gateway to the Pamir Highway.",
    descriptionRu:
      "Второй город Кыргызstan и культурная столица юга. 3 000-летний bazaar, разнообразная кухня и ворота к Pamir Highway.",
    longDescription:
      "Osh is one of the oldest continuously inhabited cities in Central Asia, with a history stretching back at least 3,000 years. Located in the fertile Fergana Valley near the Uzbek border, it has served as a crossroads of cultures, religions, and trade routes for millennia. The Jayma Bazaar — one of the largest and oldest markets in Central Asia — fills kilometres of stalls with spices, dried fruits, textiles, and crafts.\n\nThe city's multicultural identity blends Kyrgyz, Uzbek, Tajik, and Russian influences in its food, architecture, and daily life. Beyond Sulaiman-Too, visitors explore the Russian Orthodox church, the Rabat Abdul Khan Mosque, and a vibrant café scene along Kurmanjan Datka Street. Osh is the practical starting point for the Pamir Highway to Tajikistan and trips to the Alay Valley and Lenin Peak base camp.",
    longDescriptionRu:
      "Osh — один из oldest непрерывно inhabited городов Центральной Азии, история не менее 3 000 лет. В fertile Fergana Valley у границы с Uzbekistan — crossroads культур, религий и trade routes. Jayma Bazaar — один из крупнейших и oldest рынков региона: километры spices, сухofруктов, textiles и crafts.\n\nMulticultural identity: Kyrgyz, Uzbek, Tajik, Russian — в еде, архитектуре, daily life. Помимо Sulaiman-Too — Russian Orthodox church, Rabat Abdul Khan Mosque, café scene на Kurmanjan Datka. Практичный старт Pamir Highway в Tajikistan и поездок в Alay Valley и base camp Lenin Peak.",
    rating: 4.6,
    reviewCount: 1567,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    ],
    coordinates: [72.79, 40.53],
    bestSeason: "Апрель — Октябрь",
    facts: [
      { label: "Население", value: "~300 000 чел." },
      { label: "Возраст города", value: "более 3 000 лет" },
      { label: "Jayma Bazaar", value: "один из старейших в CA" },
      { label: "Pamir Highway", value: "старт отсюда" },
    ],
  },
];
