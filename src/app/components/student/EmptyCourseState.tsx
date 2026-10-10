'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { getAllCourses } from '@/data/curriculum';

export const EmptyCourseState: React.FC = () => {
  const availableCourses = getAllCourses();

  return (
    <div className="flex flex-col gap-8">
      {/* Friendly Empty State Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col items-center text-center gap-4 max-w-3xl mx-auto w-full">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8DEFF] text-[#7F54F8] shadow-sm">
          <BookOpen className="h-8 w-8" />
        </div>

        <div className="flex flex-col gap-1.5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F0F3FF] text-[#7F54F8] text-xs font-bold self-center">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Belum Ada Kursus yang Diikuti</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#061B38]">
            Siap Memulai Modul Pembelajaran Pertamamu?
          </h2>
          <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
            Kamu belum memiliki riwayat progress belajar. Pilih salah satu modul kurikulum etika dan forensik AI di bawah ini untuk memulai!
          </p>
        </div>
      </div>

      {/* Recommended Available Courses Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7F54F8]">
              Rekomendasi Modul
            </span>
            <h3 className="text-lg font-bold text-[#061B38]">Pilih Modul Pembelajaran</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCourses.map((course) => (
            <div
              key={course.key}
              className="rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col">
                <div className="relative h-44 w-full overflow-hidden bg-[#DFE8FF]">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#7F54F8] text-white text-[11px] font-bold shadow-sm">
                    {course.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold text-[#7F54F8] uppercase tracking-wider">
                    {course.level} • {course.estimatedHours} Jam
                  </span>
                  <h4 className="text-base font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-xs text-[#494455] line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <Link
                  href={`/student/courses/${course.key}/chapter/${course.chapters[0]?.key || 'beginner-ch-1'}`}
                  className="flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold transition-colors shadow-sm group/btn"
                >
                  <span>Mulai Pembelajaran Bab 1</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
