import type {
  Landmark,
  Person,
  Legend,
  TourRoute,
  DistrictStat,
  TimelineEvent,
  Museum,
  DistrictEvent,
  EventCategory,
  CultureTopic,
  NatureTopic,
  Panorama,
  Settlement,
  PopulationPoint,
} from '@/types';
import { assetPath } from '@/lib/assets';
import rawBundle from '@/generated/content.json';

export const CONTENT_PLACEHOLDER_IMAGE = assetPath('/images/district-emblem.webp');

interface ContentBundle {
  landmarks: Array<Omit<Landmark, 'coordinates'> & { coordinates: [number, number] }>;
  people: Person[];
  museums: Museum[];
  events: DistrictEvent[];
  culture: CultureTopic[];
  nature: NatureTopic[];
  panoramas: Panorama[];
  legends: Legend[];
  timeline: TimelineEvent[];
  settings: {
    districtStats: DistrictStat[];
    tourRoutes: TourRoute[];
    gastronomy: {
      title: string;
      subtitle: string;
      description: string;
      tips: string[];
      imageUrl: string;
    };
    audioLegendText: string;
    mapCenter: [number, number];
    mapZoom: number;
    heroVideo: string;
    settlements: Array<Omit<Settlement, 'coordinates'> & { latitude?: number; longitude?: number; coordinates?: [number, number] }>;
    populationHistory: PopulationPoint[];
    ethnicComposition: Array<{ label: string; percent: number; color: string }>;
  };
}

const bundle = rawBundle as unknown as ContentBundle;

/** Пути из CMS (/images/uploads/...) и GitHub Pages basePath */
export function resolveMediaUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const normalized = url.startsWith('/') ? url : `/${url}`;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (base && normalized.startsWith(base)) return normalized;
  return assetPath(normalized);
}

function resolveImages<T extends { imageUrl?: string; photoUrl?: string; src?: string; thumbnailUrl?: string; panoramaImage?: string; poster?: string; gallery?: string[] }>(
  item: T
): T {
  const out = { ...item };
  if (out.imageUrl) out.imageUrl = resolveMediaUrl(out.imageUrl);
  if (out.photoUrl) out.photoUrl = resolveMediaUrl(out.photoUrl);
  if (out.src) out.src = resolveMediaUrl(out.src);
  if (out.poster) out.poster = resolveMediaUrl(out.poster);
  if (out.thumbnailUrl) out.thumbnailUrl = resolveMediaUrl(out.thumbnailUrl);
  if (out.panoramaImage) out.panoramaImage = resolveMediaUrl(out.panoramaImage);
  if (out.gallery) out.gallery = out.gallery.map(resolveMediaUrl);
  return out;
}

function toCoords(item: { latitude?: number; longitude?: number; coordinates?: [number, number] }): [number, number] {
  if (item.coordinates?.length === 2) return item.coordinates;
  if (item.latitude != null && item.longitude != null) return [item.latitude, item.longitude];
  return [51.82, 109.92];
}

const EVENT_CATEGORIES = ['holiday', 'culture', 'sport', 'religion'] as const;

function normalizeEventCategory(raw: unknown): EventCategory | undefined {
  if (typeof raw === 'string' && (EVENT_CATEGORIES as readonly string[]).includes(raw)) {
    return raw as EventCategory;
  }
  return undefined;
}

export const landmarks: Landmark[] = bundle.landmarks.map((l) =>
  resolveImages({ ...l, coordinates: toCoords(l) })
);

export const people: Person[] = bundle.people.map((p) => resolveImages(p));

export const museums: Museum[] = bundle.museums.map((m) =>
  resolveImages({
    ...m,
    coordinates: toCoords(m),
    highlights: (m.highlights ?? []).map((h) =>
      typeof h === 'object' && h && 'item' in h ? String((h as { item: string }).item) : String(h)
    ),
  })
);

export const districtEvents: DistrictEvent[] = bundle.events.map((e) => {
  const item = resolveImages({
    ...e,
    gallery: e.gallery ?? [],
  });
  const event: DistrictEvent = {
    id: e.id,
    title: e.title ?? '',
    date: e.date || undefined,
    month: e.month ?? undefined,
    location: e.location || undefined,
    description: e.description || undefined,
    imageUrl: item.imageUrl || undefined,
    gallery: item.gallery,
    category: normalizeEventCategory(e.category),
  };
  if (e.coordinates?.length === 2) {
    event.coordinates = toCoords(e);
  }
  return event;
});

export const cultureTopics: CultureTopic[] = bundle.culture.map((topic) =>
  resolveImages({
    ...topic,
    slug: topic.slug || String(topic.id),
    subtitle: topic.subtitle ?? '',
    description: topic.description ?? '',
    gallery: topic.gallery ?? [],
  })
);

export const natureTopics: NatureTopic[] = bundle.nature.map((n) => {
  const item = resolveImages({
    ...n,
    slug: n.slug || String(n.id),
    subtitle: n.subtitle ?? '',
    description: n.description ?? '',
    gallery: n.gallery ?? [],
  });
  if (item.coordinates?.length === 2) {
    item.coordinates = toCoords(item);
  } else {
    delete item.coordinates;
  }
  return item;
});

export const panoramas: Panorama[] = bundle.panoramas.map((p) => {
  const item = resolveImages(p);
  if (item.coordinates) item.coordinates = toCoords(item);
  return item;
});

export const legends: Legend[] = bundle.legends;
export const timelineEvents: TimelineEvent[] = bundle.timeline;

export const districtStats: DistrictStat[] = bundle.settings.districtStats ?? [];
export const tourRoutes: TourRoute[] = (bundle.settings.tourRoutes ?? []).map((route) => ({
  ...route,
  landmarkIds: route.landmarkIds?.map((id) => (typeof id === 'object' && id && 'id' in id ? Number((id as { id: number }).id) : Number(id))),
}));

function normalizeMapCenter(raw: unknown): [number, number] {
  if (!Array.isArray(raw) || raw.length < 2) return [51.82, 109.92];
  const a = typeof raw[0] === 'object' && raw[0] && 'coord' in raw[0] ? (raw[0] as { coord: number }).coord : Number(raw[0]);
  const b = typeof raw[1] === 'object' && raw[1] && 'coord' in raw[1] ? (raw[1] as { coord: number }).coord : Number(raw[1]);
  return [a, b];
}

export const gastronomy = (() => {
  const g = resolveImages(bundle.settings.gastronomy ?? {});
  if (g.tips) {
    g.tips = g.tips.map((t) => (typeof t === 'object' && t && 'tip' in t ? String((t as { tip: string }).tip) : String(t)));
  }
  return g;
})();
export const AUDIO_LEGEND_TEXT: string = bundle.settings.audioLegendText ?? '';
export const MAP_CENTER: [number, number] = normalizeMapCenter(bundle.settings.mapCenter);
export const MAP_ZOOM: number = bundle.settings.mapZoom ?? 10;
export const HERO_VIDEO: string = bundle.settings.heroVideo ?? '';

export const settlements: Settlement[] = (bundle.settings.settlements ?? []).map((s) => ({
  id: s.id,
  name: s.name,
  population: s.population,
  type: s.type,
  coordinates: toCoords(s),
}));

export const populationHistory: PopulationPoint[] = bundle.settings.populationHistory ?? [];
export const ethnicComposition = bundle.settings.ethnicComposition ?? [];
