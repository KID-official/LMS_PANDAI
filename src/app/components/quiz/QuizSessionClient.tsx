'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ClientQuizDataPayload, submitQuizAction } from '@/actions/quizActions';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { QuizDrawerNav } from './QuizDrawerNav';
import { QuizFooterBar } from './QuizFooterBar';
import { QuizConfirmModal, QuizConfirmModalMode } from './QuizConfirmModal';
import { QuizDesktopSidebar } from './QuizDesktopSidebar';
import { AlertCircle, HelpCircle, X, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export interface QuizSessionClientProps {
  quizData: ClientQuizDataPayload;
  courseKey: string;
  quizKey: string;
}

export const QuizSessionClient: React.FC<QuizSessionClientProps> = ({
  quizData,
  courseKey,
  quizKey,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [timerSeconds, setTimerSeconds] = useState(quizData.durationMinutes * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalMode, setModalMode] = useState<QuizConfirmModalMode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const totalQuestions = quizData.questions.length;
  const currentQuestion = quizData.questions[currentIndex];
  const questionIds = quizData.questions.map((q) => q.id);
  const answeredCount = Object.keys(answers).length;

  // Local storage restoration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`quiz_answers_${quizKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) {
          setAnswers(parsed);
        }
      }
    } catch {
      // LocalStorage unavailable
    }
  }, [quizKey]);

  // Sync answers with LocalStorage
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: key,
    };
    setAnswers(nextAnswers);
    try {
      localStorage.setItem(`quiz_answers_${quizKey}`, JSON.stringify(nextAnswers));
    } catch {
      // Ignore storage errors
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          // Trigger timeout modal
          setModalMode('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  // Submit Handler
  const handlePerformSubmit = () => {
    if (isPending) return;

    startTransition(async () => {
      try {
        setErrorMessage(null);
        const timeSpent = quizData.durationMinutes * 60 - timerSeconds;

        const result = await submitQuizAction({
          courseKey,
          quizKey,
          answers,
          timeSpentSeconds: Math.max(timeSpent, 10),
        });

        if (result.success) {
          // Clear localStorage cache
          try {
            localStorage.removeItem(`quiz_answers_${quizKey}`);
          } catch {}

          // Redirect to result screen
          router.push(`/student/courses/${courseKey}/quiz/${quizKey}/result`);
        } else {
          setErrorMessage(result.error || 'Gagal mengirimkan lembar kuis.');
          setModalMode(null);
        }
      } catch (err) {
        console.error('Submit error:', err);
        setErrorMessage('Terjadi kesalahan jaringan saat mengumpulkan kuis.');
        setModalMode(null);
      }
    });
  };

  // Confirm Exit Handler
  const handleConfirmExit = () => {
    try {
      localStorage.removeItem(`quiz_answers_${quizKey}`);
    } catch {}
    router.push(`/student/courses/${courseKey}`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#061B38] flex flex-col justify-between">
      {/* Quiz Top Header */}
      <QuizHeader
        quizTitle={quizData.title}
        moduleBadge={quizData.moduleBadge}
        passingScore={quizData.passingScore}
        attemptNumber={quizData.attemptNumber}
        maxAttempts={quizData.maxAttempts}
        durationMinutes={quizData.durationMinutes}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        timerSeconds={timerSeconds}
        onExitClick={() => setModalMode('exit')}
        onHelpClick={() => setShowHelpModal(true)}
        isSubmitting={isPending}
      />

      {/* Main Question Body Container (Responsive 12-col Desktop Grid) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-36 lg:pb-16">
        {/* Error Alert Banner if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FFDAD6] border border-[#BA1A1A]/30 text-[#93000A] flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="block font-bold">Terjadi Kendala:</strong>
              {errorMessage}
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="ml-auto text-[#93000A] hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (lg:col-span-8): Question Card & Desktop Nav */}
          <section className="lg:col-span-8 flex flex-col gap-6 w-full">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                selectedOption={answers[currentQuestion.id]}
                onSelectOption={handleSelectOption}
                disabled={isPending}
              />
            )}

            {/* Desktop-only Inline Navigation Footer */}
            <div className="hidden lg:flex items-center justify-between p-4 bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-xs">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0 || isPending}
                className="h-11 px-5 rounded-xl bg-[#E7EEFF] hover:bg-[#DFE8FF] text-[#061B38] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border border-[#CAC3D8]/30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              <span className="text-xs font-bold text-[#7A7486]">
                Soal <strong className="text-[#061B38]">{currentIndex + 1}</strong> dari{' '}
                <strong className="text-[#061B38]">{totalQuestions}</strong>
              </span>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={isPending}
                  className="h-11 px-6 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#7F54F8]/25 transition-all active:scale-95"
                >
                  <span>Soal Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setModalMode('submit')}
                  disabled={isPending}
                  className="h-11 px-6 rounded-xl bg-[#008378] hover:bg-[#00685F] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#008378]/25 transition-all active:scale-95"
                >
                  <CheckCircle className="w-4 h-4 text-[#89F5E7]" />
                  <span>Kumpulkan Jawaban</span>
                </button>
              )}
            </div>
          </section>

          {/* Right Column (lg:col-span-4): Sticky Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <QuizDesktopSidebar
              quizTitle={quizData.title}
              moduleBadge={quizData.moduleBadge}
              passingScore={quizData.passingScore}
              attemptNumber={quizData.attemptNumber}
              maxAttempts={quizData.maxAttempts}
              durationMinutes={quizData.durationMinutes}
              timerSeconds={timerSeconds}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              answers={answers}
              questionIds={questionIds}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
              onSubmit={() => setModalMode('submit')}
              onHelpClick={() => setShowHelpModal(true)}
              isSubmitting={isPending}
            />
          </div>
        </div>
      </main>

      {/* Drawer Overlay for Mobile Question Navigation Grid */}
      <div className="lg:hidden">
        <QuizDrawerNav
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          answers={answers}
          questionIds={questionIds}
          onSelectQuestion={(idx) => setCurrentIndex(idx)}
        />
      </div>

      {/* Floating Bottom Action Bar (Mobile Only: lg:hidden) */}
      <div className="lg:hidden">
        <QuizFooterBar
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
          onSubmit={() => setModalMode('submit')}
          onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
          isDrawerOpen={isDrawerOpen}
          isSubmitting={isPending}
        />
      </div>

      {/* Confirmation & Timeout Modal */}
      <QuizConfirmModal
        isOpen={modalMode !== null}
        mode={modalMode || 'submit'}
        onClose={() => setModalMode(null)}
        onConfirm={modalMode === 'exit' ? handleConfirmExit : handlePerformSubmit}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        isSubmitting={isPending}
      />

      {/* Assessment Instruction Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#CAC3D8]/30 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#494455] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-[#6636DE]">
              <HelpCircle className="w-5 h-5 text-[#7F54F8]" />
              <h3 className="font-bold text-base text-[#061B38]">Petunjuk Sesi Kuis</h3>
            </div>

            <div className="space-y-2.5 text-xs text-[#494455] leading-relaxed mb-5">
              <p>
                1. <strong>Passing Grade:</strong> Anda harus mencapai nilai minimal{' '}
                <strong>{quizData.passingScore}%</strong> untuk lulus dan membuka bab selanjutnya.
              </p>
              <p>
                2. <strong>Batas Percobaan:</strong> Anda memiliki maksimal{' '}
                <strong>{quizData.maxAttempts} kali percobaan</strong> untuk kuis ini.
              </p>
              <p>
                3. <strong>Durasi Ujian:</strong> Waktu pengerjaan adalah{' '}
                <strong>{quizData.durationMinutes} menit</strong>. Sistem akan otomatis mengumpulkan
                jawaban saat waktu habis.
              </p>
              <p>
                4. <strong>Pintasan Soal:</strong> Gunakan tombol kisi-kisi di menu bawah untuk melompat
                ke nomor soal tertentu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs"
            >
              Mengerti & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSessionClient;
