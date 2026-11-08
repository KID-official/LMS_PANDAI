import React from 'react';
import { verifyCertificatePublicAction } from '@/actions/certificateActions';
import { PublicVerifyClient } from './PublicVerifyClient';

interface VerifyPageProps {
  params: {
    serialNumber: string;
  };
}

export async function generateMetadata({ params }: VerifyPageProps) {
  return {
    title: `Verifikasi Keaslian Sertifikat • ${params.serialNumber} | UNAIR & PANDAI LEARNING`,
    description: `Verifikasi pangkalan data ijazah & sertifikat digital resmi Pengabdian Masyarakat UNAIR nomor seri ${params.serialNumber}.`,
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const result = await verifyCertificatePublicAction(params.serialNumber);

  return (
    <main className="min-h-screen bg-[#F9F9FF]">
      <PublicVerifyClient
        serialNumber={params.serialNumber}
        result={result}
      />
    </main>
  );
}
