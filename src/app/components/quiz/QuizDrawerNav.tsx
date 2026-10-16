'use client';

import React, { useEffect } from 'react';
import { X, LayoutGrid } from 'lucide-react';

export interface QuizDrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  questionIds: string[];
  onSelectQuestion: (index: number) => void;
}

export const QuizDrawerNav: React.FC<QuizDrawerNavProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  currentIndex,
  answers,
  questionIds,
  onSelectQuestion,
}) => {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate count of answered questions
  const answeredCount = questionIds.filter((id) => !!answers[id]).length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Overlay Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pintasan Nomor Soal"
        className="relative z-50 w-full max-w-sm sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#CAC3D8]/40 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-1 border-b border-[#CAC3D8]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8DEFF] text-[#6636DE] flex items-center justify-center">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#061B38]">Pintasan Soal</h3>
              <p className="text-[11px] text-[#6636DE] font-semibold">
                {answeredCount}/{totalQuestions} Soal Terjawab
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Pintasan"
            className="w-8 h-8 rounded-full bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#494455] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Number Grid (5 columns) */}
        <div className="grid grid-cols-5 gap-2.5 py-1">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const qId = questionIds[idx];
            const isAnswered = !!answers[qId];
            const isActive = idx === currentIndex;

            let buttonStyle = '';
            if (isActive) {
              buttonStyle =
                'bg-[#7F54F8] text-white font-bold shadow-md shadow-[#7F54F8]/30 ring-2 ring-[#5010C8] scale-102';
            } else if (isAnswered) {
              buttonStyle =
                'bg-[#DFE8FF] text-[#000A63] font-semibold border border-[#CAC3D8]/50 hover:bg-[#D6E3FF]';
            } else {
              buttonStyle =
                'bg-[#F0F3FF] text-[#7A7486] font-medium border border-dashed border-[#CAC3D8] hover:bg-[#E7EEFF]';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectQuestion(idx);
                  onClose();
                }}
                className={`h-11 rounded-xl flex items-center justify-center text-sm active:scale-95 transition-all ${buttonStyle}`}
              >
                <span>{idx + 1}</span>
                {isActive && <span className="text-xs ml-0.5">*</span>}
              </button>
            );
          })}
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center justify-between pt-2 border-t border-[#CAC3D8]/20 text-[11px] text-[#494455] font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7F54F8] inline-block shadow-xs" />
            <span>Aktif</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DFE8FF] border border-[#CAC3D8]/60 inline-block" />
            <span>Terisi</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0F3FF] border border-dashed border-[#CAC3D8] inline-block" />
            <span>Belum</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizDrawerNav;
