'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, GraduationCap } from 'lucide-react';

interface StudentBannerHeaderProps {
  studentProfile: {
    fullName: string;
    nis: string;
    className: string;
    semester: string;
  } | null;
}

export const StudentBannerHeader: React.FC<StudentBannerHeaderProps> = ({
  studentProfile,
}) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Format date in Indonesian locale, e.g. "Minggu, 11 Oktober 2026"
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setFormattedDate(now.toLocaleDateString('id-ID', options));
  }, []);

  const displayName = studentProfile?.fullName || 'Siswa SFA Learn';
  const nis = studentProfile?.nis || '20260101';
  const className = studentProfile?.className || '8A';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7F54F8] via-[#6636DE] to-[#3A4BD4] p-6 sm:p-8 text-white shadow-md">
      {/* Decorative background blur blobs */}
      <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#89F5E7]/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          {/* Dynamic Date replaces "have more knowledge" */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md self-start">
            <Calendar className="h-3.5 w-3.5 text-[#89F5E7]" />
            <span>{formattedDate || '11 Oktober 2026'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mt-1">
            Hi, <span className="text-[#89F5E7]">{displayName}</span>! 👋
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
            Selamat datang di Portal LMS SFA Learn. Lanjutkan pembelajaran modul etika dan forensik AI kamu hari ini.
          </p>
        </div>

        {/* Student Profile Info Tag Pill */}
        <div className="flex flex-col gap-1.5 rounded-2xl bg-white/15 p-4 backdrop-blur-md border border-white/20 shrink-0 self-start md:self-auto min-w-[200px]">
          <div className="flex items-center gap-2 text-xs font-bold">
            <GraduationCap className="h-4 w-4 text-[#89F5E7]" />
            <span>Identitas Siswa</span>
          </div>
          <div className="flex flex-col text-xs text-white/90 gap-0.5 mt-0.5">
            <span>NIS: <strong className="text-white font-mono">{nis}</strong></span>
            <span>Kelas: <strong className="text-white">{className}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
