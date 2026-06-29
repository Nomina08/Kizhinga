interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-buryat-green dark:text-buryat-gold mb-2">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-h2 md:text-h1 font-semibold text-stone-900 dark:text-white leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-body text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
