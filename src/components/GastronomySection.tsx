'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { gastronomy } from '@/data/data';
import { ScrollReveal } from './ui/ScrollReveal';

export function GastronomySection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id={standalone ? undefined : 'gastronomy'} className="section-shell">
      <div className="container-premium">
        <ScrollReveal>
          <motion.div whileHover={{ scale: 1.005 }} className="glass-panel overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto lg:min-h-[420px] overflow-hidden">
                <img
                  src={gastronomy.imageUrl}
                  alt={gastronomy.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <span className="absolute top-6 left-6 badge bg-buryat-gold/90 text-white border-0">
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  Что попробовать
                </span>
              </div>
              <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <h2 className="font-display text-h2 font-semibold text-stone-900 dark:text-white">
                  {gastronomy.title}
                </h2>
                <p className="text-body-sm font-medium text-buryat-blue dark:text-buryat-gold mt-2">
                  {gastronomy.subtitle}
                </p>
                <p className="mt-6 text-body text-stone-600 dark:text-stone-300 leading-relaxed">
                  {gastronomy.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {gastronomy.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-body-sm text-stone-700 dark:text-stone-300"
                    >
                      <Sparkles className="h-5 w-5 text-buryat-gold shrink-0 mt-0.5" strokeWidth={1.75} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
