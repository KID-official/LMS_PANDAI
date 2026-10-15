'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Lock,
  FileQuestion,
  RotateCcw,
  Award,
} from 'lucide-react';

interface NextChapterInfo {
  key: string;
  chapterNumber: number;
  title: string;
}

interface ChapterFooterActionProps {
  courseKey: string;
  chapterKey: string;
  isAlreadyCompleted: boolean;
  nextChapter?: NextChapterInfo;
  hasQuiz?: boolean;
  quizKey?: string;
}

export function ChapterFooterAction({
  courseKey,
  isAlreadyCompleted,
  nextChapter,
  hasQuiz = true,
  quizKey,
}: ChapterFooterActionProps) {
  // ── Render Actions saat Bab SUDAH TUNTAS (Lulus Kuis) ────────────────────────
  if (isAlreadyCompleted) {
    return (
      <>
        {/* Desktop View (Inline Box) */}
        <div className="hidden lg:flex flex-col gap-3 mt-8 p-5 rounded-2xl bg-white border border-[#00685F]/30 shadow-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00685F]" />
              <span className="text-xs font-bold text-[#061B38]">
                Status: Bab Tuntas & Terverifikasi
              </span>
            </div>

            <span className="text-xs font-bold text-[#00685F] bg-[#89F5E7]/30 px-3 py-1 rounded-full">
              Lulus Kuis Evaluasi (Skor ≥ 75) ✓
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Secondary: Review Kuis */}
            {hasQuiz && quizKey ? (
              <Link
                href={`/student/courses/${courseKey}/quiz/${quizKey}/result`}
                className="py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] hover:text-[#7F54F8] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#CAC3D8]/40 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 text-[#7F54F8]" />
                <span>Review Pembahasan Kuis</span>
              </Link>
            ) : (
              <Link
                href={`/student/courses/${courseKey}`}
                className="py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#CAC3D8]/40 transition-all active:scale-[0.98]"
              >
                <span>Silabus Kursus</span>
              </Link>
            )}

            {/* Primary: Lanjut ke Bab Berikutnya atau Sertifikat */}
            {nextChapter ? (
              <Link
                href={`/student/courses/${courseKey}/chapter/${nextChapter.key}`}
                className="py-3 px-5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
              >
                <span>Lanjut ke Bab {nextChapter.chapterNumber}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                href={`/student/courses/${courseKey}/certificate`}
                className="py-3 px-5 rounded-xl bg-[#00685F] hover:bg-[#005049] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Lihat & Klaim E-Sertifikat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile View (Sticky Bottom Bar) */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#CAC3D8]/30 shadow-[0_-4px_16px_rgba(6,27,56,0.08)] py-3 px-4 lg:hidden">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] px-1">
              <span className="flex items-center gap-1.5 font-bold text-[#00685F]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bab Tuntas (Lulus Kuis ✓)</span>
              </span>
              <span className="text-[#7A7486]">Nilai ≥ 75 Terverifikasi</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {hasQuiz && quizKey && (
                <Link
                  href={`/student/courses/${courseKey}/quiz/${quizKey}/result`}
                  className="py-2.5 px-3 rounded-xl bg-[#F0F3FF] text-[#061B38] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#CAC3D8]/40"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#7F54F8]" />
                  <span>Review Kuis</span>
                </Link>
              )}

              {nextChapter ? (
                <Link
                  href={`/student/courses/${courseKey}/chapter/${nextChapter.key}`}
                  className={`py-2.5 px-3 rounded-xl bg-[#7F54F8] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                    hasQuiz && quizKey ? '' : 'col-span-2'
                  }`}
                >
                  <span>Bab {nextChapter.chapterNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href={`/student/courses/${courseKey}/certificate`}
                  className={`py-2.5 px-3 rounded-xl bg-[#00685F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                    hasQuiz && quizKey ? '' : 'col-span-2'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>E-Sertifikat</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Render Actions saat Bab BELUM TUNTAS (Wajib Kerjakan Kuis) ───────────────
  return (
    <>
      {/* Desktop View (Inline Box) */}
      <div className="hidden lg:flex flex-col gap-3.5 mt-8 p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7F54F8] animate-pulse" />
            <span className="text-xs font-bold text-[#061B38]">
              Status: Sedang Mempelajari Bab
            </span>
          </div>

          <span className="text-xs font-bold text-[#5010C8] bg-[#E8DEFF] px-3 py-1 rounded-full">
            Prasyarat: Lulus Kuis (Passing Grade: 75)
          </span>
        </div>

        {/* Primary CTA: Kerjakan Kuis Evaluasi */}
        {hasQuiz && quizKey ? (
          <div className="space-y-2">
            <Link
              href={`/student/courses/${courseKey}/quiz/${quizKey}`}
              className="w-full py-3.5 px-6 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99] group"
            >
              <FileQuestion className="w-5 h-5 text-white" />
              <span>Kerjakan Kuis Evaluasi Bab Ini</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-between text-xs text-[#7A7486] px-1 pt-0.5">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#7A7486]" />
                {nextChapter ? (
                  <span>Bab {nextChapter.chapterNumber} masih terkunci hingga kuis ini lulus</span>
                ) : (
                  <span>Klaim E-Sertifikat terkunci hingga kuis ini lulus</span>
                )}
              </span>
              <span className="font-semibold text-[#7F54F8]">Passing Grade: 75</span>
            </div>
          </div>
        ) : (
          <Link
            href={`/student/courses/${courseKey}`}
            className="w-full py-3 px-5 rounded-xl bg-[#7F54F8] text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <span>Silabus Kursus</span>
          </Link>
        )}
      </div>

      {/* Mobile View (Sticky Bottom Bar) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#CAC3D8]/30 shadow-[0_-4px_16px_rgba(6,27,56,0.08)] py-3 px-4 lg:hidden">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {/* Tracker Status Line */}
          <div className="flex items-center justify-between px-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#494455] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-pulse" />
              <span>Mempelajari Bab</span>
            </div>
            <span className="font-bold text-[#5010C8]">Passing Grade: 75</span>
          </div>

          {/* Primary CTA Button */}
          {hasQuiz && quizKey ? (
            <Link
              href={`/student/courses/${courseKey}/quiz/${quizKey}`}
              className="w-full py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <FileQuestion className="w-4 h-4 text-white" />
              <span>Kerjakan Kuis Evaluasi Bab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={`/student/courses/${courseKey}`}
              className="w-full py-2.5 px-3 rounded-xl bg-[#7F54F8] text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>Kembali ke Silabus</span>
            </Link>
          )}

          {nextChapter && (
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A7486]">
              <Lock className="w-3 h-3" />
              <span>Bab {nextChapter.chapterNumber} terbuka otomatis setelah lulus kuis</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
