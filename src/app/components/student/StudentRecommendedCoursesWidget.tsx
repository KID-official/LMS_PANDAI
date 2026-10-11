'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Clock, ShieldCheck, BookMarked } from 'lucide-react';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';
import { getAllCourses, Course } from '@/data/curriculum';

export const StudentRecommendedCoursesWidget: React.FC = () => {
  const courses = getAllCourses();

  return (
    <div className="rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#CAC3D8]/30 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7F54F8]" />
            <h3 className="text-lg font-extrabold text-[#061B38]">Rekomendasi Course Pilihan</h3>
          </div>
          <p className="text-xs text-[#7A7486] font-medium">
            Tingkatkan keahlian literasi AI dan forensik digital kamu melalui modul rekomendasi kurikulum UNAIR 2026.
          </p>
        </div>

        <Link
          href={STUDENT_ROUTES.MY_COURSES}
          className="px-4 py-2 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#7F54F8] text-xs font-bold flex items-center gap-2 transition-colors border border-[#7F54F8]/20 shrink-0"
        >
          <span>Lihat Katalog Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Recommended Course Cards (Synced with Catalog Course Data) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course: Course) => {
          const firstChapterKey = course.chapters[0]?.key || '';
          const targetHref = `/student/courses/${course.key}/chapter/${firstChapterKey}`;
          const syllabusHref = `/student/courses/${course.key}`;

          return (
            <div
              key={course.key}
              className="rounded-2xl bg-[#F9F9FF] border border-[#CAC3D8]/40 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#DFE8FF]">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7F54F8] text-white text-[10px] font-bold shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium bg-[#061B38]/70 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#89F5E7]" />
                      {course.estimatedHours} Jam
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[#89F5E7]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2.5">
                  <div>
                    <h4 className="text-base font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug mb-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#494455] line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#7A7486] pt-3 border-t border-[#CAC3D8]/30 mt-1">
                    <div className="flex items-center gap-1.5 font-medium truncate max-w-[60%]">
                      <BookOpen className="w-3.5 h-3.5 text-[#7F54F8] shrink-0" />
                      <span className="truncate text-[#494455]">{course.instructorName}</span>
                    </div>
                    <span className="flex items-center gap-1 font-bold text-[#7F54F8] text-[11px] shrink-0">
                      <BookMarked className="w-3.5 h-3.5" />
                      {course.chapters.length} Bab
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={syllabusHref}
                  className="py-2.5 px-3 rounded-xl bg-white border border-[#CAC3D8]/50 hover:bg-[#F0F3FF] text-[#061B38] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
                >
                  <span>Silabus</span>
                </Link>
                <Link
                  href={targetHref}
                  className="py-2.5 px-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
                >
                  <span>Mulai Belajar</span>
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
