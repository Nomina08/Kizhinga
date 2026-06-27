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
        className={`rounded-full px-3 py-1.5 text-xs font-medium min-w-[140px] ${
          scrolled
            ? 'bg-buryat-gold/15 dark:bg-buryat-gold/20 text-buryat-earth dark:text-buryat-gold'
            : 'bg-white/15 backdrop-blur text-white border border-white/25'
        }`}
      >
        <div className="flex justify-between mb-1">
          <span>{visitedCount} из {totalLandmarks}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-buryat-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl glass-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-white">
              Ваш прогресс в туре
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Вы посетили {visitedCount} из {totalLandmarks} достопримечательностей
            </p>
          </div>
          <span className="text-3xl font-bold text-buryat-green dark:text-buryat-gold">
            {progressPercent}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-buryat-green via-buryat-gold to-buryat-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <BadgesPanel className="mt-6" />
      </div>
    </section>
  );
}
