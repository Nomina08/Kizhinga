'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { RouteType } from '@/types';

interface AppContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedRoute: RouteType | null;
  setSelectedRoute: (route: RouteType | null) => void;
  visitedLandmarks: Set<number>;
  markLandmarkVisited: (id: number) => void;
  visitedCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

const VISITED_KEY = 'kizhinga-visited-landmarks';
const THEME_KEY = 'kizhinga-theme';

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [visitedLandmarks, setVisitedLandmarks] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

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
