'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient, UserRole } from '@prisma/client';
import { getStaticQuiz } from '@/constants/quizzes';

const prisma = new PrismaClient();

const TOTAL_CHAPTERS = 8;
const DEFAULT_COURSE_KEY = 'literasi-ai-dasar';

/**
 * 1. Authorization Guard
 * Hanya role GURU atau SUPER_ADMIN yang diizinkan mengakses data pelaporan & audit.
 */
export async function requireGuruOrAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: Silakan masuk ke akun terlebih dahulu');
  }

  const role = session.user.role;
  if (role !== UserRole.GURU && role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized: Akses ditolak. Hanya Guru dan Super Admin yang diizinkan');
  }

  return session.user;
}

export interface AnalyticsKPIs {
  totalActiveStudents: number;
  passingRate: number; // e.g. 87.4
  averageScore: number; // e.g. 82.5
  issuedCertificatesCount: number; // e.g. 374
  remedialNeededCount: number; // e.g. 54
}

/**
 * 2. Server Action: getStudentAnalyticsKPIs
 * Menghitung 4 metrik KPI ringkasan untuk header dashboard
 */
export async function getStudentAnalyticsKPIs(courseKey: string = DEFAULT_COURSE_KEY): Promise<AnalyticsKPIs> {
  await requireGuruOrAdmin();

  // a. Total user role SISWA dengan is_active = true
  const totalActiveStudents = await prisma.user.count({
    where: {
      role: UserRole.SISWA,
      is_active: true,
    },
  });

  // b. Ambil seluruh skor kuis dari siswa aktif
  const activeStudentUsers = await prisma.user.findMany({
    where: {
      role: UserRole.SISWA,
      is_active: true,
    },
    select: {
      id: true,
      quiz_scores: {
        orderBy: { taken_at: 'desc' },
      },
    },
  });

  let studentsWhoTookQuiz = 0;
  let studentsPassedAtLeastOnce = 0;
  let allScoresSum = 0;
  let allScoresCount = 0;
  let remedialNeededCount = 0;

  for (const user of activeStudentUsers) {
    const scores = user.quiz_scores;
    if (scores.length > 0) {
      studentsWhoTookQuiz++;

      // Cek apakah punya minimal 1 kuis lulus
      const hasPassed = scores.some((q) => q.is_passed);
      if (hasPassed) {
        studentsPassedAtLeastOnce++;
      }

      // Skor kuis terbaru
      const latestQuiz = scores[0];
      if (!latestQuiz.is_passed && latestQuiz.attempt_number < 3) {
        remedialNeededCount++;
      }

      for (const s of scores) {
        allScoresSum += s.score;
        allScoresCount++;
      }
    }
  }

  const passingRate = studentsWhoTookQuiz > 0
    ? parseFloat(((studentsPassedAtLeastOnce / studentsWhoTookQuiz) * 100).toFixed(1))
    : 0;

  const averageScore = allScoresCount > 0
    ? parseFloat((allScoresSum / allScoresCount).toFixed(1))
    : 0;

  // c. Total row di tabel certificates
  const issuedCertificatesCount = await prisma.certificate.count({
    where: courseKey ? { course_key: courseKey } : undefined,
  });

  return {
    totalActiveStudents,
    passingRate,
    averageScore,
    issuedCertificatesCount,
    remedialNeededCount,
  };
}

export interface StudentReportRow {
  userId: string;
  studentId: string;
  nis: string;
  fullName: string;
  className: string;
  imageUrl?: string | null;
  courseKey: string;
  courseName: string;
  courseLevel: string;
  completedChapters: number;
  totalChapters: number;
  progressPercentage: number;
  latestScore: number | null;
  scoreStatusText: 'Sempurna' | 'Sangat Baik' | 'Baik' | 'Kuis Ulang' | 'Belum Kuis';
  scoreStatusColor: 'emerald' | 'violet' | 'amber' | 'rose' | 'slate';
  attemptText: string;
  attemptNumber: number;
  certificateStatus: 'ISSUED' | 'NOT_ELIGIBLE';
  certificateSerialNumber: string | null;
  hasQuiz: boolean;
  latestQuizKey?: string;
}

