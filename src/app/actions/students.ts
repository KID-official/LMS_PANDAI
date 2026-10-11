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

  const [users, total] = await Promise.all([
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
  ]);

  return { users, total };
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
