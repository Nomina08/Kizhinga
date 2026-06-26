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

  const shortDesc = landmark.description.slice(0, 120) + '...';

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

          <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
            <img
              src={landmark.imageUrl}
              alt={landmark.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block rounded-full bg-buryat-gold/90 px-3 py-1 text-xs font-medium text-white mb-2">
                {LANDMARK_TYPE_LABELS[landmark.type]}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {landmark.name}
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-buryat-blue dark:text-buryat-gold font-medium mb-4">
              {landmark.era}
            </p>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {landmark.description}
            </p>
            <p className="mt-4 text-xs text-stone-400 sr-only">{shortDesc}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
