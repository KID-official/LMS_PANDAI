import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

interface ChapterHeaderProps {
  courseKey: string;
  chapterNumber: number;
  totalChapters: number;
  courseCategory: string;
  durationMinutes: number;
  title: string;
}

export function ChapterHeader({
  courseKey,
  chapterNumber,
  totalChapters,
  courseCategory,
  durationMinutes,
  title,
}: ChapterHeaderProps) {
  return (
    <div className="flex flex-col gap-3 pb-2">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/student/courses/${courseKey}`}
          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#E7EEFF] hover:bg-[#D6E3FF] text-[#6636DE] font-semibold text-xs transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Silabus Materi</span>
        </Link>

        {/* Chapter Counter Pill */}
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#E8DEFF] text-[#20005F] font-bold text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          Bab {chapterNumber} dari {totalChapters}
        </span>
      </div>

      {/* Chapter Title & Metadata */}
      <div>
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="py-0.5 px-2.5 rounded-full bg-[#DFE8FF] text-[#061B38] font-semibold text-[11px] tracking-wide">
            {courseCategory}
          </span>
          <span className="flex items-center gap-1 text-[#7A7486] font-medium text-xs">
            <Clock className="w-3.5 h-3.5 text-[#7F54F8]" />
            {durationMinutes} Menit Baca
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#061B38] leading-tight tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
