import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TourProgressSection } from '@/components/TourProgressSection';
import { StatsSection } from '@/components/StatsSection';
import { TourMap } from '@/components/TourMapWrapper';
import { PeopleGallery } from '@/components/PeopleGallery';
import { LegendsCarousel } from '@/components/LegendsCarousel';
import { GastronomySection } from '@/components/GastronomySection';
import { TimelineSection } from '@/components/TimelineSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { RoutesSection } from '@/components/RoutesSection';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <TourProgressSection />
      <StatsSection />
      <TourMap />
      <PeopleGallery />
      <LegendsCarousel />
      <GastronomySection />
      <TimelineSection />
      <PhotoGallery />
      <RoutesSection />
      <AudioPlayer />
      <Footer />
    </main>
  );
}
