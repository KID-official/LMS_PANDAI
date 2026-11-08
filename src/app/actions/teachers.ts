'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

/**
 * Authorization Guard:
 * Hanya role SUPER_ADMIN atau GURU yang dapat mengakses data guru.
 */
export async function requireSuperAdminOrGuru() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: Silakan masuk terlebih dahulu');
  }

  const role = session.user.role;
  if (role !== UserRole.SUPER_ADMIN && role !== UserRole.GURU) {
    throw new Error('Unauthorized: Akses ditolak');
  }

  return session.user;
}

export interface TeacherRow {
  userId: string;
  teacherId: string;
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface TeachersResult {
  teachers: TeacherRow[];
  total: number;
  stats: {
    totalTeachers: number;
    activeTeachers: number;
    inactiveTeachers: number;
  };
}

/**
 * 1. getTeachers
 * Mengambil daftar guru dengan pencarian, filter status, dan pagination
 */
export async function getTeachers(
  search = '',
  status = '',
  page = 1,
  limit = 10
): Promise<TeachersResult> {
  await requireSuperAdminOrGuru();

  const skip = (page - 1) * limit;

  const whereCondition: Record<string, unknown> = {
    role: UserRole.GURU,
  };

  if (status === 'Aktif') {
    whereCondition.is_active = true;
  } else if (status === 'Nonaktif') {
    whereCondition.is_active = false;
  }

  if (search) {
    whereCondition.OR = [
      { identifier: { contains: search, mode: 'insensitive' } },
      {
        teacher: {
          OR: [
            { full_name_with_title: { contains: search, mode: 'insensitive' } },
            { nip_nidn: { contains: search, mode: 'insensitive' } },
            { official_email: { contains: search, mode: 'insensitive' } },
          ],
        },
      },
    ];
  }

  const [users, total, totalTeachers, activeTeachers] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      include: {
        teacher: true,
      },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    prisma.user.count({ where: whereCondition }),
    prisma.user.count({ where: { role: UserRole.GURU } }),
    prisma.user.count({ where: { role: UserRole.GURU, is_active: true } }),
  ]);

  const teacherRows: TeacherRow[] = users.map((u) => ({
    userId: u.id,
    teacherId: u.teacher?.id || '',
    nipNidn: u.teacher?.nip_nidn || '-',
    fullNameWithTitle: u.teacher?.full_name_with_title || u.identifier,
    officialEmail: u.teacher?.official_email || u.identifier,
    imageUrl: u.teacher?.image_url || null,
    isActive: u.is_active,
    createdAt: u.created_at,
  }));

  return {
    teachers: teacherRows,
    total,
    stats: {
      totalTeachers,
      activeTeachers,
      inactiveTeachers: totalTeachers - activeTeachers,
    },
  };
}

/**
 * 2. createTeacher
 * Membuat akun guru baru beserta profil teacher (hanya nama, email, password, nip)
 */
export async function createTeacher(data: {
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  password?: string;
}) {
  await requireSuperAdminOrGuru();

  // Validasi unik NIP dan Email
  const existingUser = await prisma.user.findUnique({
    where: { identifier: data.officialEmail },
  });
  if (existingUser) {
    throw new Error(`Email ${data.officialEmail} sudah terdaftar dalam sistem.`);
  }

  const existingNip = await prisma.teacher.findUnique({
    where: { nip_nidn: data.nipNidn },
  });
  if (existingNip) {
    throw new Error(`NIP/NIDN ${data.nipNidn} sudah terdaftar dalam sistem.`);
  }

  const passwordHash = await bcrypt.hash(data.password || 'guru123', 10);

  await prisma.user.create({
    data: {
      identifier: data.officialEmail,
      password_hash: passwordHash,
      role: UserRole.GURU,
      is_active: true,
      teacher: {
        create: {
          nip_nidn: data.nipNidn,
          full_name_with_title: data.fullNameWithTitle,
          official_email: data.officialEmail,
        },
      },
    },
  });

  revalidatePath('/superadmin/teachers');
  return { success: true, message: 'Guru baru berhasil ditambahkan!' };
}

/**
 * 3. updateTeacher
 * Memperbarui data profil dan status guru (hanya nama, email, password, nip)
 */
export async function updateTeacher(
  userId: string,
  data: {
    nipNidn: string;
    fullNameWithTitle: string;
    officialEmail: string;
    isActive?: boolean;
    password?: string;
  }
) {
  await requireSuperAdminOrGuru();

  const updateUserData: Record<string, unknown> = {
    identifier: data.officialEmail,
    ...(data.isActive !== undefined ? { is_active: data.isActive } : {}),
    teacher: {
      update: {
        nip_nidn: data.nipNidn,
        full_name_with_title: data.fullNameWithTitle,
        official_email: data.officialEmail,
      },
    },
  };

  if (data.password && data.password.trim() !== '') {
    updateUserData.password_hash = await bcrypt.hash(data.password, 10);
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateUserData,
  });

  revalidatePath('/superadmin/teachers');
  return { success: true, message: 'Data guru berhasil diperbarui!' };
}

/**
 * 4. deleteTeacher
 * Menghapus akun guru
 */
export async function deleteTeacher(userId: string) {
  await requireSuperAdminOrGuru();

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath('/superadmin/teachers');
  return { success: true, message: 'Akun guru berhasil dihapus!' };
}
