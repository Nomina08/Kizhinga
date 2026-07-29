'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface PhotoCarouselProps {
  images: string[];
  title?: string;
  altPrefix?: string;
  className?: string;
}

export function PhotoCarousel({
  images,
  title = 'Фотогалерея',
  altPrefix = '',
  className = '',
}: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  }, []);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      setLightboxIndex((current) => {
        if (current == null) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length]
  );

  if (images.length === 0) return null;

  const altBase = altPrefix ? `${altPrefix} — ` : '';

  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <p className="text-xs text-stone-500 tabular-nums">{images.length} фото</p>
      </div>

      <div className="relative group">
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Прокрутить назад"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Прокрутить вперёд"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 [scrollbar-width:thin]"
        >
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="relative shrink-0 snap-start w-[min(85vw,320px)] aspect-[4/3] rounded-2xl overflow-hidden group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-buryat-green dark:focus-visible:ring-buryat-gold"
            >
              <img src={src} alt={`${altBase}фото ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors" />
              <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 group-hover/item:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(-1);
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(1);
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]}
                alt={`${altBase}фото ${lightboxIndex + 1}`}
                className="w-full max-h-[85vh] object-contain rounded-2xl mx-auto"
              />
              <p className="text-center text-sm text-white/70 mt-3 tabular-nums">
                {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
