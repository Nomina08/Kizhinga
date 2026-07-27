'use client';

import { useEffect } from 'react';
import { Polygon, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '@/context/AppContext';
import {
  DISTRICT_MASK_OUTER,
  DISTRICT_POLYGON,
  getDistrictLeafletBounds,
} from '@/lib/districtBoundary';

function DistrictMapLimits() {
  const map = useMap();

  useEffect(() => {
    const applyLimits = () => {
      const bounds = L.latLngBounds(getDistrictLeafletBounds()).pad(0.02);
      map.setMaxBounds(bounds.pad(0.08));

      const minZoom = map.getBoundsZoom(bounds, false);
      if (Number.isFinite(minZoom)) {
        map.setMinZoom(Math.max(minZoom - 1, 7));
      }

      map.fitBounds(bounds, { padding: [36, 36], animate: false });
    };

    map.whenReady(() => {
      map.invalidateSize();
      applyLimits();
    });
  }, [map]);

  return null;
}

export function DistrictBoundaryLayer() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <>
      <DistrictMapLimits />
      <Polygon
        positions={[DISTRICT_MASK_OUTER, DISTRICT_POLYGON]}
        pathOptions={{
          color: 'transparent',
          weight: 0,
          fillColor: isDark ? '#020617' : '#1c1917',
          fillOpacity: isDark ? 0.52 : 0.34,
          interactive: false,
        }}
      />
      <Polyline
        positions={DISTRICT_POLYGON}
        pathOptions={{
          color: isDark ? '#c4a035' : '#1a6b47',
          weight: 3,
          opacity: 0.95,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  );
}

export function fitMapToDistrict(map: L.Map, padding: [number, number] = [48, 48]) {
  map.fitBounds(L.latLngBounds(getDistrictLeafletBounds()), { padding, maxZoom: 11 });
}
