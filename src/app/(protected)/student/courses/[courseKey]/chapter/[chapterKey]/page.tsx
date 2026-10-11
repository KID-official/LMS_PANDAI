import React from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getChapterByKey,
  getCourseByKey,
  getNextChapter,
} from '@/data/curriculum';
import { getCourseDetailsWithProgress } from '@/actions/progressActions';
import {
  ChapterHeader,
  VideoPlayerContainer,
  SequencerTimerAlert,
  ChapterContentReader,
  ChapterSidebarNav,
  ChapterFooterAction,
} from '@/app/components/chapter-player';
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface ChapterPageProps {
  params: {
    courseKey: string;
    chapterKey: string;
  };
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const chapter = getChapterByKey(params.courseKey, params.chapterKey);
  const course = getCourseByKey(params.courseKey);
  return {
    title: chapter
      ? `Bab ${chapter.chapterNumber}: ${chapter.title} | ${course?.title || 'SFA Learn'}`
      : 'Player Materi | SFA Learn',
  };
}

export default async function ChapterPlayerPage({ params }: ChapterPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const { courseKey, chapterKey } = params;

  // 1. Fetch Chapter Data
  const chapter = getChapterByKey(courseKey, chapterKey);
  const course = getCourseByKey(courseKey);

  if (!chapter || !course) {
    notFound();
  }

  // 2. Fetch Course Details & Sequential Progress for User
  const progressData = await getCourseDetailsWithProgress(courseKey, session.user.id);

  if (!progressData) {
    notFound();
  }

  const {
    chaptersWithStatus,
    completedCount,
    totalChapters,
    progressPercentage,
    activeChapterKey,
  } = progressData;

  const currentChapterStatus = chaptersWithStatus.find((c) => c.key === chapter.key);
  const nextChapter = getNextChapter(courseKey, chapterKey);

  // 3. Sequential Lock Guard
  if (currentChapterStatus?.isLocked) {
    const activeChapter = chaptersWithStatus.find((c) => c.key === activeChapterKey) || chaptersWithStatus[0];

    return (
      <div className="min-h-screen bg-[#F9F9FF] text-[#061B38] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Top Back Link */}
          <div>
            <Link
              href={`/student/courses/${courseKey}`}
              className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white border border-[#CAC3D8]/40 text-[#494455] hover:text-[#7F54F8] hover:border-[#7F54F8]/40 text-xs font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Silabus Kursus</span>
            </Link>
          </div>

          {/* Status Badge Strip */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#DFE8FF] rounded-full shadow-sm text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A] animate-ping" />
              <span className="font-semibold text-[#061B38] truncate">
                Status Akses: Akses Terbatas
              </span>
            </div>
            <span className="font-extrabold text-[#5010C8] uppercase tracking-wider text-[11px]">
              Sequential Modul
            </span>
          </div>

          {/* Main Locked Card */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 border border-[#CAC3D8]/40 shadow-sm flex flex-col items-center text-center">
            {/* Glowing Ambient Light */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#CDBDFF]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-4 w-28 h-28 bg-[#FFDAD6]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Glowing Padlock Emblem */}
            <div className="relative mt-2 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7F54F8] to-[#5566EE] flex items-center justify-center shadow-lg shadow-[#7F54F8]/25">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <Lock className="w-8 h-8 text-[#7F54F8]" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#BA1A1A] text-white rounded-full shadow-md flex items-center gap-1 text-[10px] font-bold">
                <AlertCircle className="w-3 h-3" />
                <span>KUNCI</span>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDAD6] text-[#93000A] mb-3 text-xs font-bold uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>Bab Masih Terkunci</span>
            </div>

            {/* Title & Description */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#061B38] mb-2 leading-tight">
              Ups! Bab Ini Belum Dapat Diakses
            </h1>
            <p className="text-xs sm:text-sm text-[#494455] max-w-md leading-relaxed mb-6">
              Untuk memastikan pemahaman menyeluruh, materi literasi AI disusun secara berurutan (
              <span className="font-bold text-[#7F54F8]">Sequential Learning</span>). Kamu tidak
              dapat melompati materi sebelum menyelesaikan prasyarat bab sebelumnya.
            </p>

            {/* Context Box */}
            <div className="w-full p-4 bg-[#F0F3FF] rounded-2xl border border-[#CAC3D8]/30 text-left mb-6">
              <span className="text-[10px] font-bold text-[#7A7486] uppercase tracking-wider block mb-1">
                Materi yang Sedang Kamu Buka:
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <BookOpen className="w-4 h-4 text-[#7F54F8]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-[#061B38] truncate">
                    Bab {chapter.chapterNumber}: {chapter.title}
                  </p>
                  <p className="text-xs text-[#BA1A1A] font-semibold flex items-center gap-1 mt-0.5">
                    <XCircle className="w-3.5 h-3.5" />
                    Status: Terkunci Otomatis (Prasyarat Belum Terpenuhi)
                  </p>
                </div>
              </div>
            </div>

            {/* Prerequisite Guidance Checklist */}
            <div className="w-full text-left space-y-3 p-4 bg-[#F9F9FF] rounded-2xl border border-[#CAC3D8]/30 mb-6">
              <h3 className="font-bold text-xs sm:text-sm text-[#061B38]">
                Langkah untuk Membuka Bab Ini:
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-[#494455]">
                  <CheckCircle2 className="w-4 h-4 text-[#00685F] shrink-0 mt-0.5" />
                  <span>
                    Buka bab aktif yang sedang berjalan:{' '}
                    <strong className="text-[#061B38]">
                      Bab {activeChapter.chapterNumber} - {activeChapter.title}
                    </strong>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#494455]">
                  <CheckCircle2 className="w-4 h-4 text-[#00685F] shrink-0 mt-0.5" />
                  <span>Tonton video materi hingga timer sequencer selesai tuntas.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#494455]">
                  <CheckCircle2 className="w-4 h-4 text-[#00685F] shrink-0 mt-0.5" />
                  <span>Klik &quot;Tandai Bab Selesai&quot; atau selesaikan kuis evaluasi jika tersedia.</span>
                </div>
              </div>
            </div>

            {/* Navigation CTAs */}
            <div className="w-full space-y-3">
              <Link
                href={`/student/courses/${courseKey}/chapter/${activeChapterKey}`}
                className="w-full py-3.5 px-5 bg-[#7F54F8] hover:bg-[#6636DE] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md shadow-[#7F54F8]/25 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Buka Bab Aktif ({activeChapter.title})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/student/courses/${courseKey}`}
                className="w-full py-3 px-5 bg-[#E7EEFF] hover:bg-[#D6E3FF] active:scale-[0.99] text-[#061B38] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>Buka Silabus Kursus Lengkap</span>
              </Link>
            </div>
          </div>

          {/* Help Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#7F54F8] shrink-0 mt-0.5" />
            <div className="text-xs text-[#494455] leading-relaxed">
              <span className="font-bold text-[#061B38] block mb-0.5">Pusat Bantuan Lab</span>
              Mengalami kendala teknis atau progres bab belum terbarui otomatis? Hubungi Guru
              Pengajar Lab di kelas atau administrator sekolah kamu.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Normal Chapter Player View
  const isAlreadyCompleted = currentChapterStatus?.isCompleted || false;

  return (
    <div className="min-h-screen bg-[#F9F9FF] text-[#061B38] pb-24 lg:pb-16 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Left Area: Video, Sequencer, Reader, Footer (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Chapter Header */}
            <ChapterHeader
              courseKey={course.key}
              chapterNumber={chapter.chapterNumber}
              totalChapters={course.chapters.length}
              courseCategory={course.category}
              durationMinutes={chapter.durationMinutes}
              title={chapter.title}
            />

            {/* Video Player Container */}
            <div className="mt-3">
              <VideoPlayerContainer
                chapterKey={chapter.key}
                youtubeUrl={chapter.youtubeUrl}
                title={chapter.title}
                minWatchSeconds={chapter.minWatchSeconds}
                isAlreadyCompleted={isAlreadyCompleted}
              />
            </div>

            {/* Sequencer Timer Alert */}
            <SequencerTimerAlert />

            {/* Chapter Content Reader */}
            <ChapterContentReader textContent={chapter.textContent} />

            {/* Action Bar (Inline on Desktop, Fixed on Mobile) */}
            <ChapterFooterAction
              courseKey={course.key}
              chapterKey={chapter.key}
              isAlreadyCompleted={isAlreadyCompleted}
              nextChapter={
                nextChapter
                  ? {
                      key: nextChapter.key,
                      chapterNumber: nextChapter.chapterNumber,
                      title: nextChapter.title,
                    }
                  : undefined
              }
              hasQuiz={chapter.hasQuiz}
              quizKey={chapter.quizKey}
            />
          </div>

          {/* Sticky Syllabus Sidebar on Desktop (col-span-4) */}
          <div className="lg:col-span-4">
            <ChapterSidebarNav
              courseKey={course.key}
              currentChapterKey={chapter.key}
              chaptersWithStatus={chaptersWithStatus}
              completedCount={completedCount}
              totalChapters={totalChapters}
              progressPercentage={progressPercentage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
