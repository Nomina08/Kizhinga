import type { Landmark, Person, Legend, TourRoute, DistrictStat, TimelineEvent, GalleryImage } from '@/types';
import { assetPath } from '@/lib/assets';
import { LETOPIS_URL } from '@/data/letopis';

export { LETOPIS_URL };

export {
  landmarks,
  people,
  legends,
  tourRoutes,
  districtStats,
  timelineEvents,
  galleryImages,
  gastronomy,
  AUDIO_LEGEND_TEXT,
  MAP_CENTER,
  MAP_ZOOM,
  HERO_VIDEO,
} from '@/lib/content';

export const FLAG_IMAGE = assetPath('/images/flag.svg');
export const EMBLEM_IMAGE = assetPath('/images/emblem.svg');

export const GITHUB_URL = 'https://github.com/Nomina08/Kizhinga';

export const SYMBOLS_INFO = {
  lily: 'Улаалзай — цветок лилии, символ чистоты и природы степи',
  swan: 'Лебедь — тотем хори-бурят, символ свободы и чистоты',
  sun: 'Солнце — источник жизни на степных просторах',
  birch: 'Берёзовая коновязь — связь с кочевой традицией',
  mountain: 'Гора Челсана — страж удолий Кижингинского района',
};
