'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { people } from '@/data/data';
import type { Person } from '@/types';
import { PersonModal } from './PersonModal';

export function PeopleGallery() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <section id="people" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-blue/10 dark:bg-buryat-blue/20 px-4 py-1.5 text-sm font-medium text-buryat-blue dark:text-buryat-gold mb-4">
            <Users className="h-4 w-4" />
            Выдающиеся люди
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Сыновья и дочери Кижинги
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Учёные, артисты и просветители, чьи имена связаны с историей района
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <motion.button
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPerson(person)}
              className="group text-left rounded-2xl overflow-hidden bg-white dark:bg-stone-800 shadow-md hover:shadow-xl border border-stone-200 dark:border-stone-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white font-display">
                    {person.name}
                  </h3>
                  <p className="text-sm text-white/80">{person.field}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                  {person.achievement}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-buryat-green dark:text-buryat-gold group-hover:underline">
                  Читать биографию →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <PersonModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </section>
  );
}
