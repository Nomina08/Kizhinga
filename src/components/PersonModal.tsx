'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar } from 'lucide-react';
import type { Person } from '@/types';

interface PersonModalProps {
  person: Person | null;
  onClose: () => void;
}

export function PersonModal({ person, onClose }: PersonModalProps) {
  if (!person) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-stone-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-2/5 h-48 sm:h-auto sm:min-h-[280px] overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
              <img
                src={person.photoUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-3/5 p-6">
              <h2 className="text-2xl font-bold font-display text-buryat-green dark:text-buryat-gold">
                {person.name}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
                <Calendar className="h-4 w-4" />
                <span>г. р. {person.birthDate}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-buryat-blue dark:text-buryat-gold">
                {person.field}
              </p>
              <p className="mt-3 text-stone-600 dark:text-stone-400 italic">
                {person.achievement}
              </p>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 mb-2">
                Связь с районом
              </h3>
              <p className="text-stone-700 dark:text-stone-300">
                {person.connectionToDistrict}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 mb-2">
                Биография
              </h3>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {person.fullBiography}
              </p>
            </div>
            <a
              href={person.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-buryat-blue dark:text-buryat-gold hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Местные источники
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
