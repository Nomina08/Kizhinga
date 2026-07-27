'use client';

import Link from 'next/link';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { landmarks } from '@/data/data';
import { useApp } from '@/context/AppContext';
import { LANDMARK_TYPE_COLORS, LANDMARK_TYPE_LABELS } from '@/types';
import { VisitToggle } from './VisitToggle';
import { ResetVisitProgressButton } from './ResetVisitProgressButton';

export function VisitProgressList() {
  const { visitedLandmarks, visitedCount, totalLandmarks } = useApp();

  const sorted = [...landmarks].sort((a, b) => {
    const aVisited = visitedLandmarks.has(a.id);
    const bVisited = visitedLandmarks.has(b.id);
    if (aVisited === bVisited) return a.name.localeCompare(b.name, 'ru');
    return aVisited ? 1 : -1;
  });

  return (
    <div className="mt-8 pt-6 border-t border-stone-200/70 dark:border-stone-700/50">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Чек-лист посещений
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {visitedCount} из {totalLandmarks} — нажмите «Был там» или «Не был», чтобы изменить
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <ResetVisitProgressButton />
          <Link
            href="/places/"
            className="text-sm font-semibold text-buryat-green dark:text-buryat-gold hover:underline"
          >
            Каталог →
          </Link>
        </div>
      </div>

      <ul className="space-y-2">
        {sorted.map((landmark) => {
          const visited = visitedLandmarks.has(landmark.id);
          return (
            <li
              key={landmark.id}
              className={`rounded-2xl border px-4 py-3 transition-colors ${
                visited
                  ? 'border-buryat-gold/25 bg-buryat-gold/5'
                  : 'border-stone-200/80 dark:border-stone-700/60 bg-stone-50/50 dark:bg-stone-800/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  {visited ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-buryat-gold mt-0.5" strokeWidth={2.25} />
                  ) : (
                    <CircleDashed className="h-5 w-5 shrink-0 text-stone-300 dark:text-stone-600 mt-0.5" strokeWidth={2} />
                  )}
                  <div className="min-w-0">
                    <Link
                      href={`/places/${landmark.id}/`}
                      className="font-semibold text-sm text-stone-900 dark:text-white hover:text-buryat-green dark:hover:text-buryat-gold transition-colors line-clamp-1"
                    >
                      {landmark.name}
                    </Link>
                    <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: LANDMARK_TYPE_COLORS[landmark.type] }}
                      />
                      {LANDMARK_TYPE_LABELS[landmark.type]}
                    </p>
                  </div>
                </div>
                <VisitToggle landmarkId={landmark.id} className="w-full sm:w-44 shrink-0" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
