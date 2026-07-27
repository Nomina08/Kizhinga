import { cultureTopics } from '@/data/extras';
import { legends } from '@/data/data';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';
import { LegendsEntryCard } from '@/components/culture/LegendsEntryCard';

export default function CulturePage() {
  return (
    <CatalogPage
      eyebrow="Наследие"
      title="Культура"
      subtitle="Традиции, буддизм, музыка и легенды степного края"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <LegendsEntryCard index={0} count={legends.length} />
        {cultureTopics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            type="culture"
            id={topic.id}
            title={topic.title}
            subtitle={topic.subtitle}
            imageUrl={topic.imageUrl}
            href={`/culture/${topic.slug}/`}
            index={index + 1}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
