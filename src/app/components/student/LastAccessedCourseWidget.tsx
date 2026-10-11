'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { getChapterByKey } from '@/data/curriculum';

interface LastAccessedCourseWidgetProps {
  lastCourse: {
    key: string;
    title: string;
    category: string;
    thumbnail: string;
    completedChaptersCount: number;
    totalChaptersCount: number;
    progressPercentage: number;
    lastAccessedChapterKey?: string;
  } | null;
}

export const LastAccessedCourseWidget: React.FC<LastAccessedCourseWidgetProps> = ({
  lastCourse,
}) => {
  if (!lastCourse) {
    return (
      <div className="h-full rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col justify-between gap-3 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#CAC3D8]/30 pb-3 shrink-0">
          <h3 className="text-base font-bold text-[#061B38] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#7F54F8]" />
            Course Terakhir yang Diakses
          </h3>
        </div>
        <div className="flex-1 p-6 rounded-2xl bg-[#F0F3FF] text-center flex flex-col items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-[#7A7486]" />
          <p className="text-xs text-[#494455] font-medium">
            Belum ada aktivitas pembelajaran terakhir.
          </p>
        </div>
      </div>
    );
  }

  const chapterKey = lastCourse.lastAccessedChapterKey || 'beginner-ch-1';
  const chapterDetails = getChapterByKey(lastCourse.key, chapterKey);
  const studyHref = `/student/courses/${lastCourse.key}/chapter/${chapterKey}`;

  return (
    <div className="h-full rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-4 overflow-hidden">
      {/* Widget Header Title */}
      <div className="flex items-center justify-between border-b border-[#CAC3D8]/30 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[#7F54F8]" />
          <h3 className="text-base font-bold text-[#061B38]">Course Terakhir yang Diakses</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8DEFF] text-[#5010C8] text-[11px] font-bold">
          Aktivitas Terakhir
        </span>
      </div>

      {/* Main Card Content Container (Scrollable if height exceeds) */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/30">
          <div className="relative w-full h-36 rounded-xl overflow-hidden shrink-0 bg-[#DFE8FF]">
            <Image
              src={lastCourse.thumbnail}
              alt={lastCourse.title}
              fill
              unoptimized
              className="object-cover"
            />
            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#7F54F8] text-white text-[10px] font-bold shadow-sm">
              {lastCourse.category}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#7F54F8] uppercase tracking-wider">
              {chapterDetails ? `Bab ${chapterDetails.chapterNumber}: ${chapterDetails.title}` : 'Lanjutkan Bab'}
            </span>
            <h4 className="text-base font-bold text-[#061B38] leading-tight">
              {lastCourse.title}
            </h4>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#CAC3D8]/30">
            <div className="flex items-center justify-between text-xs font-medium text-[#7A7486]">
              <span>{lastCourse.completedChaptersCount} dari {lastCourse.totalChaptersCount} Bab Selesai</span>
              <span className="font-extrabold text-[#7F54F8]">{lastCourse.progressPercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#E7EEFF] overflow-hidden">
              <div
                className="h-full bg-[#7F54F8] rounded-full transition-all duration-300"
                style={{ width: `${lastCourse.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <Link
          href={studyHref}
          className="w-full py-3 px-5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
        >
          <span>Lanjutkan Belajar</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
