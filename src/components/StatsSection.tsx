'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { districtStats } from '@/data/data';
import { DistrictStatCard } from '@/components/stats/DistrictStatCard';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export function StatsSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id={standalone ? undefined : 'stats'} className="section-shell bg-stone-50 dark:bg-surface-dark">
      <div className="container-premium">
        {!standalone && (
          <ScrollReveal>
            <SectionHeader
              icon={BarChart3}
              eyebrow="Интересные числа"
              title="Кижингинский район в цифрах"
              subtitle="Краткая статистика о земле степей, традиций и истории"
            />
          </ScrollReveal>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {districtStats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 80}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <DistrictStatCard stat={stat} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
