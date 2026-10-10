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
    thumbnail: string;
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

  return (
    <div className="rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col">
        {/* Course Thumbnail Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#DFE8FF]">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061B38]/80 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7F54F8] text-white text-[11px] font-bold shadow-sm">
              {course.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-[#89F5E7]" />
              {course.completedChaptersCount} dari {course.totalChaptersCount} Bab
            </span>
            {course.isFullyCompleted && (
              <span className="flex items-center gap-1 bg-[#00685F] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Lulus
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
              {course.title}
            </h3>
            <span className="text-xs text-[#7A7486] font-medium flex items-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-[#7F54F8]" />
              {course.badge}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#494455]">Progress Pembelajaran</span>
              <span className="font-extrabold text-[#7F54F8]">{course.progressPercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#E7EEFF] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7F54F8] to-[#3A4BD4] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${course.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-2">
        <Link
          href={studyHref}
          className="flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold transition-colors shadow-sm group/btn"
        >
          <span>{course.isFullyCompleted ? 'Review Materi Kursus' : 'Lanjutkan Belajar'}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
