'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Search, BookOpen, Clock, ShieldCheck, ArrowRight, BookMarked, Sparkles, UserCheck } from 'lucide-react';
import { getAllCourses, Course } from '@/data/curriculum';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';

export default function CourseCatalogPage() {
  const { data: session } = useSession();
  const allCourses = getAllCourses();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Etika Digital & Regulasi', 'Forensik Digital & Keamanan'];

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allCourses, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-[#061B38] text-white pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles className="w-64 h-64" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="px-3 py-1 bg-[#7F54F8]/20 border border-[#7F54F8]/50 text-[#89F5E7] text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-wider">
            Kurikulum 2026
          </span>

          {session?.user && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <UserCheck className="w-4 h-4 text-[#89F5E7]" />
              <span>Login sebagai {session.user.identifier}</span>
              <span className="text-white/40">•</span>
              <Link
                href={STUDENT_ROUTES.MY_COURSES}
                className="text-[#89F5E7] hover:underline font-bold"
              >
                Buka di Portal Siswa &rarr;
              </Link>
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            Katalog Course &amp; Modul Literasi AI UNAIR 2026
          </h1>
          <p className="text-[#CAC3D8] text-sm md:text-base max-w-2xl font-medium mb-8">
            Jelajahi berbagai modul pembelajaran tentang etika digital, forensik visual, dan pemanfaatan AI yang aman untuk mendukung aktivitas akademik dan keseharian kamu.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#7A7486]" />
            </div>
            <input
              type="text"
              placeholder="Cari modul atau topik pembelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-[#061B38] placeholder:text-[#7A7486] font-medium outline-none focus:ring-2 focus:ring-[#7F54F8] shadow-lg transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-[#CAC3D8]/30 flex gap-2 overflow-x-auto mb-8 max-w-fit mx-auto" style={{ scrollbarWidth: 'none' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                selectedCategory === category
                  ? 'bg-[#7F54F8] text-white shadow-sm'
                  : 'bg-transparent text-[#494455] hover:bg-[#F0F3FF] hover:text-[#061B38]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course: Course) => (
              <div
                key={course.key}
                className="rounded-3xl bg-white border border-[#CAC3D8]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#7F54F8]/30 transition-all duration-300 group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-[#E7EEFF]">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#7F54F8] text-white text-[11px] font-bold shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium bg-[#061B38]/70 backdrop-blur-md px-3 py-1.5 rounded-full">
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
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[#494455] line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#F0F3FF] grid grid-cols-2 gap-3 text-xs text-[#7A7486]">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 font-medium text-[#494455]">
                        <BookOpen className="w-4 h-4 text-[#7F54F8]" />
                        <span className="truncate">{course.instructorName}</span>
                      </span>
                      <span className="text-[10px] pl-5 truncate">{course.instructorRole}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end text-right">
                      <span className="flex items-center gap-1.5 font-bold text-[#7F54F8]">
                        {course.chapters.length} Bab Topik
                        <BookMarked className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] truncate max-w-full">{course.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/student/courses/${course.key}`}
                    className="py-2.5 px-3 rounded-xl bg-white border border-[#CAC3D8]/50 hover:bg-[#F0F3FF] text-[#061B38] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
                  >
                    <span>Silabus</span>
                  </Link>
                  <Link
                    href={`/student/courses/${course.key}/chapter/${course.chapters[0]?.key || ''}`}
                    className="py-2.5 px-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
                  >
                    <span>Mulai Belajar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#F0F3FF] rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#7A7486]" />
              </div>
              <h3 className="text-lg font-bold text-[#061B38] mb-2">Pencarian Tidak Ditemukan</h3>
              <p className="text-[#494455] text-sm max-w-md">
                Modul dengan kata kunci &quot;{searchQuery}&quot; tidak ditemukan pada kategori ini. Silakan coba kata kunci lain.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
