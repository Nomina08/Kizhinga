import { notFound } from 'next/navigation';
import { panoramas } from '@/data/extras';
import { PanoramaPageClient } from '@/components/panoramas/PanoramaPageClient';

export function generateStaticParams() {
  return panoramas.map((p) => ({ id: String(p.id) }));
}

export default function PanoramaPage({ params }: { params: { id: string } }) {
  const panorama = panoramas.find((p) => p.id === Number(params.id));
  if (!panorama) notFound();
  return <PanoramaPageClient panorama={panorama} />;
}
