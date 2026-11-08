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
import { BookOpen } from 'lucide-react';

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

  // Determine primary active / last accessed course
  const lastAccessedCourse = activeCourses.length > 0 ? activeCourses[0] : null;

  // Count fully completed courses
  const completedCoursesCount = activeCourses.filter((c) => c.isFullyCompleted).length;

  // Real certificate items and count
  const certificateItems = certificatesData.success ? certificatesData.items : [];
  const claimedCertificatesCount =
    certificatesData.stats?.totalCertificates ??
    certificateItems.filter((c) => c.status === 'CLAIMED').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Section B: Welcome Hero Banner (Full Width) */}
      <section aria-label="Welcome Hero">
        <StudentBannerHeader studentProfile={studentProfile} />
      </section>

      {/* Sections C, D, F: Main Learning Section */}
      <section aria-label="Main Learning Dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols on desktop): Course Saya (Large Horizontal Card) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F1EDFF] text-[#7950F2]">
                <BookOpen className="h-4.5 w-4.5 text-[#7950F2]" />
              </div>
              <h2 className="text-xl font-extrabold text-[#172554]">
                Course Saya
              </h2>
            </div>

            {activeCourses.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-[#F1EDFF] text-[#7950F2] text-xs font-bold">
                {activeCourses.length} Course Aktif
              </span>
            )}
          </div>

          {/* Large Horizontal Ongoing-Course Card */}
          {lastAccessedCourse ? (
            <LastAccessedCourseWidget lastCourse={lastAccessedCourse} />
          ) : (
            <EmptyCourseState />
          )}

          {/* Additional Ongoing Courses if enrolled in more than one */}
          {activeCourses.length > 1 && (
            <div className="flex flex-col gap-3 pt-2">
              <h3 className="text-xs font-bold text-[#7B8198] uppercase tracking-wider px-1">
                Course Lainnya yang Sedang Diambil
              </h3>
              <div className="flex flex-col gap-3">
                {activeCourses.slice(1).map((course) => (
                  <CourseCard key={course.key} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 cols on desktop): Jadwal Belajar & E-Sertifikat */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Section D: Jadwal Belajar */}
          <StudentDateWidget />

          {/* Section F: Certificate (Lightweight, Non-Dominating) */}
          <StudentAchievementWidget
            completedCoursesCount={completedCoursesCount}
            totalCertificatesCount={claimedCertificatesCount}
            certificates={certificateItems}
          />
        </div>

      </section>

      {/* Section E: Rekomendasi Course Pilihan (Full Width Responsive Grid) */}
      <section aria-label="Rekomendasi Course">
        <StudentRecommendedCoursesWidget />
      </section>

    </div>
  );
}
