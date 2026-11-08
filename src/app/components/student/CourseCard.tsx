'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, Award } from 'lucide-react';

interface CourseCardProps {
  course: {
    key: string;
    title: string;
    category: string;
    thumbnail?: string;
    badge: string;
    completedChaptersCount: number;
    totalChaptersCount: number;
    progressPercentage: number;
    lastAccessedChapterKey?: string;
    isFullyCompleted: boolean;
  };
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const targetChapterKey = course.lastAccessedChapterKey || 'air-ch-1';
  const studyHref = `/student/courses/${course.key}/chapter/${targetChapterKey}`;
  const syllabusHref = `/student/courses/${course.key}`;

  return (
    <div className="rounded-2xl bg-white hover:bg-[#FAFAFF] border border-[#EAE8F2] p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 group hover:shadow-xs transition-all">
      {/* Thumbnail if available */}
      {course.thumbnail && (
        <div className="relative w-full md:w-36 h-24 rounded-xl overflow-hidden shrink-0 bg-[#F1EDFF]">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      {/* Main Info */}
      <div className="flex-1 flex flex-col justify-between gap-2.5 w-full">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-[#F1EDFF] text-[#7950F2] text-[10px] font-bold">
            {course.category}
          </span>

          {course.isFullyCompleted ? (
            <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#059669] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#A7F3D0]">
              <CheckCircle2 className="w-3 h-3" />
              Lulus 100%
            </span>
          ) : (
            <span className="text-[#7B8198] text-[11px] font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#7950F2]" />
              {course.completedChaptersCount} / {course.totalChaptersCount} Bab
            </span>
          )}
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#172554] group-hover:text-[#7950F2] transition-colors leading-snug">
            {course.title}
          </h4>
          <span className="text-[11px] text-[#7B8198] font-medium flex items-center gap-1 mt-0.5">
            <Award className="w-3.5 h-3.5 text-[#7950F2] shrink-0" />
            <span className="truncate">{course.badge}</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#7B8198]">Progres Belajar</span>
            <span className="font-bold text-[#7950F2]">{course.progressPercentage}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#EAE8F2] overflow-hidden">
            <div
              className="h-full bg-[#7950F2] rounded-full transition-all duration-300"
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center md:flex-col justify-end gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#EAE8F2]">
        <Link
          href={studyHref}
          className="flex-1 md:flex-none py-2 px-3.5 rounded-xl bg-[#7950F2] hover:bg-[#683fe4] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <span>{course.isFullyCompleted ? 'Review' : 'Lanjut'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={syllabusHref}
          className="py-2 px-3 rounded-xl bg-white border border-[#EAE8F2] hover:bg-[#F1EDFF] text-[#172554] text-xs font-semibold text-center transition-colors"
        >
          Silabus
        </Link>
      </div>
    </div>
  );
};
