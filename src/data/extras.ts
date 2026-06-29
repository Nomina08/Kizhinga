import type {
  DistrictEvent,
  CultureTopic,
  NatureTopic,
  Panorama,
  Settlement,
  PopulationPoint,
} from '@/types';

const WIKI = 'https://upload.wikimedia.org/wikipedia/commons';

export const districtEvents: DistrictEvent[] = [
  {
    id: 1,
    title: 'Сур Харбан — весенний праздник',
    date: 'Март — апрель',
    month: 3,
    location: 'Село Кижинга',
    coordinates: [51.835, 109.932],
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Сур Харбан — один из главных весенних праздников бурят. Жители района собираются на степных просторах, устраивают состязания в борьбе, скачках и стрельбе из лука. Праздник символизирует пробуждение природы и начало нового скотоводческого сезона.',
    category: 'holiday',
  },
  {
    id: 2,
    title: 'День дацана',
    date: 'Июль',
    month: 7,
    location: 'Кижингинский дацан',
    coordinates: [51.85, 109.95],
    imageUrl: `${WIKI}/2/2d/Kizhinginsky_datsan.jpg`,
    description:
      'Ежегодное торжество в честь основания Кижингинского дацана. Паломники и гости приезжают со всей Бурятии: службы, молитвенные обряды, ярмарка народных промыслов и традиционная кухня.',
    category: 'religion',
  },
  {
    id: 3,
    title: 'Праздник боргойской баранины',
    date: 'Август',
    month: 8,
    location: 'Боргойская степь',
    coordinates: [51.82, 109.88],
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Гастрономический фестиваль, посвящённый знаменитой боргойской баранине. Пастухи демонстрируют лучшие породы овец, повара готовят блюда на открытом огне, звучат улигершин и народные песни.',
    category: 'culture',
  },
  {
    id: 4,
    title: 'День Победы — митинг у памятника',
    date: '9 мая',
    month: 5,
    location: 'Село Кижинга',
    coordinates: [51.835, 109.932],
    imageUrl: `${WIKI}/thumb/8/8e/Memorial_in_Kizhinga.jpg/1280px-Memorial_in_Kizhinga.jpg`,
    description:
      'Торжественный митинг и шествие у памятника воинам-землякам. Возложение цветов, минута молчания, концерт для ветеранов и участников Великой Отечественной войны.',
    category: 'holiday',
  },
  {
    id: 5,
    title: 'Сagaalgan — белый месяц',
    date: 'Февраль — март',
    month: 2,
    location: 'По всему району',
    coordinates: [51.82, 109.92],
    imageUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/1280px-Buryat_musicians.jpg`,
    description:
      'Сagaalgan — главный буддийский праздник встречи нового года по лунному календарю. В дацанах проходят молитвы, а семьи навещают друг друга с белыми дарами — символами чистоты и благополучия.',
    category: 'religion',
  },
  {
    id: 6,
    title: 'Степной марафон и конные скачки',
    date: 'Июнь',
    month: 6,
    location: 'Боргойская степь',
    coordinates: [51.82, 109.88],
    imageUrl: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    description:
      'Спортивные состязания на степных просторах: конные скачки, национальная борьба и эстафеты. Молодёжь и гости района участвуют в соревнованиях под открытым небом.',
    category: 'sport',
  },
];

export const cultureTopics: CultureTopic[] = [
  {
    id: 1,
    slug: 'clothing',
    title: 'Национальная одежда',
    subtitle: 'Дээл, малгай и украшения',
    imageUrl: `${WIKI}/thumb/9/9e/Buryat_family.jpg/1280px-Buryat_family.jpg`,
    description:
      'Традиционная бурятская одежда — дээл с широким поясом, малгай и серебряные украшения — отражает статус, возраст и принадлежность к роду. В Кижингинском районе сохранились мастера, передающие технику вышивки и пошива из поколения в поколение.',
    gallery: [
      `${WIKI}/thumb/9/9e/Buryat_family.jpg/1280px-Buryat_family.jpg`,
      `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/1280px-Buryat_musicians.jpg`,
    ],
  },
  {
    id: 2,
    slug: 'holidays',
    title: 'Праздники',
    subtitle: 'Сур Харбан, Сagaalgan и народные гулянья',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Календарь района насыщен праздниками: весенний Сур Харбан, буддийский Сagaalgan, праздники урожая и сбора стада. Каждый праздник сочетает древние обряды с современными народными гуляньями.',
    gallery: [`${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`],
  },
  {
    id: 3,
    slug: 'traditions',
    title: 'Традиции',
    subtitle: 'Кочевое скотоводство и гостеприимство',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Кижингинский район — край кочевых традиций: уважение к старшим, гостеприимство, передача скота по наследству и общинные праздники. Боргойская степь хранит живую память о nomadic образе жизни.',
    gallery: [`${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`],
  },
  {
    id: 4,
    slug: 'games',
    title: 'Игры и состязания',
    subtitle: 'Борьба, стрельба из лука, скачки',
    imageUrl: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    description:
      'Национальные игры бурят — бóхэ, стрельба из лука и конные скачки — до сих пор проводятся на праздниках. Они воспитывают силу, ловкость и уважение к сопернику.',
    gallery: [`${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`],
  },
  {
    id: 5,
    slug: 'music',
    title: 'Песни и улигершин',
    subtitle: 'Эпическое пение под домбру',
    imageUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/1280px-Buryat_musicians.jpg`,
    description:
      'Улигершин — уникальное искусство бурятских сказителей. Цырендоржиев Ринчин, уроженец этих мест, стал легендой жанра. Эпосы рассказывают о героях, духах степи и судьбе народа.',
    gallery: [`${WIKI}/thumb/8/8a/Buryat_musicians.jpg/1280px-Buryat_musicians.jpg`],
  },
  {
    id: 6,
    slug: 'buddhism',
    title: 'Буддизм',
    subtitle: 'Дацаны и духовная жизнь',
    imageUrl: `${WIKI}/2/2d/Kizhinginsky_datsan.jpg`,
    description:
      'Буддизм пронизывает жизнь района: дацаны, ступы, молитвенные флаги и обряды. Кижингинский дацан «Дэчен Дагба Лхундублинг» — один из главных духовных центров Забайкалья.',
    gallery: [`${WIKI}/2/2d/Kizhinginsky_datsan.jpg`],
  },
  {
    id: 7,
    slug: 'cuisine',
    title: 'Кухня',
    subtitle: 'Боргойская баранина и традиционные блюда',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Боргойская баранина, буузы, сэсэг и традиционный чай с молоком — визитная карточка гостеприимства. Мясо готовят на открытом огне, используя травы степи.',
    gallery: [`${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`],
  },
  {
    id: 8,
    slug: 'rituals',
    title: 'Обряды',
    subtitle: 'Шаманские и буддийские традиции',
    imageUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    description:
      'В районе переплетаются буддийские и шаманские традиции: подношения духам гор, обряды у источников, молитвы в дацанах. Священные места — Аршан, Ехэ-Хада — окружены особым почтением.',
    gallery: [`${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`],
  },
];

export const natureTopics: NatureTopic[] = [
  {
    id: 1,
    slug: 'mountains',
    title: 'Горы',
    subtitle: 'Ехэ-Хада и хребты Забайкалья',
    imageUrl: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    description:
      'Гора Ехэ-Хада возвышается над степью как немой страж. С вершины открываются панорамы на реку Уда и бескрайние удолия. Горы района — место для походов, медитаций и наблюдения за редкой флорой.',
    coordinates: [51.8, 110.05],
    gallery: [`${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`],
  },
  {
    id: 2,
    slug: 'rivers',
    title: 'Реки',
    subtitle: 'Уда и степные притоки',
    imageUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    description:
      'Река Уда и её притоки питают степные долины. Весной воды разливаются, создавая зелёные оазисы среди золотых просторов. Рыбалка и отдых у воды — часть жизни местных жителей.',
    coordinates: [51.82, 109.9],
    gallery: [`${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`],
  },
  {
    id: 3,
    slug: 'forests',
    title: 'Леса',
    subtitle: 'Сосновые боры у источников',
    imageUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    description:
      'Сосновые боры вокруг целебных источников создают особый микроклимат: чистый воздух, тишина и аромат хвои. Лесные тропы ведут к ключам и смотровым площадкам.',
    coordinates: [51.75, 109.8],
    gallery: [`${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`],
  },
  {
    id: 4,
    slug: 'wildlife',
    title: 'Животные',
    subtitle: 'Степная фауна Забайкалья',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'На просторах района обитают суслики, журавли, орлы, лисы и табуны лошадей. Степь — дом для овец и крупного рогатого скота, а также редких видов птиц, занесённых в Красную книгу.',
    gallery: [`${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`],
  },
  {
    id: 5,
    slug: 'plants',
    title: 'Редкие растения',
    subtitle: 'Степные травы и лекарственные сборы',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Весной степь расцветает редкими травами: дикий лук, целебные сборы, степные цветы. Местные знахари передают знания о лекарственных растениях из поколения в поколение.',
    gallery: [`${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`],
  },
  {
    id: 6,
    slug: 'landscapes',
    title: 'Красивые места',
    subtitle: 'Боргойская степь и панорамы',
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Боргойская степь, долины у Уды, виды с Ехэ-Хада — места, где золото заката встречается с изумрудом трав. Лучшее время для фото — рассвет и закат в летние месяцы.',
    coordinates: [51.82, 109.88],
    gallery: [
      `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
      `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    ],
  },
];

export const panoramas: Panorama[] = [
  {
    id: 1,
    title: 'Кижингинский дацан',
    subtitle: '360° вид на белоснежные стены храма',
    thumbnailUrl: `${WIKI}/2/2d/Kizhinginsky_datsan.jpg`,
    panoramaImage: `${WIKI}/2/2d/Kizhinginsky_datsan.jpg`,
    coordinates: [51.85, 109.95],
    landmarkId: 1,
  },
  {
    id: 2,
    title: 'Боргойская степь',
    subtitle: 'Панорама бескрайних пастбищ',
    thumbnailUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    panoramaImage: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    coordinates: [51.82, 109.88],
    landmarkId: 5,
  },
  {
    id: 3,
    title: 'Гора Ехэ-Хада',
    subtitle: 'Вид с подножия священной горы',
    thumbnailUrl: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    panoramaImage: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    coordinates: [51.8, 110.05],
    landmarkId: 2,
  },
  {
    id: 4,
    title: 'Целебный источник Аршан',
    subtitle: 'Сосновый бор и минеральные ключи',
    thumbnailUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    panoramaImage: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    coordinates: [51.75, 109.8],
    landmarkId: 3,
  },
];

export const settlements: Settlement[] = [
  { id: 1, name: 'Кижинга', population: 6800, coordinates: [51.835, 109.932], type: 'center' },
  { id: 2, name: 'Хоринский', population: 4200, coordinates: [51.88, 109.78], type: 'village' },
  { id: 3, name: 'Боргой', population: 2100, coordinates: [51.82, 109.88], type: 'village' },
  { id: 4, name: 'Аршан', population: 1800, coordinates: [51.75, 109.8], type: 'village' },
  { id: 5, name: 'Кырен', population: 1500, coordinates: [51.78, 110.02], type: 'village' },
  { id: 6, name: 'Уст-Уда', population: 3200, coordinates: [51.86, 110.08], type: 'village' },
];

export const populationHistory: PopulationPoint[] = [
  { year: 1959, population: 12400 },
  { year: 1970, population: 15800 },
  { year: 1979, population: 19200 },
  { year: 1989, population: 24500 },
  { year: 2002, population: 26800 },
  { year: 2010, population: 28100 },
  { year: 2021, population: 27600 },
];

export const ethnicComposition = [
  { label: 'Буряты', percent: 72, color: '#1a6b47' },
  { label: 'Русские', percent: 22, color: '#1e5a8a' },
  { label: 'Другие', percent: 6, color: '#c4a035' },
];
