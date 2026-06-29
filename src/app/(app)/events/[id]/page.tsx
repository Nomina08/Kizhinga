import { notFound } from 'next/navigation';
import Link from 'next/link';
import { districtEvents } from '@/data/extras';
import { ContentDetailPage } from '@/components/content/ContentCards';
import { EVENT_CATEGORY_LABELS } from '@/types';
import { Button } from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

export function generateStaticParams() {
  return districtEvents.map((e) => ({ id: String(e.id) }));
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = districtEvents.find((e) => e.id === Number(params.id));
  if (!event) notFound();

  return (
    <ContentDetailPage
      type="event"
      id={event.id}
      title={event.title}
      subtitle={`${EVENT_CATEGORY_LABELS[event.category]} · ${event.date}`}
      imageUrl={event.imageUrl}
      description={event.description}
      backHref="/events/"
      backLabel="События"
      extra={
        <div className="glass-panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {event.location}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {event.coordinates[0].toFixed(2)}°, {event.coordinates[1].toFixed(2)}°
            </p>
          </div>
          <Link href="/map/">
            <Button variant="secondary" iconRight={MapPin}>На карте</Button>
          </Link>
        </div>
      }
    />
  );
}
