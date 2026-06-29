import { TourMap } from '@/components/TourMapWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function MapPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Центр приложения"
          title="Карта района"
          subtitle="Достопримечательности, дацаны, источники и маршруты — всё на одной карте"
        />
        <TourMap fullPage />
      </div>
    </div>
  );
}
