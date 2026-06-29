'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Panorama } from '@/types';
import { useApp } from '@/context/AppContext';
import { PanoramaViewer } from '@/components/panoramas/PanoramaViewer';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

export function PanoramaPageClient({ panorama }: { panorama: Panorama }) {
  const { markRecentlyViewed } = useApp();

  useEffect(() => {
    markRecentlyViewed('panorama', panorama.id);
  }, [panorama.id, markRecentlyViewed]);

  const imageUrl = panorama.panoramaImage ?? panorama.thumbnailUrl;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <Link href="/panoramas/" className="text-sm font-medium text-buryat-green dark:text-buryat-gold hover:underline">
              ← Все панорамы
            </Link>
            <h1 className="font-display text-h2 font-semibold mt-2">{panorama.title}</h1>
            <p className="text-stone-500 mt-1">{panorama.subtitle}</p>
          </div>
          <FavoriteButton type="panorama" id={panorama.id} />
        </div>

        <PanoramaViewer imageUrl={imageUrl} title={panorama.title} />

        {panorama.landmarkId && (
          <div className="mt-6 text-center">
            <Link href={`/places/${panorama.landmarkId}/`} className="text-sm font-semibold text-buryat-green dark:text-buryat-gold hover:underline">
              Открыть страницу места →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
