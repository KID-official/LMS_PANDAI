import React from 'react';
import Link from 'next/link';
import {
  Lock,
  Play,
  CheckCircle2,
  ArrowRight,
  Award,
} from 'lucide-react';

export interface CourseProgressCardProps {
  courseKey: string;
  completedCount: number;
  totalChapters: number;
  progressPercentage: number;
  activeChapterKey: string;
  activeChapterNumber?: number;
  activeCount?: number;
  lockedCount?: number;
  isAllCompleted?: boolean;
}

export const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  courseKey,
  completedCount,
  totalChapters,
  progressPercentage,
  activeChapterKey,
  activeChapterNumber = 1,
  activeCount = 1,
  lockedCount = 0,
  isAllCompleted = false,
}) => {
  const targetChapterKey = activeChapterKey || 'beginner-ch-1';
  const ctaHref = `/student/courses/${courseKey}/chapter/${targetChapterKey}`;

  return (
    <div className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 sm:p-6 flex flex-col justify-between gap-5 relative overflow-hidden">
      {/* Top Header: Progress Metric */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#061B38] uppercase tracking-wider">
            Progres Belajar Anda
          </span>
          <span className="text-2xl font-extrabold text-[#7F54F8]">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress Bar with Gradient #7F54F8 to #3A4BD4 */}
        <div className="w-full h-3 rounded-full bg-[#E7EEFF] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7F54F8] via-[#5566EE] to-[#3A4BD4] transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Info summary */}
        <p className="text-xs text-[#494455] font-medium mt-0.5">
          {completedCount} dari {totalChapters} Modul Pembelajaran Berurutan Selesai.
        </p>

        {/* Micro Stats Row: Selesai (Teal), Aktif (Violet), Terkunci (Muted) */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {/* Selesai */}
          <div className="bg-[#F0F3FF] p-2.5 rounded-xl text-center flex flex-col border border-[#CAC3D8]/20">
            <span className="text-base font-extrabold text-[#00685F]">
              {completedCount}
            </span>
            <span className="text-[11px] font-medium text-[#7A7486]">
              Selesai
            </span>
          </div>

          {/* Aktif */}
          <div className="bg-[#F0F3FF] p-2.5 rounded-xl text-center flex flex-col border border-[#7F54F8]/30 ring-1 ring-[#7F54F8]/20">
            <span className="text-base font-extrabold text-[#7F54F8]">
              {isAllCompleted ? 0 : activeCount}
            </span>
            <span className="text-[11px] font-semibold text-[#7F54F8]">
              Aktif
            </span>
          </div>

          {/* Terkunci */}
          <div className="bg-[#F0F3FF] p-2.5 rounded-xl text-center flex flex-col border border-[#CAC3D8]/20">
            <span className="text-base font-extrabold text-[#7A7486]">
              {lockedCount}
            </span>
            <span className="text-[11px] font-medium text-[#7A7486]">
              Terkunci
            </span>
          </div>
        </div>
      </div>

      {/* Sequential Lock Notice Box */}
      <div className="bg-[#F0F3FF] p-3 sm:p-3.5 rounded-xl flex items-start gap-2.5 border border-[#CAC3D8]/30">
        <Lock className="w-4 h-4 text-[#7F54F8] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-[#061B38]">
            Mekanisme Sekuensial Aktif
          </span>
          <span className="text-[11px] leading-relaxed text-[#494455]">
            Selesaikan materi &amp; tontonan untuk membuka bab berikutnya secara bertahap.
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-1 flex flex-col gap-2">
        {isAllCompleted ? (
          <>
            <Link
              href={`/student/courses/${courseKey}/certificate`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#7F54F8] to-[#6636DE] hover:from-[#6636DE] hover:to-[#5010C8] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
            >
              <Award className="w-4 h-4 text-[#89F5E7] group-hover:scale-110 transition-transform" />
              <span>Lihat E-Sertifikat Resmi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/student/courses/${courseKey}/chapter/${targetChapterKey}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#00685F] text-xs font-semibold border border-[#CAC3D8]/30 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
              <span>Review Materi Modul</span>
            </Link>
          </>
        ) : (
          <Link
            href={ctaHref}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
          >
            <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Lanjutkan Belajar (Bab {activeChapterNumber})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
