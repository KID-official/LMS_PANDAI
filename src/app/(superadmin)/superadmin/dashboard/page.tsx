import React, { Suspense } from 'react';
import { getSuperadminDashboardDataAction } from '@/app/actions/superadminDashboard';
import SuperAdminDashboardClient from './SuperAdminDashboardClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Dashboard Super Admin | SFA Learn Literasi AI',
  description: 'Pusat kendali ekosistem, administrasi akun pengajar, dan audit operasional LMS.',
};

export const revalidate = 0; // Always serve fresh data

export default async function SuperAdminDashboardPage() {
  const dashboardData = await getSuperadminDashboardDataAction();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[500px] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-9 w-9 animate-spin text-[#6636DE]" />
            <p className="text-[13px] font-medium text-[#64748B]">
              Memuat data ekosistem dan pengawasan akun...
            </p>
          </div>
        </div>
      }
    >
      <SuperAdminDashboardClient initialData={dashboardData} />
    </Suspense>
  );
}
