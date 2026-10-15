'use client';

import { ArrowLeft, ArrowRight, LayoutGrid, CheckCircle } from 'lucide-react';

export interface QuizFooterBarProps {
  currentIndex: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onToggleDrawer: () => void;
  isDrawerOpen?: boolean;
  isSubmitting?: boolean;
}

export const QuizFooterBar: React.FC<QuizFooterBarProps> = ({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
  onToggleDrawer,
  isSubmitting = false,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <footer className="fixed bottom-0 inset-x-0 max-w-2xl mx-auto z-30 p-3 sm:p-4 bg-[#F9F9FF]/95 backdrop-blur-md border-t border-[#CAC3D8]/30 sm:rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-xs border border-[#CAC3D8]/30 flex flex-col gap-2">
        {/* Actions Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst || isSubmitting}
            className={`h-11 px-3 sm:px-4 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              isFirst || isSubmitting
                ? 'bg-[#F0F3FF] text-[#CAC3D8] cursor-not-allowed border border-[#CAC3D8]/20'
                : 'bg-[#E7EEFF] hover:bg-[#DFE8FF] text-[#061B38] active:scale-95 border border-[#CAC3D8]/30'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Sebelumnya</span>
          </button>

          {/* Question Grid Drawer Launcher */}
          <button
            type="button"
            onClick={onToggleDrawer}
            aria-label="Buka kisi-kisi nomor soal"
            disabled={isSubmitting}
            className="h-11 px-3 sm:px-3.5 rounded-xl bg-[#F0F3FF] hover:bg-[#E8DEFF] text-[#494455] hover:text-[#6636DE] active:scale-95 transition-all flex items-center gap-1.5 border border-[#CAC3D8]/30 shadow-2xs shrink-0"
          >
            <LayoutGrid className="w-4 h-4 text-[#7F54F8]" />
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span className="font-bold text-[#6636DE]">{currentIndex + 1}</span>
              <span className="text-[#7A7486]">/{totalQuestions}</span>
            </div>
          </button>

          {/* Next Question OR Submit Button */}
          {!isLast ? (
            <button
              type="button"
              onClick={onNext}
              disabled={isSubmitting}
              className="h-11 px-4 sm:px-5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white active:scale-95 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold shadow-md shadow-[#7F54F8]/25 ml-auto"
            >
              <span>Soal Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`h-11 px-4 sm:px-5 rounded-xl text-white active:scale-95 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-bold shadow-md shadow-[#008378]/25 ml-auto ${
                isSubmitting ? 'bg-[#008378]/70 cursor-wait' : 'bg-[#008378] hover:bg-[#00685F]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Mengumpulkan...' : 'Kumpulkan Jawaban'}</span>
            </button>
          )}
        </div>

        {/* Sync Status Subtext */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5 text-[#7A7486]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#008378] animate-pulse" />
          <p className="text-[11px] text-center font-medium">
            Jawaban tersimpan otomatis di perangkat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default QuizFooterBar;
