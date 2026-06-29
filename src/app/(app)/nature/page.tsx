import { natureTopics } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';

export default function NaturePage() {
  return (
    <CatalogPage eyebrow="Степь и горы" title="Природа" subtitle="Горы, реки, леса, животные и красивые места">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {natureTopics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            type="nature"
            id={topic.id}
            title={topic.title}
            subtitle={topic.subtitle}
            imageUrl={topic.imageUrl}
            href={`/nature/${topic.slug}/`}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
