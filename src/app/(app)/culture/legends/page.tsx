import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegendsList } from '@/components/culture/LegendsList';
import { AudioPlayer } from '@/components/AudioPlayer';

export default function CultureLegendsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/culture/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-buryat-green dark:hover:text-buryat-gold transition-colors mb-6"
        >
          ← Культура
        </Link>
        <PageHeader
          eyebrow="Устное наследие"
          title="Легенды"
          subtitle="Истории и предания Кижингинского района, передаваемые из поколения в поколение"
        />
        <div className="mt-8 space-y-8">
          <AudioPlayer embedded />
          <LegendsList />
        </div>
      </div>
    </div>
  );
}
