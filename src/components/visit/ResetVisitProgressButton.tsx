'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function ResetVisitProgressButton() {
  const { resetVisitProgress, visitedCount } = useApp();
  const [confirming, setConfirming] = useState(false);

  if (visitedCount === 0) return null;

  if (confirming) {
    return (
      <div className="rounded-2xl border border-rose-200/80 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/20 p-4">
        <p className="text-sm text-stone-700 dark:text-stone-300 mb-3">
          Сбросить все {visitedCount} отметок посещения? Это действие нельзя отменить.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConfirming(false)}
          >
            Отмена
          </Button>
          <button
            type="button"
            onClick={() => {
              resetVisitProgress();
              setConfirming(false);
            }}
            className="btn-primary btn-sm bg-rose-600 hover:bg-rose-700 border-rose-600"
          >
            Да, обнулить
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
    >
      <RotateCcw className="h-4 w-4" />
      Обнулить прогресс
    </button>
  );
}
