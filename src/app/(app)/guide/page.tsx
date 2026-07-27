import { PageHeader } from '@/components/layout/PageHeader';
import { GuidePdfViewer } from '@/components/guide/GuidePdfViewer';

export default function GuidePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Документ"
          title="Путеводитель Кижингинского района"
          subtitle="PDF-буклет о достопримечательностях и маршрутах Кижингинского района"
        />
        <GuidePdfViewer />
      </div>
    </div>
  );
}
