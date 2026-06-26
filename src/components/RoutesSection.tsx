'use client';

import { motion } from 'framer-motion';
import { Route, Sparkles, TreePine, Church, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { tourRoutes } from '@/data/data';
import { useApp } from '@/context/AppContext';
import type { RouteType } from '@/types';

const routeIcons: Record<RouteType, LucideIcon> = {
  spiritual: Church,
  nature: TreePine,
  historical: Landmark,
};

export function RoutesSection() {
  const { selectedRoute, setSelectedRoute } = useApp();

  const scrollToMap = () => {
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelect = (routeId: RouteType) => {
    setSelectedRoute(routeId);
    setTimeout(scrollToMap, 100);
  };

  return (
    <section id="routes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-green/10 dark:bg-buryat-green/20 px-4 py-1.5 text-sm font-medium text-buryat-green dark:text-buryat-gold mb-4">
            <Route className="h-4 w-4" />
            Маршруты
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Выберите своё путешествие
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Три готовых маршрута — карта автоматически построит путь и покажет точки
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tourRoutes.map((route, index) => {
            const Icon = routeIcons[route.id];
            const isActive = selectedRoute === route.id;

            return (
              <motion.button
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(route.id)}
                className={`relative text-left rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? 'border-buryat-gold bg-buryat-gold/5 dark:bg-buryat-gold/10 shadow-lg'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-buryat-green/50 shadow-md'
                }`}
              >
                {isActive && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium text-buryat-gold">
                    <Sparkles className="h-3.5 w-3.5" />
                    Активен
                  </span>
                )}
                <div
                  className="mb-4 inline-flex rounded-xl p-3"
                  style={{ backgroundColor: `${route.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: route.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mb-2">
                  {route.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {route.description}
                </p>
                <p className="mt-4 text-xs font-medium text-stone-500">
                  {route.landmarkIds.length}{' '}
                  {route.landmarkIds.length === 1 ? 'точка' : 'точек'} на маршруте
                </p>
              </motion.button>
            );
          })}
        </div>

        {selectedRoute && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-buryat-green dark:text-buryat-gold"
          >
            Маршрут отображён на карте выше. Пройдите по точкам, чтобы узнать больше!
          </motion.p>
        )}
      </div>
    </section>
  );
}
