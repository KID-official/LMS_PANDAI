import React from 'react';
import Link from 'next/link';
import { CheckCircle2, PlayCircle, Lock, BookOpen } from 'lucide-react';
import { ChapterWithStatus } from '@/actions/progressActions';

interface ChapterSidebarNavProps {
  courseKey: string;
  currentChapterKey: string;
  chaptersWithStatus: ChapterWithStatus[];
  completedCount: number;
  totalChapters: number;
  progressPercentage: number;
}

export function ChapterSidebarNav({
  courseKey,
  currentChapterKey,
  chaptersWithStatus,
  completedCount,
  totalChapters,
  progressPercentage,
}: ChapterSidebarNavProps) {
  return (
    <aside className="hidden lg:block w-full">
      <div className="sticky top-24 bg-white rounded-2xl border border-[#CAC3D8]/40 p-5 shadow-sm space-y-5">
        {/* Header & Course Progress */}
        <div className="space-y-3 pb-3 border-b border-[#E7EEFF]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#061B38] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#7F54F8]" />
              Silabus Kursus
            </h3>
            <span className="font-extrabold text-xs text-[#7F54F8] bg-[#E8DEFF] px-2.5 py-0.5 rounded-full">
              {progressPercentage}% Selesai
            </span>
          </div>

          <p className="text-xs text-[#7A7486]">
            {completedCount} dari {totalChapters} bab materi telah diselesaikan.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-[#E7EEFF] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#7F54F8] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-2.5">
          {chaptersWithStatus.map((ch) => {
            const isCurrent = ch.key === currentChapterKey;
            const isUnlocked = !ch.isLocked;

            const content = (
              <div
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 text-left ${
                  isCurrent
                    ? 'bg-[#F0F3FF] border-[#7F54F8] shadow-sm ring-1 ring-[#7F54F8]/30'
                    : ch.isCompleted
                    ? 'bg-white hover:bg-[#F9F9FF] border-[#E7EEFF]'
                    : isUnlocked
                    ? 'bg-white hover:bg-[#F0F3FF] border-[#CAC3D8]/40'
                    : 'bg-[#F9F9FF] border-dashed border-[#CAC3D8]/60 opacity-65 cursor-not-allowed'
                }`}
              >
                {/* Status Indicator Icon */}
                <div className="mt-0.5 shrink-0">
                  {ch.isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-[#89F5E7]/40 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#00685F]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-[#7F54F8] flex items-center justify-center shadow-sm">
                      <PlayCircle className="w-4 h-4 text-white" />
                    </div>
                  ) : isUnlocked ? (
                    <div className="w-6 h-6 rounded-full bg-[#DFE8FF] flex items-center justify-center">
                      <span className="text-[11px] font-bold text-[#5010C8]">
                        {ch.chapterNumber}
                      </span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#CAC3D8]/30 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-[#7A7486]" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7486]">
                      Bab {ch.chapterNumber}
                    </span>
                    {ch.isCompleted ? (
                      <span className="text-[10px] font-bold text-[#00685F] bg-[#89F5E7]/30 px-2 py-0.5 rounded-full">
                        Selesai
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-bold text-[#7F54F8] bg-[#E8DEFF] px-2 py-0.5 rounded-full">
                        Sedang Dipelajari
                      </span>
                    ) : ch.isLocked ? (
                      <span className="text-[10px] font-semibold text-[#7A7486]">
                        Terkunci
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#6636DE]">
                        Terbuka
                      </span>
                    )}
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isCurrent
                        ? 'text-[#7F54F8]'
                        : isUnlocked
                        ? 'text-[#061B38]'
                        : 'text-[#7A7486]'
                    }`}
                  >
                    {ch.title}
                  </h4>

                  <span className="text-[11px] text-[#7A7486] mt-1 block">
                    {ch.durationMinutes} menit
                  </span>
                </div>
              </div>
            );

            if (isUnlocked) {
              return (
                <Link
                  key={ch.key}
                  href={`/student/courses/${courseKey}/chapter/${ch.key}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-[#7F54F8] rounded-xl"
                >
                  {content}
                </Link>
              );
            }

            return <div key={ch.key}>{content}</div>;
          })}
        </div>
      </div>
    </aside>
  );
}
