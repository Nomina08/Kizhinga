'use client';

import Link from 'next/link';
import { Building2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { museums } from '@/data/museums';
import { LETOPIS_MUSEUMS_URL } from '@/data/letopis';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const typeLabels = {
  school: 'Школьный',
  local: 'Сельский',
  tourist: 'Краеведческий',
};

export function MuseumsCatalog() {
  return (
    <CatalogPage
      eyebrow="Летопись Кижинги"
      title="Музеи района"
      subtitle="Школьные и сельские музеи — хранители истории, быта и памяти Кижингинской долины"
    >
      <ScrollReveal>
        <div className="glass-panel p-5 mb-8 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          <p className="flex items-start gap-2 mb-2">
            <Building2 className="h-4 w-4 shrink-0 mt-0.5 text-buryat-green dark:text-buryat-gold" />
            Материалы взяты из раздела «Музеи» проекта{' '}
            <a href={LETOPIS_MUSEUMS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-buryat-green dark:text-buryat-gold hover:underline">
              Летопись Кижинги
            </a>
          </p>
          <p>В районе {museums.length} музеев с коллекциями по археологии, быту семейских, литературе, войне и традициям бурят.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {museums.map((museum, index) => (
          <TopicCard
            key={museum.id}
            type="museum"
            id={museum.id}
            title={museum.name}
            subtitle={`${museum.village} · с ${museum.founded}`}
            imageUrl={museum.imageUrl}
            href={`/museums/${museum.id}/`}
            badge={typeLabels[museum.type]}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}

export function MuseumDetail({ museum }: { museum: (typeof museums)[0] }) {
  return (
    <article>
      <div className="relative h-[40vh] min-h-[240px] max-h-[420px] overflow-hidden">
        <img src={museum.imageUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <Link href="/museums/" className="absolute top-4 left-4 rounded-2xl bg-black/35 backdrop-blur-md px-4 py-2.5 text-sm text-white hover:bg-black/50">
          ← Музеи
        </Link>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-3xl">
          <span className="badge bg-buryat-green text-white border-0 mb-3">{typeLabels[museum.type]}</span>
          <h1 className="font-display text-h2 font-semibold mb-2">{museum.name}</h1>
          <p className="text-stone-500 flex flex-wrap gap-4 text-sm mb-6">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{museum.village}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />с {museum.founded}</span>
            {museum.founder && <span>Основатель: {museum.founder}</span>}
          </p>
          <p className="text-body leading-relaxed text-stone-700 dark:text-stone-300 mb-8">{museum.description}</p>
          <div className="glass-panel p-6">
            <h2 className="font-semibold flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-buryat-gold" /> Экспозиция
            </h2>
            <ul className="space-y-2">
              {museum.highlights.map((h) => (
                <li key={h} className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2">
                  <span className="text-buryat-green dark:text-buryat-gold">•</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
