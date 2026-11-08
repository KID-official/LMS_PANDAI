import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStudentCertificatesListAction } from '@/actions/certificateActions';
import { StudentCertificatesClient } from './StudentCertificatesClient';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';

export async function generateMetadata() {
  return {
    title: 'Koleksi E-Sertifikat & Kelulusan • Siswa | LMS-KID',
    description:
      'Daftar e-sertifikat kelulusan resmi literasi AI terakreditasi Pengmas Universitas Airlangga x PANDAI LEARNING.',
  };
}

export default async function StudentCertificatesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  const certificatesData = await getStudentCertificatesListAction();

  return <StudentCertificatesClient initialData={certificatesData} />;
}
