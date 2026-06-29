'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Route,
  Sparkles,
  TreePine,
  Church,
  Landmark,
  Clock,
  MapPin,
  Gauge,
  Sun,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { tourRoutes } from '@/data/data';
import { useApp } from '@/context/AppContext';
import type { RouteType } from '@/types';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';
import { Button } from './ui/Button';

const routeIcons: Record<RouteType, LucideIcon> = {
  spiritual: Church,
  nature: TreePine,
  historical: Landmark,
};

const difficultyColor: Record<string, string> = {
  'Лёгкий': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  'Средний': 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  'Сложный': 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
};

interface RoutesSectionProps {
  standalone?: boolean;
}

export function RoutesSection({ standalone = false }: RoutesSectionProps) {
  const router = useRouter();
  const { selectedRoute, setSelectedRoute } = useApp();

  const goToMap = () => {
    router.push('/map/');
  };

  const handleSelect = (routeId: RouteType) => {
    setSelectedRoute(routeId);
    setTimeout(goToMap, 150);
  };

  return (
    <section
      id={standalone ? undefined : 'routes'}
      className="section-shell bg-gradient-to-b from-buryat-mist/50 to-transparent dark:from-stone-900/30"
    >
      <div className="container-premium">
        {!standalone && (
          <ScrollReveal>
            <SectionHeader
              icon={Route}
              eyebrow="Маршруты"
              title="Выберите своё путешествие"
              subtitle="Три curated-маршрута по Кижингинскому району — карта автоматически построит путь"
            />
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {tourRoutes.map((route, index) => {
            const Icon = routeIcons[route.id];
            const isActive = selectedRoute === route.id;

            return (
              <ScrollReveal key={route.id} delay={index * 100}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className={`card-equal glass-card-hover overflow-hidden rounded-3xl ${
                    isActive ? 'ring-2 ring-buryat-gold shadow-glow' : ''
                  }`}
                >
                  <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${route.color}, transparent)` }}
                  />

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div
                        className="rounded-2xl p-4 shadow-inner"
                        style={{ backgroundColor: `${route.color}18` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: route.color }} strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <span
                          className="badge text-white border-0"
                          style={{ backgroundColor: route.color }}
                        >
                          {route.badge}
                        </span>
                        {isActive && (
                          <span className="badge bg-buryat-gold/20 text-buryat-earth dark:text-buryat-gold border border-buryat-gold/30">
                            <Sparkles className="h-3 w-3" />
                            Активен
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-display text-h3 font-semibold text-stone-900 dark:text-white mb-3">
                      {route.name}
                    </h3>
                    <p className="text-body-sm text-stone-600 dark:text-stone-400 flex-1 leading-relaxed">
                      {route.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-stone-200/80 dark:border-stone-700/50">
                      <Meta icon={Clock} label="Длительность" value={route.duration} />
                      <Meta icon={MapPin} label="Расстояние" value={route.distance} />
                      <Meta
                        icon={Gauge}
                        label="Сложность"
                        value={route.difficulty}
                        valueClass={difficultyColor[route.difficulty]}
                      />
                      <Meta icon={Sun} label="Сезон" value={route.season} />
                    </div>

                    <p className="mt-4 text-xs font-medium text-stone-500">
                      {route.landmarkIds.length}{' '}
                      {route.landmarkIds.length === 1 ? 'точка' : 'точек'} на маршруте
                    </p>

                    <Button
                      variant={isActive ? 'primary' : 'secondary'}
                      iconRight={ArrowRight}
                      onClick={() => (isActive ? goToMap() : handleSelect(route.id))}
                      className="w-full mt-6"
                    >
                      {isActive ? 'На карте' : 'Выбрать маршрут'}
                    </Button>
                  </div>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>

        {selectedRoute && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center text-body-sm text-buryat-green dark:text-buryat-gold font-medium"
          >
            Маршрут отображён на карте — исследуйте каждую точку
          </motion.p>
        )}
      </div>
    </section>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
  valueClass = '',
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 p-3">
      <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 mb-1">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <p className={`text-sm font-semibold text-stone-800 dark:text-stone-200 ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}
