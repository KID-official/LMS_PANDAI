import React, { Suspense } from 'react';
import {
  getStudentAnalyticsKPIs,
  getStudentProgressReport,
} from '@/app/actions/progressReport';
import { ProgressDashboardClient } from './ProgressDashboardClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Laporan Progress & Audit Kuis Siswa | LMS SFA Learn',
  description: 'Pantau pencapaian belajar siswa, status kelulusan, dan audit jawaban kuis.',
};

export default async function ProgressReportPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    className?: string;
    certificateStatus?: 'ALL' | 'ISSUED' | 'NOT_ELIGIBLE';
    courseKey?: string;
    page?: string;
  };
}) {
  const currentSearch = searchParams.search || '';
  const currentClassName = searchParams.className || 'ALL';
  const currentCertStatus = searchParams.certificateStatus || 'ALL';
  const currentCourseKey = searchParams.courseKey || 'ALL';
  const currentPage = parseInt(searchParams.page || '1', 10) || 1;

  // Fetch KPI data & Initial Paginated Report concurrently
  const [kpis, report] = await Promise.all([
    getStudentAnalyticsKPIs(currentCourseKey),
    getStudentProgressReport({
      search: currentSearch,
      className: currentClassName,
      certificateStatus: currentCertStatus,
      courseKey: currentCourseKey,
      page: currentPage,
      limit: 10,
    }),
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
          </div>
        }
      >
        <ProgressDashboardClient
          initialKpis={kpis}
          initialReport={report}
          currentSearch={currentSearch}
          currentClassName={currentClassName}
          currentCertStatus={currentCertStatus}
          currentCourseKey={currentCourseKey}
        />
      </Suspense>
    </div>
  );
}