export interface StudentReportFilterParams {
  search?: string;
  className?: string;
  certificateStatus?: 'ALL' | 'ISSUED' | 'NOT_ELIGIBLE';
  courseKey?: string;
  page?: number;
  limit?: number;
}

export interface StudentReportPaginationResult {
  data: StudentReportRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  availableClasses: string[];
}

/**
 * 3. Server Action: getStudentProgressReport
 * Mengambil daftar progress dan kuis siswa dengan filter & pagination efisien
 */
export async function getStudentProgressReport(
  params: StudentReportFilterParams = {}
): Promise<StudentReportPaginationResult> {
  await requireGuruOrAdmin();

  const search = params.search?.trim() || '';
  const className = params.className?.trim() || '';
  const certificateStatus = params.certificateStatus || 'ALL';
  const courseKey = params.courseKey || DEFAULT_COURSE_KEY;
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 10);

  // Ambil daftar kelas unik yang tersedia untuk filter dropdown
  const distinctClasses = await prisma.student.findMany({
    select: { class_name: true },
    distinct: ['class_name'],
    orderBy: { class_name: 'asc' },
  });
  const availableClasses = distinctClasses.map((c) => c.class_name).filter(Boolean);

  // Susun filter query
  const studentWhere: Record<string, unknown> = {};

  if (className && className !== 'ALL' && className !== 'Semua Kelas') {
    studentWhere.class_name = className;
  }

  if (search) {
    studentWhere.OR = [
      { full_name: { contains: search, mode: 'insensitive' } },
      { nis: { contains: search, mode: 'insensitive' } },
      { user: { identifier: { contains: search, mode: 'insensitive' } } },
    ];
  }

  // Ambil semua students yang memenuhi kriteria pencarian dan kelas
  // Beserta relasi user, progress, quiz_scores, dan certificates (Eager fetching teroptimasi)
  const students = await prisma.student.findMany({
    where: studentWhere,
    include: {
      user: {
        include: {
          progress: {
            where: { is_completed: true },
          },
          quiz_scores: {
            orderBy: { taken_at: 'desc' },
          },
          certificates: {
            where: { course_key: courseKey },
          },
        },
      },
    },
    orderBy: {
      nis: 'asc',
    },
  });

  // Transform ke baris laporan
  const rows: StudentReportRow[] = students.map((student) => {
    const user = student.user;
    const completedChapters = user?.progress?.length || 0;
    const progressPercentage = Math.min(100, Math.round((completedChapters / TOTAL_CHAPTERS) * 100));

    // Kuis terbaru
    const latestQuiz = user?.quiz_scores?.[0];
    const hasQuiz = !!latestQuiz;
    const latestScore = latestQuiz ? latestQuiz.score : null;
    const attemptNumber = latestQuiz ? latestQuiz.attempt_number : 0;
    const attemptText = latestQuiz ? `Attempt ${attemptNumber}/3` : '-';

    let scoreStatusText: 'Sempurna' | 'Sangat Baik' | 'Baik' | 'Kuis Ulang' | 'Belum Kuis' = 'Belum Kuis';
    let scoreStatusColor: 'emerald' | 'violet' | 'amber' | 'rose' | 'slate' = 'slate';

    if (latestScore !== null) {
      if (latestScore === 100) {
        scoreStatusText = 'Sempurna';
        scoreStatusColor = 'emerald';
      } else if (latestScore >= 85) {
        scoreStatusText = 'Sangat Baik';
        scoreStatusColor = 'violet';
      } else if (latestScore >= 75) {
        scoreStatusText = 'Baik';
        scoreStatusColor = 'emerald';
      } else {
        scoreStatusText = 'Kuis Ulang';
        scoreStatusColor = 'amber';
      }
    }

    // Sertifikat
    const cert = user?.certificates?.[0];
    const isIssued = !!cert;
    const certStatus: 'ISSUED' | 'NOT_ELIGIBLE' = isIssued ? 'ISSUED' : 'NOT_ELIGIBLE';
    const certificateSerialNumber = cert ? cert.serial_number : null;

    return {
      userId: user.id,
      studentId: student.id,
      nis: student.nis,
      fullName: student.full_name,
      className: student.class_name,
      imageUrl: student.image_url,
      courseKey,
      courseName: 'Literasi AI & Etika Digital',
      courseLevel: 'Level Dasar',
      completedChapters,
      totalChapters: TOTAL_CHAPTERS,
      progressPercentage,
      latestScore,
      scoreStatusText,
      scoreStatusColor,
      attemptText,
      attemptNumber,
      certificateStatus: certStatus,
      certificateSerialNumber,
      hasQuiz,
      latestQuizKey: latestQuiz?.quiz_key || 'quiz-literasi-ai-dasar',
    };
  });

  // Terapkan filter certificateStatus jika dipilih
  let filteredRows = rows;
  if (certificateStatus === 'ISSUED') {
    filteredRows = rows.filter((r) => r.certificateStatus === 'ISSUED');
  } else if (certificateStatus === 'NOT_ELIGIBLE') {
    filteredRows = rows.filter((r) => r.certificateStatus === 'NOT_ELIGIBLE');
  }

  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const skip = (page - 1) * limit;
  const paginatedData = filteredRows.slice(skip, skip + limit);

  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages,
    availableClasses,
  };
}

