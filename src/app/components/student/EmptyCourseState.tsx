'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';

export const EmptyCourseState: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-[#EAE8F2] gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F1EDFF] text-[#7950F2] shadow-xs">
        <BookOpen className="h-8 w-8" />
      </div>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDFF] text-[#7950F2] text-[11px] font-bold self-center">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Belum Ada Course Berjalan</span>
        </div>
        <h4 className="text-base sm:text-lg font-extrabold text-[#172554]">
          Siap Memulai Belajar?
        </h4>
        <p className="text-xs sm:text-sm text-[#7B8198] leading-relaxed">
          Kamu belum memiliki modul pembelajaran aktif. Pilih modul dari katalog untuk mulai belajar dan raih sertifikat kompetensi kamu!
        </p>
      </div>

      <Link
        href={STUDENT_ROUTES.MY_COURSES}
        className="mt-2 px-5 py-2.5 rounded-xl bg-[#7950F2] hover:bg-[#683fe4] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
      >
        <span>Jelajahi Katalog Course</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
