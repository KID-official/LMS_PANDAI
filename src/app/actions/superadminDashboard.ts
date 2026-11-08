'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { getAllCourses, getTotalChaptersCount } from '@/data/curriculum';

export interface SuperadminKpiData {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalSuperAdmins: number;
  activeTeachersCount: number;
  activeStudentsCount: number;
  activeRate: number;
  totalCertificates: number;
  certifiedStudentsCount: number;
  totalClassesCount: number;
}

export interface RecentUserItem {
  userId: string;
  identifier: string;
  name: string;
  role: 'SUPER_ADMIN' | 'GURU' | 'SISWA';
  identityNumber: string;
  organization: string;
  isActive: boolean;
  createdAt: string;
  timeAgo: string;
}

export interface TeacherOverviewItem {
  id: string;
  userId: string;
  name: string;
  nip: string;
  email: string;
  institution: string;
  position: string;
  isActive: boolean;
  createdAt: string;
}

export interface ClassSummaryItem {
  className: string;
  studentCount: number;
  activeCount: number;
  averageProgress: number;
  certifiedCount: number;
}

export interface SystemHealthData {
  dbStatus: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  totalProgressRows: number;
  totalQuizRows: number;
  storageEngine: string;
  lastSync: string;
}

export interface SuperadminDashboardData {
  kpis: SuperadminKpiData;
  recentUsers: RecentUserItem[];
  teachers: TeacherOverviewItem[];
  classSummaries: ClassSummaryItem[];
  health: SystemHealthData;
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
 * Primary Server Action for Super Admin Dashboard
 */
export async function getSuperadminDashboardDataAction(): Promise<SuperadminDashboardData> {
  // Authorization check
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    // Request scope not active (e.g. script / static execution)
  }

  if (session?.user && session.user.role === UserRole.SISWA) {
    throw new Error('Unauthorized: Siswa tidak diizinkan mengakses dashboard super admin');
  }

  const totalCurriculumChapters = getTotalChaptersCount() || 7;
  const totalCourses = getAllCourses().length || 2;

