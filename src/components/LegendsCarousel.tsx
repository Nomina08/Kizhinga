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
  type LucideIcon,
} from 'lucide-react';
import { legends } from '@/data/data';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
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
      className="section-shell bg-gradient-to-br from-buryat-green/5 via-buryat-sand/20 to-buryat-blue/5 dark:from-buryat-green/10 dark:via-stone-900/30 dark:to-buryat-blue/10"
    >
      <div className="container-premium max-w-4xl">
        <ScrollReveal>
          <SectionHeader
            icon={BookOpen}
            eyebrow="Легенды и факты"
            title="Устное наследие степи"
            subtitle="Истории, передаваемые из поколения в поколение"
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={legend.id}
                initial={{ opacity: 0, x: 32, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -32, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel p-10 sm:p-14 text-center min-h-[320px] flex flex-col items-center justify-center"
              >
                <div className="mb-8 rounded-3xl bg-buryat-green/10 dark:bg-buryat-green/15 p-5 shadow-inner">
                  <Icon className="h-10 w-10 text-buryat-green dark:text-buryat-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-h3 font-semibold text-stone-900 dark:text-white mb-4">
                  {legend.title}
                </h3>
                <p className="text-body text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                  {legend.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 rounded-2xl glass-panel p-3 hover:shadow-card-hover transition-all duration-300"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 rounded-2xl glass-panel p-3 hover:shadow-card-hover transition-all duration-300"
              aria-label="Следующий"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {legends.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ease-premium ${
                  i === current
                    ? 'w-10 bg-buryat-green dark:bg-buryat-gold'
                    : 'w-2 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400'
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
