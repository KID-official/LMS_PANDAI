'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Clock,
  ShieldCheck,
  ArrowRight,
  BookMarked,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { getAllCourses, Course } from '@/data/curriculum';

export default function StudentCourseCatalogPage() {
  const allCourses = getAllCourses();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Etika Digital & Regulasi', 'Forensik Digital & Keamanan'];

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allCourses, searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#061B38] via-[#102A54] to-[#20005F] text-white p-6 sm:p-10 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-56 h-56" />
        </div>

        <div className="relative z-10 max-w-3xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#7F54F8]/30 border border-[#7F54F8]/50 text-[#89F5E7] text-xs font-bold rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5" />
              Katalog Pembelajaran Siswa
            </span>
            <span className="px-2.5 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
              Kurikulum UNAIR 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Katalog Course Literasi AI &amp; Forensik Digital
          </h1>

          <p className="text-sm sm:text-base text-[#CAC3D8] font-medium leading-relaxed">
            Pilih modul pembelajaran bersertifikasi resmi untuk meningkatkan literasi etika AI,
            keterampilan deteksi manipulasi visual deepfake, dan privasi data kamu.
          </p>

          {/* Interactive Search Bar */}
          <div className="w-full max-w-xl relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#7A7486]" />
            </div>
            <input
              type="text"
              placeholder="Cari topik modul, instruktur, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-[#061B38] placeholder:text-[#7A7486] font-medium text-sm outline-none focus:ring-2 focus:ring-[#7F54F8] shadow-md transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#CAC3D8]/30 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                selectedCategory === category
                  ? 'bg-[#7F54F8] text-white shadow-sm'
                  : 'bg-white text-[#494455] hover:bg-[#F0F3FF] hover:text-[#061B38] border border-[#CAC3D8]/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-[#7A7486]">
          Menampilkan {filteredCourses.length} dari {allCourses.length} Course
        </span>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: Course) => {
            const firstChapterKey = course.chapters[0]?.key || '';
            const targetHref = `/student/courses/${course.key}/chapter/${firstChapterKey}`;
            const syllabusHref = `/student/courses/${course.key}`;

            return (
              <div
                key={course.key}
                className="rounded-3xl bg-white border border-[#CAC3D8]/40 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#7F54F8]/40 transition-all duration-300 group"
              >
                <div className="flex flex-col">
                  {/* Thumbnail Container */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#DFE8FF]">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-[#7F54F8] text-white text-[11px] font-bold shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium bg-[#061B38]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#89F5E7]" />
                        {course.estimatedHours} Jam Belajar
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-[#89F5E7]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-[#494455] line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F0F3FF] grid grid-cols-2 gap-3 text-xs text-[#7A7486]">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 font-semibold text-[#494455]">
                          <BookOpen className="w-4 h-4 text-[#7F54F8] shrink-0" />
                          <span className="truncate">{course.instructorName}</span>
                        </span>
                        <span className="text-[10px] pl-5 truncate text-[#7A7486]">
                          {course.instructorRole}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 items-end text-right">
                        <span className="flex items-center gap-1.5 font-bold text-[#7F54F8]">
                          {course.chapters.length} Bab Topik
                          <BookMarked className="w-4 h-4" />
                        </span>
                        <span className="text-[10px] truncate max-w-full font-medium text-[#7A7486]">
                          {course.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    href={syllabusHref}
                    className="py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-[#CAC3D8]/30"
                  >
                    <span>Lihat Silabus</span>
                  </Link>
                  <Link
                    href={targetHref}
                    className="py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>Mulai Belajar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#CAC3D8]/30 p-8">
            <div className="w-16 h-16 bg-[#F0F3FF] rounded-2xl flex items-center justify-center mb-4 text-[#7A7486]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#061B38] mb-1">
              Course Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#494455] max-w-md">
              Tidak ada modul yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
