'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { FavoriteType } from '@/types';
import { useApp } from '@/context/AppContext';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { PageHeader } from '@/components/layout/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PhotoCarousel } from '@/components/ui/PhotoCarousel';
import { CONTENT_PLACEHOLDER_IMAGE } from '@/lib/content';

interface TopicCardProps {
  type: FavoriteType;
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
  badge?: string;
  index?: number;
}

export function TopicCard({
  type,
  id,
  title,
  subtitle,
  imageUrl,
  href,
  badge,
  index = 0,
}: TopicCardProps) {
  const { markRecentlyViewed } = useApp();
  const coverImage = imageUrl || CONTENT_PLACEHOLDER_IMAGE;

  return (
    <ScrollReveal delay={index * 60}>
      <Link
        href={href}
        onClick={() => markRecentlyViewed(type, id)}
        className="group block glass-card-hover rounded-3xl overflow-hidden h-full"
      >
        <div className="relative h-48 overflow-hidden">
          <img src={coverImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
            <FavoriteButton type={type} id={id} size="sm" />
          </div>
          {badge && (
            <span className="absolute top-3 left-3 badge bg-black/40 text-white border-0 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <h2 className="font-display text-xl font-semibold leading-snug mb-2 group-hover:text-buryat-green dark:group-hover:text-buryat-gold transition-colors">
            {title}
          </h2>
          <p className="text-sm text-stone-500 flex items-center gap-1.5 mb-3">
            <MapPin className="h-3.5 w-3.5" />
            {subtitle}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-buryat-green dark:text-buryat-gold">
            Подробнее <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}

interface DetailPageProps {
  type: FavoriteType;
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  gallery?: string[];
  backHref: string;
  backLabel: string;
  extra?: React.ReactNode;
}

export function ContentDetailPage({
  type,
  id,
  title,
  subtitle,
  imageUrl,
  description,
  gallery = [],
  backHref,
  backLabel,
  extra,
}: DetailPageProps) {
  const { markRecentlyViewed } = useApp();
  const heroImage = imageUrl || CONTENT_PLACEHOLDER_IMAGE;

  useEffect(() => {
    markRecentlyViewed(type, id);
  }, [type, id, markRecentlyViewed]);

  return (
    <article>
      <div className="relative h-[42vh] min-h-[260px] max-h-[460px] overflow-hidden">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        <Link href={backHref} className="absolute top-4 left-4 lg:top-6 lg:left-6 rounded-2xl bg-black/35 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-white hover:bg-black/50 transition-colors">
          ← {backLabel}
        </Link>
        <div className="absolute top-4 right-4">
          <FavoriteButton type={type} id={id} />
        </div>
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
          {subtitle && <p className="text-sm text-white/75 mb-2">{subtitle}</p>}
          <h1 className="font-display text-h2 sm:text-h1 font-semibold text-white leading-tight max-w-3xl">{title}</h1>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          {description && (
            <p className="text-body text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line mb-8">{description}</p>
          )}
          {gallery.length > 0 && (
            <PhotoCarousel images={gallery} altPrefix={title} className="mb-8" />
          )}
          {extra}
        </div>
      </div>
    </article>
  );
}

export function CatalogPage({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </div>
  );
}
