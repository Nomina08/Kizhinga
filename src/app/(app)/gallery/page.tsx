import { PhotoGallery } from '@/components/PhotoGallery';
import { PageHeader } from '@/components/layout/PageHeader';

export default function GalleryPage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            eyebrow="Фото"
            title="Галерея"
            subtitle="Кижингинский район в объективе — нажмите на фото для просмотра"
          />
        </div>
      </div>
      <PhotoGallery standalone />
    </>
  );
}
