import React, { Suspense } from 'react';
import { getGuruDashboardDataAction } from '@/app/actions/guruDashboard';
import GuruDashboardClient from './GuruDashboardClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Dashboard Guru | PANDAI LEARNING',
  description: 'Ringkasan aktivitas, progres belajar siswa, dan pemantauan capaian kurikulum AI.',
};

export const revalidate = 0; // Always serve fresh data

export default async function GuruDashboardPage() {
  const dashboardData = await getGuruDashboardDataAction();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[500px] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-9 w-9 animate-spin text-[#6636DE]" />
            <p className="text-[13px] font-medium text-[#64748B]">
              Memuat data analitik dan aktivitas kelas...
            </p>
          </div>
        </div>
      }
    >
      <GuruDashboardClient initialData={dashboardData} />
    </Suspense>
  );
}