export interface QuizQuestionDetail {
  questionNumber: number;
  questionId: string;
  questionText: string;
  pointsEarned: number;
  maxPoints: number;
  selectedOption: string;
  isCorrect: boolean;
  correctOption: string;
  options: Array<{
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }>;
  explanation: string;
}

export interface QuizAuditDetail {
  student: {
    userId: string;
    fullName: string;
    nis: string;
    className: string;
  };
  quizMetadata: {
    quizKey: string;
    quizTitle: string;
    moduleName: string;
    score: number;
    maxScore: number;
    isPassed: boolean;
    attemptNumber: number;
    maxAttempts: number;
    takenAtFormatted: string;
    durationFormatted: string;
    correctCount: number;
    incorrectCount: number;
    totalQuestions: number;
  };
  questions: QuizQuestionDetail[];
}

/**
 * 4. Server Action: getQuizAuditDetail
 * Mengambil record snapshot kuis dan menghidrasinya dengan bank soal statis quizzes.ts
 */
export async function getQuizAuditDetail(userId: string, quizKey: string): Promise<QuizAuditDetail | null> {
  await requireGuruOrAdmin();

  // 1. Ambil data siswa
  const student = await prisma.student.findUnique({
    where: { user_id: userId },
  });

  if (!student) {
    throw new Error('Siswa tidak ditemukan');
  }

  // 2. Ambil record user_quiz_scores terbaru
  const latestQuizScore = await prisma.userQuizScore.findFirst({
    where: {
      user_id: userId,
      ...(quizKey ? { quiz_key: quizKey } : {}),
    },
    orderBy: {
      taken_at: 'desc',
    },
  });

  if (!latestQuizScore) {
    return null;
  }

  // 3. Ambil bank soal statis dari @/constants/quizzes.ts
  const staticQuiz = getStaticQuiz(latestQuizScore.quiz_key);

  // 4. Parse answers_snapshot
  let snapshotAnswers: Array<{ questionId: string; selectedOption: string; isCorrect: boolean }> = [];
  try {
    if (Array.isArray(latestQuizScore.answers_snapshot)) {
      snapshotAnswers = latestQuizScore.answers_snapshot as Array<{
        questionId: string;
        selectedOption: string;
        isCorrect: boolean;
      }>;
    } else if (typeof latestQuizScore.answers_snapshot === 'string') {
      snapshotAnswers = JSON.parse(latestQuizScore.answers_snapshot);
    }
  } catch (err) {
    console.error('Error parsing answers_snapshot:', err);
  }

  const snapshotMap = new Map<string, { selectedOption: string; isCorrect: boolean }>();
  snapshotAnswers.forEach((ans) => {
    snapshotMap.set(ans.questionId, {
      selectedOption: ans.selectedOption,
      isCorrect: ans.isCorrect,
    });
  });

  let correctCount = 0;
  let incorrectCount = 0;
  let maxScoreSum = 0;

  // 5. Gabungkan (*hydrate*) data soal statis dengan snapshot siswa
  const questions: QuizQuestionDetail[] = staticQuiz.questions.map((q, index) => {
    const studentAns = snapshotMap.get(q.id);
    const selectedOption = studentAns?.selectedOption || '-';
    const isCorrect = studentAns ? studentAns.isCorrect : selectedOption === q.correctOption;

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    maxScoreSum += q.points;

    return {
      questionNumber: index + 1,
      questionId: q.id,
      questionText: q.questionText,
      pointsEarned: isCorrect ? q.points : 0,
      maxPoints: q.points,
      selectedOption,
      isCorrect,
      correctOption: q.correctOption,
      options: q.options,
      explanation: q.explanation,
    };
  });

  // Format tanggal: 12 Oktober 2026, 14:20 WIB
  const takenDate = new Date(latestQuizScore.taken_at);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
  const takenAtFormatted = `${formatter.format(takenDate)} WIB`;

  return {
    student: {
      userId,
      fullName: student.full_name,
      nis: student.nis,
      className: student.class_name,
    },
    quizMetadata: {
      quizKey: latestQuizScore.quiz_key,
      quizTitle: staticQuiz.title,
      moduleName: 'Literasi AI Dasar',
      score: latestQuizScore.score,
      maxScore: maxScoreSum || 100,
      isPassed: latestQuizScore.is_passed,
      attemptNumber: latestQuizScore.attempt_number,
      maxAttempts: 3,
      takenAtFormatted,
      durationFormatted: '18m 42s', // Sesuai mockup
      correctCount,
      incorrectCount,
      totalQuestions: questions.length,
    },
    questions,
  };
}

