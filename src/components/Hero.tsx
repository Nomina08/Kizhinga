'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Compass } from 'lucide-react';

export function Hero() {
  const scrollToMap = () => {
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/80">
            Республика Бурятия · Кижингинский район
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white text-balance leading-tight">
            Кижинга —{' '}
            <span className="text-buryat-gold">Сердце Удолии</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance">
            Откройте для себя степные просторы, древние дацаны, целебные источники
            и богатую историю земли бурят
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onClick={scrollToMap}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-buryat-green shadow-xl hover:bg-buryat-gold hover:text-white transition-all duration-300 hover:scale-105"
        >
          <Compass className="h-5 w-5" />
          Начать путешествие
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16"
        >
          <ChevronDown className="mx-auto h-8 w-8 text-white/60 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
