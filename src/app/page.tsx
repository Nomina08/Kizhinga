import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TourMap } from '@/components/TourMapWrapper';
import { PeopleGallery } from '@/components/PeopleGallery';
import { LegendsCarousel } from '@/components/LegendsCarousel';
import { RoutesSection } from '@/components/RoutesSection';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TourMap />
      <PeopleGallery />
      <LegendsCarousel />
      <RoutesSection />
      <AudioPlayer />
      <Footer />
    </main>
  );
}
