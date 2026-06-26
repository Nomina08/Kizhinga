'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause, Play } from 'lucide-react';
import { AUDIO_LEGEND_URL } from '@/data/data';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-buryat-green/10 to-buryat-blue/10 dark:from-buryat-green/20 dark:to-buryat-blue/20 border border-stone-200 dark:border-stone-700 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="rounded-full bg-buryat-green/20 dark:bg-buryat-green/30 p-4">
            <Volume2 className="h-8 w-8 text-buryat-green dark:text-buryat-gold" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
              Легенда о духе горы Ехэ-Хада
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Прослушайте устное предание, переданное из поколения в поколение
            </p>
          </div>
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
          <audio
            ref={audioRef}
            src={AUDIO_LEGEND_URL}
            onEnded={() => setPlaying(false)}
            preload="none"
          />
        </motion.div>
      </div>
    </section>
  );
}
