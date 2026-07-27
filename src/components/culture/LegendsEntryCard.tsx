'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function LegendsEntryCard({ index = 0, count }: { index?: number; count: number }) {
  return (
    <ScrollReveal delay={index * 60}>
      <Link
        href="/culture/legends/"
        className="group block glass-card-hover rounded-3xl overflow-hidden h-full"
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-buryat-green/20 via-buryat-sand/30 to-buryat-blue/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-3xl bg-white/70 dark:bg-stone-900/50 p-5 shadow-inner">
              <BookOpen className="h-12 w-12 text-buryat-green dark:text-buryat-gold" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          <span className="absolute top-3 left-3 badge bg-black/40 text-white border-0 backdrop-blur-sm">
            {count} {count === 1 ? 'история' : count < 5 ? 'истории' : 'историй'}
          </span>
        </div>
        <div className="p-5">
          <h2 className="font-display text-xl font-semibold leading-snug mb-2 group-hover:text-buryat-green dark:group-hover:text-buryat-gold transition-colors">
            Легенды
          </h2>
          <p className="text-sm text-stone-500 mb-3">Устное наследие степи — истории, передаваемые из поколения в поколение</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-buryat-green dark:text-buryat-gold">
            Читать все <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}
