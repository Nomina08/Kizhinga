'use client';

import { motion } from 'framer-motion';
import { BarChart3, Calendar, Users, Map, Building2 } from 'lucide-react';
import { districtStats } from '@/data/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  users: Users,
  map: Map,
  building: Building2,
};

export function StatsSection() {
  return (
    <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-blue/10 dark:bg-buryat-blue/20 px-4 py-1.5 text-sm font-medium text-buryat-blue dark:text-buryat-gold mb-4">
            <BarChart3 className="h-4 w-4" />
            Интересные числа
          </div>
          <h2 className="section-title">Кижингинский район в цифрах</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {districtStats.map((stat, index) => {
            const Icon = iconMap[stat.icon] ?? BarChart3;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-card-hover p-5 sm:p-6 text-center"
              >
                <div className="mx-auto mb-3 inline-flex rounded-xl bg-buryat-green/10 dark:bg-buryat-green/20 p-3">
                  <Icon className="h-6 w-6 text-buryat-green dark:text-buryat-gold" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-buryat-green dark:text-buryat-gold">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
