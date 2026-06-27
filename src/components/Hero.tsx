'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Compass } from 'lucide-react';
import {
  FLAG_IMAGE,
  EMBLEM_IMAGE,
  HERO_VIDEO,
  SYMBOLS_INFO,
} from '@/data/data';

export function Hero() {
  const scrollToMap = () => {
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-buryat-green/80 via-stone-900/50 to-buryat-blue/85" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 sm:gap-6 mb-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={FLAG_IMAGE}
              alt="Флаг Кижингинского района"
              className="h-16 sm:h-20 w-auto rounded-lg shadow-2xl ring-2 ring-white/30"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              src={EMBLEM_IMAGE}
              alt="Эмблема Кижингинского района"
              className="h-20 sm:h-24 w-auto rounded-xl shadow-2xl ring-2 ring-white/30"
            />
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/80">
            Республика Бурятия · Кижингинский район
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white text-balance leading-tight">
            Кижинга —{' '}
            <span className="text-buryat-gold">Сердце Удолии</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance">
            Степные просторы, дацаны, целебные источники и легенды земли бурят
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-white/75 max-w-xl">
            {Object.values(SYMBOLS_INFO).map((text) => (
              <span
                key={text}
                className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20"
              >
                {text.split('—')[0].trim()}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={scrollToMap}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-8 py-4 text-lg font-semibold text-buryat-green shadow-xl hover:bg-buryat-gold hover:text-white transition-all duration-300 hover:scale-105"
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
