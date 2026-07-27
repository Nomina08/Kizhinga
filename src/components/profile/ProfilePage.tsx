'use client';

import Link from 'next/link';
import { Heart, Clock, Trash2 } from 'lucide-react';
import { useApp, parseFavoriteKey } from '@/context/AppContext';
import { getContentPreview } from '@/lib/contentResolver';
import { PageHeader } from '@/components/layout/PageHeader';
import { BadgesPanel } from '@/components/BadgesPanel';
import { TourProgress } from '@/components/TourProgress';
import { ResetVisitProgressButton } from '@/components/visit/ResetVisitProgressButton';

export function ProfilePage() {
  const { favorites, recentlyViewed, toggleFavorite, visitorId, visitedCount, totalLandmarks } = useApp();

  const favoriteItems = Array.from(favorites)
    .map((key) => {
      const parsed = parseFavoriteKey(key);
      if (!parsed) return null;
      return getContentPreview(parsed.type, parsed.id);
    })
    .filter(Boolean);

  const recentItems = recentlyViewed
    .map((item) => getContentPreview(item.type, item.id))
    .filter(Boolean);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Личный кабинет"
          title="Избранное и просмотры"
          subtitle="Прогресс посещений сохраняется только в этом браузере — у каждого посетителя свои отметки"
        />

        <div className="glass-panel p-5 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-stone-200/70 dark:border-stone-700/50">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Ваш профиль посетителя
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Отмечено <span className="font-semibold text-stone-900 dark:text-white">{visitedCount} из {totalLandmarks}</span> мест
              </p>
              {visitorId && (
                <p className="text-[11px] text-stone-400 mt-2 font-mono truncate max-w-xs" title={visitorId}>
                  ID: {visitorId.slice(0, 8)}…
                </p>
              )}
            </div>
            <ResetVisitProgressButton />
          </div>
          <TourProgress />
        </div>

        <div className="glass-panel p-6 mb-8">
          <BadgesPanel />
        </div>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2 mb-5">
            <Heart className="h-5 w-5 text-rose-500" />
            Избранное ({favoriteItems.length})
          </h2>
          {favoriteItems.length === 0 ? (
            <p className="text-stone-500 text-sm">Добавляйте ♥ на карточках мест и событий</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteItems.map((item) => item && (
                <div key={`${item.type}-${item.id}`} className="flex gap-4 glass-card rounded-2xl p-3">
                  <Link href={item.href} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={item.href} className="font-semibold text-sm leading-snug hover:text-buryat-green dark:hover:text-buryat-gold line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="text-xs text-stone-500 mt-1">{item.subtitle}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.type, item.id)}
                    className="shrink-0 p-2 text-stone-400 hover:text-rose-500"
                    aria-label="Удалить"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold flex items-center gap-2 mb-5">
            <Clock className="h-5 w-5 text-buryat-green dark:text-buryat-gold" />
            Недавно просмотренные
          </h2>
          {recentItems.length === 0 ? (
            <p className="text-stone-500 text-sm">Открывайте страницы — они появятся здесь</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentItems.map((item) => item && (
                <Link key={`${item.type}-${item.id}`} href={item.href} className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
                  <div className="h-32 overflow-hidden">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                    <p className="text-xs text-stone-500 mt-1">{item.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
