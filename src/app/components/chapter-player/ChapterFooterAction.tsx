'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { CheckCircle, CheckCheck, ArrowRight, Lock } from 'lucide-react';
import { useChapterTimerStore } from '@/stores/useChapterTimerStore';
import { markChapterCompletedAction } from '@/actions/progressActions';

interface NextChapterInfo {
  key: string;
  chapterNumber: number;
  title: string;
}

interface ChapterFooterActionProps {
  courseKey: string;
  chapterKey: string;
  isAlreadyCompleted: boolean;
  nextChapter?: NextChapterInfo;
  hasQuiz?: boolean;
  quizKey?: string;
}

export function ChapterFooterAction({
  courseKey,
  chapterKey,
  isAlreadyCompleted: initialCompleted,
  nextChapter,
  hasQuiz,
  quizKey,
}: ChapterFooterActionProps) {
  const { isCompleted, elapsedSeconds, markCompleted } = useChapterTimerStore();
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(false);
  const [completedLocally, setCompletedLocally] = useState(initialCompleted);

  const canMarkComplete = isCompleted || completedLocally;
  const isDone = completedLocally || isCompleted;

  const handleMarkComplete = () => {
    if (!canMarkComplete || isPending) return;

    startTransition(async () => {
      try {
        const watchSeconds = Math.max(elapsedSeconds, 60);
        const res = await markChapterCompletedAction(courseKey, chapterKey, watchSeconds);
        if (res && res.success) {
          markCompleted();
          setCompletedLocally(true);
          setIsSaved(true);
          setTimeout(() => {
            setIsSaved(false);
          }, 3000);
        }
      } catch (err) {
        console.error('Failed to mark chapter completed:', err);
      }
    });
  };

  const renderSecondaryAction = () => {
    if (hasQuiz && quizKey) {
      return (
        <Link
          href={`/student/courses/${courseKey}/quiz/${quizKey}`}
          className="w-full py-2.5 px-3.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all group"
        >
          <div className="flex flex-col items-center leading-tight">
            <span className="flex items-center gap-1">
              <span>Kuis Bab Ini</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-[10px] text-[#E8DEFF] font-normal leading-none mt-0.5">
              Passing Grade: 75
            </span>
          </div>
        </Link>
      );
    }

    if (nextChapter) {
      return (
        <Link
          href={`/student/courses/${courseKey}/chapter/${nextChapter.key}`}
          className="w-full py-2.5 px-3.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all group"
        >
          <div className="flex flex-col items-center leading-tight">
            <span className="flex items-center gap-1">
              <span>Bab Selanjutnya</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-[10px] text-[#E8DEFF] font-normal leading-none mt-0.5 truncate max-w-[150px]">
              Bab {nextChapter.chapterNumber}
            </span>
          </div>
        </Link>
      );
    }

    return (
      <Link
        href={`/student/courses/${courseKey}`}
        className="w-full py-2.5 px-3.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
      >
        <span>Silabus Lengkap</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    );
  };

  const actionButtons = (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
      {/* Mark Complete Button */}
      <button
        type="button"
        onClick={handleMarkComplete}
        disabled={!canMarkComplete || isPending}
        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all ${
          isSaved
            ? 'bg-[#008378] text-white'
            : isDone
            ? 'bg-[#00685F] hover:bg-[#005049] text-white active:scale-[0.98]'
            : canMarkComplete
            ? 'bg-[#00685F] hover:bg-[#005049] text-white active:scale-[0.98]'
            : 'bg-[#CAC3D8]/30 text-[#7A7486] cursor-not-allowed border border-[#CAC3D8]/40'
        }`}
      >
        {isSaved ? (
          <>
            <CheckCheck className="w-4 h-4 text-[#89F5E7] animate-bounce" />
            <span>Tersimpan!</span>
          </>
        ) : isPending ? (
          <span className="animate-pulse">Menyimpan...</span>
        ) : isDone ? (
          <>
            <CheckCircle className="w-4 h-4 text-white" />
            <span>Bab Tuntas ✓</span>
          </>
        ) : canMarkComplete ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Tandai Selesai</span>
          </>
        ) : (
          <>
            <Lock className="w-3.5 h-3.5 text-[#7A7486]" />
            <span className="text-[11px] sm:text-xs">Terkunci (Tonton Dulu)</span>
          </>
        )}
      </button>

      {/* Secondary Button: Next Chapter or Quiz */}
      {renderSecondaryAction()}
    </div>
  );

  return (
    <>
      {/* Desktop Inline Action Bar */}
      <div className="hidden lg:flex flex-col gap-3 mt-8 p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDone ? 'bg-[#00685F]' : 'bg-[#7F54F8] animate-pulse'
              }`}
            />
            <span className="text-xs font-semibold text-[#061B38]">
              {isDone ? 'Status: Bab Selesai Dipelajari' : 'Status: Sedang Mempelajari Bab'}
            </span>
          </div>

          <span
            className={`text-xs font-bold ${
              isDone ? 'text-[#00685F]' : 'text-[#7F54F8]'
            }`}
          >
            {isDone ? 'Persyaratan Tuntas 100%' : 'Menunggu Durasi Timer'}
          </span>
        </div>

        {actionButtons}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#CAC3D8]/30 shadow-[0_-4px_16px_rgba(6,27,56,0.08)] py-3 px-4 lg:hidden">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {/* Tracker Status Line */}
          <div className="flex items-center justify-between px-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#494455] font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDone ? 'bg-[#00685F]' : 'bg-[#7F54F8] animate-pulse'
                }`}
              />
              <span>{isDone ? 'Status: Bab Selesai' : 'Status: Mempelajari Bab'}</span>
            </div>
            <span
              className={`font-bold ${
                isDone ? 'text-[#00685F]' : 'text-[#7F54F8]'
              }`}
            >
              {isDone ? 'Tuntas 100%' : 'Berlangsung'}
            </span>
          </div>

          {actionButtons}
        </div>
      </div>
    </>
  );
}
