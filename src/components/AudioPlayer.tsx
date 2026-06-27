'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { AUDIO_LEGEND_TEXT } from '@/data/data';
import { ScrollReveal } from './ui/ScrollReveal';
import { Button } from './ui/Button';

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);

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

    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(AUDIO_LEGEND_TEXT);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.92;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }, [playing, stop]);

  return (
    <section className="section-shell pb-30">
      <div className="container-premium max-w-3xl">
        <ScrollReveal>
          <div className="glass-panel p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="rounded-3xl bg-buryat-green/10 dark:bg-buryat-green/15 p-5 shadow-inner">
                <Volume2 className="h-10 w-10 text-buryat-green dark:text-buryat-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-h3 font-semibold text-stone-900 dark:text-white">
                  Легенда о духе горы Ехэ-Хада
                </h3>
                <p className="text-body-sm text-stone-600 dark:text-stone-400 mt-2">
                  Устное предание — озвучка на русском языке
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  icon={playing ? Pause : Play}
                  onClick={toggle}
                >
                  {playing ? 'Пауза' : 'Слушать'}
                </Button>
                {playing && (
                  <Button variant="ghost" icon={Square} onClick={stop} aria-label="Стоп" />
                )}
              </div>
            </div>
            <p className="mt-8 text-body-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-200/80 dark:border-stone-700/50 pt-8">
              {AUDIO_LEGEND_TEXT}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
