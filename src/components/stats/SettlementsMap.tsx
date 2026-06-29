'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { settlements } from '@/data/extras';
import { MAP_CENTER } from '@/data/data';

export function SettlementsMap() {
  const maxPop = Math.max(...settlements.map((s) => s.population));

  return (
    <div className="h-64 rounded-2xl overflow-hidden ring-1 ring-stone-200/50 dark:ring-stone-700/50">
      <MapContainer
        center={MAP_CENTER}
        zoom={9}
        className="h-full w-full"
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        {settlements.map((s) => {
          const radius = 6 + (s.population / maxPop) * 12;
          return (
            <CircleMarker
              key={s.id}
              center={s.coordinates}
              radius={radius}
              pathOptions={{
                color: s.type === 'center' ? '#c4a035' : '#1a6b47',
                fillColor: s.type === 'center' ? '#c4a035' : '#1a6b47',
                fillOpacity: 0.7,
                weight: 2,
              }}
            >
              <Popup>
                <span className="text-sm font-semibold">{s.name}</span>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
