'use client';

import dynamic from 'next/dynamic';
import { settlements, populationHistory, ethnicComposition } from '@/data/extras';
import { districtStats } from '@/data/data';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const SettlementsMap = dynamic(
  () => import('./SettlementsMap').then((m) => m.SettlementsMap),
  { ssr: false, loading: () => <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800 animate-pulse" /> }
);

export function StatsVisualization() {
  const maxPop = Math.max(...populationHistory.map((p) => p.population));

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="glass-panel p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold mb-6">Население по годам</h3>
          <div className="flex items-end gap-2 sm:gap-4 h-48">
            {populationHistory.map((point, i) => {
              const height = `${Math.round((point.population / maxPop) * 100)}%`;
              return (
                <div key={point.year} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <span className="text-[10px] sm:text-xs font-bold text-buryat-green dark:text-buryat-gold">
                    {(point.population / 1000).toFixed(1)}k
                  </span>
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-buryat-green to-buryat-gold transition-all duration-700"
                      style={{ height }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium">{point.year}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollReveal delay={80}>
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold mb-6">Национальный состав</h3>
            <div className="relative w-44 h-44 mx-auto mb-6">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  return ethnicComposition.map((slice) => {
                    const el = (
                      <circle
                        key={slice.label}
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke={slice.color}
                        strokeWidth="4"
                        strokeDasharray={`${slice.percent} ${100 - slice.percent}`}
                        strokeDashoffset={-offset}
                      />
                    );
                    offset += slice.percent;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-semibold">~28k</span>
              </div>
            </div>
            <ul className="space-y-2">
              {ethnicComposition.map((item) => (
                <li key={item.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </span>
                  <span className="font-semibold">{item.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold mb-4">Карта расселения</h3>
            <p className="text-sm text-stone-500 mb-4">Населённые пункты Кижингинского района</p>
            <SettlementsMap />
            <ul className="mt-4 space-y-2 max-h-40 overflow-y-auto">
              {settlements
                .sort((a, b) => b.population - a.population)
                .map((s) => (
                  <li key={s.id} className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="font-semibold text-stone-600 dark:text-stone-300">
                      ~{s.population.toLocaleString('ru-RU')}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={160}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {districtStats.map((stat) => (
            <div key={stat.id} className="glass-card rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">{stat.icon === 'calendar' ? '📅' : stat.icon === 'users' ? '👥' : stat.icon === 'map' ? '🗺' : '🏛'}</p>
              <p className="font-display text-xl font-semibold">{stat.value}</p>
              <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
