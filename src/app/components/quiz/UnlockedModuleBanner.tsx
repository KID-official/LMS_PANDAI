'use client';

import React from 'react';
import Link from 'next/link';
import { Unlock, Award, ArrowRight, Lock } from 'lucide-react';

export interface UnlockedModuleInfo {
  chapterNumber: number;
  title: string;
  key: string;
  url: string;
}

export interface UnlockedModuleBannerProps {
  unlockedModule: UnlockedModuleInfo | null;
  isCourseCompleted: boolean;
  isPassed: boolean;
  courseTitle?: string;
}

export const UnlockedModuleBanner: React.FC<UnlockedModuleBannerProps> = ({
  unlockedModule,
  isCourseCompleted,
  isPassed,
  courseTitle = 'Kursus',
}) => {
  // Case 1: Lulus & Ada Bab Selanjutnya yang Terbuka
  if (isPassed && unlockedModule) {
    return (
      <Link
        href={unlockedModule.url}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6636DE] via-[#7F54F8] to-[#5566EE] p-4 sm:p-5 text-white shadow-md hover:shadow-lg transition-all active:scale-[0.99] block"
      >
        {/* Glow Accent in corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="flex items-start gap-3.5">
          {/* Unlock Icon Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <Unlock className="w-5 h-5 text-white" />
          </div>

          {/* Module Information */}
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1 bg-white/25 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold mb-1 shadow-xs">
              <span>Modul Terbuka 🔓</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:underline">
              Bab {unlockedModule.chapterNumber}: {unlockedModule.title}
            </h3>

            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Akses materi interaktif & studi kasus terbaru telah aktif. Klik untuk langsung mulai belajar.
            </p>
          </div>

          {/* Arrow CTA */}
          <div className="hidden sm:flex self-center shrink-0 w-8 h-8 rounded-full bg-white/20 items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </Link>
    );
  }

  // Case 2: Lulus & Bab Terakhir Selesai (Kursus Tuntas)
  if (isPassed && isCourseCompleted) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00685F] via-[#008378] to-[#0D9488] p-4 sm:p-5 text-white shadow-md">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
            <Award className="w-5 h-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1 bg-white/25 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold mb-1 shadow-xs">
              <span>Kursus Tuntas 🎉</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              Selamat! Kamu Telah Menuntaskan Seluruh Bab {courseTitle}
            </h3>

            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Seluruh kurikulum pembelajaran telah diselesaikan. E-Sertifikat kelulusanmu siap diverifikasi dan diklaim!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Remedial (Bab selanjutnya masih terkunci)
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/40 p-4 sm:p-5 text-[#494455]">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#CAC3D8]/40 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-[#7A7486]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full text-[#7A7486] text-[11px] font-bold mb-1 border border-[#CAC3D8]/50">
            <span>Bab Selanjutnya Masih Terkunci 🔒</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#061B38] leading-snug">
            Selesaikan Remedial untuk Membuka Akses Bab Selanjutnya
          </h3>

          <p className="text-xs text-[#7A7486] mt-1 leading-relaxed">
            Ambang batas kelulusan kuis adalah skor minimal 75. Pelajari kembali materi modul dan gunakan kesempatan remedial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnlockedModuleBanner;
