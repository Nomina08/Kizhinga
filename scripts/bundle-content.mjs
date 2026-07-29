import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');
const outFile = path.join(root, 'src', 'generated', 'content.json');

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

function sortById(items) {
  return items.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
}

function sortBySlug(items) {
  return items.sort((a, b) => (a.slug ?? '').localeCompare(b.slug ?? ''));
}

function normalizeCoords(item) {
  if (Array.isArray(item.coordinates) && item.coordinates.length === 2) {
    return item;
  }
  if (item.latitude != null && item.longitude != null) {
    return { ...item, coordinates: [item.latitude, item.longitude] };
  }
  if (Array.isArray(item.coordinates)) {
    const coords = item.coordinates.map((c) =>
      typeof c === 'object' && c != null && 'coord' in c ? c.coord : c
    );
    return { ...item, coordinates: coords };
  }
  return item;
}

function stripLatLng(item) {
  const normalized = normalizeCoords(item);
  const { latitude, longitude, ...rest } = normalized;
  return rest;
}

function normalizeListField(list, key) {
  if (!Array.isArray(list)) return list;
  return list.map((entry) => (typeof entry === 'object' && entry != null && key in entry ? entry[key] : entry));
}

function normalizeGallery(item) {
  if (!item.gallery) return item;
  const gallery = normalizeListField(item.gallery, 'image').slice(0, 10);
  return { ...item, gallery };
}

function normalizeWithGallery(item) {
  const base = stripLatLng(item);
  if (base.gallery) {
    base.gallery = normalizeListField(base.gallery, 'image').slice(0, 10);
  }
  return base;
}

function normalizeLandmark(item) {
  const base = normalizeWithGallery(item);
  return {
    ...base,
    type: base.type ?? 'culture',
    era: base.era ?? '',
    description: base.description ?? '',
    imageUrl: base.imageUrl ?? '',
    gallery: base.gallery ?? [],
  };
}

function normalizeEvent(item) {
  const hadCoords = item.latitude != null && item.longitude != null;
  const base = normalizeWithGallery(item);
  const out = {
    ...base,
    date: base.date ?? '',
    location: base.location ?? '',
    description: base.description ?? '',
    imageUrl: base.imageUrl ?? '',
    gallery: base.gallery ?? [],
    category: base.category ?? '',
  };
  if (!hadCoords) {
    delete out.coordinates;
  }
  return out;
}

function normalizeSlugTopic(item) {
  const base = normalizeGallery(item);
  return {
    ...base,
    slug: base.slug ? String(base.slug) : String(base.id),
    subtitle: base.subtitle ?? '',
    description: base.description ?? '',
    imageUrl: base.imageUrl ?? '',
    gallery: base.gallery ?? [],
  };
}

function normalizeNatureTopic(item) {
  const hadCoords = item.latitude != null && item.longitude != null;
  const base = stripLatLng(normalizeSlugTopic(item));
  if (!hadCoords) {
    delete base.coordinates;
  }
  return base;
}

function normalizeMuseum(item) {
  const base = stripLatLng(item);
  return {
    ...base,
    village: base.village ?? '',
    founded: base.founded ?? '',
    description: base.description ?? '',
    imageUrl: base.imageUrl ?? '',
    type: base.type ?? 'local',
    highlights: normalizeListField(base.highlights ?? [], 'item'),
    gallery: base.gallery ? normalizeListField(base.gallery, 'image').slice(0, 10) : [],
  };
}

function normalizeSettings(settings) {
  if (!settings || typeof settings !== 'object') return settings;
  const out = { ...settings };
  if (out.mapCenter) {
    out.mapCenter = normalizeListField(out.mapCenter, 'coord');
  }
  if (out.tourRoutes) {
    out.tourRoutes = out.tourRoutes.map((route) => ({
      ...route,
      landmarkIds: normalizeListField(route.landmarkIds, 'id'),
    }));
  }
  if (out.gastronomy?.tips) {
    out.gastronomy = {
      ...out.gastronomy,
      tips: normalizeListField(out.gastronomy.tips, 'tip'),
    };
  }
  if (out.settlements) {
    out.settlements = out.settlements.map(stripLatLng);
  }
  return out;
}

const settingsPath = path.join(contentDir, 'settings', 'site.json');
const settings = fs.existsSync(settingsPath)
  ? JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
  : {};

const bundle = {
  landmarks: sortById(readJsonFiles(path.join(contentDir, 'landmarks')).map(normalizeLandmark)),
  people: sortById(readJsonFiles(path.join(contentDir, 'people'))),
  museums: sortById(readJsonFiles(path.join(contentDir, 'museums')).map(normalizeMuseum)),
  events: sortById(readJsonFiles(path.join(contentDir, 'events')).map(normalizeEvent)),
  culture: sortBySlug(readJsonFiles(path.join(contentDir, 'culture')).map(normalizeSlugTopic)),
  nature: sortBySlug(readJsonFiles(path.join(contentDir, 'nature')).map(normalizeNatureTopic)),
  panoramas: sortById(readJsonFiles(path.join(contentDir, 'panoramas')).map(stripLatLng)),
  legends: sortById(readJsonFiles(path.join(contentDir, 'legends'))),
  timeline: sortById(readJsonFiles(path.join(contentDir, 'timeline'))),
  settings: normalizeSettings(settings),
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(bundle, null, 2), 'utf8');

console.log(`Bundled content → ${path.relative(root, outFile)}`);
console.log(
  `  landmarks: ${bundle.landmarks.length}, people: ${bundle.people.length}, museums: ${bundle.museums.length}, events: ${bundle.events.length}`
);
