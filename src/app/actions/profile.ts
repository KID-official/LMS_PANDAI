'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';


// ── 1. GURU / TEACHER PROFILE ACTION ──────────────────────────
export async function updateTeacherProfile(data: {
  fullNameWithTitle: string;
  nipNidn: string;
  officialEmail: string;
  imageUrl?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized. Silakan login terlebih dahulu.');
  }

  if (session.user.role !== UserRole.GURU && session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Hanya Guru atau Admin yang memiliki hak akses untuk mengubah profil pengajar.');
  }

  // Update atau create jika relasi teacher belum ada
  await prisma.teacher.upsert({
    where: { user_id: session.user.id },
    update: {
      full_name_with_title: data.fullNameWithTitle,
      nip_nidn: data.nipNidn,
      official_email: data.officialEmail,
      ...(data.imageUrl !== undefined ? { image_url: data.imageUrl } : {}),
    },
    create: {
      user_id: session.user.id,
      full_name_with_title: data.fullNameWithTitle,
      nip_nidn: data.nipNidn,
      official_email: data.officialEmail,
      image_url: data.imageUrl || null,
    },
  });

  revalidatePath('/guru/settings');
  return { success: true, message: 'Profil pengajar berhasil diperbarui!' };
}

// ── 2. STUDENT PROFILE ACTION ─────────────────────────────────
export async function updateStudentProfile(data: {
  imageUrl?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized. Silakan login terlebih dahulu.');
  }

  if (session.user.role !== UserRole.SISWA) {
    throw new Error('Hanya siswa yang dapat mengubah profil siswa.');
  }

  await prisma.student.update({
    where: { user_id: session.user.id },
    data: {
      ...(data.imageUrl !== undefined ? { image_url: data.imageUrl } : {}),
    },
  });

  revalidatePath('/student/profile');
  return { success: true, message: 'Profil siswa berhasil diperbarui!' };
}

// ── 3. CHANGE PASSWORD ACTION (GURU & SISWA) ───────────────────
export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized. Harap login terlebih dahulu.' };
  }

  if (data.newPassword !== data.confirmPassword) {
    return { success: false, error: 'Konfirmasi password baru tidak cocok.' };
  }

  if (data.newPassword.length < 8) {
    return { success: false, error: 'Password baru minimal harus 8 karakter.' };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { success: false, error: 'Data akun tidak ditemukan.' };
  }

  // Verifikasi password saat ini menggunakan bcrypt
  const isMatch = await bcrypt.compare(data.currentPassword, user.password_hash);
  if (!isMatch) {
    return { success: false, error: 'Password saat ini yang Anda masukkan salah.' };
  }

  // Hash password baru
  const newPasswordHash = await bcrypt.hash(data.newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      password_hash: newPasswordHash,
    },
  });

  return { success: true, message: 'Password akun Anda berhasil diperbarui!' };
}
