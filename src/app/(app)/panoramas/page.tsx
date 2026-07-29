import { panoramas } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';

export default function PanoramasPage() {
  return (
    <CatalogPage eyebrow="Обзор" title="Панорамы" subtitle="Широкие виды дацанов, степи и священных мест">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {panoramas.map((p, index) => (
          <TopicCard
            key={p.id}
            type="panorama"
            id={p.id}
            title={p.title}
            subtitle={p.subtitle}
            imageUrl={p.thumbnailUrl}
            href={`/panoramas/${p.id}/`}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
