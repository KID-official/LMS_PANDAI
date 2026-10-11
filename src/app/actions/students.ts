'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getStudents(search = '', status = '', page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const whereCondition: Record<string, unknown> = {
    role: UserRole.SISWA,
  };

  if (search) {
    whereCondition.OR = [
      { identifier: { contains: search } },
      { student: { full_name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (status === 'Aktif') {
    whereCondition.is_active = true;
  } else if (status === 'Nonaktif') {
    whereCondition.is_active = false;
  }

  const [users, total, totalAllStudents, totalActiveStudents, studentsWithProgress] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      include: {
        student: true,
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
        progress: {
          select: { is_completed: true },
        },
      },
    }),
  ]);

  // Persentase jumlah akun aktif dari total semua akun terdaftar
  const activePercentage = totalAllStudents > 0
    ? `${((totalActiveStudents / totalAllStudents) * 100).toFixed(1)}%`
    : '0%';

  // Rata-rata progress belajar siswa (standard kurikulum: 5 modul)
  const TOTAL_MODULES = 5;
  let totalProgressSum = 0;
  if (studentsWithProgress.length > 0) {
    for (const s of studentsWithProgress) {
      const completed = s.progress.filter((p) => p.is_completed).length;
      const percent = Math.min(100, (completed / TOTAL_MODULES) * 100);
      totalProgressSum += percent;
    }
  }
  const averageProgress = studentsWithProgress.length > 0
    ? `${(totalProgressSum / studentsWithProgress.length).toFixed(1)}%`
    : '0%';

  return {
    users,
    total,
    stats: {
      totalAllStudents,
      totalActiveStudents,
      activePercentage,
      averageProgress,
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
