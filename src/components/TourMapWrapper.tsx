'use client';

import dynamic from 'next/dynamic';

const TourMapInner = dynamic(
  () => import('./TourMap').then((mod) => mod.TourMapInner),
  {
    ssr: false,
    loading: () => (
      <section id="map" className="py-20 px-4 bg-stone-100 dark:bg-stone-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="h-[450px] sm:h-[550px] rounded-2xl bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
            <p className="text-stone-500">Загрузка карты...</p>
          </div>
        </div>
      </section>
    ),
  }
);

interface TourMapProps {
  fullPage?: boolean;
}

export function TourMap({ fullPage = false }: TourMapProps) {
  return <TourMapInner fullPage={fullPage} />;
}
