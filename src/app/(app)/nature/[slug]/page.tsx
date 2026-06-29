import { notFound } from 'next/navigation';
import Link from 'next/link';
import { natureTopics } from '@/data/extras';
import { ContentDetailPage } from '@/components/content/ContentCards';
import { Button } from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

export function generateStaticParams() {
  return natureTopics.map((t) => ({ slug: t.slug }));
}

export default function NatureDetailPage({ params }: { params: { slug: string } }) {
  const topic = natureTopics.find((t) => t.slug === params.slug);
  if (!topic) notFound();

  return (
    <ContentDetailPage
      type="nature"
      id={topic.id}
      title={topic.title}
      subtitle={topic.subtitle}
      imageUrl={topic.imageUrl}
      description={topic.description}
      gallery={topic.gallery}
      backHref="/nature/"
      backLabel="Природа"
      extra={
        topic.coordinates ? (
          <Link href="/map/">
            <Button variant="secondary" iconRight={MapPin}>Показать на карте</Button>
          </Link>
        ) : null
      }
    />
  );
}
