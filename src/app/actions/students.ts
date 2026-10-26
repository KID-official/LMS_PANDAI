'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const TOTAL_CHAPTERS = 7;

export async function getStudents(search = '', status = '', page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const whereCondition: Record<string, unknown> = {
    role: UserRole.SISWA,
  };

  if (search) {
    whereCondition.OR = [
      { identifier: { contains: search, mode: 'insensitive' } },
      { student: { full_name: { contains: search, mode: 'insensitive' } } },
      { student: { nis: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (status === 'Aktif') {
    whereCondition.is_active = true;
  } else if (status === 'Nonaktif') {
    whereCondition.is_active = false;
  }

  const [rawUsers, total, totalAllStudents, totalActiveStudents, allStudentsProgress] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      include: {
        student: true,
        progress: {
          where: {
            is_completed: true,
            NOT: { chapter_key: { startsWith: 'quiz_unlock:' } },
          },
        },
        quiz_scores: {
          orderBy: { taken_at: 'desc' },
        },
      },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    prisma.user.count({ where: whereCondition }),
    prisma.user.count({ where: { role: UserRole.SISWA } }),
    prisma.user.count({ where: { role: UserRole.SISWA, is_active: true } }),
    prisma.user.findMany({
      where: { role: UserRole.SISWA },
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
        quiz_scores: {
          orderBy: { taken_at: 'desc' },
          take: 1,
          select: { is_passed: true, score: true },
        },
      },
    }),
  ]);

  // Transform raw users to include progress calculations
  const users = rawUsers.map((user) => {
    const completedChaptersCount = user.progress.length;
    const progressPercentage = Math.min(100, Math.round((completedChaptersCount / TOTAL_CHAPTERS) * 100));

    return {
      id: user.id,
      identifier: user.identifier,
      is_active: user.is_active,
      student: user.student,
      completedChaptersCount,
      totalChapters: TOTAL_CHAPTERS,
      progressPercentage,
    };
  });

  // Persentase jumlah akun aktif dari total semua akun terdaftar
  const activePercentage = totalAllStudents > 0
    ? `${((totalActiveStudents / totalAllStudents) * 100).toFixed(1)}%`
    : '0%';

  // Total modul tuntas dikerjakan seluruh siswa
  let totalCompletedModules = 0;
  let totalProgressSum = 0;
  let remedialCount = 0;

  for (const s of allStudentsProgress) {
    const validCount = s.progress.length;
    totalCompletedModules += validCount;
    const percent = Math.min(100, Math.round((validCount / TOTAL_CHAPTERS) * 100));
    totalProgressSum += percent;

    // Remedial condition: siswa aktif dengan progress < 20% ATAU kuis terakhir belum lulus
    if (s.is_active) {
      const latestQuiz = s.quiz_scores[0];
      const hasFailedQuiz = latestQuiz ? !latestQuiz.is_passed : false;
      if (percent < 20 || hasFailedQuiz) {
        remedialCount++;
      }
    }
  }

  const averageProgress = allStudentsProgress.length > 0
    ? `${(totalProgressSum / allStudentsProgress.length).toFixed(1)}%`
    : '0%';

  return {
    users,
    total,
    stats: {
      totalAllStudents,
      totalActiveStudents,
      activePercentage,
      averageProgress,
      totalCompletedModules,
      remedialCount,
    },
  };
}

export async function createStudent(data: { nis: string; fullName: string; className: string; semester: string; password?: string }) {
  const passwordHash = await bcrypt.hash(data.password || 'siswa123', 10);

  await prisma.user.create({
    data: {
      identifier: data.nis,
      password_hash: passwordHash,
      role: UserRole.SISWA,
      is_active: true,
      student: {
        create: {
          nis: data.nis,
          full_name: data.fullName,
          class_name: data.className,
          semester: data.semester,
        },
      },
    },
  });

  revalidatePath('/guru/students');
}

export async function updateStudent(id: string, data: { nis: string; fullName: string; className: string; semester: string; isActive: boolean }) {
  await prisma.user.update({
    where: { id },
    data: {
      identifier: data.nis,
      is_active: data.isActive,
      student: {
        update: {
          nis: data.nis,
          full_name: data.fullName,
          class_name: data.className,
          semester: data.semester,
        },
      },
    },
  });

  revalidatePath('/guru/students');
}

export async function deleteStudent(id: string) {
  await prisma.user.delete({
    where: { id },
  });
  revalidatePath('/guru/students');
}
