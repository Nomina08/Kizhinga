import { StatsSection } from '@/components/StatsSection';
import { StatsVisualization } from '@/components/stats/StatsVisualization';
import { LegendsCarousel } from '@/components/LegendsCarousel';
import { GastronomySection } from '@/components/GastronomySection';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/layout/PageHeader';

export default function AboutPage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            eyebrow="Кижингинский район"
            title="О районе"
            subtitle="Статистика, диаграммы населения, легенды и культура степного края"
          />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-5xl">
          <StatsVisualization />
        </div>
      </div>
      <StatsSection standalone />
      <LegendsCarousel standalone />
      <GastronomySection standalone />
      <AudioPlayer standalone />
      <Footer />
    </>
  );
}