export interface StudentReportExportItem {
  nis: string;
  fullName: string;
  className: string;
  courseName: string;
  completedChapters: string;
  progressPercentage: string;
  quizScore: string;
  quizStatus: string;
  attempt: string;
  certificateStatus: string;
  certificateSerialNumber: string;
}

/**
 * 5. Server Action: exportStudentReportData
 * Mengambil seluruh data siswa terfilter tanpa limit pagination untuk diekspor ke Excel/CSV
 */
export async function exportStudentReportData(
  params: Omit<StudentReportFilterParams, 'page' | 'limit'> = {}
): Promise<StudentReportExportItem[]> {
  await requireGuruOrAdmin();

  // Ambil semua data tanpa pagination (page 1, limit 10000)
  const result = await getStudentProgressReport({
    ...params,
    page: 1,
    limit: 10000,
  });

  return result.data.map((row) => ({
    nis: row.nis,
    fullName: row.fullName,
    className: row.className,
    courseName: row.courseName,
    completedChapters: `${row.completedChapters} dari ${row.totalChapters} Bab`,
    progressPercentage: `${row.progressPercentage}%`,
    quizScore: row.latestScore !== null ? `${row.latestScore}/100` : 'Belum Kuis',
    quizStatus: row.scoreStatusText,
    attempt: row.attemptText,
    certificateStatus: row.certificateStatus === 'ISSUED' ? 'Diterbitkan' : 'Belum Berhak',
    certificateSerialNumber: row.certificateSerialNumber || '-',
  }));
}
