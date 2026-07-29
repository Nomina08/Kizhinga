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
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-4xl bg-surface-elevated dark:bg-surface-dark-elevated shadow-2xl ring-1 ring-stone-200/50 dark:ring-stone-700/50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-2xl bg-black/40 backdrop-blur-md p-2.5 text-white hover:bg-black/55 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch">
            <div className="shrink-0 border-b border-stone-200/80 bg-stone-100/80 dark:border-stone-700/50 dark:bg-stone-900/60 lg:w-[min(42%,280px)] lg:border-b-0 lg:border-r">
              <div className="mx-auto flex max-h-[min(52vh,420px)] w-full items-center justify-center p-4 sm:p-6 lg:max-h-none lg:min-h-[320px] lg:h-full">
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="max-h-[min(48vh,400px)] w-auto max-w-full rounded-2xl object-contain object-center shadow-md ring-1 ring-stone-200/60 dark:ring-stone-700/60 lg:max-h-[min(70vh,520px)]"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="p-6 sm:p-8 pr-14">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-buryat-green dark:text-buryat-gold leading-tight">
                  {person.name}
                </h2>
                <div className="mt-3 flex items-center gap-2 text-body-sm text-stone-500">
                  <Calendar className="h-4 w-4 shrink-0" />
                  г. р. {person.birthDate}
                </div>
                <p className="mt-2 text-sm font-semibold text-buryat-blue dark:text-buryat-gold">
                  {person.field}
                </p>
                <p className="mt-4 text-body-sm text-stone-600 dark:text-stone-400 italic leading-relaxed">
                  {person.achievement}
                </p>
              </div>

              <div className="space-y-6 border-t border-stone-200/80 px-6 pb-8 pt-6 dark:border-stone-700/50 sm:px-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Связь с районом
                  </h3>
                  <p className="text-body-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {person.connectionToDistrict}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Биография
                  </h3>
                  <p className="text-body-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {person.fullBiography}
                  </p>
                </div>
                {person.sourceUrl && (
                  <Button
                    variant="secondary"
                    icon={ExternalLink}
                    className="btn-sm"
                    onClick={() => window.open(person.sourceUrl, '_blank')}
                  >
                    Местные источники
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
