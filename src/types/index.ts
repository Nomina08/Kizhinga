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
}

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
