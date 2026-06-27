'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Map as MapIcon, CheckCircle2, Layers } from 'lucide-react';
import { landmarks, tourRoutes, MAP_CENTER, MAP_ZOOM } from '@/data/data';
import { useApp } from '@/context/AppContext';
import { LANDMARK_TYPE_COLORS, LANDMARK_TYPE_LABELS } from '@/types';
import type { Landmark, LandmarkType } from '@/types';
import { LandmarkModal } from './LandmarkModal';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';
import { Button } from './ui/Button';

function createMarkerIcon(color: string, visited: boolean, pulse: boolean) {
  const classes = `custom-marker${visited ? ' visited' : ''}${pulse ? ' pulse' : ''}`;
  return L.divIcon({
    className: '',
    html: `<div class="${classes}" style="width:22px;height:22px;background:${color};box-shadow:0 4px 14px ${color}66;"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
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
        map.fitBounds(L.latLngBounds(routeCoords), { padding: [48, 48], maxZoom: 12 });
      }
    }
  }, [selectedRoute, routeCoords, map]);

  return null;
}

export function TourMapInner() {
  const { selectedRoute, visitedLandmarks, markLandmarkVisited } = useApp();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [modalLandmark, setModalLandmark] = useState<Landmark | null>(null);
  const [typeFilter, setTypeFilter] = useState<LandmarkType | 'all'>('all');

  const filteredLandmarks = useMemo(() => {
    if (typeFilter === 'all') return landmarks;
    return landmarks.filter((l) => l.type === typeFilter);
  }, [typeFilter]);

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
    <section id="map" className="section-shell">
      <div className="container-premium">
        <ScrollReveal>
          <SectionHeader
            icon={MapIcon}
            eyebrow="Интерактивная карта"
            title="Достопримечательности района"
            subtitle="Фильтруйте объекты по типу, нажимайте на маркеры — откроется описание и маршрут"
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            <FilterChip
              active={typeFilter === 'all'}
              onClick={() => setTypeFilter('all')}
              label="Все"
            />
            {(['nature', 'culture', 'religion', 'history'] as const).map((type) => (
              <FilterChip
                key={type}
                active={typeFilter === type}
                onClick={() => setTypeFilter(type)}
                label={LANDMARK_TYPE_LABELS[type]}
                color={LANDMARK_TYPE_COLORS[type]}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="relative glass-panel p-2 sm:p-3 overflow-hidden">
            <div className="absolute top-6 left-6 z-[400] hidden sm:block">
              <div className="glass-panel p-4 max-w-[180px] shadow-card">
                <div className="flex items-center gap-2 mb-3 text-stone-700 dark:text-stone-300">
                  <Layers className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Легенда</span>
                </div>
                <ul className="space-y-2">
                  {(['nature', 'culture', 'religion', 'history'] as const).map((type) => (
                    <li key={type} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white/80"
                        style={{ background: LANDMARK_TYPE_COLORS[type] }}
                      />
                      {LANDMARK_TYPE_LABELS[type]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-[420px] sm:h-[560px] lg:h-[620px] ring-1 ring-stone-200/50 dark:ring-stone-700/50">
              <MapContainer
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                className="h-full w-full"
                scrollWheelZoom
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController selectedRoute={selectedRoute} routeCoords={routeCoords} />
                {routeCoords.length > 1 && (
                  <Polyline
                    positions={routeCoords}
                    pathOptions={{
                      color: routeColor,
                      weight: 5,
                      opacity: 0.85,
                      dashArray: '12 8',
                      lineCap: 'round',
                    }}
                  />
                )}
                {filteredLandmarks.map((landmark) => {
                  const visited = visitedLandmarks.has(landmark.id);
                  return (
                    <Marker
                      key={landmark.id}
                      position={landmark.coordinates}
                      icon={createMarkerIcon(
                        LANDMARK_TYPE_COLORS[landmark.type],
                        visited,
                        !visited
                      )}
                      eventHandlers={{
                        click: () => {
                          setSelectedLandmark(landmark);
                          markLandmarkVisited(landmark.id);
                        },
                      }}
                    >
                      <Popup className="premium-popup">
                        <div className="min-w-[220px] max-w-[280px] p-1">
                          <span
                            className="badge mb-2 text-white border-0"
                            style={{ background: LANDMARK_TYPE_COLORS[landmark.type] }}
                          >
                            {LANDMARK_TYPE_LABELS[landmark.type]}
                          </span>
                          <div className="flex items-start gap-2 mb-2">
                            <h3 className="font-semibold text-sm leading-snug">{landmark.name}</h3>
                            {visited && (
                              <CheckCircle2 className="h-4 w-4 text-buryat-gold shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mb-4 line-clamp-3 leading-relaxed">
                            {landmark.description.slice(0, 110)}...
                          </p>
                          <Button
                            size="sm"
                            onClick={() => handleDetails(landmark)}
                            className="w-full btn-sm py-2"
                          >
                            Подробнее
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </ScrollReveal>

        {selectedLandmark && visitedLandmarks.has(selectedLandmark.id) && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-body-sm text-buryat-gold font-medium flex items-center justify-center gap-2"
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

function FilterChip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
        active
          ? 'text-white shadow-glow-green scale-[1.02]'
          : 'glass-card text-stone-600 dark:text-stone-300 hover:shadow-soft'
      }`}
      style={active && color ? { backgroundColor: color } : active ? { backgroundColor: '#1a6b47' } : undefined}
    >
      {color && (
        <span
          className={`w-2.5 h-2.5 rounded-full ${active ? 'ring-2 ring-white/50' : ''}`}
          style={{ background: color }}
        />
      )}
      {label}
    </button>
  );
}
