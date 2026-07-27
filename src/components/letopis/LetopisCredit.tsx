import { ExternalLink, BookOpen } from 'lucide-react';
import { LETOPIS_URL, letopisAbout } from '@/data/letopis';

interface LetopisCreditProps {
  variant?: 'panel' | 'inline';
}

export function LetopisCredit({ variant = 'panel' }: LetopisCreditProps) {
  if (variant === 'inline') {
    return (
      <p className="text-xs text-stone-500 dark:text-stone-400">
        Источник:{' '}
        <a
          href={LETOPIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-buryat-green dark:text-buryat-gold hover:underline inline-flex items-center gap-1"
        >
          {letopisAbout.title}
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-2xl bg-buryat-green/10 dark:bg-buryat-gold/10 p-3">
          <BookOpen className="h-6 w-6 text-buryat-green dark:text-buryat-gold" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold mb-2">{letopisAbout.title}</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
            {letopisAbout.summary}
          </p>
          <p className="text-xs text-stone-500 mb-4 italic">{letopisAbout.citation}</p>
          <a
            href={LETOPIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-buryat-green dark:text-buryat-gold hover:underline"
          >
            Открыть летопись на Google Sites
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
