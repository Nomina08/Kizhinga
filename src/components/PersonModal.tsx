'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar } from 'lucide-react';
import type { Person } from '@/types';
import { Button } from './ui/Button';

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
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl bg-surface-elevated dark:bg-surface-dark-elevated shadow-2xl ring-1 ring-stone-200/50 dark:ring-stone-700/50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 rounded-2xl bg-black/30 backdrop-blur p-2.5 text-white hover:bg-black/50 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-2/5 h-56 sm:h-auto sm:min-h-[300px] overflow-hidden rounded-t-4xl sm:rounded-l-4xl sm:rounded-tr-none">
              <img
                src={person.photoUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-3/5 p-8">
              <h2 className="font-display text-2xl font-semibold text-buryat-green dark:text-buryat-gold">
                {person.name}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-body-sm text-stone-500">
                <Calendar className="h-4 w-4" />
                г. р. {person.birthDate}
              </div>
              <p className="mt-2 text-sm font-semibold text-buryat-blue dark:text-buryat-gold">
                {person.field}
              </p>
              <p className="mt-4 text-body-sm text-stone-600 dark:text-stone-400 italic leading-relaxed">
                {person.achievement}
              </p>
            </div>
          </div>

          <div className="px-8 pb-10 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Связь с районом
              </h3>
              <p className="text-body-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {person.connectionToDistrict}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Биография
              </h3>
              <p className="text-body-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {person.fullBiography}
              </p>
            </div>
            <Button
              variant="secondary"
              icon={ExternalLink}
              className="btn-sm"
              onClick={() => window.open(person.sourceUrl, '_blank')}
            >
              Местные источники
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
