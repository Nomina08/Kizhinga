import boundaryData from './districtBoundary.generated.json';

export type LatLngTuple = [number, number];

export const DISTRICT_NAME = boundaryData.name;

/** Граница Кижингинского района [широта, долгота] — OpenStreetMap */
export const DISTRICT_POLYGON: LatLngTuple[] = boundaryData.polygon as LatLngTuple[];

export const DISTRICT_BOUNDS = boundaryData.bounds;

/** Прямоугольник для затемнения области за пределами района */
export const DISTRICT_MASK_OUTER: LatLngTuple[] = [
  [DISTRICT_BOUNDS.south - 0.8, DISTRICT_BOUNDS.west - 1.2],
  [DISTRICT_BOUNDS.north + 0.8, DISTRICT_BOUNDS.west - 1.2],
  [DISTRICT_BOUNDS.north + 0.8, DISTRICT_BOUNDS.east + 1.2],
  [DISTRICT_BOUNDS.south - 0.8, DISTRICT_BOUNDS.east + 1.2],
];

export function getDistrictLeafletBounds(): LatLngTuple[] {
  return [
    [DISTRICT_BOUNDS.south, DISTRICT_BOUNDS.west],
    [DISTRICT_BOUNDS.north, DISTRICT_BOUNDS.east],
  ];
}
