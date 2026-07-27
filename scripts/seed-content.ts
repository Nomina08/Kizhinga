import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');

async function loadLegacy() {
  const { register } = await import('tsx/esm/api');
  register();
  const data = await import('./legacy/data.ts');
  const extras = await import('./legacy/extras.ts');
  let museums: unknown[] = [];
  try {
    const museumsMod = await import('./legacy/museums.ts');
    museums = museumsMod.museums ?? [];
  } catch {
    /* optional */
  }
  return { ...data, ...extras, museums };
}

function writeJson(subdir: string, filename: string, data: unknown) {
  const dir = path.join(contentDir, subdir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), JSON.stringify(data, null, 2), 'utf8');
}

function withLatLng<T extends { coordinates: [number, number] }>(
  item: T
): Omit<T, 'coordinates'> & { latitude: number; longitude: number } {
  const { coordinates, ...rest } = item;
  return {
    ...rest,
    latitude: coordinates[0],
    longitude: coordinates[1],
  };
}

function writeCollection(
  subdir: string,
  items: Array<{ id: number }>,
  transform: (item: (typeof items)[0]) => unknown = (i) => i
) {
  for (const item of items) {
    writeJson(subdir, `${item.id}.json`, transform(item as never));
  }
}

function writeSlugCollection(
  subdir: string,
  items: Array<{ slug: string }>,
  transform: (item: (typeof items)[0]) => unknown = (i) => i
) {
  for (const item of items) {
    writeJson(subdir, `${item.slug}.json`, transform(item as never));
  }
}

async function main() {
  const legacy = await loadLegacy();
  const {
    landmarks,
    people,
    legends,
    tourRoutes,
    districtStats,
    timelineEvents,
    galleryImages,
    gastronomy,
    AUDIO_LEGEND_TEXT,
    MAP_CENTER,
    MAP_ZOOM,
    HERO_VIDEO,
    districtEvents,
    cultureTopics,
    natureTopics,
    panoramas,
    settlements,
    populationHistory,
    ethnicComposition,
    museums,
  } = legacy as Record<string, never>;

  writeCollection('landmarks', landmarks, withLatLng);
  writeCollection('people', people);
  if (museums?.length) writeCollection('museums', museums, withLatLng);
  writeCollection('events', districtEvents, withLatLng);
  writeSlugCollection('culture', cultureTopics);
  writeSlugCollection('nature', natureTopics, (item) => {
    const topic = item as { coordinates?: [number, number] };
    if (!topic.coordinates) return topic;
    return withLatLng(topic as { coordinates: [number, number] });
  });
  writeCollection('panoramas', panoramas, withLatLng);
  writeCollection('legends', legends);
  writeCollection('timeline', timelineEvents);
  writeCollection('gallery', galleryImages.map((g: { id: number }) => ({ ...g, id: g.id })));

  writeJson('settings', 'site.json', {
    districtStats,
    tourRoutes,
    gastronomy,
    audioLegendText: AUDIO_LEGEND_TEXT,
    mapCenter: MAP_CENTER,
    mapZoom: MAP_ZOOM,
    heroVideo: HERO_VIDEO,
    settlements: settlements.map((s: { coordinates: [number, number] }) => ({
      ...s,
      latitude: s.coordinates[0],
      longitude: s.coordinates[1],
    })),
    populationHistory,
    ethnicComposition,
  });

  console.log('Seeded content/ from scripts/legacy');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
