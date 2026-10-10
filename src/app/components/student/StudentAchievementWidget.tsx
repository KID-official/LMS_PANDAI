'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StudentAchievementWidgetProps {
  completedCoursesCount?: number;
  totalCertificatesCount?: number;
}

export const StudentAchievementWidget: React.FC<StudentAchievementWidgetProps> = () => {
  const certificates = [
    {
      id: 'cert-1',
      title: 'Sertifikat Etika & Keamanan AI Siswa',
      badge: 'Terbit',
    },
    {
      id: 'cert-2',
      title: 'Sertifikat Forensik Digital & Deteksi Deepfake',
      badge: 'Program Aktif',
    },
    {
      id: 'cert-3',
      title: 'Sertifikat Integritas Akademik & SIFT',
      badge: 'Program Aktif',
    },
  ];

  return (
    <div className="h-full rounded-3xl bg-gradient-to-br from-[#061B38] via-[#0D2447] to-[#160E36] text-white p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#7F54F8]/30">
      {/* Top Header Section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#7F54F8] to-[#9E7AFF] text-white shadow-sm">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold tracking-tight text-white">
            E-Sertifikat Siswa
          </h3>
        </div>
      </div>

      {/* Certificate Titles List (Scrollable Content Area) */}
      <div className="flex-1 overflow-y-auto my-3 pr-1 flex flex-col gap-2.5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3 group hover:border-[#7F54F8]/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Award className="w-4 h-4 text-[#89F5E7] shrink-0" />
              <span className="text-xs font-bold text-white/90 leading-tight truncate">
                {cert.title}
              </span>
            </div>

            <CheckCircle2 className="w-4 h-4 text-[#89F5E7] shrink-0" />
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action CTA Button */}
      <div className="sticky bottom-0 pt-2 bg-gradient-to-t from-[#160E36] via-[#160E36]/90 to-transparent shrink-0">
        <Link
          href="/student/certificates"
          className="w-full py-2.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md border border-white/10"
        >
          <span>Buka E-Sertifikat</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
