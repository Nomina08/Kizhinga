'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, X, ZoomIn } from 'lucide-react';
import { galleryImages } from '@/data/data';
import type { GalleryImage } from '@/types';

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-100/50 dark:bg-stone-900/30">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-blue/10 dark:bg-buryat-blue/20 px-4 py-1.5 text-sm font-medium text-buryat-blue dark:text-buryat-gold mb-4">
            <Images className="h-4 w-4" />
            Фотогалерея
          </div>
          <h2 className="section-title">Кижинга в объективе</h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Нажмите на фото, чтобы увеличить
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(img)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border-0"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-white font-semibold text-sm">{img.title}</p>
              </div>
              <ZoomIn className="absolute top-3 right-3 h-5 w-5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-buryat-gold"
                aria-label="Закрыть"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain bg-black"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold">{lightbox.title}</h3>
                <p className="text-white/80 mt-1">{lightbox.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
