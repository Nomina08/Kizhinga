'use client';

import { motion } from 'framer-motion';
import {
  Mountain,
  Palette,
  Church,
  Scroll,
  Trophy,
} from 'lucide-react';
import { TOUR_BADGES } from '@/lib/badges';
import { useApp } from '@/context/AppContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mountain: Mountain,
  palette: Palette,
  church: Church,
  scroll: Scroll,
  trophy: Trophy,
};

interface BadgesPanelProps {
  className?: string;
}

export function BadgesPanel({ className = '' }: BadgesPanelProps) {
  const { earnedBadges } = useApp();

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
        Бейджи исследователя
      </p>
      <div className="flex flex-wrap gap-3">
        {TOUR_BADGES.map((badge, i) => {
          const earned = earnedBadges.includes(badge.id);
          const Icon = iconMap[badge.icon] ?? Trophy;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 border transition-all ${
                earned
                  ? 'bg-buryat-gold/20 border-buryat-gold/50 text-buryat-earth dark:text-buryat-gold shadow-md'
                  : 'bg-stone-100/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 opacity-50 grayscale'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <div>
                <p className="text-xs font-bold">{badge.title}</p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:block">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
