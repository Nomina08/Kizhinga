'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SidebarProgress } from '@/components/layout/SidebarProgress';
import { FLAG_IMAGE } from '@/data/data';
import { useApp } from '@/context/AppContext';
import { bottomNav, mainNav, isNavActive, moreNavItems } from '@/lib/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useApp();
  const [moreOpen, setMoreOpen] = useState(false);

  const moreNav = moreNavItems;

  return (
    <div className="flex min-h-screen bg-surface dark:bg-surface-dark">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 h-screen w-64 xl:w-72 flex-col border-r border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#121816]">
        <div className="shrink-0 px-5 py-5 border-b border-stone-200/60 dark:border-stone-800/60">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={40} />
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-buryat-green dark:text-buryat-gold leading-tight truncate">
                Кижинга
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                Цифровой путеводитель
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
            Навигация
          </p>
          <ul className="space-y-0.5">
            {mainNav.map((item) => {
              const active = isNavActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'bg-buryat-green text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-white' : 'text-stone-400 dark:text-stone-500'}`}
                      strokeWidth={active ? 2.25 : 2}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 px-4 py-4 border-t border-stone-200/60 dark:border-stone-800/60 space-y-3">
          <SidebarProgress />
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-800/50 px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                Тёмная тема
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-buryat-gold" />
                Светлая тема
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:pl-64 xl:pl-72 min-h-screen">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-3 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/85 dark:bg-surface-dark/85 backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <Logo size={36} />
            <img src={FLAG_IMAGE} alt="" className="h-6 w-9 rounded object-cover ring-1 ring-stone-200/50" />
            <span className="font-display text-base font-semibold text-buryat-green dark:text-buryat-gold truncate">
              Кижинга
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-2xl p-2.5 bg-stone-100 dark:bg-stone-800 shrink-0"
            aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-stone-700" />
            ) : (
              <Sun className="h-5 w-5 text-buryat-gold" />
            )}
          </button>
        </header>

        <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {children}
        </main>

        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-surface-dark-elevated/95 backdrop-blur-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-stretch justify-around px-1 pt-1">
            {bottomNav.map((item) => {
              const Icon = item.icon;
              const isMore = item.href === '__more__';
              const active = isMore ? moreOpen : isNavActive(pathname, item.href);

              if (isMore) {
                return (
                  <button
                    key={item.href}
                    onClick={() => setMoreOpen((v) => !v)}
                    className={`flex flex-1 flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors ${
                      active
                        ? 'text-buryat-green dark:text-buryat-gold'
                        : 'text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
                    <span className="text-[10px] font-semibold">{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={`flex flex-1 flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors ${
                    active
                      ? 'text-buryat-green dark:text-buryat-gold'
                      : 'text-stone-500 dark:text-stone-400'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMoreOpen(false)}
              aria-label="Закрыть меню"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] inset-x-3 z-[70] rounded-3xl bg-white dark:bg-surface-dark-elevated shadow-2xl ring-1 ring-stone-200/80 dark:ring-stone-700/50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/80 dark:border-stone-700/50">
                <p className="font-display text-lg font-semibold">Разделы</p>
                <button
                  onClick={() => setMoreOpen(false)}
                  className="rounded-xl p-2 bg-stone-100 dark:bg-stone-800"
                  aria-label="Закрыть"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {moreNav.map((item) => {
                  const Icon = item.icon;
                  const active = isNavActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-buryat-green/10 text-buryat-green dark:text-buryat-gold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="px-4 pb-4">
                <SidebarProgress />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
