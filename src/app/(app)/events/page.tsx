import { districtEvents } from '@/data/extras';
import { CatalogPage, TopicCard } from '@/components/content/ContentCards';
import { EVENTS_SECTION } from '@/lib/navigation';
import { formatEventCardSubtitle, getEventCategoryLabel, getEventRouteId } from '@/lib/eventHelpers';
import { CONTENT_PLACEHOLDER_IMAGE } from '@/lib/content';

export default function EventsPage() {
  return (
    <CatalogPage
      eyebrow={EVENTS_SECTION.eyebrow}
      title={EVENTS_SECTION.title}
      subtitle={EVENTS_SECTION.description}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {districtEvents.map((event, index) => (
          <TopicCard
            key={getEventRouteId(event)}
            type="event"
            id={event.id}
            title={event.title}
            subtitle={formatEventCardSubtitle(event)}
            imageUrl={event.imageUrl || CONTENT_PLACEHOLDER_IMAGE}
            href={`/events/${getEventRouteId(event)}/`}
            badge={getEventCategoryLabel(event.category)}
            index={index}
          />
        ))}
      </div>
    </CatalogPage>
  );
}
