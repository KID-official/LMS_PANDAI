import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';
import { getStudentCertificateAction } from '@/actions/certificateActions';
import { CertificateViewerClient } from './CertificateViewerClient';

interface CertificatePageProps {
  params: {
    courseKey: string;
  };
}

export async function generateMetadata({ params }: CertificatePageProps) {
  return {
    title: `E-Sertifikat Kelulusan Resmi • ${params.courseKey} | SFA Learn UNAIR`,
    description: 'Penampil dan pengunduh sertifikat kelulusan resmi Pengmas Vokasi UNAIR & SFA Learn.',
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  const certificateData = await getStudentCertificateAction(params.courseKey);

  return (
    <main className="min-h-screen bg-[#F9F9FF]">
      <CertificateViewerClient
        courseKey={params.courseKey}
        data={certificateData}
      />
    </main>
  );
}
