'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { gastronomy } from '@/data/data';

export function GastronomySection() {
  return (
    <section id="gastronomy" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-buryat-gold/5 to-buryat-green/5 dark:from-buryat-gold/10 dark:to-buryat-green/10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative h-56 lg:h-auto min-h-[240px] overflow-hidden">
              <img
                src={gastronomy.imageUrl}
                alt={gastronomy.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="p-6 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-buryat-gold/20 px-4 py-1.5 text-sm font-medium text-buryat-earth dark:text-buryat-gold mb-4">
                <UtensilsCrossed className="h-4 w-4" />
                Что попробовать
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                {gastronomy.title}
              </h2>
              <p className="text-sm text-buryat-blue dark:text-buryat-gold mt-1">
                {gastronomy.subtitle}
              </p>
              <p className="mt-4 text-stone-600 dark:text-stone-300 leading-relaxed">
                {gastronomy.description}
              </p>
              <ul className="mt-6 space-y-2">
                {gastronomy.tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300"
                  >
                    <Sparkles className="h-4 w-4 text-buryat-gold shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
