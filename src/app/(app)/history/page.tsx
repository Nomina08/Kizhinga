import { TimelineSection } from '@/components/TimelineSection';
import { PageHeader } from '@/components/layout/PageHeader';

export default function HistoryPage() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
        <div className="mx-auto max-w-4xl">
          <PageHeader
            eyebrow="Хронология"
            title="История района"
            subtitle="От кочевых племён до сегодня — ключевые вехи на временной шкале"
          />
        </div>
      </div>
      <TimelineSection standalone />
    </>
  );
}
