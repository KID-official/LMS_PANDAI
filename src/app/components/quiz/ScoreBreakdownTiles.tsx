'use client';

import React from 'react';
import { CheckCircle2, Clock, RotateCcw } from 'lucide-react';

export interface ScoreBreakdownTilesProps {
  correctCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  timeSpentFormatted: string;
  timeLimitFormatted: string;
  attemptNumber: number;
  maxAttempts: number;
  remainingAttempts: number;
}

export const ScoreBreakdownTiles: React.FC<ScoreBreakdownTilesProps> = ({
  correctCount,
  totalQuestions,
  accuracyPercentage,
  timeSpentFormatted,
  timeLimitFormatted,
  attemptNumber,
  maxAttempts,
  remainingAttempts,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
      {/* Stat 1: Benar & Akurasi */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-[#CAC3D8]/30 flex flex-col items-center text-center transition-all hover:shadow-sm">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D1FAE5] text-[#00685F] flex items-center justify-center mb-1.5 sm:mb-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00685F]" />
        </div>
        <span className="text-[11px] sm:text-xs text-[#494455] font-medium mb-0.5">
          Benar
        </span>
        <span className="text-sm sm:text-base font-bold text-[#0D9488] tracking-tight">
          {correctCount} dari {totalQuestions}
        </span>
        <span className="text-[10px] sm:text-[11px] text-[#7A7486] mt-0.5">
          Akurasi {accuracyPercentage}%
        </span>
      </div>

      {/* Stat 2: Waktu Pengerjaan */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-[#CAC3D8]/30 flex flex-col items-center text-center transition-all hover:shadow-sm">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E8DEFF] text-[#7F54F8] flex items-center justify-center mb-1.5 sm:mb-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#7F54F8]" />
        </div>
        <span className="text-[11px] sm:text-xs text-[#494455] font-medium mb-0.5">
          Waktu
        </span>
        <span className="text-sm sm:text-base font-bold text-[#7F54F8] tracking-tight">
          {timeSpentFormatted}
        </span>
        <span className="text-[10px] sm:text-[11px] text-[#7A7486] mt-0.5">
          {timeLimitFormatted}
        </span>
      </div>

      {/* Stat 3: Percobaan Attempt */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-[#CAC3D8]/30 flex flex-col items-center text-center transition-all hover:shadow-sm">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E7EEFF] text-[#494455] flex items-center justify-center mb-1.5 sm:mb-2">
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-[#494455]" />
        </div>
        <span className="text-[11px] sm:text-xs text-[#494455] font-medium mb-0.5">
          Percobaan
        </span>
        <span className="text-sm sm:text-base font-bold text-[#061B38] tracking-tight">
          {attemptNumber} dari {maxAttempts}
        </span>
        <span className="text-[10px] sm:text-[11px] text-[#7A7486] mt-0.5">
          Sisa {remainingAttempts}x
        </span>
      </div>
    </div>
  );
};

export default ScoreBreakdownTiles;
