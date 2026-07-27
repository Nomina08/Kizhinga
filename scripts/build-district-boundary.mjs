import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputPath = path.join(root, 'tmp-boundary.json');
const outputPath = path.join(root, 'src/lib/districtBoundary.generated.json');

function simplify(points, tolerance) {
  if (points.length <= 2) return points;
  const sqTol = tolerance * tolerance;

  function getSqSegDist(p, a, b) {
    let x = a[0];
    let y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b[0];
        y = b[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }

  function rdp(pts, tol) {
    let max = 0;
    let idx = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = getSqSegDist(pts[i], pts[0], pts[pts.length - 1]);
      if (d > max) {
        idx = i;
        max = d;
      }
    }
    if (max > tol) {
      const left = rdp(pts.slice(0, idx + 1), tol);
      const right = rdp(pts.slice(idx), tol);
      return left.slice(0, -1).concat(right);
    }
    return [pts[0], pts[pts.length - 1]];
  }

  return rdp(points, sqTol);
}

if (!fs.existsSync(inputPath)) {
  console.error('Missing tmp-boundary.json — fetch from Nominatim first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const ring = data[0].geojson.coordinates[0];
const simplified = simplify(ring, 0.006);
const latLng = simplified.map(([lng, lat]) => [
  Math.round(lat * 1e5) / 1e5,
  Math.round(lng * 1e5) / 1e5,
]);

const bb = data[0].boundingbox.map(Number);
const bounds = {
  south: bb[0],
  north: bb[1],
  west: bb[2],
  east: bb[3],
};

const payload = {
  name: 'Кижингинский район',
  source: 'OpenStreetMap (relation 194849)',
  bounds,
  polygon: latLng,
};

fs.writeFileSync(outputPath, JSON.stringify(payload));
console.log(`Boundary: ${ring.length} -> ${latLng.length} points -> ${outputPath}`);
