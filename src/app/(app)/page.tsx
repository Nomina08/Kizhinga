import { HomeDashboard } from '@/components/home/HomeDashboard';
import { StatsVisualization } from '@/components/stats/StatsVisualization';
import { Footer } from '@/components/Footer';
import { LetopisCredit } from '@/components/letopis/LetopisCredit';

export default function HomePage() {
  return (
    <>
      <HomeDashboard />
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <LetopisCredit />
          <StatsVisualization />
        </div>
      </div>
      <Footer />
    </>
  );
}
