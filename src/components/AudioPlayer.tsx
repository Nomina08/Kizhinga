'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { AUDIO_LEGEND_TEXT } from '@/data/data';

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Озвучка недоступна в этом браузере. Прочитайте легенду ниже.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(AUDIO_LEGEND_TEXT);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.92;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }, [playing, stop]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="rounded-full bg-buryat-green/20 dark:bg-buryat-green/30 p-4">
              <Volume2 className="h-8 w-8 text-buryat-green dark:text-buryat-gold" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                Легенда о духе горы Ехэ-Хада
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Устное предание Кижингинского района — озвучка на русском языке
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-2 rounded-full bg-buryat-green px-6 py-3 text-white font-medium hover:bg-buryat-green/90 transition-colors shadow-md"
              >
                {playing ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Пауза
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Слушать легенду
                  </>
                )}
              </button>
              {playing && (
                <button
                  onClick={stop}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-600 px-4 py-3 text-stone-700 dark:text-stone-300"
                  aria-label="Остановить"
                >
                  <Square className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-6 text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-200 dark:border-stone-700 pt-6">
            {AUDIO_LEGEND_TEXT}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
