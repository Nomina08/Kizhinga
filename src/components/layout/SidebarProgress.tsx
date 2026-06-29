'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export function SidebarProgress() {
  const { visitedCount, totalLandmarks, progressPercent } = useApp();

  return (
    <Link
      href="/"
      className="block rounded-2xl bg-stone-100/80 dark:bg-stone-800/50 px-4 py-3 hover:bg-stone-200/80 dark:hover:bg-stone-800 transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
          Прогресс
        </span>
        <span className="text-xs font-bold text-buryat-green dark:text-buryat-gold">
          {visitedCount}/{totalLandmarks} · {progressPercent}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-buryat-green to-buryat-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </Link>
  );
}
