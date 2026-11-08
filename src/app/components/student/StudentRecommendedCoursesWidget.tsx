'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Clock, BookMarked } from 'lucide-react';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';
import { getAllCourses, Course } from '@/data/curriculum';

export const StudentRecommendedCoursesWidget: React.FC = () => {
  const courses = getAllCourses();

  return (
    <div className="rounded-3xl bg-white border border-[#EAE8F2] shadow-xs p-6 sm:p-8 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#EAE8F2]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7950F2]" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#172554]">
              Rekomendasi Course Pilihan
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#7B8198] font-medium">
            Tingkatkan literasi kecerdasan buatan, robotika cerdas, dan berpikir komputasional kamu.
          </p>
        </div>

        <Link
          href={STUDENT_ROUTES.MY_COURSES}
          className="px-4 py-2 rounded-xl bg-[#F1EDFF] hover:bg-[#eae2fd] text-[#7950F2] text-xs font-bold flex items-center gap-2 transition-colors border border-[#EAE8F2] shrink-0"
        >
          <span>Lihat Katalog Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Recommended Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course: Course) => {
          const firstChapterKey = course.chapters[0]?.key || '';
          const targetHref = `/student/courses/${course.key}/chapter/${firstChapterKey}`;
          const syllabusHref = `/student/courses/${course.key}`;

          return (
            <div
              key={course.key}
              className="rounded-2xl bg-white border border-[#EAE8F2] overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-[#A78BFA]/50 transition-all duration-300"
            >
              <div className="flex flex-col">
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#F1EDFF]">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#7950F2] text-white text-[10px] font-bold shadow-xs">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#172554]/80 backdrop-blur-md text-white text-[10px] font-semibold">
                      <Clock className="w-3 h-3 text-[#A78BFA]" />
                      {course.estimatedHours} Jam
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#172554] group-hover:text-[#7950F2] transition-colors leading-snug line-clamp-2 min-h-[40px]">
                    {course.title}
                  </h4>
                  <p className="text-xs text-[#7B8198] line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#7B8198] pt-2.5 border-t border-[#EAE8F2] mt-1">
                    <div className="flex items-center gap-1.5 font-medium truncate max-w-[65%]">
                      <BookOpen className="w-3.5 h-3.5 text-[#7950F2] shrink-0" />
                      <span className="truncate text-[11px]">{course.instructorName}</span>
                    </div>
                    <span className="flex items-center gap-1 font-bold text-[#7950F2] text-[11px] shrink-0">
                      <BookMarked className="w-3.5 h-3.5" />
                      {course.chapters.length} Bab
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-auto">
                <Link
                  href={syllabusHref}
                  className="py-2 px-2.5 rounded-xl bg-white border border-[#EAE8F2] hover:bg-[#F1EDFF] text-[#172554] text-xs font-semibold flex items-center justify-center transition-colors text-center"
                >
                  <span>Silabus</span>
                </Link>
                <Link
                  href={targetHref}
                  className="py-2 px-2.5 rounded-xl bg-[#7950F2] hover:bg-[#683fe4] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs text-center"
                >
                  <span>Mulai</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
