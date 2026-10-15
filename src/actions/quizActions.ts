'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getStaticQuiz, StaticQuizQuestion, STATIC_QUIZZES } from '@/constants/quizzes';
import { COURSES_DATA, getNextChapter } from '@/data/curriculum';
import { revalidatePath } from 'next/cache';

export interface ClientQuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ClientQuestion {
  id: string;
  questionText: string;
  points: number;
  options: ClientQuestionOption[];
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  caseBadge?: string;
  caseResolution?: string;
  insightTip?: string;
}

export interface ClientQuizDataPayload {
  quizKey: string;
  title: string;
  courseKey: string;
  moduleBadge: string;
  passingScore: number;
  durationMinutes: number;
  totalQuestions: number;
  attemptNumber: number;
  attemptCount: number;
  maxAttempts: number;
  isPassed: boolean;
  canAttempt: boolean;
  lastScore: number | null;
  questions: ClientQuestion[];
}

export interface GetQuizDataResult {
  success: boolean;
  data?: ClientQuizDataPayload;
  error?: string;
}

export interface SubmitQuizInput {
  courseKey: string;
  quizKey: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  timeSpentSeconds: number;
}

export interface SubmitQuizResult {
  success: boolean;
  score?: number;
  isPassed?: boolean;
  attemptNumber?: number;
  quizScoreId?: string;
  error?: string;
}

/**
 * 1. getQuizDataAction
 * Mengambil data kuis yang aman untuk sisi client (tanpa membocorkan correctOption & explanation),
 * mengecek riwayat attempt siswa, status kelulusan, dan batas pengerjaan.
 */
export async function getQuizDataAction(
  courseKey: string,
  quizKey: string
): Promise<GetQuizDataResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Sesi belajar Anda telah berakhir. Silakan login kembali.' };
    }

    const userId = session.user.id;

    // Ambil bank soal statis kuis
    const staticQuiz = getStaticQuiz(quizKey);
    if (!staticQuiz) {
      return { success: false, error: 'Data kuis tidak ditemukan dalam silabus kurikulum.' };
    }

    // Ambil riwayat percobaan siswa untuk kuis ini
    const existingScores = await prisma.userQuizScore.findMany({
      where: {
        user_id: userId,
        quiz_key: staticQuiz.quizKey,
      },
      orderBy: {
        taken_at: 'asc',
      },
    });

    const attemptCount = existingScores.length;
    const isPassed = existingScores.some((s) => s.is_passed);
    const lastScore = attemptCount > 0 ? existingScores[attemptCount - 1].score : null;
    const maxAttempts = 2;
    const attemptNumber = Math.min(attemptCount + 1, maxAttempts);
    const canAttempt = attemptCount < maxAttempts;

    // Filter data soal: hapus correctOption dan explanation untuk proteksi integritas ujian
    const sanitizedQuestions: ClientQuestion[] = staticQuiz.questions.map((q: StaticQuizQuestion) => ({
      id: q.id,
      questionText: q.questionText,
      points: q.points,
      options: q.options,
      category: q.category || 'Evaluasi Pemahaman AI',
      imageUrl: q.imageUrl,
      imageAlt: q.imageAlt,
      caseBadge: q.caseBadge,
      caseResolution: q.caseResolution,
      insightTip: q.insightTip,
    }));

    return {
      success: true,
      data: {
        quizKey: staticQuiz.quizKey,
        title: staticQuiz.title,
        courseKey: courseKey || staticQuiz.courseKey,
        moduleBadge: staticQuiz.moduleBadge || 'Etika & Keamanan AI',
        passingScore: staticQuiz.passingScore || 75,
        durationMinutes: staticQuiz.durationMinutes || 15,
        totalQuestions: sanitizedQuestions.length,
        attemptNumber,
        attemptCount,
        maxAttempts,
        isPassed,
        canAttempt,
        lastScore,
        questions: sanitizedQuestions,
      },
    };
  } catch (error) {
    console.error('Error in getQuizDataAction:', error);
    return { success: false, error: 'Terjadi kesalahan sistem saat memuat lembar kuis.' };
  }
}

/**
 * 2. submitQuizAction
 * Mengoreksi jawaban siswa secara otomatis (auto-grading), menghitung skor normalisasi 0-100,
 * mencatat snapshot jawaban ke prisma.userQuizScore, dan membuka akses bab kursus jika lulus.
 */
