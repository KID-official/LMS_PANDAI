'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { getAllCourses, getTotalChaptersCount } from '@/data/curriculum';

export interface GuruKpiData {
  totalStudents: number;
  activeStudents: number;
  activeRate: number; // e.g. 100%
  averageProgressPercentage: number; // e.g. 64.2%
  averageQuizScore: number; // e.g. 84.5
  certifiedStudentsCount: number; // e.g. 5
  certifiedRate: number; // e.g. 23.8%
}

export interface RecentActivityItem {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  className: string;
  imageUrl?: string | null;
  activityType: 'QUIZ_SUBMISSION' | 'CHAPTER_COMPLETION';
  title: string;
  subTitle?: string;
  score?: number | null;
  isPassed?: boolean;
  scoreGrade?: 'Sangat Baik' | 'Lulus KKM' | 'Perlu Remedial' | 'Selesai Bab';
  timestamp: string; // ISO string
  timeAgoText: string;
}

export interface ScoreDistributionTier {
  key: 'excellent' | 'passed' | 'remedial';
  label: string;
  rangeText: string;
  count: number;
  percentage: number;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
}

export interface ScoreDistributionData {
  totalStudentsWithQuiz: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passingRate: number;
  tiers: ScoreDistributionTier[];
}

export interface RemedialStudentItem {
  userId: string;
  studentId: string;
  nis: string;
  fullName: string;
  className: string;
  imageUrl?: string | null;
  issueType: 'FAILED_QUIZ' | 'MAX_ATTEMPTS' | 'ZERO_PROGRESS';
  latestScore: number | null;
  attemptNumber: number;
  maxAttempts: number;
  reason: string;
}

export interface ClassBreakdownItem {
  className: string;
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  averageScore: number;
  certifiedCount: number;
}

export interface GuruDashboardData {
  kpis: GuruKpiData;
  recentActivities: RecentActivityItem[];
  scoreDistribution: ScoreDistributionData;
  remedialStudents: RemedialStudentItem[];
  classBreakdowns: ClassBreakdownItem[];
  meta: {
    lastUpdated: string;
    totalCourses: number;
    totalChapters: number;
  };
}

/**
 * Format relative time text (Indonesian)
 */
