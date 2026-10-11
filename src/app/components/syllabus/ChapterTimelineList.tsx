import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Video,
  FileQuestion,
  Info,
  Clock,
  GitFork,
  ArrowRight,
  Circle,
} from 'lucide-react';
import { ChapterWithStatus } from '@/actions/progressActions';

export interface ChapterTimelineListProps {
  courseKey: string;
  chaptersWithStatus: ChapterWithStatus[];
}

export const ChapterTimelineList: React.FC<ChapterTimelineListProps> = ({
  courseKey,
  chaptersWithStatus,
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Section Header & Legend ── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#CAC3D8]/40 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-[#7F54F8]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#061B38]">
              Alur Silabus Berurutan
            </h2>
          </div>
          <p className="text-xs text-[#7A7486] mt-1">
            Jalur kurikulum linier: Setiap capaian bab menjadi prasyarat bab berikutnya.
          </p>
        </div>

        {/* Status Legend Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#89F5E7]/25 text-[#00685F] border border-[#00685F]/20">
            <span className="w-2 h-2 rounded-full bg-[#00685F]" />
            Selesai
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#E8DEFF] text-[#5010C8] border border-[#7F54F8]/20">
            <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-pulse" />
            Sedang Aktif
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F0F3FF] text-[#7A7486] border border-[#CAC3D8]/40">
            <Lock className="w-3 h-3 text-[#7A7486]" />
            Terkunci
          </span>
        </div>
      </div>

      {/* ── Sequential Chapters List ── */}
      <div className="flex flex-col gap-4 relative">
        {chaptersWithStatus.map((chapter) => {
          const chHref = `/student/courses/${courseKey}/chapter/${chapter.key}`;

          // ── Case 1: COMPLETED CHAPTER ──────────────────────────────────
          if (chapter.status === 'COMPLETED') {
            const formattedDate = chapter.completedAt
              ? new Date(chapter.completedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Selesai';

            return (
              <article
                key={chapter.key}
                className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 sm:p-6 flex flex-col md:flex-row gap-4 relative overflow-hidden transition-all hover:shadow-md group"
              >
                {/* Status Indicator Bar (Desktop Left Edge) */}
                <div className="w-1.5 rounded-full bg-[#00685F] self-stretch shrink-0 hidden md:block" />

                <div className="flex-1 flex flex-col justify-between gap-3">
                  {/* Top Badge & Number */}
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#89F5E7]/40 text-[#00685F] flex items-center justify-center text-xs font-bold shrink-0">
                        {chapter.chapterNumber}
                      </div>
                      <span className="text-xs font-bold text-[#00685F] uppercase tracking-wider">
                        Bab {chapter.chapterNumber} • Selesai
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#89F5E7]/30 text-[#00685F] text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
                      Lulus Kuis (Skor ≥ 75)
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Link
                      href={chHref}
                      className="text-base sm:text-lg font-bold text-[#061B38] hover:text-[#7F54F8] transition-colors leading-snug"
                    >
                      {chapter.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-[#494455] mt-1.5 leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Metadata Chips: Durasi, Kuis, Waktu Selesai */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A7486] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-[#00685F]" />
                      <span>{chapter.durationMinutes} Menit Video Selesai</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#CAC3D8]" />
                    <span className="flex items-center gap-1.5">
                      <FileQuestion className="w-4 h-4 text-[#00685F]" />
                      <span>Kuis Terverifikasi</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#CAC3D8] hidden sm:block" />
                    <span className="text-[#494455] hidden sm:block">
                      Diselesaikan: {formattedDate}
                    </span>
                  </div>

                  {/* Completed Action Button */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <Link
                      href={chHref}
                      className="px-4 py-2 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] hover:text-[#7F54F8] text-xs font-bold transition-all flex items-center gap-2 border border-[#CAC3D8]/30 group/btn"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#7F54F8] group-hover/btn:-rotate-45 transition-transform" />
                      <span>Tonton Ulang Materi</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          }

          // ── Case 2: ACTIVE CHAPTER ─────────────────────────────────────
          if (chapter.status === 'ACTIVE') {
            return (
              <article
                key={chapter.key}
                className="bg-white rounded-2xl border-2 border-[#7F54F8] ring-4 ring-[#7F54F8]/10 shadow-md p-5 sm:p-6 flex flex-col md:flex-row gap-4 relative overflow-hidden transition-all"
              >
                {/* Active Indicator Bar (Desktop Left Edge) */}
                <div className="w-1.5 rounded-full bg-[#7F54F8] self-stretch shrink-0 hidden md:block" />

                <div className="flex-1 flex flex-col justify-between gap-4">
                  {/* Top Badge & Number */}
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#7F54F8] text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">
                        {chapter.chapterNumber}
                      </div>
                      <span className="text-xs font-extrabold text-[#7F54F8] uppercase tracking-wider flex items-center gap-1.5">
                        Bab {chapter.chapterNumber} • Sedang Dipelajari
                        <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-ping" />
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEFF] text-[#5010C8] text-[11px] font-bold animate-pulse">
                      <Play className="w-3 h-3 fill-[#5010C8]" />
                      Siap Dipelajari
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Link
                      href={chHref}
                      className="text-base sm:text-lg font-bold text-[#061B38] hover:text-[#7F54F8] transition-colors leading-snug"
                    >
                      {chapter.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-[#494455] mt-1.5 leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Milestone Checklist */}
                  <div className="bg-[#F0F3FF] rounded-xl p-3.5 flex flex-col gap-2 border border-[#CAC3D8]/30">
                    <span className="text-xs font-bold text-[#061B38]">
                      Capaian untuk membuka Bab {chapter.chapterNumber + 1}:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#494455]">
                      <div className="flex items-center gap-2">
                        <Circle className="w-3.5 h-3.5 text-[#7F54F8] shrink-0" />
                        <span>Tonton Video Interaktif ({chapter.durationMinutes} Menit)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileQuestion className="w-3.5 h-3.5 text-[#7F54F8] shrink-0" />
                        <span>Lulus Kuis Evaluasi (Skor min. 75)</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Action Button */}
                  <div className="pt-1 flex items-center gap-3 flex-wrap">
                    <Link
                      href={chHref}
                      className="px-5 py-2.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-[0.98] group/btn"
                    >
                      <Play className="w-4 h-4 fill-white group-hover/btn:scale-110 transition-transform" />
                      <span>Mulai Pelajari Video Bab Ini</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          }

          // ── Case 3: LOCKED CHAPTER ─────────────────────────────────────
          const prevChapterNumber = Math.max(1, chapter.chapterNumber - 1);

          return (
            <article
              key={chapter.key}
              className="bg-[#F0F3FF] rounded-2xl border border-[#CAC3D8]/30 p-5 sm:p-6 flex flex-col md:flex-row gap-4 relative overflow-hidden opacity-75"
            >
              {/* Locked Indicator Bar (Desktop Left Edge) */}
              <div className="w-1.5 rounded-full bg-[#CAC3D8] self-stretch shrink-0 hidden md:block" />

              <div className="flex-1 flex flex-col justify-between gap-3">
                {/* Top Badge & Number */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#CAC3D8]/40 text-[#7A7486] flex items-center justify-center text-xs font-bold shrink-0">
                      {chapter.chapterNumber}
                    </div>
                    <span className="text-xs font-bold text-[#7A7486] uppercase tracking-wider">
                      Bab {chapter.chapterNumber} • Terkunci
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#7A7486] text-[11px] font-semibold border border-[#CAC3D8]/40">
                    <Lock className="w-3 h-3 text-[#7A7486]" />
                    Prasyarat Bab {prevChapterNumber}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#061B38]/70 leading-snug">
                    {chapter.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#494455]/70 mt-1.5 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>

                {/* Lock Requirement Notice Box */}
                <div className="bg-white/80 rounded-xl p-3 flex items-start gap-2.5 border border-[#CAC3D8]/30">
                  <Info className="w-4 h-4 text-[#7A7486] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#494455] leading-relaxed">
                    <strong className="text-[#061B38] font-semibold">
                      Prasyarat:
                    </strong>{' '}
                    Selesaikan materi Bab {prevChapterNumber} &amp; lulus kuis dengan nilai minimal 75 terlebih dahulu untuk membuka bab ini.
                  </p>
                </div>

                {/* Disabled Button & Duration */}
                <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
                  <button
                    disabled
                    type="button"
                    className="px-4 py-2 rounded-xl bg-[#E7EEFF] text-[#7A7486] text-xs font-bold cursor-not-allowed flex items-center gap-2 border border-[#CAC3D8]/30"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#7A7486]" />
                    <span>Materi Belum Terbuka</span>
                  </button>

                  <span className="text-xs text-[#7A7486] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A7486]" />
                    Estimasi Durasi: {chapter.durationMinutes} Menit
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
