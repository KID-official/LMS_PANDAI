'use server';

import { prisma } from '@/lib/prisma';
import { getAllCourses, getTotalChaptersCount, getCourseByKey, Course, Chapter } from '@/data/curriculum';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';


export interface StudentDashboardSummary {
  studentProfile: {
    fullName: string;
    nis: string;
    className: string;
    semester: string;
    imageUrl?: string | null;
  } | null;
  stats: {
    totalHoursWatched: number;
    completedChaptersCount: number;
    totalChaptersCount: number;
    averageQuizScore: number;
    certificatesEarnedCount: number;
  };
  activeCourses: Array<{
    key: string;
    title: string;
    category: string;
    thumbnail: string;
    badge: string;
    completedChaptersCount: number;
    totalChaptersCount: number;
    progressPercentage: number;
    lastAccessedChapterKey?: string;
    isFullyCompleted: boolean;
  }>;
  hasAnyProgress: boolean;
}

export async function getStudentDashboardData(userId: string): Promise<StudentDashboardSummary> {
  try {
    // 1. Query student profile
    const student = await prisma.student.findUnique({
      where: { user_id: userId },
    });

    // 2. Query user progress
    const progressRecords = await prisma.userProgress.findMany({
      where: { user_id: userId },
    });

    // 3. Query user quiz scores
    const quizScores = await prisma.userQuizScore.findMany({
      where: { user_id: userId },
    });

    // 4. Query user certificates
    const certificates = await prisma.certificate.findMany({
      where: { user_id: userId },
    });

    // Calculate overall stats
    const totalWatchSeconds = progressRecords.reduce((acc, curr) => acc + (curr.watch_seconds || 0), 0);
    const totalHoursWatched = parseFloat((totalWatchSeconds / 3600).toFixed(1));

    const passedQuizKeys = new Set(quizScores.filter((s) => s.is_passed).map((s) => s.quiz_key));
    const isChapterCompletedFn = (ch: Chapter, pRecord?: { is_completed: boolean }) => {
      if (ch.hasQuiz && ch.quizKey) {
        return passedQuizKeys.has(ch.quizKey);
      }
      return !!pRecord?.is_completed;
    };

    const progressMapForDash = new Map(progressRecords.map((p) => [p.chapter_key, p]));

    const totalQuizScoresSum = quizScores.reduce((acc, curr) => acc + curr.score, 0);
    const averageQuizScore = quizScores.length > 0 ? Math.round(totalQuizScoresSum / quizScores.length) : 0;
    const certificatesEarnedCount = certificates.length;

    const allCourses = getAllCourses();
    const totalChaptersAll = getTotalChaptersCount();

    let totalCompletedChaptersAll = 0;

    // Map progress to active courses
    const activeCoursesMap = allCourses
      .map((course) => {
        const courseChapterKeys = new Set(course.chapters.map((ch) => ch.key));
        
        // Filter progress records belonging to this course
        const courseProgress = progressRecords.filter((p) => courseChapterKeys.has(p.chapter_key));
        const courseCompletedChapters = course.chapters.filter((ch) =>
          isChapterCompletedFn(ch, progressMapForDash.get(ch.key))
        ).length;

        totalCompletedChaptersAll += courseCompletedChapters;

        const totalCourseChapters = course.chapters.length;
        const progressPercentage = totalCourseChapters > 0
          ? Math.min(100, Math.round((courseCompletedChapters / totalCourseChapters) * 100))
          : 0;

        // Find last accessed chapter
        const sortedProgress = [...courseProgress].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        const lastRecord = sortedProgress[0];

        const hasStartedCourse = courseProgress.length > 0 || courseCompletedChapters > 0;

        return {
          key: course.key,
          title: course.title,
          category: course.category,
          thumbnail: course.thumbnail,
          badge: course.badge,
          completedChaptersCount: courseCompletedChapters,
          totalChaptersCount: totalCourseChapters,
          progressPercentage,
          lastAccessedChapterKey: lastRecord?.chapter_key || course.chapters[0]?.key,
          isFullyCompleted: courseCompletedChapters === totalCourseChapters && totalCourseChapters > 0,
          hasStartedCourse,
          lastAccessedAt: lastRecord ? new Date(lastRecord.updated_at).getTime() : 0,
        };
      })
      .filter((course) => course.hasStartedCourse)
      .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt);

    const completedChaptersCount = totalCompletedChaptersAll;

    const hasAnyProgress = progressRecords.length > 0 || quizScores.length > 0 || certificates.length > 0;

    return {
      studentProfile: student
        ? {
            fullName: student.full_name,
            nis: student.nis,
            className: 'Siswa Terdaftar',
            semester: 'Aktif',
            imageUrl: student.image_url,
          }
        : null,
      stats: {
        totalHoursWatched,
        completedChaptersCount,
        totalChaptersCount: totalChaptersAll,
        averageQuizScore,
        certificatesEarnedCount,
      },
      activeCourses: activeCoursesMap.map((c) => ({
        key: c.key,
        title: c.title,
        category: c.category,
        thumbnail: c.thumbnail,
        badge: c.badge,
        completedChaptersCount: c.completedChaptersCount,
        totalChaptersCount: c.totalChaptersCount,
        progressPercentage: c.progressPercentage,
        lastAccessedChapterKey: c.lastAccessedChapterKey,
        isFullyCompleted: c.isFullyCompleted,
      })),
      hasAnyProgress,
    };
  } catch (error) {
    console.error('Error fetching student dashboard data:', error);
    return {
      studentProfile: null,
      stats: {
        totalHoursWatched: 0,
        completedChaptersCount: 0,
        totalChaptersCount: getTotalChaptersCount(),
        averageQuizScore: 0,
        certificatesEarnedCount: 0,
      },
      activeCourses: [],
      hasAnyProgress: false,
    };
  }
}