function formatTimeAgo(date: Date | string | null): string {
  if (!date) return '-';
  const target = new Date(date).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - target) / 1000));

  if (diffSec < 60) return 'Baru saja';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari yang lalu`;

  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Mapping chapter key to human title
 */
function resolveChapterTitle(chapterKey: string): string {
  const courses = getAllCourses();
  for (const c of courses) {
    const found = c.chapters.find((ch) => ch.key === chapterKey);
    if (found) {
      return `Bab ${found.chapterNumber}: ${found.title}`;
    }
  }
  // Fallback cleanup
  return chapterKey
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Primary Server Action for Guru Dashboard
 */
export async function getGuruDashboardDataAction(): Promise<GuruDashboardData> {
  // Authorization check: SISWA should not access guru metrics
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    // Request scope not active (e.g. script / static execution)
  }

  if (session?.user && session.user.role === UserRole.SISWA) {
    throw new Error('Unauthorized: Akses ditolak untuk akun siswa');
  }

  const totalCurriculumChapters = getTotalChaptersCount() || 7;
  const totalCourses = getAllCourses().length || 2;

  // 1. Fetch Students & Counts
  const [totalStudents, activeStudentsCount, allActiveStudentUsers, certificatesList] = await Promise.all([
    prisma.user.count({ where: { role: UserRole.SISWA } }),
    prisma.user.count({ where: { role: UserRole.SISWA, is_active: true } }),
    prisma.user.findMany({
      where: {
        role: UserRole.SISWA,
        is_active: true,
      },
      include: {
        student: true,
        progress: true,
        quiz_scores: {
          orderBy: { taken_at: 'desc' },
        },
        certificates: true,
      },
    }),
    prisma.certificate.findMany({
      select: {
        id: true,
        user_id: true,
        course_key: true,
        final_score: true,
      },
    }),
  ]);

  // 2. Calculate Progress & Quiz Metrics
  let totalProgressPctSum = 0;
  let totalStudentQuizScoresSum = 0;
  let totalQuizScoresCount = 0;
  let highestScore = 0;
  let lowestScore = 100;

  // Categorization
  let excellentCount = 0; // >= 85
  let passedCount = 0; // 75 - 84
  let remedialCount = 0; // < 75
  let studentsWithAtLeastOneQuiz = 0;

  const remedialStudentsList: RemedialStudentItem[] = [];

  // Group by Class for Class Breakdown
  const classMap = new Map<
    string,
    {
      className: string;
      total: number;
      active: number;
      progressPctSum: number;
      quizScoresSum: number;
      quizCount: number;
      certifiedCount: number;
    }
  >();

  for (const user of allActiveStudentUsers) {
    const student = user.student;
    const className = student?.class_name?.trim() || 'Kelas Umum';

    // Initialize class map entry if missing
    if (!classMap.has(className)) {
      classMap.set(className, {
        className,
        total: 0,
        active: 0,
        progressPctSum: 0,
        quizScoresSum: 0,
        quizCount: 0,
        certifiedCount: 0,
      });
    }
    const cEntry = classMap.get(className)!;
    cEntry.total += 1;
    if (user.is_active) cEntry.active += 1;

    // Progress calculation
    const completedChapters = user.progress.filter((p) => p.is_completed).length;
    const studentProgressPct = Math.min(
      100,
      parseFloat(((completedChapters / totalCurriculumChapters) * 100).toFixed(1))
    );
    totalProgressPctSum += studentProgressPct;
    cEntry.progressPctSum += studentProgressPct;

    // Certificates
    if (user.certificates.length > 0) {
      cEntry.certifiedCount += 1;
    }

    // Quiz evaluation
    const scores = user.quiz_scores;
    if (scores.length > 0) {
      studentsWithAtLeastOneQuiz++;
      const latestQuiz = scores[0];

      totalStudentQuizScoresSum += latestQuiz.score;
      totalQuizScoresCount++;
      cEntry.quizScoresSum += latestQuiz.score;
      cEntry.quizCount++;

      if (latestQuiz.score > highestScore) highestScore = latestQuiz.score;
      if (latestQuiz.score < lowestScore) lowestScore = latestQuiz.score;

      // Tiering
      if (latestQuiz.score >= 85) {
        excellentCount++;
      } else if (latestQuiz.score >= 75) {
        passedCount++;
      } else {
        remedialCount++;
        // Remedial candidate
        remedialStudentsList.push({
          userId: user.id,
          studentId: student?.id || user.id,
          nis: student?.nis || user.identifier,
          fullName: student?.full_name || user.identifier,
          className,
          imageUrl: student?.image_url,
          issueType: latestQuiz.attempt_number >= 3 ? 'MAX_ATTEMPTS' : 'FAILED_QUIZ',
          latestScore: latestQuiz.score,
          attemptNumber: latestQuiz.attempt_number,
          maxAttempts: 3,
          reason:
            latestQuiz.attempt_number >= 3
              ? `Skor ${latestQuiz.score}/100 • Kesempatan maksimal habis`
              : `Skor ${latestQuiz.score}/100 • Belum memenuhi KKM 75 (Percobaan ${latestQuiz.attempt_number}/3)`,
        });
      }
    } else {
      // Has not taken any quiz: check if zero progress
      if (completedChapters === 0) {
        remedialStudentsList.push({
          userId: user.id,
          studentId: student?.id || user.id,
          nis: student?.nis || user.identifier,
          fullName: student?.full_name || user.identifier,
          className,
          imageUrl: student?.image_url,
          issueType: 'ZERO_PROGRESS',
          latestScore: null,
          attemptNumber: 0,
          maxAttempts: 3,
          reason: 'Belum memulai pembelajaran materi bab pertama',
        });
      }
    }
  }

  if (lowestScore === 100 && studentsWithAtLeastOneQuiz === 0) {
    lowestScore = 0;
  }

  // 3. Aggregate KPIs
  const averageProgressPercentage =
    activeStudentsCount > 0
      ? parseFloat((totalProgressPctSum / activeStudentsCount).toFixed(1))
      : 0;

  const averageQuizScore =
    totalQuizScoresCount > 0
      ? parseFloat((totalStudentQuizScoresSum / totalQuizScoresCount).toFixed(1))
      : 0;

  const certifiedStudentsCount = certificatesList.length;
  const certifiedRate =
    activeStudentsCount > 0
      ? parseFloat(((certifiedStudentsCount / activeStudentsCount) * 100).toFixed(1))
      : 0;

  const activeRate =
    totalStudents > 0
      ? parseFloat(((activeStudentsCount / totalStudents) * 100).toFixed(1))
      : 100;

  const kpis: GuruKpiData = {
    totalStudents,
    activeStudents: activeStudentsCount,
    activeRate,
    averageProgressPercentage,
    averageQuizScore,
    certifiedStudentsCount,
    certifiedRate,
  };

  // 4. Score Distribution Data
  const passingRate =
    studentsWithAtLeastOneQuiz > 0
      ? parseFloat((((excellentCount + passedCount) / studentsWithAtLeastOneQuiz) * 100).toFixed(1))
      : 0;

  const scoreDistribution: ScoreDistributionData = {
    totalStudentsWithQuiz: studentsWithAtLeastOneQuiz,
    averageScore: averageQuizScore,
    highestScore,
    lowestScore,
    passingRate,
    tiers: [
      {
        key: 'excellent',
        label: 'Sangat Baik (Mastery)',
        rangeText: 'Skor 85 – 100',
        count: excellentCount,
        percentage:
          studentsWithAtLeastOneQuiz > 0
            ? Math.round((excellentCount / studentsWithAtLeastOneQuiz) * 100)
            : 0,
        colorHex: '#00685F',
        badgeBg: 'bg-[#CCFBF1]',
        badgeText: 'text-[#00685F]',
      },
      {
        key: 'passed',
        label: 'Lulus KKM (Competent)',
        rangeText: 'Skor 75 – 84',
        count: passedCount,
        percentage:
          studentsWithAtLeastOneQuiz > 0
            ? Math.round((passedCount / studentsWithAtLeastOneQuiz) * 100)
            : 0,
        colorHex: '#3A4BD4',
        badgeBg: 'bg-[#EDE9FE]',
        badgeText: 'text-[#6636DE]',
      },
      {
        key: 'remedial',
        label: 'Perlu Remedial / Bimbingan',
        rangeText: 'Skor < 75',
        count: remedialCount,
        percentage:
          studentsWithAtLeastOneQuiz > 0
            ? Math.round((remedialCount / studentsWithAtLeastOneQuiz) * 100)
            : 0,
        colorHex: '#BA1A1A',
        badgeBg: 'bg-[#FDE8E8]',
        badgeText: 'text-[#9B1C1C]',
      },
    ],
  };

  // 5. Recent Student Activity Feed (Latest 7 events)
  const [recentQuizzes, recentCompletions] = await Promise.all([
    prisma.userQuizScore.findMany({
      take: 8,
      orderBy: { taken_at: 'desc' },
      include: {
        user: {
          include: { student: true },
        },
      },
    }),
    prisma.userProgress.findMany({
      where: { is_completed: true },
      take: 8,
      orderBy: { completed_at: 'desc' },
      include: {
        user: {
          include: { student: true },
        },
      },
    }),
  ]);

  const rawActivityFeed: RecentActivityItem[] = [];

  for (const q of recentQuizzes) {
    if (!q.user || !q.user.student) continue;
    const grade: RecentActivityItem['scoreGrade'] =
      q.score >= 85 ? 'Sangat Baik' : q.score >= 75 ? 'Lulus KKM' : 'Perlu Remedial';

    rawActivityFeed.push({
      id: `quiz-${q.id}`,
      studentId: q.user.student.id,
      studentName: q.user.student.full_name,
      nis: q.user.student.nis,
      className: q.user.student.class_name,
      imageUrl: q.user.student.image_url,
      activityType: 'QUIZ_SUBMISSION',
      title: 'Evaluasi Pemahaman AI',
      subTitle: `Percobaan ke-${q.attempt_number}`,
      score: q.score,
      isPassed: q.is_passed,
      scoreGrade: grade,
      timestamp: q.taken_at ? q.taken_at.toISOString() : new Date().toISOString(),
      timeAgoText: formatTimeAgo(q.taken_at),
    });
  }

  for (const p of recentCompletions) {
    if (!p.user || !p.user.student) continue;
    rawActivityFeed.push({
      id: `progress-${p.id}`,
      studentId: p.user.student.id,
      studentName: p.user.student.full_name,
      nis: p.user.student.nis,
      className: p.user.student.class_name,
      imageUrl: p.user.student.image_url,
      activityType: 'CHAPTER_COMPLETION',
      title: resolveChapterTitle(p.chapter_key),
      subTitle: 'Menuntaskan Video & Teks Modul',
      score: null,
      isPassed: true,
      scoreGrade: 'Selesai Bab',
      timestamp: p.completed_at
        ? p.completed_at.toISOString()
        : p.updated_at.toISOString(),
      timeAgoText: formatTimeAgo(p.completed_at || p.updated_at),
    });
  }

  // Sort descending by timestamp and take top 7
  rawActivityFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const recentActivities = rawActivityFeed.slice(0, 7);

  // 6. Class Breakdown List
  const classBreakdowns: ClassBreakdownItem[] = Array.from(classMap.values())
    .map((c) => ({
      className: c.className,
      totalStudents: c.total,
      activeStudents: c.active,
      averageProgress:
        c.active > 0 ? parseFloat((c.progressPctSum / c.active).toFixed(1)) : 0,
      averageScore:
        c.quizCount > 0 ? parseFloat((c.quizScoresSum / c.quizCount).toFixed(1)) : 0,
      certifiedCount: c.certifiedCount,
    }))
    .sort((a, b) => a.className.localeCompare(b.className));

  return {
    kpis,
    recentActivities,
    scoreDistribution,
    remedialStudents: remedialStudentsList.slice(0, 6),
    classBreakdowns,
    meta: {
      lastUpdated: new Date().toISOString(),
      totalCourses,
      totalChapters: totalCurriculumChapters,
    },
  };
}
