'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { FavoriteType, RouteType } from '@/types';
import { landmarks } from '@/data/data';
import { computeEarnedBadges } from '@/lib/badges';
import {
  favoriteKey,
  FAVORITES_KEY,
  RECENT_KEY,
  MAX_RECENT,
  parseFavoriteKey,
} from '@/lib/favorites';

export interface RecentItem {
  type: FavoriteType;
  id: number;
  viewedAt: number;
}

interface AppContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedRoute: RouteType | null;
  setSelectedRoute: (route: RouteType | null) => void;
  visitedLandmarks: Set<number>;
  markLandmarkVisited: (id: number) => void;
  visitedCount: number;
  totalLandmarks: number;
  progressPercent: number;
  earnedBadges: string[];
  favorites: Set<string>;
  toggleFavorite: (type: FavoriteType, id: number) => void;
  isFavorite: (type: FavoriteType, id: number) => boolean;
  recentlyViewed: RecentItem[];
  markRecentlyViewed: (type: FavoriteType, id: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const VISITED_KEY = 'kizhinga-visited-landmarks';
const THEME_KEY = 'kizhinga-theme';

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [visitedLandmarks, setVisitedLandmarks] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const totalLandmarks = landmarks.length;

  const earnedBadges = useMemo(
    () => computeEarnedBadges(landmarks, visitedLandmarks),
    [visitedLandmarks]
  );

  const progressPercent = useMemo(
    () =>
      totalLandmarks > 0
        ? Math.round((visitedLandmarks.size / totalLandmarks) * 100)
        : 0,
    [visitedLandmarks, totalLandmarks]
  );

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    const savedVisited = localStorage.getItem(VISITED_KEY);
    if (savedVisited) {
      try {
        setVisitedLandmarks(new Set(JSON.parse(savedVisited)));
      } catch {
        /* ignore */
      }
    }
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch {
        /* ignore */
      }
    }
    const savedRecent = localStorage.getItem(RECENT_KEY);
    if (savedRecent) {
      try {
        setRecentlyViewed(JSON.parse(savedRecent));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const markLandmarkVisited = useCallback((id: number) => {
    setVisitedLandmarks((prev) => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((type: FavoriteType, id: number) => {
    const key = favoriteKey(type, id);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (type: FavoriteType, id: number) => favorites.has(favoriteKey(type, id)),
    [favorites]
  );

  const markRecentlyViewed = useCallback((type: FavoriteType, id: number) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => !(item.type === type && item.id === id));
      const next: RecentItem[] = [{ type, id, viewedAt: Date.now() }, ...filtered].slice(
        0,
        MAX_RECENT
      );
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedRoute,
        setSelectedRoute,
        visitedLandmarks,
        markLandmarkVisited,
        visitedCount: visitedLandmarks.size,
        totalLandmarks,
        progressPercent,
        earnedBadges,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        markRecentlyViewed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { parseFavoriteKey };
