'use client';

import React from 'react';
import { ArrowLeft, Clock, RefreshCw, CheckCircle2, HelpCircle, X, User } from 'lucide-react';

export interface QuizHeaderProps {
  quizTitle: string;
  moduleBadge: string;
  passingScore: number;
  attemptNumber: number;
  maxAttempts: number;
  durationMinutes: number;
  currentIndex: number;
  totalQuestions: number;
  timerSeconds: number;
  onExitClick: () => void;
  onHelpClick?: () => void;
  isSubmitting?: boolean;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  quizTitle,
  moduleBadge,
  passingScore,
  attemptNumber,
  maxAttempts,
  currentIndex,
  totalQuestions,
  timerSeconds,
  onExitClick,
  onHelpClick,
}) => {
  // Format remaining seconds into MM:SS
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, secs);
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isTimeCritical = timerSeconds <= 120; // Last 2 minutes
  const progressPercent =
    totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  return (
    <header className="w-full">
      {/* Top Floating Glass Nav Bar */}
      <div className="sticky top-0 z-40 w-full bg-[#F9F9FF]/85 backdrop-blur-xl border-b border-[#CAC3D8]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Back Action & Breadcrumb Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onExitClick}
              aria-label="Kembali"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#061B38] hover:bg-[#E7EEFF] active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-[#061B38]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#7A7486] uppercase tracking-wider">
                Interactive Assessment
              </span>
              <h1 className="font-bold text-sm sm:text-base text-[#061B38] truncate max-w-[220px] sm:max-w-md lg:max-w-xl">
                {quizTitle}
              </h1>
            </div>
          </div>

          {/* Right Header Helpers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onHelpClick && (
              <button
                type="button"
                onClick={onHelpClick}
                aria-label="Petunjuk Kuis"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[#494455] hover:text-[#061B38] hover:bg-[#E7EEFF] transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={onExitClick}
              className="h-9 px-3.5 rounded-full bg-[#E7EEFF] hover:bg-[#DFE8FF] text-[#061B38] flex items-center justify-center gap-1.5 transition-all active:scale-95 text-xs font-bold"
            >
              <X className="w-4 h-4" />
              <span>Keluar</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#7F54F8] flex items-center justify-center shrink-0 shadow-sm text-white">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Mobile Context Bar & Metric Pills (Hidden on Desktop because Desktop Sidebar shows them) */}
      <div className="lg:hidden max-w-4xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-col min-w-0 pr-3">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6636DE] truncate">
                {moduleBadge}
              </span>
            </div>
            <h2 className="font-bold text-base sm:text-lg text-[#061B38] truncate">
              {quizTitle}
            </h2>
          </div>
        </div>

        {/* Quiz Meta & Metric Pills (Mobile) */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-xs border border-[#CAC3D8]/30 mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
            {/* Passing Grade Pill (Soft Lavender) */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEFF] text-[#20005F] shrink-0 border border-[#7F54F8]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6636DE]" />
              <span className="text-xs font-bold">Passing: {passingScore}%</span>
            </div>

            {/* Attempt Pill (Soft Blue/Neutral) */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFE8FF] text-[#000A63] shrink-0 border border-[#CAC3D8]/30">
              <RefreshCw className="w-3.5 h-3.5 text-[#3A4BD4]" />
              <span className="text-xs font-semibold">
                Percobaan {attemptNumber}/{maxAttempts}
              </span>
            </div>

            {/* Timer Pill (Interactive Dynamic Clock) */}
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full shrink-0 font-bold text-xs transition-colors shadow-xs ${
                isTimeCritical
                  ? 'bg-[#FFDAD6] text-[#93000A] border border-[#BA1A1A]/40 animate-pulse'
                  : 'bg-[#E7EEFF] text-[#6636DE] border border-[#7F54F8]/20'
              }`}
            >
              <Clock
                className={`w-3.5 h-3.5 ${
                  isTimeCritical ? 'text-[#BA1A1A] animate-spin' : 'text-[#7F54F8]'
                }`}
                style={!isTimeCritical ? { animationDuration: '9s' } : undefined}
              />
              <span className="tracking-tight font-mono text-sm">{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Stepper & Micro Progress */}
          <div className="pt-1">
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="text-[#494455] font-medium">Progres Kuis</span>
              <span className="text-[#6636DE] font-bold">
                Pertanyaan {currentIndex + 1} dari {totalQuestions}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E7EEFF] overflow-hidden p-0.5 border border-[#CAC3D8]/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6636DE] to-[#7F54F8] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default QuizHeader;
