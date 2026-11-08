'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { getChapterByKey } from '@/data/curriculum';
import { EmptyCourseState } from './EmptyCourseState';

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
    return <EmptyCourseState />;
  }

  const chapterKey = lastCourse.lastAccessedChapterKey || 'air-ch-1';
  const chapterDetails = getChapterByKey(lastCourse.key, chapterKey);
  const studyHref = `/student/courses/${lastCourse.key}/chapter/${chapterKey}`;
  const syllabusHref = `/student/courses/${lastCourse.key}`;

  return (
    <div className="rounded-3xl bg-white border border-[#EAE8F2] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-shadow flex flex-col md:flex-row items-stretch gap-6">
      {/* Left: 16:9 Thumbnail with Overlay Badge */}
      <div className="relative w-full md:w-64 lg:w-72 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 bg-[#F1EDFF]">
        <Image
          src={lastCourse.thumbnail}
          alt={lastCourse.title}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-lg bg-[#7950F2] text-white text-[11px] font-bold shadow-xs">
            {lastCourse.category}
          </span>
        </div>
      </div>

      {/* Right: Course Info, Chapter Progress, Progress Bar, and CTAs */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F1EDFF] text-[#7950F2] text-[11px] font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Aktivitas Terakhir</span>
            </span>
            <span className="text-xs font-bold text-[#7950F2]">
              {lastCourse.progressPercentage}% Selesai
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] leading-snug">
            {lastCourse.title}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-[#7B8198]">
            {chapterDetails
              ? `Bab ${chapterDetails.chapterNumber}: ${chapterDetails.title}`
              : 'Lanjutkan bab pembelajaran'}
          </p>
        </div>

        {/* Progress Bar & Details */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#EAE8F2]">
          <div className="flex items-center justify-between text-xs font-medium text-[#7B8198]">
            <span>{lastCourse.completedChaptersCount} dari {lastCourse.totalChaptersCount} Bab Selesai</span>
            <span className="font-semibold text-[#172554]">
              {lastCourse.totalChaptersCount - lastCourse.completedChaptersCount > 0
                ? `${lastCourse.totalChaptersCount - lastCourse.completedChaptersCount} bab tersisa`
                : 'Selesai'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#EAE8F2] overflow-hidden">
            <div
              className="h-full bg-[#7950F2] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${lastCourse.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={studyHref}
            className="px-5 py-2.5 rounded-xl bg-[#7950F2] hover:bg-[#683fe4] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>Lanjutkan Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={syllabusHref}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE8F2] hover:bg-[#F1EDFF] text-[#172554] text-xs sm:text-sm font-semibold transition-colors"
          >
            Silabus
          </Link>
        </div>
      </div>
    </div>
  );
};
