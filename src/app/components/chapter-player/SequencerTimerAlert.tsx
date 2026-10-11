'use client';

import React from 'react';
import { Timer, CheckCircle, Sparkles } from 'lucide-react';
import { useChapterTimerStore } from '@/stores/useChapterTimerStore';

export function SequencerTimerAlert() {
  const { remainingSeconds, requiredSeconds, isCompleted, isPlaying } = useChapterTimerStore();

  const progressPercent = isCompleted || remainingSeconds === 0
    ? 100
    : Math.max(0, Math.min(100, Math.round(((requiredSeconds - remainingSeconds) / requiredSeconds) * 100)));

  const isFinished = isCompleted || remainingSeconds === 0;

  return (
    <div className="w-full my-3">
      <div
        className={`p-4 rounded-2xl border transition-all duration-300 ${
          isFinished
            ? 'bg-[#89F5E7]/15 border-[#00685F]/30 shadow-sm'
            : 'bg-[#DFE8FF]/60 border-[#CAC3D8]/50 shadow-sm'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Icon Box */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
              isFinished
                ? 'bg-[#00685F] text-white'
                : 'bg-white text-[#7F54F8]'
            }`}
          >
            {isFinished ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <Timer className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-[#7F54F8]' : ''}`} />
            )}
          </div>

          {/* Texts & Badge */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base text-[#061B38]">
                Waktu Tonton Wajib
              </span>

              {/* Live countdown badge */}
              {isFinished ? (
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#00685F]/15 border border-[#00685F]/30 text-[#00685F] font-bold text-xs tracking-wide animate-in fade-in">
                  <Sparkles className="w-3.5 h-3.5 text-[#00685F]" />
                  Persyaratan Selesai ✨
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#E8DEFF] text-[#5010C8] font-bold text-xs" id="countdownText">
                  Tersisa {remainingSeconds} dtk
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#494455] mt-1 leading-relaxed">
              {isFinished
                ? 'Persyaratan waktu tonton minimal telah selesai! Kamu sekarang dapat menandai bab ini tuntas dan melanjutkan belajar.'
                : `Selesaikan pemutaran materi video minimal ${remainingSeconds} detik lagi agar tombol verifikasi bab terbuka otomatis.`}
            </p>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-[#E7EEFF] rounded-full h-2.5 overflow-hidden mt-3.5">
          <div
            id="sequencerProgress"
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isFinished ? 'bg-[#00685F]' : 'bg-[#7F54F8]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
