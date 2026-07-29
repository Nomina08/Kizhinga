import { landmarks } from '@/data/data';
import {
  districtEvents,
  cultureTopics,
  natureTopics,
  panoramas,
} from '@/data/extras';
import { museums } from '@/data/museums';
import { CONTENT_PLACEHOLDER_IMAGE } from '@/lib/content';
import { getEventRouteId } from '@/lib/eventHelpers';
import type { FavoriteType } from '@/types';

export interface ContentPreview {
  type: FavoriteType;
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
}

export function getContentPreview(type: FavoriteType, id: number): ContentPreview | null {
  switch (type) {
    case 'landmark': {
      const item = landmarks.find((l) => l.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.name,
        subtitle: item.era,
        imageUrl: item.imageUrl,
        href: `/places/${id}/`,
      };
    }
    case 'event': {
      const item = districtEvents.find((e) => e.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.title,
        subtitle: item.date ?? '',
        imageUrl: item.imageUrl ?? CONTENT_PLACEHOLDER_IMAGE,
        href: `/events/${getEventRouteId(item)}/`,
      };
    }
    case 'culture': {
      const item = cultureTopics.find((c) => c.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.imageUrl,
        href: `/culture/${item.slug}/`,
      };
    }
    case 'nature': {
      const item = natureTopics.find((n) => n.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.imageUrl,
        href: `/nature/${item.slug}/`,
      };
    }
    case 'panorama': {
      const item = panoramas.find((p) => p.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.thumbnailUrl,
        href: `/panoramas/${id}/`,
      };
    }
    case 'museum': {
      const item = museums.find((m) => m.id === id);
      if (!item) return null;
      return {
        type,
        id,
        title: item.name,
        subtitle: item.village,
        imageUrl: item.imageUrl,
        href: `/museums/${id}/`,
      };
    }
    default:
      return null;
  }
}
