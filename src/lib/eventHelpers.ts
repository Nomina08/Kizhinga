import type { DistrictEvent, EventCategory } from '@/types';
import { EVENT_CATEGORY_LABELS } from '@/types';

export function getEventCategoryLabel(category?: EventCategory): string | undefined {
  if (!category) return undefined;
  return EVENT_CATEGORY_LABELS[category];
}

export function formatEventCardSubtitle(event: DistrictEvent): string {
  const parts = [event.date, event.location].filter(Boolean);
  return parts.join(' · ') || 'Кижингинский район';
}

export function formatEventDetailSubtitle(event: DistrictEvent): string {
  const parts = [getEventCategoryLabel(event.category), event.date].filter(Boolean);
  return parts.join(' · ') || 'Культурный код «Хэжэнгэ»';
}

export function eventHasCoordinates(event: DistrictEvent): boolean {
  return (
    Array.isArray(event.coordinates) &&
    event.coordinates.length === 2 &&
    Number.isFinite(event.coordinates[0]) &&
    Number.isFinite(event.coordinates[1])
  );
}
