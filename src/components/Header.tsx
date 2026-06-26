'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { href: '#map', label: 'Карта' },
  { href: '#people', label: 'Люди' },
  { href: '#legends', label: 'Легенды' },
  { href: '#routes', label: 'Маршруты' },
];

export function Header() {
  const { theme, toggleTheme, visitedCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <Logo size={44} />
          <div className="hidden sm:block">
            <p className="font-display text-lg font-bold text-buryat-green dark:text-buryat-gold leading-tight">
              Кижинга
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Виртуальный тур
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-buryat-green dark:hover:text-buryat-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-buryat-gold/15 dark:bg-buryat-gold/20 px-3 py-1.5 text-xs font-medium text-buryat-earth dark:text-buryat-gold">
            <MapPin className="h-3.5 w-3.5" />
            <span>{visitedCount} посещено</span>
          </div>

          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            aria-label={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-stone-700" />
            ) : (
              <Sun className="h-5 w-5 text-buryat-gold" />
            )}
          </button>

          <button
            className="md:hidden rounded-full p-2.5 bg-stone-100 dark:bg-stone-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-stone-700 dark:text-stone-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-1.5 text-sm text-buryat-earth dark:text-buryat-gold">
            <MapPin className="h-4 w-4" />
            <span>{visitedCount} мест посещено</span>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
