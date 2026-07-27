'use client';

import {
  BookOpen,
  Utensils,
  Droplets,
  Landmark,
  Mountain,
  Scroll,
  Music,
  type LucideIcon,
} from 'lucide-react';
import { legends } from '@/data/data';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  droplets: Droplets,
  landmark: Landmark,
  mountain: Mountain,
  scroll: Scroll,
  music: Music,
};

export function LegendsList() {
  return (
    <div className="space-y-4">
      {legends.map((legend, index) => {
        const Icon = iconMap[legend.icon] ?? BookOpen;
        return (
          <ScrollReveal key={legend.id} delay={index * 50}>
            <article className="glass-panel p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="shrink-0 rounded-2xl bg-buryat-green/10 dark:bg-buryat-green/15 p-4">
                  <Icon className="h-7 w-7 text-buryat-green dark:text-buryat-gold" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    {legend.title}
                  </h2>
                  <p className="text-body-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {legend.text}
                  </p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
