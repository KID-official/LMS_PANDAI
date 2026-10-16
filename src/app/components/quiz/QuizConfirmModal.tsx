'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, X } from 'lucide-react';

export type QuizConfirmModalMode = 'submit' | 'exit' | 'timeout';

export interface QuizConfirmModalProps {
  isOpen: boolean;
  mode: QuizConfirmModalMode;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalQuestions: number;
  isSubmitting?: boolean;
}

export const QuizConfirmModal: React.FC<QuizConfirmModalProps> = ({
  isOpen,
  mode,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  const hasUnanswered = answeredCount < totalQuestions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isSubmitting && mode !== 'timeout') {
            onClose();
          }
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-50 w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#CAC3D8]/30 flex flex-col gap-5 animate-in zoom-in-95 duration-200"
      >
        {/* Top Dismiss Button (disabled during submitting or timeout) */}
        {mode !== 'timeout' && (
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Tutup Dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#494455] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* 1. Mode SUBMIT */}
        {mode === 'submit' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#E8DEFF] text-[#6636DE] flex items-center justify-center mb-4 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-[#7F54F8]" />
            </div>

            <h3 className="text-lg font-bold text-[#061B38] mb-2">
              Kumpulkan Lembar Jawaban?
            </h3>

            {hasUnanswered ? (
              <div className="w-full bg-[#FFDAD6]/60 border border-[#BA1A1A]/20 rounded-2xl p-3.5 mb-4 text-left flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#BA1A1A] shrink-0 mt-0.5" />
                <div className="text-xs text-[#93000A] leading-relaxed">
                  <span className="font-bold block mb-0.5">Pertanyaan Belum Lengkap</span>
                  Kamu baru menjawab <strong className="font-bold">{answeredCount}</strong> dari{' '}
                  <strong className="font-bold">{totalQuestions}</strong> pertanyaan. Soal yang belum
                  diisi akan bernilai 0 poin.
                </div>
              </div>
            ) : (
              <div className="w-full bg-[#E7EEFF]/60 border border-[#3A4BD4]/20 rounded-2xl p-3.5 mb-4 text-left flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00685F] shrink-0 mt-0.5" />
                <div className="text-xs text-[#061B38] leading-relaxed">
                  <span className="font-bold block mb-0.5 text-[#00685F]">Semua Soal Terisi!</span>
                  Kamu telah melengkapi seluruh {totalQuestions} pertanyaan kuis. Jawaban kamu akan
                  langsung dikoreksi oleh sistem auto-grading.
                </div>
              </div>
            )}

            <p className="text-xs text-[#494455] leading-relaxed mb-4">
              Pastikan kamu telah memeriksa seluruh pilihan sebelum menyelesaikan sesi ujian ini.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] font-bold text-xs sm:text-sm transition-colors border border-[#CAC3D8]/30"
              >
                Periksa Lagi
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className="py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#7F54F8]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Menilai...</span>
                ) : (
                  <span>Ya, Kumpulkan</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* 2. Mode EXIT */}
        {mode === 'exit' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center mb-4 shadow-xs">
              <AlertTriangle className="w-8 h-8 text-[#BA1A1A]" />
            </div>

            <h3 className="text-lg font-bold text-[#061B38] mb-2">
              Keluar dari Sesi Kuis?
            </h3>

            <p className="text-xs sm:text-sm text-[#494455] leading-relaxed mb-5">
              Peringatan: Lembar kuis kamu belum dikumpulkan. Jika keluar sekarang, jawaban yang
              telah dipilih tidak akan dinilai dan progres sesi ini akan hilang.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#7F54F8]/25 transition-all active:scale-95"
              >
                Lanjutkan Kuis
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="py-3 px-4 rounded-xl bg-[#FFDAD6] hover:bg-[#FFDAD6]/80 text-[#93000A] font-bold text-xs sm:text-sm transition-colors"
              >
                Keluar Sekarang
              </button>
            </div>
          </div>
        )}

        {/* 3. Mode TIMEOUT */}
        {mode === 'timeout' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center mb-4 shadow-xs animate-bounce">
              <Clock className="w-8 h-8 text-[#BA1A1A]" />
            </div>

            <h3 className="text-lg font-bold text-[#061B38] mb-2">
              Waktu Pengerjaan Habis!
            </h3>

            <p className="text-xs sm:text-sm text-[#494455] leading-relaxed mb-5">
              Durasi 15 menit telah berakhir. Seluruh jawaban yang telah kamu tandai (
              <strong className="font-bold text-[#061B38]">{answeredCount}</strong> dari {totalQuestions} soal)
              akan otomatis dikumpulkan dan dievaluasi.
            </p>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-sm shadow-md shadow-[#7F54F8]/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Mengumpulkan Hasil...</span>
              ) : (
                <span>Kumpulkan & Lihat Hasil</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizConfirmModal;
