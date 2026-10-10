'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';

export const EmptyCourseState: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/30 gap-4 my-auto">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7F54F8] shadow-sm border border-[#CAC3D8]/30">
        <BookOpen className="h-7 w-7" />
      </div>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#7F54F8] text-[11px] font-bold self-center shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Belum Ada Course Diikuti</span>
        </div>
        <h4 className="text-base font-extrabold text-[#061B38]">
          Siap Memulai Belajar?
        </h4>
        <p className="text-xs text-[#494455] leading-relaxed">
          Kamu belum memiliki riwayat progress belajar. Pilih modul dari katalog untuk mulai mengumpulkan progress &amp; sertifikat!
        </p>
      </div>

      <Link
        href={PUBLIC_ROUTES.COURSES}
        className="mt-1 px-4 py-2.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
      >
        <span>Jelajahi Katalog Course</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
