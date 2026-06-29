'use client';

import { Heart } from 'lucide-react';
import type { FavoriteType } from '@/types';
import { useApp } from '@/context/AppContext';

interface FavoriteButtonProps {
  type: FavoriteType;
  id: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function FavoriteButton({ type, id, className = '', size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const active = isFavorite(type, id);
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(type, id);
      }}
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-300 ${
        active
          ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400'
          : 'bg-stone-100/80 dark:bg-stone-800/60 text-stone-400 hover:text-rose-400'
      } ${size === 'sm' ? 'p-2' : 'p-2.5'} ${className}`}
      aria-label={active ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <Heart className={`${iconSize} ${active ? 'fill-current' : ''}`} />
    </button>
  );
}
