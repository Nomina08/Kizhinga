import { panoramas } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';

export default function PanoramasPage() {
  return (
    <CatalogPage eyebrow="360°" title="Панорамы" subtitle="Виртуальный обзор дацанов, степи и священных мест">
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
            badge="360°"
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
