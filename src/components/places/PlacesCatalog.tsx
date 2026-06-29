'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { landmarks } from '@/data/data';
import { useApp } from '@/context/AppContext';
import { LANDMARK_TYPE_LABELS, LANDMARK_TYPE_COLORS } from '@/types';
import type { LandmarkType } from '@/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

const filters: Array<{ id: LandmarkType | 'all'; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'nature', label: 'Природа' },
  { id: 'culture', label: 'Культура' },
  { id: 'religion', label: 'Святыни' },
  { id: 'history', label: 'История' },
];

export function PlacesCatalog() {
  const { visitedLandmarks } = useApp();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<LandmarkType | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return landmarks.filter((landmark) => {
      const matchesType = typeFilter === 'all' || landmark.type === typeFilter;
      const matchesQuery =
        !q ||
        landmark.name.toLowerCase().includes(q) ||
        landmark.description.toLowerCase().includes(q) ||
        LANDMARK_TYPE_LABELS[landmark.type].toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Каталог"
          title="Достопримечательности"
          subtitle="Поиск и фильтры по типам — каждое место открывается на отдельной странице"
        />

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: дацан, гора, источник..."
            className="w-full rounded-2xl border border-stone-200/80 dark:border-stone-700/80 bg-white/80 dark:bg-stone-900/50 backdrop-blur pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-buryat-green/40"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => {
            const active = typeFilter === filter.id;
            const color =
              filter.id !== 'all' ? LANDMARK_TYPE_COLORS[filter.id] : undefined;
            return (
              <button
                key={filter.id}
                onClick={() => setTypeFilter(filter.id)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'text-white shadow-glow-green'
                    : 'glass-card text-stone-600 dark:text-stone-300'
                }`}
                style={
                  active
                    ? { backgroundColor: color ?? '#1a6b47' }
                    : undefined
                }
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-stone-500 py-16">Ничего не найдено</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((landmark, index) => {
              const visited = visitedLandmarks.has(landmark.id);
              return (
                <ScrollReveal key={landmark.id} delay={index * 60}>
                  <Link
                    href={`/places/${landmark.id}/`}
                    className="group block glass-card-hover rounded-3xl overflow-hidden h-full"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={landmark.imageUrl}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span
                        className="absolute top-3 left-3 badge text-white border-0"
                        style={{ background: LANDMARK_TYPE_COLORS[landmark.type] }}
                      >
                        {LANDMARK_TYPE_LABELS[landmark.type]}
                      </span>
                      {visited && (
                        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-buryat-gold/90 px-2.5 py-1 text-[10px] font-bold text-white">
                          <CheckCircle2 className="h-3 w-3" />
                          Был
                        </span>
                      )}
                      <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                        <FavoriteButton type="landmark" id={landmark.id} size="sm" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="font-display text-lg font-semibold text-stone-900 dark:text-white leading-snug mb-2 group-hover:text-buryat-green dark:group-hover:text-buryat-gold transition-colors">
                        {landmark.name}
                      </h2>
                      <p className="text-sm text-stone-500 flex items-center gap-1.5 mb-3">
                        <MapPin className="h-3.5 w-3.5" />
                        {landmark.era}
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {landmark.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-buryat-green dark:text-buryat-gold">
                        Подробнее
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
