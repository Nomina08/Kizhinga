import { RoutesSection } from '@/components/RoutesSection';
import { PageHeader } from '@/components/layout/PageHeader';

export default function RoutesPage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            eyebrow="Путешествия"
            title="Маршруты"
            subtitle="Выберите маршрут — карта автоматически покажет точки и путь"
          />
        </div>
      </div>
      <RoutesSection standalone />
    </>
  );
}