  // 1. Fetch Parallel Aggregates
  const [
    allUsers,
    roleCounts,
    teachersList,
    studentsList,
    certificatesCount,
    totalProgressRows,
    totalQuizRows,
    recentUserRecords,
  ] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        role: true,
        is_active: true,
      },
    }),
    prisma.user.groupBy({
      by: ['role'],
      _count: { id: true },
    }),
    prisma.teacher.findMany({
      include: {
        user: {
          select: {
            id: true,
            is_active: true,
            created_at: true,
          },
        },
      },
      orderBy: { user: { created_at: 'desc' } },
    }),
    prisma.student.findMany({
      include: {
        user: {
          select: {
            id: true,
            is_active: true,
            progress: {
              where: {
                is_completed: true,
                NOT: { chapter_key: { startsWith: 'quiz_unlock:' } },
              },
              select: { id: true },
            },
            certificates: {
              select: { id: true },
            },
          },
        },
      },
      orderBy: { nis: 'asc' },
    }),
    prisma.certificate.count(),
    prisma.userProgress.count(),
    prisma.userQuizScore.count(),
    prisma.user.findMany({
      take: 8,
      orderBy: { created_at: 'desc' },
      include: {
        student: true,
        teacher: true,
      },
    }),
  ]);

  // 2. Compute Roles & KPIs
  const totalUsers = allUsers.length;
  const totalActiveUsers = allUsers.filter((u) => u.is_active).length;
  const activeRate =
    totalUsers > 0 ? parseFloat(((totalActiveUsers / totalUsers) * 100).toFixed(1)) : 100;

  let totalStudents = 0;
  let totalTeachers = 0;
  let totalSuperAdmins = 0;

  for (const rc of roleCounts) {
    if (rc.role === UserRole.SISWA) totalStudents = rc._count.id;
    if (rc.role === UserRole.GURU) totalTeachers = rc._count.id;
    if (rc.role === UserRole.SUPER_ADMIN) totalSuperAdmins = rc._count.id;
  }

  const activeTeachersCount = teachersList.filter((t) => t.user?.is_active).length;
  const activeStudentsCount = studentsList.filter((s) => s.user?.is_active).length;

  // 3. Compute Class Summaries
  const classMap = new Map<
    string,
    {
      className: string;
      studentCount: number;
      activeCount: number;
      progressSum: number;
      certifiedCount: number;
    }
  >();

  for (const s of studentsList) {
    const cName = 'Siswa Terdaftar';
    if (!classMap.has(cName)) {
      classMap.set(cName, {
        className: cName,
        studentCount: 0,
        activeCount: 0,
        progressSum: 0,
        certifiedCount: 0,
      });
    }
    const entry = classMap.get(cName)!;
    entry.studentCount += 1;
    if (s.user?.is_active) entry.activeCount += 1;

    const completed = s.user?.progress?.length || 0;
    const progressPct = Math.min(
      100,
      parseFloat(((completed / totalCurriculumChapters) * 100).toFixed(1))
    );
    entry.progressSum += progressPct;

    if (s.user?.certificates && s.user.certificates.length > 0) {
      entry.certifiedCount += 1;
    }
  }

  const classSummaries: ClassSummaryItem[] = Array.from(classMap.values())
    .map((c) => ({
      className: c.className,
      studentCount: c.studentCount,
      activeCount: c.activeCount,
      averageProgress:
        c.activeCount > 0 ? parseFloat((c.progressSum / c.activeCount).toFixed(1)) : 0,
      certifiedCount: c.certifiedCount,
    }))
    .sort((a, b) => a.className.localeCompare(b.className));

  const kpis: SuperadminKpiData = {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalSuperAdmins,
    activeTeachersCount,
    activeStudentsCount,
    activeRate,
    totalCertificates: certificatesCount,
    certifiedStudentsCount: certificatesCount,
    totalClassesCount: classSummaries.length,
  };

  // 4. Map Recent Users
  const recentUsers: RecentUserItem[] = recentUserRecords.map((u) => {
    let name = 'Super Administrator';
    let idNumber = '-';
    let org = 'PANDAI LEARNING Platform';

    if (u.role === UserRole.SISWA && u.student) {
      name = u.student.full_name;
      idNumber = `NIS: ${u.student.nis}`;
      org = 'Siswa Terdaftar';
    } else if (u.role === UserRole.GURU && u.teacher) {
      name = u.teacher.full_name_with_title;
      idNumber = `NIP: ${u.teacher.nip_nidn}`;
      org = 'Tenaga Pendidik';
    }

    return {
      userId: u.id,
      identifier: u.identifier,
      name,
      role: u.role,
      identityNumber: idNumber,
      organization: org,
      isActive: u.is_active,
      createdAt: u.created_at ? u.created_at.toISOString() : new Date().toISOString(),
      timeAgo: formatTimeAgo(u.created_at),
    };
  });

  // 5. Map Teachers Overview
  const teachers: TeacherOverviewItem[] = teachersList.map((t) => ({
    id: t.id,
    userId: t.user_id,
    name: t.full_name_with_title,
    nip: t.nip_nidn,
    email: t.official_email,
    institution: '-',
    position: 'Tenaga Pendidik',
    isActive: t.user?.is_active ?? true,
    createdAt: t.user?.created_at ? t.user.created_at.toISOString() : new Date().toISOString(),
  }));

  // 6. System Health
  const health: SystemHealthData = {
    dbStatus: 'ONLINE',
    totalProgressRows,
    totalQuizRows,
    storageEngine: 'Canvas + jsPDF (Serverless Engine)',
    lastSync: new Date().toISOString(),
  };

  return {
    kpis,
    recentUsers,
    teachers,
    classSummaries,
    health,
    meta: {
      lastUpdated: new Date().toISOString(),
      totalCourses,
      totalChapters: totalCurriculumChapters,
    },
  };
}
