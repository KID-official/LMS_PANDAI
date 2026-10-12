'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Clock,
  Printer,
  CheckCircle2,
  XCircle,
  Check,
  AlertCircle,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { QuizAuditDetail, getQuizAuditDetail } from '@/app/actions/progressReport';

interface Props {
  isOpen: boolean;
  userId: string | null;
  quizKey: string | null;
  onClose: () => void;
}

export function QuizAuditDrawer({ isOpen, userId, quizKey, onClose }: Props) {
  const [detail, setDetail] = useState<QuizAuditDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  // Fetch quiz detail when opened
  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      setError(null);
      setIsValidated(false);

      getQuizAuditDetail(userId, quizKey || '')
        .then((data) => {
          if (!data) {
            setError('Data audit snapshot kuis belum tersedia untuk siswa ini.');
          } else {
            setDetail(data);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Gagal memuat rincian snapshot kuis.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setDetail(null);
    }
  }, [isOpen, userId, quizKey]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle manual validation
  const handleValidateManual = () => {
    setIsValidated(true);
    setTimeout(() => {
      alert('Kuis berhasil divalidasi secara manual oleh Guru!');
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ── BACKDROP ── */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── SLIDE-OVER DRAWER PANEL ── */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl bg-[#F8FAFC] shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
          
          {/* ── DRAWER HEADER ── */}
          <div className="bg-white border-b border-[#E2E8F0] p-6 shrink-0">
            <div className="flex items-center justify-between">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#059669] border border-[#A7F3D0]">
                  <Check className="h-3.5 w-3.5" />
                  <span>
                    Attempt {detail?.quizMetadata.attemptNumber || 1} •{' '}
                    {detail?.quizMetadata.isPassed ? 'LULUS' : 'REMEDIAL'}
                  </span>
                </span>
                <span className="inline-flex items-center rounded-lg bg-[#F5F3FF] px-2.5 py-1 text-xs font-bold text-[#7C3AED] border border-[#DDD6FE]">
                  Skor {detail?.quizMetadata.score || 0} / {detail?.quizMetadata.maxScore || 100}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition cursor-pointer"
                aria-label="Tutup snapshot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-3">
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                Rincian Snapshot Kuis:{' '}
                <span className="text-[#7C3AED]">
                  {detail?.student.fullName || 'Memuat...'}
                </span>
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#64748B]">
                <span>NIS: {detail?.student.nis}</span>
                <span>•</span>
                <span>Modul: {detail?.quizMetadata.moduleName || 'Literasi AI Dasar'}</span>
                <span>•</span>
                <span>
                  Selesai {detail?.questions.length || 0} dari {detail?.quizMetadata.totalQuestions || 0} Soal Audit
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>
                  Dikerjakan pada {detail?.quizMetadata.takenAtFormatted || '12 Oktober 2026, 14:20 WIB'} (Durasi:{' '}
                  {detail?.quizMetadata.durationFormatted || '18m 42s'})
                </span>
              </div>
            </div>
          </div>

          {/* ── DRAWER CONTENT (Scrollable) ── */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
                <p className="text-xs font-semibold text-[#64748B]">
                  Menghidrasi snapshot jawaban kuis dari database...
                </p>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-xs text-rose-700">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                <p className="font-semibold">{error}</p>
              </div>
            ) : detail ? (
              <>
                {/* ── PERFORMANCE SUMMARY CARD ── */}
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      Rincian Performa Butir Soal
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-xs font-bold text-[#059669]">
                        {detail.quizMetadata.correctCount} Benar
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#FEF2F2] px-2 py-0.5 text-xs font-bold text-[#DC2626]">
                        {detail.quizMetadata.incorrectCount} Salah
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right space-y-1">
                    <div className="text-[11px] font-semibold text-[#64748B]">
                      Akumulasi Skor Kuis
                    </div>
                    <div className="text-lg font-extrabold text-[#7C3AED]">
                      +{detail.quizMetadata.score} / {detail.quizMetadata.maxScore} Poin
                    </div>
                    {/* Visual gradient bar */}
                    <div className="h-2 w-36 rounded-full bg-[#E2E8F0] overflow-hidden ml-auto">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]"
                        style={{
                          width: `${Math.min(100, (detail.quizMetadata.score / detail.quizMetadata.maxScore) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── QUESTIONS LIST ── */}
                <div className="space-y-4">
                  {detail.questions.map((q) => {
                    return (
                      <div
                        key={q.questionId}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-3"
                      >
                        {/* Question Number & Points Badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            PERTANYAAN NO. {q.questionNumber}
                          </span>
                          {q.isCorrect ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-xs font-bold text-[#059669] border border-[#A7F3D0]">
                              <Check className="h-3 w-3" />
                              <span>Benar (Skor +{q.pointsEarned})</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#FEF2F2] px-2 py-0.5 text-xs font-bold text-[#DC2626] border border-[#FECACA]">
                              <X className="h-3 w-3" />
                              <span>Salah (Skor 0)</span>
                            </span>
                          )}
                        </div>

                        {/* Question Text */}
                        <div className="text-sm font-bold text-[#0F172A] leading-relaxed">
                          {q.questionText}
                        </div>

                        {/* Options */}
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt) => {
                            const isSelected = q.selectedOption === opt.key;
                            const isAnswerKey = q.correctOption === opt.key;

                            // Condition 1: Pilihan siswa dan BENAR
                            if (isSelected && isAnswerKey) {
                              return (
                                <div
                                  key={opt.key}
                                  className="flex items-start justify-between gap-3 rounded-xl border border-[#10B981] bg-[#ECFDF5] p-3 text-xs text-[#065F46] font-medium transition"
                                >
                                  <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                                    <span>
                                      <strong>{opt.key}.</strong> {opt.text}
                                    </span>
                                  </div>
                                  <span className="shrink-0 rounded-md bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-bold text-[#065F46]">
                                    PILIHAN SISWA & KUNCI
                                  </span>
                                </div>
                              );
                            }

                            // Condition 2: Pilihan siswa tetapi SALAH
                            if (isSelected && !isAnswerKey) {
                              return (
                                <div
                                  key={opt.key}
                                  className="flex items-start justify-between gap-3 rounded-xl border border-[#EF4444] bg-[#FEF2F2] p-3 text-xs text-[#991B1B] font-medium transition"
                                >
                                  <div className="flex items-start gap-2">
                                    <XCircle className="h-4 w-4 shrink-0 text-[#EF4444] mt-0.5" />
                                    <span>
                                      <strong>{opt.key}.</strong> {opt.text}
                                    </span>
                                  </div>
                                  <span className="shrink-0 rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[10px] font-bold text-[#991B1B]">
                                    PILIHAN SISWA
                                  </span>
                                </div>
                              );
                            }

                            // Condition 3: Bukan pilihan siswa, tetapi KUNCI BENAR
                            if (!isSelected && isAnswerKey) {
                              return (
                                <div
                                  key={opt.key}
                                  className="flex items-start justify-between gap-3 rounded-xl border border-[#10B981] bg-white p-3 text-xs text-[#0F172A] font-medium transition"
                                >
                                  <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                                    <span>
                                      <strong>{opt.key}.</strong> {opt.text}
                                    </span>
                                  </div>
                                  <span className="shrink-0 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                                    KUNCI BENAR
                                  </span>
                                </div>
                              );
                            }

                            // Condition 4: Opsi lainnya (netral)
                            return (
                              <div
                                key={opt.key}
                                className="flex items-start gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs text-[#475569] transition"
                              >
                                <span>
                                  <strong>{opt.key}.</strong> {opt.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Catatan Evaluasi AI Callout */}
                        {q.explanation && (
                          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#1E40AF]">
                            <HelpCircle className="h-4 w-4 shrink-0 text-[#2563EB] mt-0.5" />
                            <div className="leading-relaxed">
                              <strong>Catatan AI Evaluator:</strong> {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>

          {/* ── DRAWER FOOTER ── */}
          <div className="bg-white border-t border-[#E2E8F0] p-4 shrink-0 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] transition cursor-pointer"
            >
              Tutup Snapshot
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                <Printer className="h-4 w-4 text-[#64748B]" />
                <span>Cetak Log Audit</span>
              </button>

              <button
                onClick={handleValidateManual}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer ${
                  isValidated
                    ? 'bg-[#059669] hover:bg-[#047857]'
                    : 'bg-[#7C3AED] hover:bg-[#6D28D9]'
                }`}
              >
                <Check className="h-4 w-4" />
                <span>{isValidated ? 'Terverifikasi' : 'Validasi Manual'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
