/**
 * Дополняет content/ материалами из Летописи Кижинги (поверх базового seed из git).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');
const WIKI = 'https://upload.wikimedia.org/wikipedia/commons';

function write(subdir, file, data) {
  const dir = path.join(contentDir, subdir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, file), JSON.stringify(data, null, 2));
}

function patchSettings() {
  const sitePath = path.join(contentDir, 'settings', 'site.json');
  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

  site.districtStats = [
    { id: 1, label: 'Образование района', value: '1966', icon: 'calendar' },
    { id: 2, label: 'Население', value: '~19 000', icon: 'users' },
    { id: 3, label: 'Минеральные источники', value: '15', icon: 'map' },
    { id: 4, label: 'Административный центр', value: 'Кижинга', icon: 'building' },
    { id: 5, label: 'Основано село', value: '1915', icon: 'calendar' },
    { id: 6, label: 'До Улан-Удэ', value: '200 км', icon: 'map' },
    { id: 7, label: 'Музеи района', value: '7', icon: 'building' },
  ];

  site.tourRoutes = [
    {
      id: 'spiritual',
      name: 'Духовный маршрут',
      description: 'Дацаны, ступы и священные места буддийской традиции',
      landmarkIds: [1, 7, 11],
      color: '#8b5cf6',
      duration: '3–4 часа',
      distance: '~25 км',
      difficulty: 'Лёгкий',
      season: 'Круглый год',
      badge: 'Духовный',
    },
    {
      id: 'nature',
      name: 'Природный маршрут',
      description: 'Горы, реки, целебные источники и боргойская степь',
      landmarkIds: [2, 3, 5, 8, 9, 10],
      color: '#22c55e',
      duration: '1–2 дня',
      distance: '~120 км',
      difficulty: 'Средний',
      season: 'Май — сентябрь',
      badge: 'Природа',
    },
    {
      id: 'historical',
      name: 'Исторический маршрут',
      description: 'Памятники воинам и археологические находки эпохи гуннов',
      landmarkIds: [4, 6],
      color: '#ef4444',
      duration: '5–6 часов',
      distance: '~45 км',
      difficulty: 'Лёгкий',
      season: 'Апрель — октябрь',
      badge: 'История',
    },
  ];

  site.settlements = [
    { id: 1, name: 'Кижинга', population: 6800, type: 'center', latitude: 51.835, longitude: 109.932 },
    { id: 2, name: 'Новокижингинск', population: 1200, type: 'village', latitude: 51.87, longitude: 109.96 },
    { id: 3, name: 'Загустай', population: 900, type: 'village', latitude: 51.79, longitude: 109.97 },
    { id: 4, name: 'Могсохон', population: 850, type: 'village', latitude: 51.84, longitude: 109.87 },
    { id: 5, name: 'Улзытэ', population: 780, type: 'village', latitude: 51.77, longitude: 109.91 },
    { id: 6, name: 'Верхнее Кодунск', population: 650, type: 'village', latitude: 51.86, longitude: 109.85 },
    { id: 7, name: 'Эдэрмык', population: 600, type: 'village', latitude: 51.81, longitude: 109.94 },
    { id: 8, name: 'Боргой', population: 2100, type: 'village', latitude: 51.82, longitude: 109.88 },
    { id: 9, name: 'Аршан', population: 1800, type: 'village', latitude: 51.75, longitude: 109.8 },
  ];

  site.populationHistory = [
    { year: 1959, population: 12400 },
    { year: 1970, population: 15800 },
    { year: 1979, population: 19200 },
    { year: 1989, population: 22100 },
    { year: 2002, population: 20500 },
    { year: 2010, population: 19800 },
    { year: 2021, population: 19000 },
  ];

  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2));
}

// Обновить описание дацана
const datsanPath = path.join(contentDir, 'landmarks', '1.json');
if (fs.existsSync(datsanPath)) {
  const datsan = JSON.parse(fs.readFileSync(datsanPath, 'utf8'));
  datsan.description =
    'Крупнейший дацан Республики Бурятия и один из главных духовных центров Забайкалья. История начинается в 1758 году, когда на склоне горы Челсана по монгольскому обычаю был основан первый храм в войлочной юрте. В 1773 году построили деревянный дацан, в 1853 — «Даши Лхумболинг» у реки Заха-Щибирь. В 1937 году дацан разрушили; современный комплекс восстановлен в 1991 году. На территории — четыре дугана, дома для лам, статуи Будды Шакьямуни (до 7 м) и Майтреи (до 3 м). Рядом — дуган-пещера, посвящённый yogin Миларепе. Земли района называют «долиной Субурганов».';
  fs.writeFileSync(datsanPath, JSON.stringify(datsan, null, 2));
}

const extraLandmarks = [
  {
    id: 7,
    name: 'Ступа Джарун-Хашор',
    type: 'religion',
    era: '1919 / восстановлена 2001',
    latitude: 51.848,
    longitude: 109.952,
    imageUrl: `${WIKI}/2/2d/Kizhinginsky_datsan.jpg`,
    description:
      'Великая Ступа Джарун-Хашор («Исполняющая желания») — аналог ступы Бодхнатх в окрестностях Катманду. Первоначально построена в 1919 году. В 2001 году восстановлена — 12-метровая ступа у горы Челсан.',
  },
  {
    id: 8,
    name: 'Кижингинский заказник',
    type: 'nature',
    era: 'Конец XX века',
    latitude: 51.81,
    longitude: 109.98,
    imageUrl: `${WIKI}/thumb/1/1e/Steppe_in_Buryatia.jpg/1280px-Steppe_in_Buryatia.jpg`,
    description:
      'Природный заказник создан для охраны изюбра, зайца, тетерева. Под охраной — лебедь-кликун, орлан-белохвост, журавли. Произрастает родиола розовая.',
  },
  {
    id: 9,
    name: 'Озеро Хужарта',
    type: 'nature',
    era: 'Известно с 1904 г.',
    latitude: 51.79,
    longitude: 109.86,
    imageUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    description: 'Озеро с лечебными грязями, о свойствах которых известно с 1904 года.',
  },
  {
    id: 10,
    name: 'Минеральные источники района',
    type: 'nature',
    era: 'Народная медицина',
    latitude: 51.77,
    longitude: 109.84,
    imageUrl: `${WIKI}/thumb/4/4a/Mineral_spring_in_Tunkinsky_District.jpg/1280px-Mineral_spring_in_Tunkinsky_District.jpg`,
    description:
      '15 минеральных источников. Самые доступные — Усть-Оротский, Булагский, Эрэнэйский. У каждого свой химический состав и минерализация.',
  },
  {
    id: 11,
    name: 'Гора Челсана',
    type: 'culture',
    era: '1758 — настоящее время',
    latitude: 51.852,
    longitude: 109.948,
    imageUrl: `${WIKI}/thumb/9/91/East_Sayan_mountains_01.jpg/1280px-East_Sayan_mountains_01.jpg`,
    description:
      'Священная гора района. В 1758 году на её склоне основан первый храм-дуган. Символ на гербе района.',
  },
];

extraLandmarks.forEach((l) => write('landmarks', `${l.id}.json`, l));

const extraPeople = [
  {
    id: 4,
    name: 'Хомто Намсараев',
    birthDate: '1914',
    achievement: 'Писатель, поэт, классик бурятской литературы',
    field: 'Литература',
    photoUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/800px-Buryat_musicians.jpg`,
    connectionToDistrict: 'Музей им. Х. Н. Намсараева — в с. Эдэрмык.',
    fullBiography: 'Хомто Намсараев — выдающийся писатель и поэт Бурятии.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
  {
    id: 5,
    name: 'Бато Базарон',
    birthDate: '1926',
    achievement: 'Писатель',
    field: 'Литература',
    photoUrl: `${WIKI}/thumb/9/9e/Buryat_family.jpg/800px-Buryat_family.jpg`,
    connectionToDistrict: 'Кижингинская литературная школа.',
    fullBiography: 'Бато Базарон — писатель о жизни и традициях Кижингинского района.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
  {
    id: 6,
    name: 'Намжил Бодиевич Чимитдоржиев',
    birthDate: '1938',
    achievement: 'Физик, профессор',
    field: 'Наука',
    photoUrl: `${WIKI}/4/4e/Banzarov.jpg`,
    connectionToDistrict: 'Родился в с. Улзытэ.',
    fullBiography: 'Н. Б. Чимитдоржиев — учёный-физик, музей с. Улзытэ носит его имя.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
  {
    id: 7,
    name: 'Ц-Н. Очиров',
    birthDate: 'XX век',
    achievement: 'Писатель, художник',
    field: 'Литература и искусство',
    photoUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/800px-Buryat_musicians.jpg`,
    connectionToDistrict: 'С. Могсохон.',
    fullBiography: 'Ц-Н. Очиров — прозаик и художник из Могсохона.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
  {
    id: 8,
    name: 'Ц. Н. Номтоев',
    birthDate: '1910',
    achievement: 'Поэт',
    field: 'Литература',
    photoUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/800px-Buryat_musicians.jpg`,
    connectionToDistrict: 'Кижингинская долина.',
    fullBiography: 'Ц. Н. Номтоев — поэт Кижингинской долины.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
  {
    id: 9,
    name: 'Ц. Н. Цыренжапов',
    birthDate: 'XX век',
    achievement: 'Педагог-краевед',
    field: 'Образование',
    photoUrl: `${WIKI}/thumb/9/9e/Buryat_family.jpg/800px-Buryat_family.jpg`,
    connectionToDistrict: 'Основал музей в с. Загустай.',
    fullBiography: 'Ц. Н. Цыренжапов создал школьный музей в Загустае в 1960-е годы.',
    sourceUrl: 'https://sites.google.com/view/letopise-kizhinga/',
  },
];

extraPeople.forEach((p) => write('people', `${p.id}.json`, p));

write('legends', '7.json', {
  id: 7,
  title: 'Долина Субурганов',
  text: 'Земли Кижингинского района называют «долиной Субурганов» — белоснежные ступы символизируют Просветление.',
  icon: 'landmark',
});

write('events', '7.json', {
  id: 7,
  title: 'День пожилого человека',
  date: 'Октябрь',
  month: 10,
  location: 'По всему району',
  latitude: 51.835,
  longitude: 109.932,
  imageUrl: `${WIKI}/thumb/8/8a/Buryat_musicians.jpg/1280px-Buryat_musicians.jpg`,
  description: 'Районный праздник в честь старшего поколения.',
  category: 'culture',
});

const timeline = [
  { id: 1, year: '1758', title: 'Первый храм на Челсане', description: 'На горе Челсана построен первый храм-дуган в войлочной юрте.' },
  { id: 2, year: '1853', title: 'Дацан «Даши Лхумболинг»', description: 'Дацан перенесён в низовья реки Заха-Щибирь.' },
  { id: 3, year: '1915', title: 'Основание села Шулуута', description: 'Село основано под названием Шулуута.' },
  { id: 4, year: '1919', title: 'Ступа Джарун-Хашор', description: 'Освящена Великая Ступа «Исполняющая желания».' },
  { id: 5, year: '1940', title: 'Кижингинский аймак', description: 'Образован Кижингинский аймак.' },
  { id: 6, year: '1941', title: 'Переименование в Кижингу', description: 'Село Шулуута переименовано в Кижингу.' },
  { id: 7, year: '1966', title: 'Кижингинский район', description: 'Район выделен как самостоятельная единица.' },
  { id: 8, year: '1991', title: 'Восстановление дацана', description: 'Строительство современного Кижингинского дацана.' },
  { id: 9, year: '2001', title: 'Ступа восстановлена', description: '12-метровая ступа Джарун-Хашор вновь возведена.' },
  { id: 10, year: 'Сегодня', title: 'Летопись и туризм', description: 'Летопись Кижинги (2021) сохраняет память о земле и людях.' },
];
timeline.forEach((t) => write('timeline', `${t.id}.json`, t));

patchSettings();
console.log('Patched letopis content');
