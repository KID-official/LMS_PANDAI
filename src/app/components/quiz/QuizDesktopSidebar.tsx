'use client';

import React from 'react';
import { Timer, CheckCircle, HelpCircle, Check, Sparkles } from 'lucide-react';

export interface QuizDesktopSidebarProps {
  quizTitle: string;
  moduleBadge: string;
  passingScore: number;
  attemptNumber: number;
  maxAttempts: number;
  durationMinutes: number;
  timerSeconds: number;
  currentIndex: number;
  totalQuestions: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  questionIds: string[];
  onSelectQuestion: (index: number) => void;
  onSubmit: () => void;
  onHelpClick: () => void;
  isSubmitting?: boolean;
}

export const QuizDesktopSidebar: React.FC<QuizDesktopSidebarProps> = ({
  quizTitle,
  moduleBadge,
  passingScore,
  attemptNumber,
  maxAttempts,
  timerSeconds,
  currentIndex,
  totalQuestions,
  answers,
  questionIds,
  onSelectQuestion,
  onSubmit,
  onHelpClick,
  isSubmitting = false,
}) => {
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / (totalQuestions || 1)) * 100);

  // Format timer MM:SS
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = timerSeconds <= 120 && timerSeconds > 0;

  return (
    <aside className="w-full flex flex-col gap-5">
      {/* ── 1. Timer & Quiz Meta Card ── */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#CAC3D8]/40 flex flex-col gap-4">
        {/* Module Badge & Title */}
        <div className="border-b border-[#CAC3D8]/30 pb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-pulse" />
            <span className="text-[11px] font-bold text-[#7F54F8] uppercase tracking-wider">
              {moduleBadge}
            </span>
          </div>
          <h2 className="text-sm font-extrabold text-[#061B38] line-clamp-2 leading-snug">
            {quizTitle}
          </h2>
        </div>

        {/* Live Timer Countdown Block */}
        <div
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
            isTimeCritical
              ? 'bg-[#FFDAD6] border-[#BA1A1A]/40 text-[#93000A] animate-pulse'
              : 'bg-[#F0F3FF] border-[#CAC3D8]/40 text-[#061B38]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isTimeCritical ? 'bg-[#BA1A1A] text-white' : 'bg-[#7F54F8] text-white'
              }`}
            >
              <Timer className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7486]">
                Sisa Waktu
              </span>
              <span className="text-xl font-mono font-black tracking-tight">{timeFormatted}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onHelpClick}
            aria-label="Petunjuk Kuis"
            className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-[#7A7486] hover:text-[#7F54F8] flex items-center justify-center border border-[#CAC3D8]/30 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Meta Stats: Passing Grade & Attempts */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-[#F9F9FF] p-2.5 rounded-xl border border-[#CAC3D8]/30 flex flex-col">
            <span className="text-[10px] font-semibold text-[#7A7486]">Passing Grade</span>
            <span className="font-extrabold text-[#00685F] mt-0.5">{passingScore}%</span>
          </div>
          <div className="bg-[#F9F9FF] p-2.5 rounded-xl border border-[#CAC3D8]/30 flex flex-col">
            <span className="text-[10px] font-semibold text-[#7A7486]">Percobaan</span>
            <span className="font-extrabold text-[#7F54F8] mt-0.5">
              {attemptNumber} / {maxAttempts}
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Question Navigation Matrix Grid Card ── */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#CAC3D8]/40 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#CAC3D8]/30 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7F54F8]" />
            <h3 className="text-xs font-extrabold text-[#061B38] uppercase tracking-wider">
              Navigasi Soal
            </h3>
          </div>
          <span className="text-xs font-bold text-[#7F54F8] bg-[#F0F3FF] px-2.5 py-0.5 rounded-full border border-[#CAC3D8]/30">
            {answeredCount} / {totalQuestions} Terjawab
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-2 rounded-full bg-[#F0F3FF] overflow-hidden p-0.5 border border-[#CAC3D8]/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7F54F8] to-[#3A4BD4] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#7A7486]">
            <span>Progres Sesi</span>
            <span className="font-bold text-[#061B38]">{progressPercent}%</span>
          </div>
        </div>

        {/* Question Numbers Grid (5 columns) */}
        <div className="grid grid-cols-5 gap-2 my-1">
          {questionIds.map((qId, idx) => {
            const isAnswered = Boolean(answers[qId]);
            const isCurrent = idx === currentIndex;

            let buttonClass = 'bg-[#F0F3FF] text-[#494455] border-[#CAC3D8]/40 hover:bg-[#E7EEFF]';

            if (isCurrent) {
              buttonClass =
                'bg-[#7F54F8] text-white border-[#7F54F8] font-black shadow-md shadow-[#7F54F8]/30 ring-2 ring-[#7F54F8]/30 scale-105';
            } else if (isAnswered) {
              buttonClass =
                'bg-[#E8DEFF] text-[#5010C8] border-[#7F54F8]/40 font-bold hover:bg-[#DFE8FF]';
            }

            return (
              <button
                key={qId}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                disabled={isSubmitting}
                className={`h-11 rounded-xl flex items-center justify-center text-xs font-bold border transition-all active:scale-95 relative group ${buttonClass}`}
              >
                <span>{idx + 1}</span>
                {isAnswered && !isCurrent && (
                  <Check className="w-2.5 h-2.5 absolute top-1 right-1 text-[#5010C8]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Status Legend */}
        <div className="pt-2 border-t border-[#CAC3D8]/20 flex items-center justify-between text-[11px] text-[#7A7486]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7F54F8] inline-block" /> Aktif
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8DEFF] border border-[#7F54F8]/40 inline-block" />{' '}
            Terisi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0F3FF] border border-[#CAC3D8]/40 inline-block" />{' '}
            Belum
          </span>
        </div>

        {/* Submit Quiz CTA Button in Sidebar */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              answeredCount === totalQuestions
                ? 'bg-gradient-to-r from-[#00685F] to-[#008378] hover:from-[#005049] hover:to-[#00685F] shadow-[#008378]/25'
                : 'bg-gradient-to-r from-[#7F54F8] to-[#6636DE] hover:from-[#6636DE] hover:to-[#5010C8] shadow-[#7F54F8]/25'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-[#89F5E7]" />
            <span>{isSubmitting ? 'Mengumpulkan...' : 'Kumpulkan & Selesaikan'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default QuizDesktopSidebar;
