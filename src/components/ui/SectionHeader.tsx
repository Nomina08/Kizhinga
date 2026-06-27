import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      <span className={`section-eyebrow ${align === 'center' ? 'mx-auto' : ''}`}>
        <Icon className="h-4 w-4" strokeWidth={2} />
        {eyebrow}
      </span>
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
