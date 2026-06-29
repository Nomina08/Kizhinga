import type { FavoriteType } from '@/types';

export function favoriteKey(type: FavoriteType, id: number): string {
  return `${type}:${id}`;
}

export function parseFavoriteKey(key: string): { type: FavoriteType; id: number } | null {
  const [type, idStr] = key.split(':');
  const id = Number(idStr);
  if (!type || Number.isNaN(id)) return null;
  if (!['landmark', 'event', 'culture', 'nature', 'panorama'].includes(type)) return null;
  return { type: type as FavoriteType, id };
}

export const FAVORITES_KEY = 'kizhinga-favorites';
export const RECENT_KEY = 'kizhinga-recently-viewed';
export const MAX_RECENT = 12;
