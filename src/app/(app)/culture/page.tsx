import { cultureTopics } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';

export default function CulturePage() {
  return (
    <CatalogPage eyebrow="Наследие" title="Культура" subtitle="Одежда, праздники, традиции, музыка и буддизм">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cultureTopics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            type="culture"
            id={topic.id}
            title={topic.title}
            subtitle={topic.subtitle}
            imageUrl={topic.imageUrl}
            href={`/culture/${topic.slug}/`}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
