'use client';

import React from 'react';
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
  const targetChapterKey = course.lastAccessedChapterKey || 'beginner-ch-1';
  const studyHref = `/student/courses/${course.key}/chapter/${targetChapterKey}`;
  const syllabusHref = `/student/courses/${course.key}`;

  return (
    <div className="rounded-2xl bg-[#F9F9FF] hover:bg-white border border-[#CAC3D8]/40 p-4 flex flex-col gap-3 group hover:shadow-md hover:border-[#7F54F8]/40 transition-all duration-200">
      {/* Top Header: Category & Status Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8DEFF] text-[#5010C8] text-[10px] font-bold">
          {course.category}
        </span>

        {course.isFullyCompleted ? (
          <span className="flex items-center gap-1 bg-[#89F5E7]/40 text-[#00685F] px-2 py-0.5 rounded-full text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-[#00685F]" />
            Lulus
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[#7A7486] text-[11px] font-semibold">
            <BookOpen className="w-3 h-3 text-[#7F54F8]" />
            {course.completedChaptersCount} / {course.totalChaptersCount} Bab
          </span>
        )}
      </div>

      {/* Course Title & Credential Badge */}
      <div className="flex flex-col gap-1">
        <h4 className="text-sm sm:text-base font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
          {course.title}
        </h4>
        <span className="text-[11px] text-[#7A7486] font-medium flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-[#7F54F8] shrink-0" />
          <span className="truncate">{course.badge}</span>
        </span>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-[#494455]">
            Progres Belajar
          </span>
          <span className="font-extrabold text-xs text-[#7F54F8]">
            {course.progressPercentage}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#E7EEFF] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7F54F8] to-[#3A4BD4] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${course.progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Compact Action Footer */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#CAC3D8]/20">
        <Link
          href={syllabusHref}
          className="py-2 px-3 rounded-xl bg-white border border-[#CAC3D8]/50 hover:bg-[#F0F3FF] text-[#061B38] text-xs font-bold text-center transition-colors"
        >
          Silabus
        </Link>
        <Link
          href={studyHref}
          className="py-2 px-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center group/btn"
        >
          <span>{course.isFullyCompleted ? 'Review' : 'Lanjut'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
