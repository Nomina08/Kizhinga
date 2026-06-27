'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Landmark } from '@/types';
import { LANDMARK_TYPE_LABELS } from '@/types';

interface LandmarkModalProps {
  landmark: Landmark | null;
  onClose: () => void;
}

export function LandmarkModal({ landmark, onClose }: LandmarkModalProps) {
  if (!landmark) return null;

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

          <div className="relative h-60 sm:h-72 overflow-hidden rounded-t-4xl">
            <img
              src={landmark.imageUrl}
              alt={landmark.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="badge bg-buryat-gold/95 text-white border-0 mb-3">
                {LANDMARK_TYPE_LABELS[landmark.type]}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                {landmark.name}
              </h2>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-sm font-semibold text-buryat-blue dark:text-buryat-gold mb-4">
              {landmark.era}
            </p>
            <p className="text-body text-stone-700 dark:text-stone-300 leading-relaxed">
              {landmark.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
