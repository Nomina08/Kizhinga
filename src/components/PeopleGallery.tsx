'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { people } from '@/data/data';
import type { Person } from '@/types';
import { PersonModal } from './PersonModal';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export function PeopleGallery({ standalone = false }: { standalone?: boolean }) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <section id={standalone ? undefined : 'people'} className="section-shell bg-gradient-to-b from-transparent to-buryat-mist/30 dark:to-stone-900/20">
      <div className="container-premium">
        {!standalone && (
          <ScrollReveal>
            <SectionHeader
              icon={Users}
              eyebrow="Выдающиеся люди"
              title="Сыновья и дочери Кижинги"
              subtitle="Учёные, артисты и просветители, чьи имена связаны с историей района"
            />
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {people.map((person, index) => (
            <ScrollReveal key={person.id} delay={index * 100}>
              <motion.button
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedPerson(person)}
                className="group card-equal glass-card-hover overflow-hidden text-left w-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={person.photoUrl}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm text-white/75 mt-1">{person.field}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-body-sm text-stone-600 dark:text-stone-400 line-clamp-2 flex-1 leading-relaxed">
                    {person.achievement}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-buryat-green dark:text-buryat-gold group-hover:gap-2 transition-all">
                    Читать биографию →
                  </span>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <PersonModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </section>
  );
}