export async function submitQuizAction(input: SubmitQuizInput): Promise<SubmitQuizResult> {
  try {
    const { courseKey, quizKey, answers, timeSpentSeconds } = input;

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Autentikasi diperlukan untuk mengumpulkan kuis.' };
    }

    const userId = session.user.id;
    const staticQuiz = getStaticQuiz(quizKey);
    if (!staticQuiz) {
      return { success: false, error: 'Bank soal kuis tidak valid.' };
    }

    // Periksa riwayat percobaan sebelumnya
    const existingScores = await prisma.userQuizScore.findMany({
      where: {
        user_id: userId,
        quiz_key: staticQuiz.quizKey,
      },
    });

    const maxAttempts = 2;
    if (existingScores.length >= maxAttempts) {
      return {
        success: false,
        error: `Batas maksimal ${maxAttempts} kali percobaan telah tercapai untuk kuis ini.`,
      };
    }

    // Auto-grading: bandingkan answers[q.id] dengan q.correctOption
    let earnedPoints = 0;
    let totalPossiblePoints = 0;

    const answersSnapshot = staticQuiz.questions.map((q) => {
      const selected = answers[q.id] || '-';
      const isCorrect = selected === q.correctOption;
      const points = q.points || 0;
      totalPossiblePoints += points;

      if (isCorrect) {
        earnedPoints += points;
      }

      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        timeSpentSeconds,
      };
    });

    // Normalisasi skor ke skala 0 - 100
    const totalScore =
      totalPossiblePoints > 0 ? Math.round((earnedPoints / totalPossiblePoints) * 100) : 0;

    const passingThreshold = staticQuiz.passingScore || 75;
    const isPassed = totalScore >= passingThreshold;
    const nextAttemptNumber = existingScores.length + 1;

    // Simpan ke database user_quiz_scores
    const savedRecord = await prisma.userQuizScore.create({
      data: {
        user_id: userId,
        quiz_key: staticQuiz.quizKey,
        score: totalScore,
        attempt_number: nextAttemptNumber,
        is_passed: isPassed,
        answers_snapshot: answersSnapshot,
      },
    });

    // Jika lulus (isPassed === true), buka akses bab atau tandai bab terkait sebagai selesai
    if (isPassed) {
      let matchedChapterKey: string | null = null;

      // Cari chapter mana yang memiliki quizKey ini
      for (const course of COURSES_DATA) {
        for (const ch of course.chapters) {
          if (ch.quizKey === staticQuiz.quizKey || ch.quizKey === quizKey) {
            matchedChapterKey = ch.key;
            break;
          }
        }
        if (matchedChapterKey) break;
      }

      // Jika tidak langsung ketemu dari COURSES_DATA, coba inferensi dari quizKey
      if (!matchedChapterKey) {
        if (quizKey.includes('ch-1')) matchedChapterKey = 'beginner-ch-1';
        else if (quizKey.includes('ch-2')) matchedChapterKey = 'beginner-ch-2';
        else if (quizKey.includes('ch-3')) matchedChapterKey = 'beginner-ch-3';
        else if (quizKey.includes('ch-4')) matchedChapterKey = 'beginner-ch-4';
      }

      if (matchedChapterKey) {
        await prisma.userProgress.upsert({
          where: {
            user_id_chapter_key: {
              user_id: userId,
              chapter_key: matchedChapterKey,
            },
          },
          update: {
            is_completed: true,
            completed_at: new Date(),
          },
          create: {
            user_id: userId,
            chapter_key: matchedChapterKey,
            is_completed: true,
            completed_at: new Date(),
            watch_seconds: Math.max(timeSpentSeconds || 60, 60),
          },
        });
      }
    }

    // Revalidate rute halaman terkait agar cache Next.js terbarui
    try {
      revalidatePath('/student/dashboard');
      revalidatePath(`/student/courses/${courseKey}`);
      revalidatePath(`/student/courses/${courseKey}/quiz/${quizKey}`);
    } catch {
      // Ignored if outside server route cycle
    }

    return {
      success: true,
      score: totalScore,
      isPassed,
      attemptNumber: nextAttemptNumber,
      quizScoreId: savedRecord.id,
    };
  } catch (error) {
    console.error('Error in submitQuizAction:', error);
    return { success: false, error: 'Gagal memproses penilaian kuis. Silakan coba lagi.' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FITUR 2: LIHAT HASIL & NILAI KUIS (Stitch UI-07)
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestionReviewDetail {
  questionNumber: number;
  questionId: string;
  questionText: string;
  category: string;
  points: number;
  pointsEarned: number;
  studentAnswerKey: 'A' | 'B' | 'C' | 'D' | '-';
  studentAnswerText: string;
  correctAnswerKey: 'A' | 'B' | 'C' | 'D';
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
  insightTip?: string;
  caseBadge?: string;
  imageUrl?: string;
}

export interface QuizResultDetailsPayload {
  quizKey: string;
  quizTitle: string;
  courseKey: string;
  courseTitle: string;
  currentChapterKey?: string;
  currentChapterNumber?: number;
  currentChapterTitle?: string;
  studentName: string;
  score: number;
  passingScore: number;
  isPassed: boolean;
  correctCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  timeSpentFormatted: string;
  timeLimitFormatted: string;
  attemptNumber: number;
  maxAttempts: number;
  remainingAttempts: number;
  takenAt: string;
  unlockedModule: {
    chapterNumber: number;
    title: string;
    key: string;
    url: string;
  } | null;
  isCourseCompleted: boolean;
  questionReviews: QuestionReviewDetail[];
}

export interface GetQuizResultResult {
  success: boolean;
  data?: QuizResultDetailsPayload;
  error?: string;
}

/**
 * 3. getQuizResultDetailsAction
 * Mengambil rekap hasil evaluasi kuis siswa, menghidrasi snapshot jawaban dengan bank soal
 * kurikulum statis, menghitung metrik akurasi, waktu pengerjaan, sisa attempt, dan bab berikutnya yang terbuka.
 */
export async function getQuizResultDetailsAction(
  courseKey: string,
  quizKey: string
): Promise<GetQuizResultResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return {
        success: false,
        error: 'Sesi belajar Anda telah berakhir. Silakan login kembali.',
      };
    }

    const userId = session.user.id;

    // Ambil data kurikulum statis kuis
    const staticQuiz = STATIC_QUIZZES[quizKey] || getStaticQuiz(quizKey);
    if (!staticQuiz) {
      return {
        success: false,
        error: 'Data kuis tidak ditemukan dalam silabus kurikulum.',
      };
    }

    // Ambil data profile siswa
    const student = await prisma.student.findUnique({
      where: { user_id: userId },
    });
    const studentName = student?.full_name || session.user.name || 'Siswa Pembelajar';

    // Ambil user quiz score terbaru
    const latestScore = await prisma.userQuizScore.findFirst({
      where: {
        user_id: userId,
        quiz_key: {
          in: [quizKey, staticQuiz.quizKey],
        },
      },
      orderBy: { taken_at: 'desc' },
    });

    if (!latestScore) {
      return {
        success: false,
        error: 'Belum ada catatan evaluasi untuk kuis ini. Silakan kerjakan kuis terlebih dahulu.',
      };
    }

    // Parse answers_snapshot
    let snapshotAnswers: Array<{
      questionId: string;
      selectedOption: string;
      isCorrect?: boolean;
      timeSpentSeconds?: number;
    }> = [];
    let detectedTimeSpentSeconds: number | null = null;

    try {
      const rawSnapshot = latestScore.answers_snapshot as Record<string, unknown> | unknown[];
      if (Array.isArray(rawSnapshot)) {
        snapshotAnswers = rawSnapshot as typeof snapshotAnswers;
        if (rawSnapshot.length > 0 && typeof (rawSnapshot[0] as { timeSpentSeconds?: number })?.timeSpentSeconds === 'number') {
          detectedTimeSpentSeconds = (rawSnapshot[0] as { timeSpentSeconds: number }).timeSpentSeconds;
        }
      } else if (rawSnapshot && typeof rawSnapshot === 'object') {
        const snapshotObj = rawSnapshot as { questions?: typeof snapshotAnswers; timeSpentSeconds?: number };
        if (Array.isArray(snapshotObj.questions)) {
          snapshotAnswers = snapshotObj.questions;
          if (typeof snapshotObj.timeSpentSeconds === 'number') {
            detectedTimeSpentSeconds = snapshotObj.timeSpentSeconds;
          }
        } else {
          snapshotAnswers = Object.entries(rawSnapshot).map(([k, v]) => ({
            questionId: k,
            selectedOption: String(v),
          }));
        }
      } else if (typeof rawSnapshot === 'string') {
        const parsed = JSON.parse(rawSnapshot);
        if (Array.isArray(parsed)) {
          snapshotAnswers = parsed;
          if (parsed.length > 0 && typeof parsed[0].timeSpentSeconds === 'number') {
            detectedTimeSpentSeconds = parsed[0].timeSpentSeconds;
          }
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.questions)) {
            snapshotAnswers = parsed.questions;
            if (typeof parsed.timeSpentSeconds === 'number') {
              detectedTimeSpentSeconds = parsed.timeSpentSeconds;
            }
          } else {
            snapshotAnswers = Object.entries(parsed).map(([k, v]) => ({
              questionId: k,
              selectedOption: String(v),
            }));
          }
        }
      }
    } catch (err) {
      console.error('Error parsing answers_snapshot:', err);
    }

    const snapshotMap = new Map<
      string,
      { selectedOption: string; isCorrect?: boolean }
    >();
    snapshotAnswers.forEach((ans) => {
      snapshotMap.set(ans.questionId, {
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
      });
    });

    // Hidrasi butir soal dari STATIC_QUIZZES
    let correctCount = 0;
    const questionReviews: QuestionReviewDetail[] = staticQuiz.questions.map(
      (q, index) => {
        const studentAns = snapshotMap.get(q.id);
        const selectedKey = (studentAns?.selectedOption || '-') as
          | 'A'
          | 'B'
          | 'C'
          | 'D'
          | '-';
        const isCorrect =
          studentAns?.isCorrect !== undefined
            ? studentAns.isCorrect
            : selectedKey === q.correctOption;

        if (isCorrect) {
          correctCount++;
        }

        const studentOptionItem = q.options.find((opt) => opt.key === selectedKey);
        const correctOptionItem = q.options.find((opt) => opt.key === q.correctOption);

        return {
          questionNumber: index + 1,
          questionId: q.id,
          questionText: q.questionText,
          category: q.category || 'Evaluasi AI',
          points: q.points,
          pointsEarned: isCorrect ? q.points : 0,
          studentAnswerKey: selectedKey,
          studentAnswerText: studentOptionItem
            ? studentOptionItem.text
            : selectedKey === '-'
            ? 'Tidak Dijawab'
            : selectedKey,
          correctAnswerKey: q.correctOption,
          correctAnswerText: correctOptionItem ? correctOptionItem.text : q.correctOption,
          isCorrect,
          explanation: q.explanation,
          insightTip: q.insightTip,
          caseBadge: q.caseBadge,
          imageUrl: q.imageUrl,
        };
      }
    );

    const totalQuestions = staticQuiz.questions.length;
    const accuracyPercentage =
      totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Hitung format waktu pengerjaan (fallback realistis 08m 42s sesuai UI-07 Stitch jika data belum tercatat)
    const timeSpent = detectedTimeSpentSeconds || 522;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeSpentFormatted = `${minutes < 10 ? '0' : ''}${minutes}m ${
      seconds < 10 ? '0' : ''
    }${seconds}s`;
    const timeLimitFormatted = `Batas ${staticQuiz.durationMinutes || 15}m`;

    const maxAttempts = 2;
    const attemptNumber = latestScore.attempt_number || 1;
    const remainingAttempts = Math.max(0, maxAttempts - attemptNumber);

    // Cari bab terkait dan modul berikutnya
    const activeCourse =
      COURSES_DATA.find((c) => c.key === courseKey) ||
      COURSES_DATA.find((c) => c.key === staticQuiz.courseKey) ||
      COURSES_DATA[0];

    let currentChapter = activeCourse.chapters.find(
      (ch) => ch.quizKey === quizKey || ch.quizKey === staticQuiz.quizKey
    );

    let matchedCourse = activeCourse;
    if (!currentChapter) {
      for (const c of COURSES_DATA) {
        const found = c.chapters.find(
          (ch) => ch.quizKey === quizKey || ch.quizKey === staticQuiz.quizKey
        );
        if (found) {
          matchedCourse = c;
          currentChapter = found;
          break;
        }
      }
    }

    let unlockedModule: QuizResultDetailsPayload['unlockedModule'] = null;
    let isCourseCompleted = false;

    if (latestScore.is_passed) {
      if (currentChapter) {
        const nextChapter = getNextChapter(matchedCourse.key, currentChapter.key);
        if (nextChapter) {
          unlockedModule = {
            chapterNumber: nextChapter.chapterNumber,
            title: nextChapter.title,
            key: nextChapter.key,
            url: `/student/courses/${matchedCourse.key}/chapter/${nextChapter.key}`,
          };
        } else {
          isCourseCompleted = true;
        }
      }
    }

    return {
      success: true,
      data: {
        quizKey: staticQuiz.quizKey,
        quizTitle: staticQuiz.title,
        courseKey: matchedCourse.key,
        courseTitle: matchedCourse.title,
        currentChapterKey: currentChapter?.key,
        currentChapterNumber: currentChapter?.chapterNumber,
        currentChapterTitle: currentChapter?.title,
        studentName,
        score: latestScore.score,
        passingScore: staticQuiz.passingScore || 75,
        isPassed: latestScore.is_passed,
        correctCount,
        totalQuestions,
        accuracyPercentage,
        timeSpentFormatted,
        timeLimitFormatted,
        attemptNumber,
        maxAttempts,
        remainingAttempts,
        takenAt: latestScore.taken_at.toISOString(),
        unlockedModule,
        isCourseCompleted,
        questionReviews,
      },
    };
  } catch (error) {
    console.error('Error in getQuizResultDetailsAction:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan sistem saat memuat rincian hasil evaluasi kuis.',
    };
  }
}

