'use client';

import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import { timelineEvents } from '@/data/data';

export function TimelineSection() {
  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-green/10 dark:bg-buryat-green/20 px-4 py-1.5 text-sm font-medium text-buryat-green dark:text-buryat-gold mb-4">
            <History className="h-4 w-4" />
            История района
          </div>
          <h2 className="section-title">От кочевых племён до сегодня</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-buryat-green via-buryat-gold to-buryat-blue sm:-translate-x-1/2" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex items-center mb-8 sm:mb-10 ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              <div className="hidden sm:block sm:w-1/2" />
              <div
                className={`sm:w-1/2 pl-12 sm:pl-0 ${
                  index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                }`}
              >
                <div className="glass-card-hover p-5">
                  <span className="text-sm font-bold text-buryat-gold">
                    {event.year}
                  </span>
                  <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
              <div
                className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-buryat-gold ring-4 ring-buryat-gold/30 sm:-translate-x-1/2"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