export type ChapterProgressStatus = 'COMPLETED' | 'ACTIVE' | 'LOCKED';

export interface ChapterWithStatus extends Chapter {
  status: ChapterProgressStatus;
  isCompleted: boolean;
  isLocked: boolean;
  isActive: boolean;
  watchSeconds: number;
  completedAt?: Date | null;
}

export interface CourseWithProgressDetails {
  course: Course;
  chaptersWithStatus: ChapterWithStatus[];
  completedCount: number;
  totalChapters: number;
  progressPercentage: number;
  activeChapterKey: string;
  isAllCompleted: boolean;
}

export async function markChapterCompletedAction(
  courseKey: string,
  chapterKey: string,
  watchSeconds: number
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const userId = session.user.id;

    // Check if chapter has quiz: if so, completion must be earned through passing the quiz
    const course = getCourseByKey(courseKey);
    const chapter = course?.chapters.find((c) => c.key === chapterKey);
    if (chapter?.hasQuiz) {
      return {
        success: false,
        error: 'Bab ini memiliki kuis evaluasi. Bab akan tuntas secara otomatis setelah Anda lulus kuis (nilai minimal 75).',
      };
    }

    await prisma.userProgress.upsert({
      where: {
        user_id_chapter_key: {
          user_id: userId,
          chapter_key: chapterKey,
        },
      },
      update: {
        is_completed: true,
        watch_seconds: Math.max(watchSeconds, 1),
        completed_at: new Date(),
      },
      create: {
        user_id: userId,
        chapter_key: chapterKey,
        is_completed: true,
        watch_seconds: Math.max(watchSeconds, 1),
        completed_at: new Date(),
      },
    });

    try {
      revalidatePath('/student/dashboard');
      revalidatePath(`/student/courses/${courseKey}`);
      revalidatePath(`/student/courses/${courseKey}/chapter/${chapterKey}`);
    } catch {
      // Ignore if called outside server request context
    }

    return { success: true };
  } catch (error) {
    console.error('Error marking chapter completed:', error);
    return { success: false, error: 'Gagal memperbarui progres bab.' };
  }
}

export async function recordChapterAccessAction(
  courseKey: string,
  chapterKey: string,
  userId?: string
) {
  try {
    let targetUserId = userId;
    if (!targetUserId) {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return { success: false, error: 'Unauthorized' };
      }
      targetUserId = session.user.id;
    }

    await prisma.userProgress.upsert({
      where: {
        user_id_chapter_key: {
          user_id: targetUserId,
          chapter_key: chapterKey,
        },
      },
      update: {
        updated_at: new Date(),
      },
      create: {
        user_id: targetUserId,
        chapter_key: chapterKey,
        is_completed: false,
        watch_seconds: 0,
      },
    });

    try {
      revalidatePath('/student/dashboard');
      revalidatePath(`/student/courses/${courseKey}`);
    } catch {
      // Ignore if called outside server request context
    }

    return { success: true };
  } catch (error) {
    console.error('Error recording chapter access:', error);
    return { success: false, error: 'Failed to record chapter access' };
  }
}

