'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/data';
import type { GalleryImage } from '@/types';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

const masonryHeights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80'];

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (img: GalleryImage, index: number) => {
    setLightbox(img);
    setLightboxIndex(index);
  };

  const navigate = (dir: -1 | 1) => {
    const next = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
    setLightboxIndex(next);
    setLightbox(galleryImages[next]);
  };

  return (
    <section id="gallery" className="section-shell bg-stone-100/40 dark:bg-stone-900/20">
      <div className="container-premium">
        <ScrollReveal>
          <SectionHeader
            icon={Images}
            eyebrow="Фотогалерея"
            title="Кижинга в объективе"
            subtitle="Нажмите на фото для просмотра в полном размере"
          />
        </ScrollReveal>

        <div className="masonry-grid">
          {galleryImages.map((img, index) => (
            <ScrollReveal key={img.id} delay={index * 60} className="masonry-item">
              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openLightbox(img, index)}
                className={`group relative w-full ${masonryHeights[index % masonryHeights.length]} rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-buryat-green/0 group-hover:bg-buryat-green/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-semibold text-lg font-display">{img.title}</p>
                  <p className="text-white/70 text-sm mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {img.caption}
                  </p>
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-black/92 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Предыдущее"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Следующее"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full rounded-3xl shadow-2xl max-h-[75vh] object-contain mx-auto ring-1 ring-white/10"
              />
              <div className="mt-6 text-center">
                <h3 className="font-display text-2xl font-semibold text-white">{lightbox.title}</h3>
                <p className="text-white/70 mt-2 text-body-sm max-w-lg mx-auto">{lightbox.caption}</p>
                <p className="text-white/40 text-xs mt-3">
                  {lightboxIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
