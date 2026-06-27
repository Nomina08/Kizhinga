'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Utensils,
  Droplets,
  Landmark,
  Mountain,
  Scroll,
  Music,
} from 'lucide-react';
import { legends } from '@/data/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  utensils: Utensils,
  droplets: Droplets,
  landmark: Landmark,
  mountain: Mountain,
  scroll: Scroll,
  music: Music,
};

export function LegendsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % legends.length);
  const prev = () => setCurrent((c) => (c - 1 + legends.length) % legends.length);

  const legend = legends[current];
  const Icon = iconMap[legend.icon] ?? BookOpen;

  return (
    <section
      id="legends"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-buryat-green/5 via-buryat-gold/5 to-buryat-blue/5 dark:from-buryat-green/10 dark:via-buryat-gold/10 dark:to-buryat-blue/10"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-gold/15 px-4 py-1.5 text-sm font-medium text-buryat-earth dark:text-buryat-gold mb-4">
            <BookOpen className="h-4 w-4" />
            Легенды и факты
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Устное наследие степи
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={legend.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl glass-card p-8 sm:p-12 text-center min-h-[280px] flex flex-col items-center justify-center"
            >
              <div className="mb-6 rounded-full bg-buryat-green/10 dark:bg-buryat-green/20 p-4">
                <Icon className="h-10 w-10 text-buryat-green dark:text-buryat-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-4">
                {legend.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                {legend.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 rounded-full bg-white dark:bg-stone-800 p-2 shadow-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            aria-label="Предыдущий"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 rounded-full bg-white dark:bg-stone-800 p-2 shadow-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            aria-label="Следующий"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {legends.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-buryat-green dark:bg-buryat-gold'
                  : 'w-2 bg-stone-300 dark:bg-stone-600'
              }`}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
