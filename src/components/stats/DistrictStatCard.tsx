import { getDistrictStatIcon } from '@/lib/districtStatIcons';
import type { DistrictStat } from '@/types';

interface DistrictStatCardProps {
  stat: DistrictStat;
  compact?: boolean;
}

export function DistrictStatCard({ stat, compact = false }: DistrictStatCardProps) {
  const Icon = getDistrictStatIcon(stat.icon);

  if (compact) {
    return (
      <div className="rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-sm dark:border-stone-700/60 dark:bg-stone-900/50">
        <div className="mx-auto mb-3 inline-flex rounded-xl bg-buryat-green/10 p-2.5 dark:bg-buryat-gold/10">
          <Icon className="h-5 w-5 text-buryat-green dark:text-buryat-gold" strokeWidth={1.75} />
        </div>
        <p className="font-display text-lg font-semibold text-stone-900 dark:text-white">{stat.value}</p>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-snug">{stat.label}</p>
      </div>
    );
  }

  return (
    <div className="card-equal rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/50">
      <div className="mx-auto mb-4 inline-flex rounded-2xl bg-buryat-green/10 p-4 dark:bg-buryat-gold/10">
        <Icon className="h-7 w-7 text-buryat-green dark:text-buryat-gold" strokeWidth={1.75} />
      </div>
      <p className="text-3xl sm:text-4xl font-display font-semibold text-buryat-green dark:text-buryat-gold tracking-tight">
        {stat.value}
      </p>
      <p className="mt-3 text-body-sm text-stone-600 dark:text-stone-400 leading-relaxed">{stat.label}</p>
    </div>
  );
}
