'use client';

import { History } from 'lucide-react';
import { timelineEvents } from '@/data/data';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export function TimelineSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id={standalone ? undefined : 'timeline'} className="section-shell bg-stone-100/30 dark:bg-stone-900/20">
      <div className="container-premium max-w-4xl">
        {!standalone && (
          <ScrollReveal>
            <SectionHeader
              icon={History}
              eyebrow="История района"
              title="От кочевых племён до сегодня"
              subtitle="Ключевые вехи Кижингинского района на временной шкале"
            />
          </ScrollReveal>
        )}

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-buryat-green via-buryat-gold to-buryat-blue sm:-translate-x-1/2" />

          {timelineEvents.map((event, index) => (
            <ScrollReveal key={event.id} delay={index * 80}>
              <div
                className={`relative flex items-center mb-10 sm:mb-12 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />
                <div
                  className={`sm:w-1/2 pl-12 sm:pl-0 ${
                    index % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'
                  }`}
                >
                  <div className="glass-card-hover p-6 sm:p-8">
                    <span className="text-sm font-bold text-buryat-gold tracking-wide">
                      {event.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-white mt-2">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-buryat-gold ring-4 ring-buryat-gold/25 sm:-translate-x-1/2 shadow-glow" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
