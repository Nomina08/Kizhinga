'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Compass } from 'lucide-react';
import {
  FLAG_IMAGE,
  EMBLEM_IMAGE,
  HERO_VIDEO,
  SYMBOLS_INFO,
} from '@/data/data';
import { Button } from './ui/Button';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const scrollToMap = () => {
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollDown = () => {
    document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 scale-110"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-transparent to-transparent dark:from-surface-dark" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="flex items-center gap-4 sm:gap-6 mb-10"
          >
            <img
              src={FLAG_IMAGE}
              alt="Флаг Кижингинского района"
              className="h-16 sm:h-24 w-auto rounded-2xl shadow-card ring-1 ring-white/30 backdrop-blur-sm"
            />
            <img
              src={EMBLEM_IMAGE}
              alt="Эмблема Кижингинского района"
              className="h-20 sm:h-28 w-auto rounded-2xl shadow-card ring-1 ring-white/30 backdrop-blur-sm"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 text-xs sm:text-sm uppercase text-white/75 font-medium"
          >
            Республика Бурятия · Кижингинский район
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2.75rem] sm:text-h1-lg md:text-[4rem] font-semibold text-white text-balance leading-[1.05] tracking-tight"
          >
            Кижинга —{' '}
            <span className="text-buryat-gold-light drop-shadow-sm">Сердце Удолии</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-8 text-lg sm:text-body text-white/85 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Степные просторы, дацаны, целебные источники и легенды земли бурят
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-2 max-w-xl"
          >
            {Object.values(SYMBOLS_INFO).map((text, i) => (
              <span
                key={text}
                className="badge bg-white/10 backdrop-blur-md text-white/90 border border-white/15"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {text.split('—')[0].trim()}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button icon={Compass} onClick={scrollToMap} className="min-w-[220px]">
            Начать путешествие
          </Button>
          <Button variant="secondary" onClick={scrollDown} className="min-w-[180px] bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
            Узнать больше
          </Button>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors group"
        aria-label="Прокрутить вниз"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Листайте</span>
        <div className="relative h-12 w-6 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/70 animate-scroll-line" />
        </div>
        <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
}
