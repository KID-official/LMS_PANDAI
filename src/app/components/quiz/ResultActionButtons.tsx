'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, BookOpen, Award, LayoutDashboard, ListOrdered } from 'lucide-react';
import { UnlockedModuleInfo } from './UnlockedModuleBanner';

export interface ResultActionButtonsProps {
  courseKey: string;
  quizKey: string;
  currentChapterKey?: string;
  currentChapterNumber?: number;
  unlockedModule: UnlockedModuleInfo | null;
  isCourseCompleted: boolean;
  isPassed: boolean;
  attemptNumber: number;
  maxAttempts: number;
  remainingAttempts: number;
}

export const ResultActionButtons: React.FC<ResultActionButtonsProps> = ({
  courseKey,
  quizKey,
  currentChapterKey,
  currentChapterNumber,
  unlockedModule,
  isCourseCompleted,
  isPassed,
  attemptNumber,
  maxAttempts,
  remainingAttempts,
}) => {
  return (
    <div className="flex flex-col gap-3 pt-2 w-full">
      {/* ── CASE 1: LULUS EVALUASI ────────────────────────────────────────── */}
      {isPassed ? (
        <>
          {/* Primary CTA: Next Unlocked Chapter or Claim Certificate */}
          {unlockedModule ? (
            <Link
              href={unlockedModule.url}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Lanjut ke Bab {unlockedModule.chapterNumber} (Silabus Terbuka)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : isCourseCompleted ? (
            <Link
              href="/student/profile"
              className="w-full py-3.5 px-4 rounded-xl bg-[#00685F] hover:bg-[#005049] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <Award className="w-4 h-4 text-[#89F5E7]" />
              <span>Lihat & Klaim E-Sertifikat Kelulusan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href={`/student/courses/${courseKey}`}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Lanjut ke Silabus Kursus</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {/* Secondary CTA: Return to Syllabus */}
          <Link
            href={`/student/courses/${courseKey}`}
            className="w-full py-3 px-4 rounded-xl bg-[#DFE8FF] hover:bg-[#D6E3FF] text-[#061B38] font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ListOrdered className="w-4 h-4 text-[#7F54F8]" />
            <span>Lihat Seluruh Silabus Kursus</span>
          </Link>
        </>
      ) : (
        /* ── CASE 2: PERLU REMEDIAL ───────────────────────────────────────── */
        <>
          {remainingAttempts > 0 ? (
            <>
              {/* Primary CTA: Retake Quiz */}
              <Link
                href={`/student/courses/${courseKey}/quiz/${quizKey}`}
                className="w-full py-3.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <RotateCcw className="w-4 h-4 text-[#E8DEFF] group-hover:-rotate-45 transition-transform" />
                <span>
                  Ulangi Kuis (Remedial • Percobaan {attemptNumber + 1} dari {maxAttempts})
                </span>
              </Link>

              {/* Secondary CTA: Restudy Chapter Material */}
              {currentChapterKey && (
                <Link
                  href={`/student/courses/${courseKey}/chapter/${currentChapterKey}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#DFE8FF] hover:bg-[#D6E3FF] text-[#061B38] font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#7F54F8]" />
                  <span>
                    Pelajari Ulang Materi {currentChapterNumber ? `Bab ${currentChapterNumber}` : 'Bab Ini'}
                  </span>
                </Link>
              )}
            </>
          ) : (
            /* Batas Percobaan Habis */
            <>
              <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-center text-xs text-[#92400E]">
                Batas maksimal {maxAttempts} kali percobaan telah tercapai. Nilai evaluasi terbaikmu telah disimpan dalam catatan akademik.
              </div>

              {currentChapterKey && (
                <Link
                  href={`/student/courses/${courseKey}/chapter/${currentChapterKey}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>
                    Pelajari Ulang Materi {currentChapterNumber ? `Bab ${currentChapterNumber}` : 'Bab Ini'}
                  </span>
                </Link>
              )}
            </>
          )}
        </>
      )}

      {/* Tertiary Link: Return to Dashboard */}
      <Link
        href="/student/dashboard"
        className="w-full py-2.5 text-center text-[#7A7486] hover:text-[#7F54F8] font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Kembali ke Dasbor Siswa</span>
      </Link>
    </div>
  );
};

export default ResultActionButtons;
