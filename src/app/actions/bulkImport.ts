'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized: Silakan login terlebih dahulu');
  }
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    throw new Error('Unauthorized: Fitur import massal hanya untuk Super Admin');
  }
  return session.user;
}

// ── 1. IMPORT MASSAL SISWA ────────────────────────────────────

export interface ParsedStudentRow {
  rowNumber: number;
  nis: string;
  fullName: string;
  className: string;
  semester: string;
  password?: string;
  status: 'VALID' | 'DUPLICATE' | 'INVALID';
  errorMessage?: string;
}

export interface StudentCsvValidationResult {
  isValidHeader: boolean;
  headerErrorMessage?: string;
  totalRows: number;
  validRows: ParsedStudentRow[];
  invalidRows: ParsedStudentRow[];
}

/**
 * Validasi CSV Siswa sesuai alur flowchart
 * Kolom: NIS, Nama, Kelas, Semester, Password
 */
export async function validateStudentCsv(csvContent: string): Promise<StudentCsvValidationResult> {
  await requireSuperAdmin();

  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return {
      isValidHeader: false,
      headerErrorMessage: 'Berkas CSV kosong atau tidak memiliki data.',
      totalRows: 0,
      validRows: [],
      invalidRows: [],
    };
  }

  // Parse header
  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  // Verifikasi kolom wajib
  const hasNis = headers.some((h) => h.includes('nis'));
  const hasName = headers.some((h) => h.includes('nama') || h.includes('name'));
  const hasClass = headers.some((h) => h.includes('kelas') || h.includes('class'));

  if (!hasNis || !hasName || !hasClass) {
    return {
      isValidHeader: false,
      headerErrorMessage:
        'Format kolom tidak sesuai. Kolom wajib: NIS, Nama, Kelas, Semester, Password.',
      totalRows: 0,
      validRows: [],
      invalidRows: [],
    };
  }

  // Ambil semua NIS yang sudah ada di database untuk validasi duplikat
  const existingUsers = await prisma.user.findMany({
    where: { role: UserRole.SISWA },
    select: { identifier: true },
  });
  const existingNisSet = new Set(existingUsers.map((u) => u.identifier.trim()));

  const seenInCsv = new Set<string>();
  const validRows: ParsedStudentRow[] = [];
  const invalidRows: ParsedStudentRow[] = [];

  // Parse baris data
  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    if (rawCols.length < 3 || rawCols.every((c) => c === '')) continue;

    const rowNumber = i + 1;
    const nis = rawCols[0] || '';
    const fullName = rawCols[1] || '';
    const className = rawCols[2] || '';
    const semester = rawCols[3] || 'Ganjil 2026/2027';
    const password = rawCols[4] || 'siswa123';

    if (!nis || !fullName || !className) {
      invalidRows.push({
        rowNumber,
        nis,
        fullName,
        className,
        semester,
        password,
        status: 'INVALID',
        errorMessage: 'Kolom NIS, Nama, atau Kelas tidak boleh kosong',
      });
      continue;
    }

    if (existingNisSet.has(nis)) {
      invalidRows.push({
        rowNumber,
        nis,
        fullName,
        className,
        semester,
        password,
        status: 'DUPLICATE',
        errorMessage: `NIS ${nis} sudah terdaftar di database`,
      });
      continue;
    }

    if (seenInCsv.has(nis)) {
      invalidRows.push({
        rowNumber,
        nis,
        fullName,
        className,
        semester,
        password,
        status: 'DUPLICATE',
        errorMessage: `NIS ${nis} duplikat di dalam berkas CSV (baris lain)`,
      });
      continue;
    }

    seenInCsv.add(nis);
    validRows.push({
      rowNumber,
      nis,
      fullName,
      className,
      semester,
      password,
      status: 'VALID',
    });
  }

  return {
    isValidHeader: true,
    totalRows: validRows.length + invalidRows.length,
    validRows,
    invalidRows,
  };
}

/**
 * Eksekusi Bulk Insert Siswa
 */
export async function executeStudentBulkImport(
  rows: Array<{
    nis: string;
    fullName: string;
    className: string;
    semester: string;
    password?: string;
  }>
) {
  await requireSuperAdmin();

  if (rows.length === 0) {
    return { successCount: 0, errorCount: 0 };
  }

  const defaultPasswordHash = await bcrypt.hash('siswa123', 10);
  let successCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    try {
      const passwordHash = row.password
        ? await bcrypt.hash(row.password, 10)
        : defaultPasswordHash;

      await prisma.user.create({
        data: {
          identifier: row.nis,
          password_hash: passwordHash,
          role: UserRole.SISWA,
          is_active: true,
          student: {
            create: {
              nis: row.nis,
              full_name: row.fullName,
              class_name: row.className,
              semester: row.semester || 'Ganjil 2026/2027',
            },
          },
        },
      });
      successCount++;
    } catch (err) {
      console.error(`Gagal import siswa NIS ${row.nis}:`, err);
      errorCount++;
    }
  }

  revalidatePath('/guru/students');
  revalidatePath('/superadmin/dashboard');
  return { successCount, errorCount };
}

// ── 2. IMPORT MASSAL GURU ─────────────────────────────────────

export interface ParsedTeacherRow {
  rowNumber: number;
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  functionalPosition?: string;
  institution?: string;
  whatsappContact?: string;
  password?: string;
  status: 'VALID' | 'DUPLICATE' | 'INVALID';
  errorMessage?: string;
}

