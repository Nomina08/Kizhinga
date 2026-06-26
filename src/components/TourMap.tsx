'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { landmarks, tourRoutes, MAP_CENTER, MAP_ZOOM } from '@/data/data';
import { useApp } from '@/context/AppContext';
import { LANDMARK_TYPE_COLORS, LANDMARK_TYPE_LABELS } from '@/types';
import type { Landmark } from '@/types';
import { LandmarkModal } from './LandmarkModal';

function createMarkerIcon(color: string, visited: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker${visited ? ' visited' : ''}" style="width:18px;height:18px;background:${color};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });
}

function MapController({
  selectedRoute,
  routeCoords,
}: {
  selectedRoute: string | null;
  routeCoords: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedRoute && routeCoords.length > 0) {
      map.flyTo(routeCoords[0], 11, { duration: 1.5 });
      if (routeCoords.length > 1) {
        map.fitBounds(L.latLngBounds(routeCoords), { padding: [40, 40], maxZoom: 12 });
      }
    }
  }, [selectedRoute, routeCoords, map]);

  return null;
}

export function TourMapInner() {
  const { selectedRoute, visitedLandmarks, markLandmarkVisited } = useApp();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [modalLandmark, setModalLandmark] = useState<Landmark | null>(null);

  const routeCoords = useMemo(() => {
    if (!selectedRoute) return [];
    const route = tourRoutes.find((r) => r.id === selectedRoute);
    if (!route) return [];
    return route.landmarkIds
      .map((id) => landmarks.find((l) => l.id === id))
      .filter(Boolean)
      .map((l) => l!.coordinates);
  }, [selectedRoute]);

  const routeColor = useMemo(() => {
    const route = tourRoutes.find((r) => r.id === selectedRoute);
    return route?.color ?? '#c9a227';
  }, [selectedRoute]);

  const handleDetails = (landmark: Landmark) => {
    markLandmarkVisited(landmark.id);
    setModalLandmark(landmark);
  };

  return (
    <section id="map" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-stone-900/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-buryat-green/10 dark:bg-buryat-green/20 px-4 py-1.5 text-sm font-medium text-buryat-green dark:text-buryat-gold mb-4">
            <MapIcon className="h-4 w-4" />
            Интерактивная карта
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Достопримечательности района
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Нажмите на маркер, чтобы узнать больше. Цвет маркера указывает на тип объекта.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(['nature', 'culture', 'religion', 'history'] as const).map((type) => (
            <div key={type} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full border-2 border-white shadow"
                style={{ background: LANDMARK_TYPE_COLORS[type] }}
              />
              <span className="text-stone-600 dark:text-stone-400">
                {LANDMARK_TYPE_LABELS[type]}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-700 h-[450px] sm:h-[550px]">
          <MapContainer
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController selectedRoute={selectedRoute} routeCoords={routeCoords} />
            {routeCoords.length > 1 && (
              <Polyline
                positions={routeCoords}
                pathOptions={{ color: routeColor, weight: 4, opacity: 0.8, dashArray: '8 8' }}
              />
            )}
            {landmarks.map((landmark) => {
              const visited = visitedLandmarks.has(landmark.id);
              return (
                <Marker
                  key={landmark.id}
                  position={landmark.coordinates}
                  icon={createMarkerIcon(LANDMARK_TYPE_COLORS[landmark.type], visited)}
                  eventHandlers={{
                    click: () => {
                      setSelectedLandmark(landmark);
                      markLandmarkVisited(landmark.id);
                    },
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px] max-w-[260px]">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="font-semibold text-sm leading-tight">{landmark.name}</h3>
                        {visited && (
                          <CheckCircle2 className="h-4 w-4 text-buryat-gold shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-600 mb-3 line-clamp-3">
                        {landmark.description.slice(0, 100)}...
                      </p>
                      <button
                        onClick={() => handleDetails(landmark)}
                        className="w-full rounded-lg bg-buryat-green text-white text-xs py-2 px-3 hover:bg-buryat-green/90 transition-colors font-medium"
                      >
                        Подробнее
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {selectedLandmark && visitedLandmarks.has(selectedLandmark.id) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-buryat-gold flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            «{selectedLandmark.name}» отмечена как просмотренная
          </motion.p>
        )}
      </div>

      <LandmarkModal landmark={modalLandmark} onClose={() => setModalLandmark(null)} />
    </section>
  );
}
