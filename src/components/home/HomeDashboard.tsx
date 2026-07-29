'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';
import { homeQuickActions } from '@/lib/navigation';
import { EMBLEM_IMAGE } from '@/data/data';

export function HomeDashboard() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-8 md:pt-12 md:pb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-buryat-green/5 via-stone-50 to-buryat-gold/5 dark:from-buryat-green/15 dark:via-transparent dark:to-buryat-gold/5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-buryat-gold/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={false}
            className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10"
          >
            <div className="flex items-center gap-4">
              <img
                src={EMBLEM_IMAGE}
                alt="Герб Кижингинского района"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-lg"
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
                Цифровой путеводитель по степям, дацанам и истории Забайкалья. Материалы дополнены
                по проекту «Летопись Кижинги» (2021).
              </p>

              <Link
                href="/guide/"
                className="mt-5 group inline-flex w-full sm:w-auto items-center gap-3 rounded-2xl border border-buryat-green/25 bg-buryat-green/5 px-5 py-3.5 text-left transition-all hover:border-buryat-green/40 hover:bg-buryat-green/10 dark:border-buryat-gold/25 dark:bg-buryat-gold/5 dark:hover:bg-buryat-gold/10"
              >
                <div className="rounded-xl bg-buryat-green/15 p-2.5 dark:bg-buryat-gold/15">
                  <BookOpen className="h-5 w-5 text-buryat-green dark:text-buryat-gold" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-stone-900 dark:text-white">Путеводитель Кижингинского района</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Открыть PDF-буклет по району</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-buryat-green transition-transform group-hover:translate-x-0.5 dark:text-buryat-gold" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {homeQuickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.label} initial={false}>
                  <Link
                    href={action.href}
                    className="group flex h-full min-h-[6.5rem] items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-buryat-green/30 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/50 dark:hover:border-buryat-gold/30"
                  >
                    <div className="shrink-0 rounded-xl bg-buryat-green/10 p-3 transition-colors group-hover:bg-buryat-green/15 dark:bg-buryat-gold/10 dark:group-hover:bg-buryat-gold/15">
                      <Icon
                        className="h-6 w-6 text-buryat-green dark:text-buryat-gold"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-lg sm:text-xl font-semibold text-stone-900 dark:text-white leading-tight mb-1">
                        {action.label}
                      </h2>
                      <p className="text-sm text-stone-600 dark:text-stone-400 leading-snug">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-buryat-green dark:group-hover:text-buryat-gold" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
  );
}
