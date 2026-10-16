import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStudentDashboardData } from '@/actions/progressActions';
import { getStudentCertificatesListAction } from '@/actions/certificateActions';
import {
  StudentBannerHeader,
  StudentDateWidget,
  StudentAchievementWidget,
  StudentRecommendedCoursesWidget,
  LastAccessedCourseWidget,
  CourseCard,
  EmptyCourseState,
} from '@/app/components/student';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';
import { BookOpen, Sparkles } from 'lucide-react';

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  const [dashboardData, certificatesData] = await Promise.all([
    getStudentDashboardData(session.user.id),
    getStudentCertificatesListAction(),
  ]);
  const { studentProfile, activeCourses } = dashboardData;

  // Determine last accessed course (or null if no active course)
  const lastAccessedCourse = activeCourses.length > 0 ? activeCourses[0] : null;

  // Count fully completed courses for achievement stats
  const completedCoursesCount = activeCourses.filter((c) => c.isFullyCompleted).length;

  // Real certificate items and count
  const certificateItems = certificatesData.success ? certificatesData.items : [];
  const claimedCertificatesCount =
    certificatesData.stats?.totalCertificates ??
    certificateItems.filter((c) => c.status === 'CLAIMED').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      
      {/* Top Row: Div 1 (Welcome Banner Header) & Div 2 (Live Date Widget) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {/* Div 1: Welcome Greeting Banner Header */}
        <div className="lg:col-span-4">
          <StudentBannerHeader studentProfile={studentProfile} />
        </div>

        {/* Div 2: Live Date & Schedule Info Widget */}
        <div className="lg:col-span-1">
          <StudentDateWidget />
        </div>
      </div>

      {/* Middle Row Section: Combined 1 Row Div Wrapper for Div 3, 4, 5 (Full Container Height & Scrollable Content) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch lg:h-[460px]">
        
        {/* Div 3: List Course yang Pernah / Sedang Diambil (2 Cols) */}
        <div className="lg:col-span-2 h-full min-h-0">
          <div className="h-full rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-4 overflow-hidden">
            {/* Header Title */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#CAC3D8]/30 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#7F54F8]" />
                <h3 className="text-base font-bold text-[#061B38]">
                  Course yang Pernah &amp; Sedang Diambil
                </h3>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8DEFF] text-[#5010C8] text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{activeCourses.length} Course</span>
              </span>
            </div>

            {/* Course Cards List or Empty State (Scrollable when exceeding container height) */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
              {activeCourses.length === 0 ? (
                <EmptyCourseState />
              ) : (
                activeCourses.map((course) => (
                  <CourseCard key={course.key} course={course} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Div 4: Course Terakhir yang Diakses / Dikerjakan (2 Cols) */}
        <div className="lg:col-span-2 h-full min-h-0">
          <LastAccessedCourseWidget lastCourse={lastAccessedCourse} />
        </div>

        {/* Div 5: Ringkasan Pencapaian & Status Sertifikat Siswa (1 Col) */}
        <div className="lg:col-span-1 h-full min-h-0">
          <StudentAchievementWidget
            completedCoursesCount={completedCoursesCount}
            totalCertificatesCount={claimedCertificatesCount}
            certificates={certificateItems}
          />
        </div>

      </div>

      {/* Bottom Section: Div 6 Rekomendasi Course (Full Width 5 Cols) */}
      <div className="w-full">
        <StudentRecommendedCoursesWidget />
      </div>

    </div>
  );
}
