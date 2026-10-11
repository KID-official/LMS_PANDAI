'use server';

import { PrismaClient } from '@prisma/client';
import { getAllCourses, getTotalChaptersCount, getCourseByKey, Course, Chapter } from '@/data/curriculum';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

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
    const completedChaptersCount = progressRecords.filter((p) => p.is_completed).length;

    const totalQuizScoresSum = quizScores.reduce((acc, curr) => acc + curr.score, 0);
    const averageQuizScore = quizScores.length > 0 ? Math.round(totalQuizScoresSum / quizScores.length) : 0;
    const certificatesEarnedCount = certificates.length;

    const allCourses = getAllCourses();
    const totalChaptersAll = getTotalChaptersCount();

    // Map progress to active courses
    const activeCoursesMap = allCourses
      .map((course) => {
        const courseChapterKeys = new Set(course.chapters.map((ch) => ch.key));
        
        // Filter progress records belonging to this course
        const courseProgress = progressRecords.filter((p) => courseChapterKeys.has(p.chapter_key));
        const courseCompletedChapters = courseProgress.filter((p) => p.is_completed).length;

        const totalCourseChapters = course.chapters.length;
        const progressPercentage = totalCourseChapters > 0
          ? Math.min(100, Math.round((courseCompletedChapters / totalCourseChapters) * 100))
          : 0;

        // Find last accessed chapter
        const lastRecord = courseProgress.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )[0];

        const hasStartedCourse = courseProgress.length > 0;

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
        };
      })
      .filter((course) => course.hasStartedCourse);

    const hasAnyProgress = progressRecords.length > 0 || quizScores.length > 0 || certificates.length > 0;

    return {
      studentProfile: student
        ? {
            fullName: student.full_name,
            nis: student.nis,
            className: student.class_name,
            semester: student.semester,
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

    revalidatePath('/student/dashboard');
    revalidatePath(`/student/courses/${courseKey}`);
    revalidatePath(`/student/courses/${courseKey}/chapter/${chapterKey}`);

    return { success: true };
  } catch (error) {
    console.error('Error marking chapter completed:', error);
    return { success: false, error: 'Gagal memperbarui progres bab.' };
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

    const progressMap = new Map(
      userProgressRecords.map((p) => [p.chapter_key, p])
    );

    let foundFirstIncomplete = false;
    let completedCount = 0;
    let activeChapterKey = course.chapters[0]?.key || '';

    const chaptersWithStatus: ChapterWithStatus[] = course.chapters.map(
      (ch, index) => {
        const record = progressMap.get(ch.key);
        const isCompleted = !!record?.is_completed;
        const watchSeconds = record?.watch_seconds || 0;
        const completedAt = record?.completed_at || null;

        if (isCompleted) {
          completedCount++;
          return {
            ...ch,
            status: 'COMPLETED' as ChapterProgressStatus,
            isCompleted: true,
            isLocked: false,
            isActive: false,
            watchSeconds,
            completedAt,
          };
        }

        // Sequential rule:
        // Chapter 0 is unlocked.
        // Chapter i is unlocked if Chapter i-1 was completed.
        const prevChapter = index > 0 ? course.chapters[index - 1] : null;
        const prevRecord = prevChapter ? progressMap.get(prevChapter.key) : null;
        const isPrevCompleted = index === 0 || !!prevRecord?.is_completed;

        if (isPrevCompleted) {
          const isActive = !foundFirstIncomplete;
          if (isActive) {
            foundFirstIncomplete = true;
            activeChapterKey = ch.key;
          }
          return {
            ...ch,
            status: 'ACTIVE' as ChapterProgressStatus,
            isCompleted: false,
            isLocked: false,
            isActive,
            watchSeconds,
            completedAt,
          };
        }

        // Otherwise locked
        return {
          ...ch,
          status: 'LOCKED' as ChapterProgressStatus,
          isCompleted: false,
          isLocked: true,
          isActive: false,
          watchSeconds,
          completedAt,
        };
      }
    );

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

