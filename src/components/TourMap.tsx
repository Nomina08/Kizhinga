'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import {
  Map as MapIcon,
  CheckCircle2,
  Layers,
  Maximize2,
  Locate,
  Satellite,
  Moon,
  Sun,
  Calendar,
  Building2,
} from 'lucide-react';
import { landmarks, tourRoutes, MAP_CENTER, MAP_ZOOM } from '@/data/data';
import { districtEvents, settlements } from '@/data/extras';
import { useApp } from '@/context/AppContext';
import { LANDMARK_TYPE_COLORS, LANDMARK_TYPE_LABELS } from '@/types';
import type { Landmark, LandmarkType } from '@/types';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';
import { Button } from './ui/Button';
import { FavoriteButton } from './ui/FavoriteButton';
import {
  createLandmarkMarkerIcon,
  createEventMarkerIcon,
  MAP_TILES,
  type MapStyle,
} from '@/lib/mapMarkers';

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

function MapRefSetter({ onMap }: { onMap: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMap(map);
  }, [map, onMap]);
  return null;
}

function ThemeTileLayer({ mapStyle }: { mapStyle: MapStyle }) {
  const { theme } = useApp();
  const resolvedStyle: MapStyle =
    mapStyle === 'satellite' ? 'satellite' : mapStyle === 'dark' ? 'dark' : theme === 'dark' ? 'dark' : 'light';
  const tiles = MAP_TILES[resolvedStyle];

  return <TileLayer key={tiles.url} attribution={tiles.attribution} url={tiles.url} />;
}

interface TourMapInnerProps {
  fullPage?: boolean;
}

