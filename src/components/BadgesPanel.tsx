'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { TOUR_BADGES } from '@/lib/badges';
import {
  Mountain,
  Palette,
  Church,
  Scroll,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
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
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
        Бейджи исследователя
      </p>
      <div className="flex flex-wrap gap-3">
        {TOUR_BADGES.map((badge, i) => {
          const earned = earnedBadges.includes(badge.id);
          const Icon = iconMap[badge.icon] ?? Trophy;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-300 ${
                earned
                  ? 'bg-buryat-gold/15 border-buryat-gold/40 text-buryat-earth dark:text-buryat-gold shadow-soft'
                  : 'bg-stone-100/60 dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-700/50 opacity-45 grayscale'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-xs font-bold">{badge.title}</p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:block mt-0.5">
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