export interface TeacherCsvValidationResult {
  isValidHeader: boolean;
  headerErrorMessage?: string;
  totalRows: number;
  validRows: ParsedTeacherRow[];
  invalidRows: ParsedTeacherRow[];
}

/**
 * Validasi CSV Guru
 * Kolom: NIP/NIDN, Nama, Email, Jabatan, Institusi, WA, Password
 */
export async function validateTeacherCsv(csvContent: string): Promise<TeacherCsvValidationResult> {
  await requireSuperAdmin();

  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return {
      isValidHeader: false,
      headerErrorMessage: 'Berkas CSV kosong atau tidak memiliki data.',
      totalRows: 0,
      validRows: [],
      invalidRows: [],
    };
  }

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  const hasNip = headers.some((h) => h.includes('nip') || h.includes('nidn'));
  const hasName = headers.some((h) => h.includes('nama') || h.includes('name'));
  const hasEmail = headers.some((h) => h.includes('email'));

  if (!hasNip || !hasName || !hasEmail) {
    return {
      isValidHeader: false,
      headerErrorMessage:
        'Format kolom tidak sesuai. Kolom wajib: NIP/NIDN, Nama, Email, Jabatan, Institusi, WA, Password.',
      totalRows: 0,
      validRows: [],
      invalidRows: [],
    };
  }

  const existingTeachers = await prisma.teacher.findMany({
    select: { nip_nidn: true, official_email: true },
  });
  const existingNipSet = new Set(existingTeachers.map((t) => t.nip_nidn.trim()));
  const existingEmailSet = new Set(existingTeachers.map((t) => t.official_email.trim()));

  const seenNipInCsv = new Set<string>();
  const seenEmailInCsv = new Set<string>();
  const validRows: ParsedTeacherRow[] = [];
  const invalidRows: ParsedTeacherRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    if (rawCols.length < 3 || rawCols.every((c) => c === '')) continue;

    const rowNumber = i + 1;
    const nipNidn = rawCols[0] || '';
    const fullNameWithTitle = rawCols[1] || '';
    const officialEmail = rawCols[2] || '';
    const functionalPosition = rawCols[3] || undefined;
    const institution = rawCols[4] || undefined;
    const whatsappContact = rawCols[5] || undefined;
    const password = rawCols[6] || 'guru123';

    if (!nipNidn || !fullNameWithTitle || !officialEmail) {
      invalidRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        functionalPosition,
        institution,
        whatsappContact,
        password,
        status: 'INVALID',
        errorMessage: 'Kolom NIP, Nama, atau Email tidak boleh kosong',
      });
      continue;
    }

    if (existingNipSet.has(nipNidn)) {
      invalidRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        functionalPosition,
        institution,
        whatsappContact,
        password,
        status: 'DUPLICATE',
        errorMessage: `NIP ${nipNidn} sudah terdaftar di database`,
      });
      continue;
    }

    if (existingEmailSet.has(officialEmail)) {
      invalidRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        functionalPosition,
        institution,
        whatsappContact,
        password,
        status: 'DUPLICATE',
        errorMessage: `Email ${officialEmail} sudah terdaftar di database`,
      });
      continue;
    }

    if (seenNipInCsv.has(nipNidn) || seenEmailInCsv.has(officialEmail)) {
      invalidRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        functionalPosition,
        institution,
        whatsappContact,
        password,
        status: 'DUPLICATE',
        errorMessage: `Duplikat NIP atau Email di dalam berkas CSV`,
      });
      continue;
    }

    seenNipInCsv.add(nipNidn);
    seenEmailInCsv.add(officialEmail);

    validRows.push({
      rowNumber,
      nipNidn,
      fullNameWithTitle,
      officialEmail,
      functionalPosition,
      institution,
      whatsappContact,
      password,
      status: 'VALID',
    });
  }

  return {
    isValidHeader: true,
    totalRows: validRows.length + invalidRows.length,
    validRows,
    invalidRows,
  };
}

/**
 * Eksekusi Bulk Insert Guru
 */
export async function executeTeacherBulkImport(
  rows: Array<{
    nipNidn: string;
    fullNameWithTitle: string;
    officialEmail: string;
    functionalPosition?: string;
    institution?: string;
    whatsappContact?: string;
    password?: string;
  }>
) {
  await requireSuperAdmin();

  if (rows.length === 0) {
    return { successCount: 0, errorCount: 0 };
  }

  const defaultPasswordHash = await bcrypt.hash('guru123', 10);
  let successCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    try {
      const passwordHash = row.password
        ? await bcrypt.hash(row.password, 10)
        : defaultPasswordHash;

      await prisma.user.create({
        data: {
          identifier: row.officialEmail,
          password_hash: passwordHash,
          role: UserRole.GURU,
          is_active: true,
          teacher: {
            create: {
              nip_nidn: row.nipNidn,
              full_name_with_title: row.fullNameWithTitle,
              official_email: row.officialEmail,
              functional_position: row.functionalPosition || null,
              institution: row.institution || null,
              whatsapp_contact: row.whatsappContact || null,
            },
          },
        },
      });
      successCount++;
    } catch (err) {
      console.error(`Gagal import guru NIP ${row.nipNidn}:`, err);
      errorCount++;
    }
  }

  revalidatePath('/superadmin/teachers');
  revalidatePath('/superadmin/dashboard');
  return { successCount, errorCount };
}
