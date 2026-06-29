'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Route, Clock, Navigation } from 'lucide-react';
import type { Landmark } from '@/types';
import { LANDMARK_TYPE_LABELS, LANDMARK_TYPE_COLORS } from '@/types';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { useApp } from '@/context/AppContext';
import { tourRoutes } from '@/data/data';
import { Button } from '@/components/ui/Button';

interface LandmarkDetailViewProps {
  landmark: Landmark;
}

export function LandmarkDetailView({ landmark }: LandmarkDetailViewProps) {
  const { markLandmarkVisited, markRecentlyViewed, setSelectedRoute } = useApp();

  const relatedRoutes = tourRoutes.filter((route) =>
    route.landmarkIds.includes(landmark.id)
  );

  useEffect(() => {
    markLandmarkVisited(landmark.id);
    markRecentlyViewed('landmark', landmark.id);
  }, [landmark.id, markLandmarkVisited, markRecentlyViewed]);

  const handleShowOnMap = () => {
    if (relatedRoutes[0]) {
      setSelectedRoute(relatedRoutes[0].id);
    }
  };

  return (
    <article>
      <div className="relative h-[45vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <img
          src={landmark.imageUrl}
          alt={landmark.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        <Link
          href="/places/"
          className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center gap-2 rounded-2xl bg-black/35 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад
        </Link>
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
          <FavoriteButton type="landmark" id={landmark.id} />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10">
          <span
            className="badge text-white border-0 mb-3"
            style={{ background: LANDMARK_TYPE_COLORS[landmark.type] }}
          >
            {LANDMARK_TYPE_LABELS[landmark.type]}
          </span>
          <h1 className="font-display text-h2 sm:text-h1 font-semibold text-white leading-tight max-w-3xl">
            {landmark.name}
          </h1>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <InfoChip icon={Clock} label="Эпоха" value={landmark.era} />
            <InfoChip
              icon={MapPin}
              label="Координаты"
              value={`${landmark.coordinates[0].toFixed(2)}°, ${landmark.coordinates[1].toFixed(2)}°`}
            />
            <InfoChip icon={Navigation} label="На карте" value="Открыть точку" href="/map/" />
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none mb-10">
            <h2 className="font-display text-h3 font-semibold mb-4">История и описание</h2>
            <p className="text-body text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {landmark.description}
            </p>
          </div>

          {relatedRoutes.length > 0 && (
            <div className="glass-panel p-6 mb-8">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Route className="h-5 w-5 text-buryat-green dark:text-buryat-gold" />
                Маршруты через это место
              </h2>
              <ul className="space-y-3">
                {relatedRoutes.map((route) => (
                  <li key={route.id}>
                    <Link
                      href="/routes/"
                      onClick={() => setSelectedRoute(route.id)}
                      className="flex items-center justify-between rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 px-4 py-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-sm">{route.name}</p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {route.duration} · {route.distance}
                        </p>
                      </div>
                      <span className="text-buryat-green dark:text-buryat-gold text-sm">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/map/" className="flex-1" onClick={handleShowOnMap}>
              <Button className="w-full" iconRight={MapPin}>
                Показать на карте
              </Button>
            </Link>
            <Link href="/routes/" className="flex-1">
              <Button variant="secondary" className="w-full" iconRight={Route}>
                Все маршруты
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl glass-card p-4 h-full">
      <div className="flex items-center gap-1.5 text-stone-500 mb-1.5">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
      </div>
      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{value}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
