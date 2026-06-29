export type LandmarkType = 'nature' | 'culture' | 'religion' | 'history';

export interface Landmark {
  id: number;
  name: string;
  type: LandmarkType;
  coordinates: [number, number];
  description: string;
  imageUrl: string;
  era: string;
  isVisited?: boolean;
}

export interface Person {
  id: number;
  name: string;
  birthDate: string;
  achievement: string;
  fullBiography: string;
  connectionToDistrict: string;
  photoUrl: string;
  field: string;
  sourceUrl: string;
}

export interface Legend {
  id: number;
  title: string;
  text: string;
  icon: string;
}

export type RouteType = 'spiritual' | 'nature' | 'historical';

export interface TourRoute {
  id: RouteType;
  name: string;
  description: string;
  landmarkIds: number[];
  color: string;
  duration: string;
  distance: string;
  difficulty: 'Лёгкий' | 'Средний' | 'Сложный';
  season: string;
  badge: string;
}

export interface DistrictStat {
  id: number;
  label: string;
  value: string;
  icon: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  caption: string;
}

export interface TourBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  type?: LandmarkType;
  requiresAll?: boolean;
}

export type FavoriteType = 'landmark' | 'event' | 'culture' | 'nature' | 'panorama';

export interface FavoriteItem {
  type: FavoriteType;
  id: number;
  viewedAt: number;
}

export interface DistrictEvent {
  id: number;
  title: string;
  date: string;
  month: number;
  location: string;
  coordinates: [number, number];
  imageUrl: string;
  description: string;
  category: 'holiday' | 'culture' | 'sport' | 'religion';
}

export interface CultureTopic {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  gallery: string[];
}

export interface NatureTopic {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  coordinates?: [number, number];
  gallery: string[];
}

export interface Panorama {
  id: number;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  panoramaImage?: string;
  embedUrl?: string;
  coordinates?: [number, number];
  landmarkId?: number;
}

export interface Settlement {
  id: number;
  name: string;
  population: number;
  coordinates: [number, number];
  type: 'center' | 'village';
}

export interface PopulationPoint {
  year: number;
  population: number;
}

export const EVENT_CATEGORY_LABELS: Record<DistrictEvent['category'], string> = {
  holiday: 'Праздник',
  culture: 'Культура',
  sport: 'Спорт',
  religion: 'Религия',
};

export const LANDMARK_TYPE_LABELS: Record<LandmarkType, string> = {
  nature: 'Природа',
  culture: 'Культура',
  religion: 'Религия',
  history: 'История',
};

export const LANDMARK_TYPE_COLORS: Record<LandmarkType, string> = {
  nature: '#22c55e',
  culture: '#eab308',
  religion: '#8b5cf6',
  history: '#ef4444',
};
