import { Github, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { GITHUB_URL } from '@/data/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 bg-surface-elevated dark:bg-surface-dark-elevated py-16 px-4 sm:px-6 lg:px-8">
      <div className="container-premium">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Logo size={40} />
            <div>
              <p className="font-display text-lg font-semibold text-buryat-green dark:text-buryat-gold">
                Кижинга — Сердце Удолии
              </p>
              <p className="text-body-sm text-stone-500 dark:text-stone-400 mt-0.5">
                Виртуальный тур по Кижингинскому району
              </p>
            </div>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-sm"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="flex items-center justify-center gap-2 text-body-sm text-stone-500 dark:text-stone-400">
            © {year} Кижингинский район. Сделано с
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            для Бурятии
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Карта: OpenStreetMap · Данные носят ознакомительный характер
          </p>
        </div>
      </div>
    </footer>
  );
}
