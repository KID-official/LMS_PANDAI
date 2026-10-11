import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { StudentNavbar } from '@/app/components/student/StudentNavbar';
import { Footer } from '@/app/components/footer';
import { PUBLIC_ROUTES, GURU_ROUTES, SUPERADMIN_ROUTES } from '@/app/components/navigation/routes';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  // Role check: Only SISWA role allowed in student portal
  if (session.user.role === 'SUPER_ADMIN') {
    redirect(SUPERADMIN_ROUTES.DASHBOARD);
  } else if (session.user.role === 'GURU') {
    redirect(GURU_ROUTES.DASHBOARD);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9FF]">
      <StudentNavbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
