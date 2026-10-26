import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getQuizDataAction } from '@/actions/quizActions';
import { getStaticQuiz } from '@/constants/quizzes';
import QuizSessionClient from '@/app/components/quiz/QuizSessionClient';
import { AlertCircle, ArrowLeft, RotateCcw, Award } from 'lucide-react';

interface QuizPageProps {
  params: {
    courseKey: string;
    quizKey: string;
  };
}

export async function generateMetadata({ params }: QuizPageProps) {
  const staticQuiz = getStaticQuiz(params.quizKey);
  return {
    title: `${staticQuiz?.title || 'Sesi Kuis'} • Evaluasi AI | LMS-KID`,
    description: 'Lembar evaluasi kuis pilihan ganda kurikulum literasi kecerdasan buatan.',
  };
}

export default async function StudentQuizPage({ params }: QuizPageProps) {
  const { courseKey, quizKey } = params;

  // 1. Verifikasi Session Siswa
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/login');
  }

  // 2. Ambil data kuis dan riwayat attempt melalui Server Action
  const res = await getQuizDataAction(courseKey, quizKey);

  // Jika kuis tidak ditemukan atau terjadi kesalahan server
  if (!res.success || !res.data) {
    return (
      <div className="min-h-screen bg-[#F9F9FF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CAC3D8]/40 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-[#061B38] mb-2">Lembar Kuis Tidak Ditemukan</h2>
          <p className="text-xs sm:text-sm text-[#494455] leading-relaxed mb-6">
            {res.error || 'Data kuis yang Anda minta tidak tersedia dalam silabus kurikulum saat ini.'}
          </p>
          <Link
            href={`/student/courses/${courseKey}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#7F54F8]/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Silabus Kursus</span>
          </Link>
        </div>
      </div>
    );
  }

  const quiz = res.data;

  // 3. Jika batas percobaan maksimal (2 kali) telah tercapai
  if (!quiz.canAttempt) {
    return (
      <div className="min-h-screen bg-[#F9F9FF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CAC3D8]/40 text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#E8DEFF] text-[#6636DE] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <RotateCcw className="w-8 h-8 text-[#7F54F8]" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#DFE8FF] text-[#000A63] text-xs font-bold mb-3">
            Percobaan {quiz.attemptCount}/{quiz.maxAttempts} Telah Digunakan
          </span>

          <h2 className="text-xl font-bold text-[#061B38] mb-2">{quiz.title}</h2>

          <p className="text-xs sm:text-sm text-[#494455] leading-relaxed mb-3">
            Anda telah menggunakan kuota percobaan ({quiz.attemptCount}/{quiz.maxAttempts}) pengerjaan untuk kuis ini.
          </p>

          <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-center text-xs text-[#92400E] font-semibold mb-5">
            Percobaan Anda telah mencapai batas, hubungi guru terkait untuk membuka masa percobaan tambahan.
          </div>

          {/* Metric Summary Box */}
          <div className="bg-[#F0F3FF] rounded-2xl p-4 mb-6 border border-[#CAC3D8]/30 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[#7A7486] font-medium">Skor Terakhir</span>
              <span className="text-2xl font-bold text-[#061B38]">
                {quiz.lastScore !== null ? quiz.lastScore : 0}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-[#CAC3D8]/50" />
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-[#7A7486] font-medium">Status Kelulusan</span>
              <span
                className={`text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full ${
                  quiz.isPassed
                    ? 'bg-[#89F5E7] text-[#00201D]'
                    : 'bg-[#FFDAD6] text-[#93000A]'
                }`}
              >
                {quiz.isPassed ? 'Lulus ✓' : 'Belum Lulus'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/student/courses/${courseKey}/quiz/${quizKey}/result`}
              className="w-full py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#7F54F8]/25 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Lihat Lembar Hasil Evaluasi</span>
            </Link>

            <Link
              href={`/student/courses/${courseKey}`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#E7EEFF] hover:bg-[#DFE8FF] text-[#061B38] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Silabus Kursus</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Render Interactive Quiz Interface
  return (
    <QuizSessionClient
      quizData={quiz}
      courseKey={courseKey}
      quizKey={quizKey}
    />
  );
}
