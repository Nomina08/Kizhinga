'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-stone-900/85 backdrop-blur-xl shadow-md border-b border-white/20 dark:border-stone-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <Logo size={40} />
          <img
            src={FLAG_IMAGE}
            alt=""
            className="h-8 w-12 rounded object-cover shadow-sm ring-1 ring-white/40 hidden sm:block"
          />
          <div className="hidden md:block">
            <p
              className={`font-display text-lg font-bold leading-tight ${
                scrolled
                  ? 'text-buryat-green dark:text-buryat-gold'
                  : 'text-white drop-shadow'
              }`}
            >
              Кижинга
            </p>
            <p
              className={`text-xs ${
                scrolled ? 'text-stone-500 dark:text-stone-400' : 'text-white/80'
              }`}
            >
              Виртуальный тур
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-stone-700 dark:text-stone-300 hover:text-buryat-green dark:hover:text-buryat-gold'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <TourProgress compact scrolled={scrolled} />
          </div>

          <button
            onClick={toggleTheme}
            className={`rounded-full p-2.5 transition-colors ${
              scrolled
                ? 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
                : 'bg-white/20 backdrop-blur hover:bg-white/30'
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
            className={`lg:hidden rounded-full p-2.5 ${
              scrolled ? 'bg-stone-100 dark:bg-stone-800' : 'bg-white/20 backdrop-blur'
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

      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-stone-200 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl px-4 py-4"
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
          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
            <TourProgress />
          </div>
        </motion.nav>
      )}
    </header>
  );
}
