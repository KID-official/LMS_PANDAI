import React from 'react';
import { getTeachers } from '@/app/actions/teachers';
import { TeacherManagementClient } from './TeacherManagementClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kelola Akun Guru | Super Admin LMS SFA Learn',
  description: 'Manajemen data pengajar, verifikasi profil, dan hak akses guru.',
};

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string; page?: string };
}) {
  const search = searchParams.search || '';
  const status = searchParams.status || '';
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const limit = 10;

  const { teachers, total, stats } = await getTeachers(search, status, page, limit);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <TeacherManagementClient
        initialTeachers={teachers}
        total={total}
        stats={stats}
        currentSearch={search}
        currentStatus={status}
      />
    </div>
  );
}
