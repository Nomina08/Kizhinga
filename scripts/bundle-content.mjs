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
  const { latitude, longitude, ...rest } = item;
  return normalizeCoords(rest);
}

function normalizeListField(list, key) {
  if (!Array.isArray(list)) return list;
  return list.map((entry) => (typeof entry === 'object' && entry != null && key in entry ? entry[key] : entry));
}

function normalizeMuseum(item) {
  const base = stripLatLng(item);
  if (base.highlights) base.highlights = normalizeListField(base.highlights, 'item');
  return base;
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

function normalizeGallery(item) {
  if (!item.gallery) return item;
  const gallery = item.gallery.map((g) =>
    typeof g === 'object' && g != null && 'image' in g ? g.image : g
  );
  return { ...item, gallery };
}

const settingsPath = path.join(contentDir, 'settings', 'site.json');
const settings = fs.existsSync(settingsPath)
  ? JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
  : {};

const bundle = {
  landmarks: sortById(readJsonFiles(path.join(contentDir, 'landmarks')).map(stripLatLng)),
  people: sortById(readJsonFiles(path.join(contentDir, 'people'))),
  museums: sortById(readJsonFiles(path.join(contentDir, 'museums')).map(normalizeMuseum)),
  events: sortById(readJsonFiles(path.join(contentDir, 'events')).map(stripLatLng)),
  culture: sortBySlug(readJsonFiles(path.join(contentDir, 'culture')).map(normalizeGallery)),
  nature: sortBySlug(readJsonFiles(path.join(contentDir, 'nature')).map((i) => stripLatLng(normalizeGallery(i)))),
  panoramas: sortById(readJsonFiles(path.join(contentDir, 'panoramas')).map(stripLatLng)),
  legends: sortById(readJsonFiles(path.join(contentDir, 'legends'))),
  timeline: sortById(readJsonFiles(path.join(contentDir, 'timeline'))),
  gallery: sortById(readJsonFiles(path.join(contentDir, 'gallery'))),
  settings: normalizeSettings(settings),
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(bundle, null, 2), 'utf8');

console.log(`Bundled content → ${path.relative(root, outFile)}`);
console.log(
  `  landmarks: ${bundle.landmarks.length}, people: ${bundle.people.length}, museums: ${bundle.museums.length}, events: ${bundle.events.length}`
);
