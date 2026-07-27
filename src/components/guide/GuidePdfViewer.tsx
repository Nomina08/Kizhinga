'use client';

import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';
import { GUIDE_PDF_URL } from '@/lib/assets';

export function GuidePdfViewer() {
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <a
          href={GUIDE_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-buryat-green/40 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
        >
          <ExternalLink className="h-4 w-4" />
          Открыть в новой вкладке
        </a>
        <a
          href={GUIDE_PDF_URL}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-buryat-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 dark:bg-buryat-gold dark:text-stone-900"
        >
          <Download className="h-4 w-4" />
          Скачать PDF
        </a>
      </div>

      <div className="rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-sm dark:border-stone-700/60 dark:bg-stone-900/50">
        <iframe
          src={GUIDE_PDF_URL}
          title="Путеводитель Кижингинского района — PDF"
          className="w-full h-[min(80vh,900px)] min-h-[480px] bg-stone-100 dark:bg-stone-800"
        />
      </div>

      <p className="mt-4 text-xs text-stone-500">
        Если документ не отображается,{' '}
        <Link href={GUIDE_PDF_URL} target="_blank" className="text-buryat-green dark:text-buryat-gold hover:underline">
          откройте PDF напрямую
        </Link>
        .
      </p>
    </div>
  );
}
