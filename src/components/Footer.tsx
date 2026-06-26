import { Github, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { GITHUB_URL } from '@/data/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <p className="font-display font-bold text-buryat-green dark:text-buryat-gold">
                Кижинга — Сердце Удолии
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Виртуальный тур по Кижингинскому району
              </p>
            </div>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-600 px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400">
          <p className="flex items-center justify-center gap-1.5">
            © {year} Кижингинский район. Сделано с{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> для Бурятии
          </p>
          <p className="mt-2 text-xs">
            Данные носят ознакомительный характер. Карта: OpenStreetMap.
          </p>
        </div>
      </div>
    </footer>
  );
}
