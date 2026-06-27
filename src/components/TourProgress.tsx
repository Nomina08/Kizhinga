'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { BadgesPanel } from './BadgesPanel';

interface TourProgressProps {
  compact?: boolean;
  scrolled?: boolean;
}

export function TourProgress({ compact = false, scrolled = true }: TourProgressProps) {
  const { visitedCount, totalLandmarks, progressPercent } = useApp();

  if (compact) {
    return (
      <div
        className={`rounded-2xl px-4 py-2 min-w-[148px] transition-all ${
          scrolled
            ? 'bg-buryat-green/10 dark:bg-buryat-gold/10'
            : 'bg-white/10 backdrop-blur-md border border-white/15'
        }`}
      >
        <div className="flex justify-between mb-1.5 text-[11px] font-semibold">
          <span className={scrolled ? 'text-stone-600 dark:text-stone-400' : 'text-white/80'}>
            {visitedCount}/{totalLandmarks}
          </span>
          <span className={scrolled ? 'text-buryat-green dark:text-buryat-gold' : 'text-buryat-gold-light'}>
            {progressPercent}%
          </span>
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${scrolled ? 'bg-stone-200 dark:bg-stone-700' : 'bg-white/20'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-buryat-green to-buryat-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-white">
            Ваш прогресс в туре
          </h2>
          <p className="text-body-sm text-stone-600 dark:text-stone-400 mt-1">
            Посещено {visitedCount} из {totalLandmarks} достопримечательностей
          </p>
        </div>
        <span className="text-4xl font-display font-semibold text-buryat-green dark:text-buryat-gold">
          {progressPercent}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-stone-200/80 dark:bg-stone-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-buryat-green via-buryat-gold to-buryat-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <BadgesPanel className="mt-8" />
    </div>
  );
}
