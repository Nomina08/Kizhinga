'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { homeQuickActions } from '@/lib/navigation';
import { useApp } from '@/context/AppContext';
import { TourProgress } from '@/components/TourProgress';
import { BadgesPanel } from '@/components/BadgesPanel';
import { FLAG_IMAGE, EMBLEM_IMAGE, districtStats } from '@/data/data';

export function HomeDashboard() {
  const { visitedCount, totalLandmarks, progressPercent } = useApp();

  return (
    <div className="min-h-full">
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-buryat-green/8 via-transparent to-buryat-gold/10 dark:from-buryat-green/15 dark:to-buryat-gold/5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-buryat-gold/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10"
          >
            <div className="flex items-center gap-4">
              <img
                src={EMBLEM_IMAGE}
                alt=""
                className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-lg"
              />
              <img
                src={FLAG_IMAGE}
                alt=""
                className="h-12 w-[4.5rem] sm:h-14 sm:w-[5.25rem] rounded-lg object-cover shadow-md ring-1 ring-stone-200/50"
              />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-buryat-green/10 dark:bg-buryat-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-buryat-green dark:text-buryat-gold mb-4">
                <Compass className="h-3.5 w-3.5" />
                Кижингинский район
              </div>
              <h1 className="font-display text-h1 sm:text-display font-semibold text-stone-900 dark:text-white leading-[1.1] mb-3">
                Добро пожаловать в Кижингинский район
              </h1>
              <p className="text-body text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
                Цифровой путеводитель по степям, дацанам и истории Забайкалья. Исследуйте места,
                стройте маршруты и открывайте достопримечательности.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="glass-panel p-5 sm:p-6 mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-buryat-gold" />
                  Ваш прогресс
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {visitedCount} из {totalLandmarks} мест · {progressPercent}%
                </p>
              </div>
              <Link
                href="/map/"
                className="text-sm font-semibold text-buryat-green dark:text-buryat-gold hover:underline"
              >
                Открыть карту →
              </Link>
            </div>
            <TourProgress />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {homeQuickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={action.href}
                  className="group block h-full rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
                >
                  <div
                    className={`relative h-full min-h-[7.5rem] bg-gradient-to-br ${action.gradient} p-5 sm:p-6 flex items-start gap-4`}
                  >
                    <span className="text-3xl sm:text-4xl shrink-0 drop-shadow-md" aria-hidden>
                      {action.emoji}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h2 className="font-display text-xl sm:text-2xl font-semibold text-white leading-tight mb-1.5">
                        {action.label}
                      </h2>
                      <p className="text-sm text-white/80 leading-snug">{action.description}</p>
                    </div>
                    <span className="absolute bottom-4 right-5 text-white/50 text-xl group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {districtStats.map((stat) => (
              <div
                key={stat.id}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="font-display text-lg font-semibold text-stone-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6">
            <BadgesPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
