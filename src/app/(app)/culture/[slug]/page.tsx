import { notFound } from 'next/navigation';
import { cultureTopics } from '@/data/extras';
import { ContentDetailPage } from '@/components/content/ContentCards';

export function generateStaticParams() {
  return cultureTopics.map((t) => ({ slug: t.slug }));
}

export default function CultureDetailPage({ params }: { params: { slug: string } }) {
  const topic = cultureTopics.find((t) => t.slug === params.slug);
  if (!topic) notFound();

  return (
    <ContentDetailPage
      type="culture"
      id={topic.id}
      title={topic.title}
      subtitle={topic.subtitle}
      imageUrl={topic.imageUrl}
      description={topic.description}
      gallery={topic.gallery}
      backHref="/culture/"
      backLabel="Культура"
    />
  );
}
