import type { LandmarkType, TourBadge } from '@/types';
import type { Landmark } from '@/types';

export const TOUR_BADGES: TourBadge[] = [
  {
    id: 'nature',
    type: 'nature',
    title: 'Знаток природы',
    description: 'Посетили все природные объекты',
    icon: 'mountain',
  },
  {
    id: 'culture',
    type: 'culture',
    title: 'Хранитель культуры',
    description: 'Открыли все культурные точки',
    icon: 'palette',
  },
  {
    id: 'religion',
    type: 'religion',
    title: 'Духовный странник',
    description: 'Познали священные места',
    icon: 'church',
  },
  {
    id: 'history',
    type: 'history',
    title: 'Историк степи',
    description: 'Изучили исторические памятники',
    icon: 'scroll',
  },
  {
    id: 'complete',
    requiresAll: true,
    title: 'Мастер Кижинги',
    description: 'Посетили все 6 достопримечательностей',
    icon: 'trophy',
  },
];

export function computeEarnedBadges(
  landmarks: Landmark[],
  visitedIds: Set<number>
): string[] {
  const earned: string[] = [];

  const types: LandmarkType[] = ['nature', 'culture', 'religion', 'history'];
  for (const type of types) {
    const ofType = landmarks.filter((l) => l.type === type);
    if (ofType.length > 0 && ofType.every((l) => visitedIds.has(l.id))) {
      earned.push(type);
    }
  }

  if (landmarks.length > 0 && landmarks.every((l) => visitedIds.has(l.id))) {
    earned.push('complete');
  }

  return earned;
}
