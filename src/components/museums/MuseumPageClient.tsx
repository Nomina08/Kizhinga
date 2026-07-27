'use client';

import { useEffect } from 'react';
import type { Museum } from '@/types';
import { MuseumDetail } from '@/components/museums/MuseumsSection';
import { useApp } from '@/context/AppContext';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

export function MuseumPageClient({ museum }: { museum: Museum }) {
  const { markRecentlyViewed } = useApp();

  useEffect(() => {
    markRecentlyViewed('museum', museum.id);
  }, [museum.id, markRecentlyViewed]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 lg:top-6 lg:right-8">
        <FavoriteButton type="museum" id={museum.id} />
      </div>
      <MuseumDetail museum={museum} />
    </div>
  );
}
