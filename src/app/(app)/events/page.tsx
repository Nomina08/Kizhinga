import { districtEvents } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';
import { EVENT_CATEGORY_LABELS } from '@/types';

export default function EventsPage() {
  return (
    <CatalogPage eyebrow="Календарь" title="События" subtitle="Праздники, фестивали и мероприятия Кижингинского района">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {districtEvents.map((event, index) => (
          <TopicCard
            key={event.id}
            type="event"
            id={event.id}
            title={event.title}
            subtitle={`${event.date} · ${event.location}`}
            imageUrl={event.imageUrl}
            href={`/events/${event.id}/`}
            badge={EVENT_CATEGORY_LABELS[event.category]}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
