'use server';

import { PrismaClient } from '@prisma/client';
import { getAllCourses, getTotalChaptersCount } from '@/data/curriculum';

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
