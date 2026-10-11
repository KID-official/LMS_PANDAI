import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getCourseDetailsWithProgress } from '@/actions/progressActions';
import { getCourseByKey } from '@/data/curriculum';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';
import {
  CourseHeroBanner,
  CourseProgressCard,
  ChapterTimelineList,
  SyllabusSidebarWidgets,
} from '@/app/components/syllabus';

interface CourseDetailPageProps {
  params: {
    courseKey: string;
  };
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const course = getCourseByKey(params.courseKey);
  return {
    title: course
      ? `${course.title} • Silabus Sekuensial | LMS-KID`
      : 'Detail Kursus | LMS-KID',
    description:
      course?.tagline ||
      'Detail kursus dan alur silabus pembelajaran sekuensial LMS-KID',
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  // Query course and progress status
  const courseData = await getCourseDetailsWithProgress(
    params.courseKey,
    session.user.id
  );

  // If course not found, redirect to student dashboard
  if (!courseData || !courseData.course) {
    redirect('/student/dashboard');
  }

  const {
    course,
    chaptersWithStatus,
    completedCount,
    totalChapters,
    progressPercentage,
    activeChapterKey,
    isAllCompleted,
  } = courseData;

  // Compute active & locked counts
  const activeCount = chaptersWithStatus.filter((c) => c.status === 'ACTIVE').length;
  const lockedCount = chaptersWithStatus.filter((c) => c.status === 'LOCKED').length;

  const activeChapter =
    chaptersWithStatus.find((c) => c.key === activeChapterKey) ||
    chaptersWithStatus.find((c) => c.status === 'ACTIVE') ||
    chaptersWithStatus[0];
  const activeChapterNumber = activeChapter?.chapterNumber || 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 lg:gap-8">
      {/* ── 1. Course Hero Banner Section ── */}
      <CourseHeroBanner
        course={course}
        activeChapterKey={activeChapterKey}
        activeChapterNumber={activeChapterNumber}
        totalChapters={totalChapters}
      />

      {/* ── 2. Mobile-Only Progress Card View ── */}
      <div className="block lg:hidden">
        <CourseProgressCard
          courseKey={course.key}
          completedCount={completedCount}
          totalChapters={totalChapters}
          progressPercentage={progressPercentage}
          activeChapterKey={activeChapterKey}
          activeChapterNumber={activeChapterNumber}
          activeCount={activeCount}
          lockedCount={lockedCount}
          isAllCompleted={isAllCompleted}
        />
      </div>

      {/* ── 3. Responsive 12-Column Grid Layout (Desktop: 65% Timeline / 35% Sidebar) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (65% / lg:col-span-8): Sequential Syllabus Timeline */}
        <section className="lg:col-span-8 w-full flex flex-col gap-6">
          <ChapterTimelineList
            courseKey={course.key}
            chaptersWithStatus={chaptersWithStatus}
          />
        </section>

        {/* Right Column (35% / lg:col-span-4): Progress Card & Supporting Widgets */}
        <aside className="lg:col-span-4 w-full flex flex-col gap-6">
          {/* Desktop Progress Card */}
          <div className="hidden lg:block sticky top-24 z-10">
            <CourseProgressCard
              courseKey={course.key}
              completedCount={completedCount}
              totalChapters={totalChapters}
              progressPercentage={progressPercentage}
              activeChapterKey={activeChapterKey}
              activeChapterNumber={activeChapterNumber}
              activeCount={activeCount}
              lockedCount={lockedCount}
              isAllCompleted={isAllCompleted}
            />
          </div>

          {/* Supporting Educational Context & Rule Widgets */}
          <SyllabusSidebarWidgets
            course={course}
            completedCount={completedCount}
            totalChapters={totalChapters}
          />
        </aside>
      </div>
    </div>
  );
}
