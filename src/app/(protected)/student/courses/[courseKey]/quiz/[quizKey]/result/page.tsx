import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ArrowLeft, HelpCircle, Sparkles, Award } from 'lucide-react';
import { getQuizResultDetailsAction } from '@/actions/quizActions';
import {
  QuizResultHeader,
  ScoreBreakdownTiles,
  UnlockedModuleBanner,
  QuestionReviewList,
  ResultActionButtons,
} from '@/app/components/quiz';

interface QuizResultPageProps {
  params: {
    courseKey: string;
    quizKey: string;
  };
}

export async function generateMetadata({ params }: QuizResultPageProps) {
  return {
    title: `Hasil Evaluasi Kuis • ${params.quizKey} | LMS-KID`,
    description: 'Rincian evaluasi hasil pengerjaan kuis siswa, skor kelulusan, dan pembahasan kurikulum AI.',
  };
}

export default async function QuizResultPage({ params }: QuizResultPageProps) {
  const { courseKey, quizKey } = params;

  // 1. Validasi Autentikasi Siswa
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect(`/login?callbackUrl=/student/courses/${courseKey}/quiz/${quizKey}/result`);
  }

  // 2. Query Detail Hasil Evaluasi Kuis
  const resultResponse = await getQuizResultDetailsAction(courseKey, quizKey);

  // Jika belum ada data pengerjaan atau terjadi error
  if (!resultResponse.success || !resultResponse.data) {
    return (
      <div className="min-h-screen bg-[#F9F9FF] text-[#061B38] flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 text-center border border-[#CAC3D8]/30 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mx-auto">
            <HelpCircle className="w-7 h-7" />
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-[#061B38]">
            Hasil Evaluasi Belum Tersedia
          </h1>

          <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
            {resultResponse.error ||
              'Belum ditemukan data rekaman pengerjaan untuk kuis ini. Silakan mulai kerjakan kuis terlebih dahulu.'}
          </p>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href={`/student/courses/${courseKey}/quiz/${quizKey}`}
              className="w-full py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              Mulai Kerjakan Kuis Sekarang
            </Link>

            <Link
              href={`/student/courses/${courseKey}`}
              className="w-full py-2.5 text-center text-xs sm:text-sm text-[#7A7486] hover:text-[#061B38] font-medium"
            >
              Kembali ke Silabus Kursus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const result = resultResponse.data;

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#061B38] antialiased flex flex-col">
      {/* ── Fixed Top Utility Header (Stitch UI-07) ────────────────────────── */}
      <header className="fixed top-0 w-full z-40 bg-[#F9F9FF]/85 backdrop-blur-xl border-b border-[#CAC3D8]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-3xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Back Action & Title */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={`/student/courses/${courseKey}`}
              aria-label="Kembali ke Silabus Kursus"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#061B38] hover:bg-[#E7EEFF] active:scale-95 transition-all shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-[#061B38]" />
            </Link>

            <div className="min-w-0 flex flex-col">
              <span className="text-[10px] text-[#7A7486] font-semibold uppercase tracking-wider truncate">
                {result.courseTitle}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-[#061B38] truncate">
                Hasil Evaluasi Kuis
              </h1>
            </div>
          </div>

          {/* Right Header Controls: Info & Avatar */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/student/profile"
              aria-label="Profil Siswa"
              className="w-8 h-8 rounded-full bg-[#7F54F8] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
            >
              {result.studentName.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ──────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 pt-20 pb-12 sm:pt-22 sm:pb-16 space-y-4 sm:space-y-5">
        {/* 1. Header Rekapitulasi & Perayaan Nilai */}
        <QuizResultHeader
          studentName={result.studentName}
          score={result.score}
          passingScore={result.passingScore}
          isPassed={result.isPassed}
          attemptNumber={result.attemptNumber}
          quizTitle={result.quizTitle}
        />

        {/* 2. Grid 3 Ubin Metrik Performa (Benar, Waktu, Percobaan) */}
        <ScoreBreakdownTiles
          correctCount={result.correctCount}
          totalQuestions={result.totalQuestions}
          accuracyPercentage={result.accuracyPercentage}
          timeSpentFormatted={result.timeSpentFormatted}
          timeLimitFormatted={result.timeLimitFormatted}
          attemptNumber={result.attemptNumber}
          maxAttempts={result.maxAttempts}
          remainingAttempts={result.remainingAttempts}
        />

        {/* 3. Banner Delight Gradien Modul Terbuka / Kursus Tuntas */}
        <UnlockedModuleBanner
          unlockedModule={result.unlockedModule}
          isCourseCompleted={result.isCourseCompleted}
          isPassed={result.isPassed}
          courseTitle={result.courseTitle}
        />

        {/* 4. Daftar Rincian Evaluasi Butir Soal (Jawaban vs Kunci & Pembahasan) */}
        <QuestionReviewList questions={result.questionReviews} />

        {/* 5. Visual Delight: Lencana Literasi AI Portofolio Preview */}
        {result.isPassed && (
          <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-[#CAC3D8]/30 flex items-center gap-3.5 transition-all hover:shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr from-[#7F54F8] to-[#5566EE] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#061B38] truncate">
                  Lencana Pencapaian Kuis AI
                </span>
                <Sparkles className="w-4 h-4 text-[#7F54F8] shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-[#494455] mt-0.5 leading-snug">
                Pencapaian evaluasi ini tersimpan otomatis dalam portofolio belajar dan rekap sertifikasimu.
              </p>
            </div>
          </div>
        )}

        {/* 6. Action CTA Navigation Buttons */}
        <ResultActionButtons
          courseKey={result.courseKey}
          quizKey={result.quizKey}
          currentChapterKey={result.currentChapterKey}
          currentChapterNumber={result.currentChapterNumber}
          unlockedModule={result.unlockedModule}
          isCourseCompleted={result.isCourseCompleted}
          isPassed={result.isPassed}
          attemptNumber={result.attemptNumber}
          maxAttempts={result.maxAttempts}
          remainingAttempts={result.remainingAttempts}
        />
      </main>
    </div>
  );
}
