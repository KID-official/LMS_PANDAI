import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  FileCheck,
  ShieldCheck,
  Play,
  School,
} from 'lucide-react';
import { Course } from '@/data/curriculum';

interface CourseHeroBannerProps {
  course: Course;
  activeChapterKey?: string;
  activeChapterNumber?: number;
  totalChapters: number;
}

export function getCourseModuleCode(courseKey: string): string {
  if (courseKey === 'ai-robotika' || courseKey === 'course-level-1' || courseKey === 'course-beginner') return 'AI-ROB-2026';
  if (courseKey === 'dekomposisi-pola' || courseKey === 'course-level-2' || courseKey === 'course-intermediate') return 'KOM-POL-2026';
  if (courseKey === 'abstraksi-algoritma' || courseKey === 'course-level-3') return 'KOM-ALG-2026';
  if (courseKey === 'etika-digital' || courseKey === 'course-level-4') return 'ETIK-DIG-2026';
  return courseKey.toUpperCase().replace(/^COURSE-/, 'MOD-');
}

export const CourseHeroBanner: React.FC<CourseHeroBannerProps> = ({
  course,
  activeChapterKey,
  activeChapterNumber = 1,
  totalChapters,
}) => {
  const moduleCode = getCourseModuleCode(course.key);
  const targetChapterKey = activeChapterKey || course.chapters[0]?.key || '';
  const ctaLink = `/student/courses/${course.key}/chapter/${targetChapterKey}`;

  // Generate instructor initials for monogram box
  const instructorInitials = course.instructorName
    .replace(/(Dr\.|Prof\.|M\.Kom\.|M\.T\.|S\.Pd\.|M\.Pd\.|Ir\.)/gi, '')
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'IK';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── Breadcrumb & Top Bar Navigation ── */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium text-[#7A7486]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link
            href="/student/dashboard"
            className="hover:text-[#061B38] transition-colors"
          >
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CAC3D8]" />
          <Link
            href="/student/dashboard"
            className="text-[#7F54F8] font-semibold hover:text-[#6636DE] transition-colors"
          >
            Portal Pembelajaran
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CAC3D8]" />
          <span className="text-[#061B38] font-bold truncate max-w-[200px] sm:max-w-md">
            {course.title}
          </span>
        </nav>
      </div>

      {/* ── Action Bar: Back button, Module code, and Quick CTA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#CAC3D8]/50 text-[#061B38] hover:bg-[#F0F3FF] hover:border-[#7F54F8]/40 transition-all shadow-subtle group text-xs sm:text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#7A7486] group-hover:-translate-x-0.5 group-hover:text-[#7F54F8] transition-all" />
            <span>Kembali ke Kursus Saya</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#7A7486]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CAC3D8]" />
            <span>
              Kode Modul:{' '}
              <strong className="text-[#061B38] font-mono font-bold tracking-wide">
                {moduleCode}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
          >
            <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Lanjutkan Belajar (Bab {activeChapterNumber})</span>
          </Link>
        </div>
      </div>

      {/* ── Course Hero Overview Banner Card ── */}
      <section className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between gap-6">
        {/* Subtle Ambient Decorative Gradient Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#7F54F8]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-12 w-80 h-80 rounded-full bg-[#3A4BD4]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Badge Chips Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Level Badge */}
            <span className="px-3 py-1 rounded-full bg-[#89F5E7]/30 text-[#00685F] text-[11px] font-bold tracking-wide uppercase">
              {course.level}
            </span>

            {/* Standar Kurikulum */}
            <span className="px-3 py-1 rounded-full bg-[#F0F3FF] text-[#494455] text-[11px] font-medium border border-[#CAC3D8]/30">
              Kurikulum Standar Literasi Digital Kemendikdasmen 2026
            </span>

            {/* Terverifikasi Akademik Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFE0FF] text-[#000A63] text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3A4BD4]" />
              Terverifikasi Akademik
            </span>
          </div>

          {/* Course Title & Tagline */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#061B38] tracking-tight leading-snug">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-[#7F54F8] leading-relaxed">
              {course.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#494455] leading-relaxed mt-1">
              {course.description}
            </p>
          </div>
        </div>

        {/* ── Instructor & Metadata Strip ── */}
        <div className="relative z-10 pt-4 border-t border-[#CAC3D8]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Instructor Profile Tile */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E8DEFF] text-[#5010C8] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {instructorInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#061B38] leading-tight">
                {course.instructorName}
              </span>
              <span className="text-xs text-[#7A7486] font-medium flex items-center gap-1 mt-0.5">
                <School className="w-3.5 h-3.5 text-[#7F54F8] shrink-0" />
                FIKKIA Universitas Airlangga x AmosProduction
              </span>
            </div>
          </div>

          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-[#494455]">
            <div className="flex items-center gap-1.5 bg-[#F0F3FF] px-2.5 py-1 rounded-lg">
              <BookOpen className="w-3.5 h-3.5 text-[#7F54F8]" />
              <span>{totalChapters} Bab Terstruktur</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-[#CAC3D8] hidden sm:block" />

            <div className="flex items-center gap-1.5 bg-[#F0F3FF] px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#7F54F8]" />
              <span>Total {course.estimatedHours} Jam Belajar</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-[#CAC3D8] hidden sm:block" />

            <div className="flex items-center gap-1.5 bg-[#F0F3FF] px-2.5 py-1 rounded-lg">
              <FileCheck className="w-3.5 h-3.5 text-[#7F54F8]" />
              <span>Passing Grade Kuis 75</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-[#CAC3D8] hidden sm:block" />

            <div className="flex items-center gap-1.5 bg-[#89F5E7]/25 text-[#00685F] px-2.5 py-1 rounded-lg border border-[#00685F]/20">
              <Award className="w-3.5 h-3.5 text-[#00685F]" />
              <span>E-Sertifikat Resmi UNAIR</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
