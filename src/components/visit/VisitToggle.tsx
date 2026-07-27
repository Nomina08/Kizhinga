'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface VisitToggleProps {
  landmarkId: number;
  className?: string;
  showHint?: boolean;
}

export function VisitToggle({ landmarkId, className = '', showHint = false }: VisitToggleProps) {
  const { visitedLandmarks, toggleLandmarkVisit } = useApp();
  const visited = visitedLandmarks.has(landmarkId);

  return (
    <div className={className}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        aria-pressed={visited}
        aria-label={visited ? 'Снять отметку посещения' : 'Отметить, что вы были здесь'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLandmarkVisit(landmarkId);
        }}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${
          visited
            ? 'border-buryat-gold/40 bg-buryat-gold/12 text-buryat-earth dark:text-buryat-gold hover:bg-buryat-gold/20'
            : 'border-stone-200/90 bg-white dark:bg-stone-900/60 text-stone-600 dark:text-stone-300 hover:border-buryat-green/40 hover:text-buryat-green dark:hover:border-buryat-gold/40 dark:hover:text-buryat-gold'
        }`}
      >
        {visited ? (
          <>
            <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            Был там
          </>
        ) : (
          <>
            <CircleDashed className="h-4 w-4 shrink-0" strokeWidth={2} />
            Не был · отметить
          </>
        )}
      </motion.button>
      {showHint && (
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
          {visited
            ? 'Нажмите ещё раз, чтобы снять отметку. Прогресс сохраняется только в вашем браузере.'
            : 'Отметьте после посещения — прогресс и бейджи считаются только у вас на этом устройстве.'}
        </p>
      )}
    </div>
  );
}

/** @deprecated Use VisitToggle */
export function VisitCheckInButton(props: VisitToggleProps & { size?: 'sm' | 'md' | 'lg' }) {
  return <VisitToggle {...props} />;
}
