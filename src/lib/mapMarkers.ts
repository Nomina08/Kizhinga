import L from 'leaflet';
import { LANDMARK_TYPE_COLORS } from '@/types';
import type { LandmarkType } from '@/types';

const TYPE_EMOJI: Record<LandmarkType, string> = {
  nature: '🏔',
  culture: '🎭',
  religion: '⛩',
  history: '📜',
};

export function createLandmarkMarkerIcon(
  type: LandmarkType,
  visited: boolean,
  pulse: boolean,
  isFavorite: boolean
) {
  const color = LANDMARK_TYPE_COLORS[type];
  const emoji = TYPE_EMOJI[type];
  const pulseClass = pulse && !visited ? 'map-pin-pulse' : '';
  const visitedClass = visited ? 'map-pin-visited' : '';
  const favClass = isFavorite ? 'map-pin-favorite' : '';

  return L.divIcon({
    className: 'map-pin-wrapper',
    html: `
      <div class="map-pin ${visitedClass} ${pulseClass} ${favClass}">
        <div class="map-pin-head" style="background: linear-gradient(145deg, ${color}, ${color}dd);">
          <span class="map-pin-emoji">${emoji}</span>
        </div>
        <div class="map-pin-tail" style="background: ${color};"></div>
        ${isFavorite ? '<div class="map-pin-star">★</div>' : ''}
      </div>
    `,
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48],
  });
}

export function createSettlementMarkerIcon(isCenter: boolean) {
  return L.divIcon({
    className: 'settlement-marker-wrapper',
    html: `
      <div class="settlement-marker ${isCenter ? 'settlement-center' : ''}">
        <span class="settlement-dot"></span>
      </div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -8],
  });
}

export function createEventMarkerIcon() {
  return L.divIcon({
    className: 'event-marker-wrapper',
    html: `
      <div class="event-marker">
        <span>📅</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export const MAP_TILES = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; источник: Esri, Maxar, Earthstar Geographics',
  },
} as const;

export type MapStyle = keyof typeof MAP_TILES;