export async function updateWatchSecondsAction(
  courseKey: string,
  chapterKey: string,
  watchSeconds: number
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return { success: false };

    await prisma.userProgress.upsert({
      where: {
        user_id_chapter_key: {
          user_id: session.user.id,
          chapter_key: chapterKey,
        },
      },
      update: {
        watch_seconds: watchSeconds,
        updated_at: new Date(),
      },
      create: {
        user_id: session.user.id,
        chapter_key: chapterKey,
        is_completed: false,
        watch_seconds: watchSeconds,
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function getCourseDetailsWithProgress(
  courseKey: string,
  userId: string
): Promise<CourseWithProgressDetails | null> {
  try {
    const course = getCourseByKey(courseKey);
    if (!course) return null;

    const userProgressRecords = await prisma.userProgress.findMany({
      where: { user_id: userId },
    });

    const userQuizScores = await prisma.userQuizScore.findMany({
      where: {
        user_id: userId,
        is_passed: true,
      },
    });
    const passedQuizKeys = new Set(userQuizScores.map((q) => q.quiz_key));

    const progressMap = new Map(
      userProgressRecords.map((p) => [p.chapter_key, p])
    );

    let foundFirstIncomplete = false;
    let completedCount = 0;
    let activeChapterKey = course.chapters[0]?.key || '';

    const chaptersWithStatus: ChapterWithStatus[] = [];

    for (let index = 0; index < course.chapters.length; index++) {
      const ch = course.chapters[index];
      const record = progressMap.get(ch.key);

      const isQuizPassed = ch.hasQuiz && ch.quizKey ? passedQuizKeys.has(ch.quizKey) : true;
      const isCompleted = ch.hasQuiz && ch.quizKey ? isQuizPassed : !!record?.is_completed;
      const watchSeconds = record?.watch_seconds || 0;
      const completedAt = record?.completed_at || null;

      // Auto-sync record di database jika status is_completed berbeda dengan kelulusan kuis
      if (record && record.is_completed !== isCompleted) {
        prisma.userProgress
          .update({
            where: { id: record.id },
            data: { is_completed: isCompleted },
          })
          .catch(() => {});
      }

      if (isCompleted) {
        completedCount++;
        chaptersWithStatus.push({
          ...ch,
          status: 'COMPLETED' as ChapterProgressStatus,
          isCompleted: true,
          isLocked: false,
          isActive: false,
          watchSeconds,
          completedAt,
        });
        continue;
      }

      // Sequential rule:
      // Bab 0 selalu terbuka (ACTIVE jika belum tuntas).
      // Bab i terbuka (ACTIVE) HANYA jika Bab i-1 telah TUNTAS (lulus kuis).
      const prevChapterStatus = index > 0 ? chaptersWithStatus[index - 1] : null;
      const isPrevCompleted = index === 0 || !!prevChapterStatus?.isCompleted;

      if (isPrevCompleted) {
        const isActive = !foundFirstIncomplete;
        if (isActive) {
          foundFirstIncomplete = true;
          activeChapterKey = ch.key;
        }
        chaptersWithStatus.push({
          ...ch,
          status: 'ACTIVE' as ChapterProgressStatus,
          isCompleted: false,
          isLocked: false,
          isActive,
          watchSeconds,
          completedAt,
        });
      } else {
        // Jika bab sebelumnya belum tuntas / lulus kuis, bab ini TERKUNCI (LOCKED)
        chaptersWithStatus.push({
          ...ch,
          status: 'LOCKED' as ChapterProgressStatus,
          isCompleted: false,
          isLocked: true,
          isActive: false,
          watchSeconds,
          completedAt,
        });
      }
    }

    const totalChapters = course.chapters.length;
    const progressPercentage =
      totalChapters > 0
        ? Math.min(100, Math.round((completedCount / totalChapters) * 100))
        : 0;

    const isAllCompleted = completedCount === totalChapters && totalChapters > 0;

    return {
      course,
      chaptersWithStatus,
      completedCount,
      totalChapters,
      progressPercentage,
      activeChapterKey,
      isAllCompleted,
    };
  } catch (error) {
    console.error('Error fetching course details with progress:', error);
    return null;
  }
}

