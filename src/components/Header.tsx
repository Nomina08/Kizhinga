'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { TourProgress } from './TourProgress';
import { FLAG_IMAGE } from '@/data/data';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { href: '#stats', label: 'О районе' },
  { href: '#map', label: 'Карта' },
  { href: '#people', label: 'Люди' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#routes', label: 'Маршруты' },
];

export function Header() {
  const { theme, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = scrolled
    ? 'text-stone-600 dark:text-stone-300 hover:text-buryat-green dark:hover:text-buryat-gold'
    : 'text-white/85 hover:text-white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
        scrolled
          ? 'bg-white/80 dark:bg-surface-dark/80 backdrop-blur-2xl shadow-soft border-b border-stone-200/50 dark:border-stone-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <Logo size={scrolled ? 38 : 44} />
          <img
            src={FLAG_IMAGE}
            alt=""
            className={`rounded-lg object-cover shadow-sm ring-1 ring-white/30 transition-all ${
              scrolled ? 'h-7 w-10' : 'h-8 w-12'
            } hidden sm:block`}
          />
          <div className="hidden md:block">
            <p
              className={`font-display text-lg font-semibold leading-tight transition-colors ${
                scrolled ? 'text-buryat-green dark:text-buryat-gold' : 'text-white'
              }`}
            >
              Кижинга
            </p>
            <p className={`text-xs ${scrolled ? 'text-stone-500' : 'text-white/70'}`}>
              Виртуальный тур
            </p>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <TourProgress compact scrolled={scrolled} />
          </div>

          <button
            onClick={toggleTheme}
            className={`rounded-2xl p-2.5 transition-all duration-300 ${
              scrolled
                ? 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
                : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10'
            }`}
            aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          >
            {theme === 'light' ? (
              <Moon className={`h-5 w-5 ${scrolled ? 'text-stone-700' : 'text-white'}`} />
            ) : (
              <Sun className="h-5 w-5 text-buryat-gold" />
            )}
          </button>

          <button
            className={`xl:hidden rounded-2xl p-2.5 ${
              scrolled ? 'bg-stone-100 dark:bg-stone-800' : 'bg-white/10 backdrop-blur border border-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? (
              <X className={`h-5 w-5 ${scrolled ? '' : 'text-white'}`} />
            ) : (
              <Menu className={`h-5 w-5 ${scrolled ? '' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden border-t border-stone-200/50 dark:border-stone-800 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800">
                <TourProgress />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