export function TourMapInner({ fullPage = false }: TourMapInnerProps) {
  const { theme, selectedRoute, visitedLandmarks, markLandmarkVisited, isFavorite } = useApp();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [typeFilter, setTypeFilter] = useState<LandmarkType | 'all'>('all');
  const [mapStyle, setMapStyle] = useState<MapStyle>('light');
  const [showSettlements, setShowSettlements] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [leafletMap, setLeafletMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (mapStyle !== 'satellite') {
      setMapStyle(theme === 'dark' ? 'dark' : 'light');
    }
  }, [theme]);

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

  const mapHeight = fullPage
    ? 'h-[calc(100vh-12rem)] min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]'
    : 'h-[420px] sm:h-[560px] lg:h-[620px]';

  return (
    <section id={fullPage ? undefined : 'map'} className={fullPage ? '' : 'section-shell'}>
      <div className={fullPage ? '' : 'container-premium'}>
        {!fullPage && (
          <ScrollReveal>
            <SectionHeader
              icon={MapIcon}
              eyebrow="Интерактивная карта"
              title="Достопримечательности района"
              subtitle="Фильтруйте объекты, переключайте слои и исследуйте Кижингинский район"
            />
          </ScrollReveal>
        )}

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterChip active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} label="Все" />
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

        <ScrollReveal delay={120}>
          <div className="relative map-shell">
            <div className="absolute top-4 left-4 z-[500] hidden sm:block">
              <div className="map-control-panel">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-4 w-4 text-buryat-green dark:text-buryat-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider">Слои</span>
                </div>
                <LayerToggle active={showSettlements} onClick={() => setShowSettlements((v) => !v)} label="Населённые пункты" icon={Building2} />
                <LayerToggle active={showEvents} onClick={() => setShowEvents((v) => !v)} label="Мероприятия" icon={Calendar} />
                <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-700/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Легенда</p>
                  <ul className="space-y-1.5">
                    {(['nature', 'culture', 'religion', 'history'] as const).map((type) => (
                      <li key={type} className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white/50" style={{ background: LANDMARK_TYPE_COLORS[type] }} />
                        {LANDMARK_TYPE_LABELS[type]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
              <MapToolButton onClick={() => setMapStyle('light')} active={mapStyle === 'light'} label="Светлая" icon={Sun} />
              <MapToolButton onClick={() => setMapStyle('dark')} active={mapStyle === 'dark'} label="Тёмная" icon={Moon} />
              <MapToolButton onClick={() => setMapStyle('satellite')} active={mapStyle === 'satellite'} label="Спутник" icon={Satellite} />
              <MapToolButton
                onClick={() => {
                  if (!leafletMap || !navigator.geolocation) return;
                  navigator.geolocation.getCurrentPosition(
                    (pos) => leafletMap.flyTo([pos.coords.latitude, pos.coords.longitude], 12, { duration: 1.2 }),
                    () => undefined,
                    { enableHighAccuracy: true, timeout: 8000 }
                  );
                }}
                label="Я здесь"
                icon={Locate}
              />
              <MapToolButton
                onClick={() => {
                  if (!leafletMap) return;
                  const allCoords = landmarks.map((l) => l.coordinates);
                  leafletMap.fitBounds(L.latLngBounds(allCoords), { padding: [60, 60], maxZoom: 11 });
                }}
                label="Весь район"
                icon={Maximize2}
              />
            </div>

            <div className={`map-viewport rounded-3xl overflow-hidden ${mapHeight}`}>
              <div className="map-vignette pointer-events-none" />
              <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} className="h-full w-full map-container-premium" scrollWheelZoom zoomControl={false}>
                <ZoomControl position="bottomright" />
                <MapRefSetter onMap={setLeafletMap} />
                <ThemeTileLayer mapStyle={mapStyle} />
                <MapController selectedRoute={selectedRoute} routeCoords={routeCoords} />

                {routeCoords.length > 1 && (
                  <>
                    <Polyline positions={routeCoords} pathOptions={{ color: routeColor, weight: 10, opacity: 0.15, lineCap: 'round' }} />
                    <Polyline positions={routeCoords} pathOptions={{ color: routeColor, weight: 4, opacity: 0.9, dashArray: '14 10', lineCap: 'round' }} />
                  </>
                )}

                {showSettlements &&
                  settlements.map((s) => (
                    <CircleMarker
                      key={`settlement-${s.id}`}
                      center={s.coordinates}
                      radius={s.type === 'center' ? 7 : 5}
                      pathOptions={{
                        color: s.type === 'center' ? '#c4a035' : '#64748b',
                        fillColor: s.type === 'center' ? '#c4a035' : '#94a3b8',
                        fillOpacity: 0.85,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="min-w-[140px]">
                          <p className="font-semibold text-sm">{s.name}</p>
                          <p className="text-xs text-stone-500 mt-1">~{s.population.toLocaleString('ru-RU')} жителей</p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}

                {showEvents &&
                  districtEvents.map((event) => (
                    <Marker key={`event-${event.id}`} position={event.coordinates} icon={createEventMarkerIcon()}>
                      <Popup>
                        <div className="min-w-[200px]">
                          <span className="badge bg-violet-500 text-white border-0 mb-2">📅 {event.date}</span>
                          <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                          <p className="text-xs text-stone-500 mb-2">{event.location}</p>
                          <Link href={`/events/${event.id}/`} className="text-xs font-semibold text-buryat-green">Подробнее →</Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                {filteredLandmarks.map((landmark) => {
                  const visited = visitedLandmarks.has(landmark.id);
                  const fav = isFavorite('landmark', landmark.id);
                  return (
                    <Marker
                      key={landmark.id}
                      position={landmark.coordinates}
                      icon={createLandmarkMarkerIcon(landmark.type, visited, !visited, fav)}
                      eventHandlers={{
                        click: () => {
                          setSelectedLandmark(landmark);
                          markLandmarkVisited(landmark.id);
                        },
                      }}
                    >
                      <Popup maxWidth={320}>
                        <div className="map-popup-content">
                          <div className="relative h-28 mb-3 rounded-xl overflow-hidden">
                            <img src={landmark.imageUrl} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-2 right-2">
                              <FavoriteButton type="landmark" id={landmark.id} size="sm" />
                            </div>
                          </div>
                          <span className="badge text-white border-0 mb-2" style={{ background: LANDMARK_TYPE_COLORS[landmark.type] }}>
                            {LANDMARK_TYPE_LABELS[landmark.type]}
                          </span>
                          <h3 className="font-semibold text-sm leading-snug mb-2">{landmark.name}</h3>
                          <p className="text-xs text-stone-500 mb-3 line-clamp-2">{landmark.description.slice(0, 100)}...</p>
                          <Link href={`/places/${landmark.id}/`} className="block">
                            <Button size="sm" className="w-full btn-sm py-2">Открыть страницу</Button>
                          </Link>
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
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-body-sm text-buryat-gold font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" />«{selectedLandmark.name}» отмечена
          </motion.p>
        )}
      </div>
    </section>
  );
}

function FilterChip({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all flex items-center gap-2 ${active ? 'text-white shadow-glow-green' : 'glass-card text-stone-600 dark:text-stone-300'}`}
      style={active ? { backgroundColor: color ?? '#1a6b47' } : undefined}
    >
      {color && <span className="w-2 h-2 rounded-full ring-2 ring-white/40" style={{ background: color }} />}
      {label}
    </button>
  );
}

function LayerToggle({ active, onClick, label, icon: Icon }: { active: boolean; onClick: () => void; label: string; icon: typeof Layers }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full rounded-lg px-2.5 py-2 text-left text-xs font-medium mb-1 ${active ? 'bg-buryat-green/10 text-buryat-green dark:text-buryat-gold' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800/50'}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </button>
  );
}

function MapToolButton({ onClick, active, label, icon: Icon }: { onClick: () => void; active?: boolean; label: string; icon: typeof Sun }) {
  return (
    <button type="button" onClick={onClick} title={label} className={`map-tool-btn ${active ? 'map-tool-btn-active' : ''}`}>
      <Icon className="h-4 w-4" />
    </button>
  );
}
