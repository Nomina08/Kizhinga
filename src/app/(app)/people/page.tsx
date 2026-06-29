import { PeopleGallery } from '@/components/PeopleGallery';
import { PageHeader } from '@/components/layout/PageHeader';

export default function PeoplePage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            eyebrow="Земляки"
            title="Известные люди"
            subtitle="Учёные, просветители и деятели, чьи имена связаны с районом"
          />
        </div>
      </div>
      <PeopleGallery standalone />
    </>
  );
}
