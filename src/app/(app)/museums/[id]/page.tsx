import { notFound } from 'next/navigation';
import { museums } from '@/data/museums';
import { MuseumPageClient } from '@/components/museums/MuseumPageClient';

export function generateStaticParams() {
  return museums.map((m) => ({ id: String(m.id) }));
}

export default function MuseumPage({ params }: { params: { id: string } }) {
  const museum = museums.find((m) => m.id === Number(params.id));
  if (!museum) notFound();
  return <MuseumPageClient museum={museum} />;
}
