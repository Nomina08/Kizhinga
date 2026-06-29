import { notFound } from 'next/navigation';
import { landmarks } from '@/data/data';
import { LandmarkDetailView } from '@/components/places/LandmarkDetailView';

export function generateStaticParams() {
  return landmarks.map((landmark) => ({ id: String(landmark.id) }));
}

interface PlacePageProps {
  params: { id: string };
}

export default function PlacePage({ params }: PlacePageProps) {
  const landmark = landmarks.find((item) => item.id === Number(params.id));
  if (!landmark) notFound();
  return <LandmarkDetailView landmark={landmark} />;
}
