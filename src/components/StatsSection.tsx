'use client';

import { motion } from 'framer-motion';
import { BarChart3, Calendar, Users, Map, Building2, type LucideIcon } from 'lucide-react';
import { districtStats } from '@/data/data';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  map: Map,
  building: Building2,
};

export function StatsSection() {
  return (
    <section id="stats" className="section-shell bg-surface dark:bg-surface-dark">
      <div className="container-premium">
        <ScrollReveal>
          <SectionHeader
            icon={BarChart3}
            eyebrow="Интересные числа"
            title="Кижингинский район в цифрах"
            subtitle="Краткая статистика о земле степей, традиций и истории"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {districtStats.map((stat, index) => {
            const Icon = iconMap[stat.icon] ?? BarChart3;
            return (
              <ScrollReveal key={stat.id} delay={index * 80}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="card-equal glass-card-hover p-6 sm:p-8 text-center"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-2xl bg-buryat-green/10 dark:bg-buryat-green/15 p-4">
                    <Icon className="h-7 w-7 text-buryat-green dark:text-buryat-gold" strokeWidth={1.75} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-display font-semibold text-buryat-green dark:text-buryat-gold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-body-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {stat.label}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
