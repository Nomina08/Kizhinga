'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ScrollReveal } from './ui/ScrollReveal';
import { TourProgress as TourProgressBar } from './TourProgress';

export function TourProgressSection() {
  const { visitedCount } = useApp();

  return (
    <section className="section-shell pt-12 pb-8 -mt-4">
      <div className="container-premium max-w-4xl">
        <ScrollReveal>
          <TourProgressBar />
        </ScrollReveal>
        {visitedCount === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-body-sm text-stone-500 mt-4"
          >
            Откройте точки на карте, чтобы зарабатывать бейджи
          </motion.p>
        )}
      </div>
    </section>
  );
}
