import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStudentDashboardData } from '@/actions/progressActions';
import {
  StudentSidebar,
  StudentStatsHeader,
  CourseCard,
  EmptyCourseState,
} from '@/app/components/student';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';
import { BookOpen, Sparkles, Trophy } from 'lucide-react';

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(PUBLIC_ROUTES.LOGIN);
  }

  const dashboardData = await getStudentDashboardData(session.user.id);
  const { studentProfile, stats, activeCourses } = dashboardData;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <StudentSidebar />

        {/* Right Main Dashboard Area */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          {/* Header Banner & Metric Stats */}
          <StudentStatsHeader studentProfile={studentProfile} stats={stats} />

          {/* Active Courses Section */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#CAC3D8]/30 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#7F54F8]" />
                <h2 className="text-xl font-bold text-[#061B38]">
                  Modul Pembelajaran Aktif
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A7486]">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#CAC3D8]/40 text-[#061B38]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7F54F8]" />
                  <span>{activeCourses.length} Kursus Diikuti</span>
                </span>
              </div>
            </div>

            {activeCourses.length === 0 ? (
              <EmptyCourseState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCourses.map((course) => (
                  <CourseCard key={course.key} course={course} />
                ))}
              </div>
            )}
          </div>

          {/* Certificate Claim Hint Footer */}
          {stats.certificatesEarnedCount > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E8DEFF] to-[#DFE8FF] border border-[#7F54F8]/30 shadow-subtle flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F54F8] text-white">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#061B38]">
                    Selamat! Kamu Memiliki {stats.certificatesEarnedCount} Sertifikat Kelulusan
                  </span>
                  <span className="text-xs text-[#494455]">
                    Sertifikat resmi terverifikasi QR Code siap diunduh.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
