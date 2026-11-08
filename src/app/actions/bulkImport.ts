'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { CURRICULUM } from '@/constants/curriculum';

// ── 0. ROLE GUARD & HELPER UTILITIES ──────────────────────────

/**
 * Memastikan user saat ini sudah terautentikasi dan memiliki role SUPER_ADMIN.
 */
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

/**
 * Generate 6 digit alphanumeric unik acak (misal: "A8K2M9")
 * Menghindari karakter ambigu seperti 0/O dan 1/I untuk kemudahan pembacaan.
 */
function generateRandomPassword(length = 6): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mendeteksi pemisah CSV (koma ',' atau titik-koma ';') berdasarkan baris header.
 */
function detectDelimiter(line: string): string {
  const commaCount = (line.match(/,/g) || []).length;
  const semicolonCount = (line.match(/;/g) || []).length;
  return semicolonCount > commaCount ? ';' : ',';
}

/**
 * Parser baris CSV yang mendukung tanda kutip ("") dan pemisah khusus.
 */
function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}

/**
 * Mengambil daftar chapter keys untuk auto-enroll berdasarkan course key / judul kursus.
 */
function getChapterKeysForCourse(courseKey?: string): string[] {
  if (!courseKey || !courseKey.trim()) return [];
  const target = courseKey.trim().toLowerCase();

  const matchedCourse = CURRICULUM.find((c) => {
    const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      c.key.toLowerCase() === target ||
      slug === target ||
      slug.includes(target) ||
      target.includes(slug) ||
      c.title.toLowerCase().includes(target)
    );
  });

  if (matchedCourse && matchedCourse.chapters.length > 0) {
    return matchedCourse.chapters.map((ch) => ch.key);
  }

  return [courseKey.trim()];
}

// ── 1. IMPORT MASSAL SISWA (HYBRID: VALID -> DB, FAILED -> STATE) ──

export interface ImportStudentConfig {
  autoGeneratePassword?: boolean;
  defaultPassword?: string;
  autoEnrollCourseKey?: string;
}

export interface ImportedStudentCredential {
  nis: string;
  fullName: string;
  plainPassword: string;
}

export interface FailedStudentRow {
  rowNumber: number;
  nis: string;
  fullName: string;
  password?: string;
  errorType: 'MISSING_NIS' | 'MISSING_NAME' | 'DUPLICATE_NIS' | 'DUPLICATE_IN_CSV' | 'OTHER';
  errorMessage: string;
}

export interface StudentImportResult {
  isValidHeader: boolean;
  headerErrorMessage?: string;
  successfulImports: ImportedStudentCredential[];
  failedRows: FailedStudentRow[];
  summary: {
    totalRows: number;
    successCount: number;
    failedCount: number;
  };
}

/**
 * Memvalidasi dan langsung mengimpor baris valid ke DB, sedangkan baris gagal dikembalikan sebagai state.
 */
export async function validateAndImportStudents(
  csvContent: string,
  config: ImportStudentConfig = {}
): Promise<StudentImportResult> {
  await requireSuperAdmin();

  const rawLines = csvContent.split(/\r?\n/);
  let headerLineIndex = -1;

  for (let i = 0; i < rawLines.length; i++) {
    if (rawLines[i].trim().length > 0) {
      headerLineIndex = i;
      break;
    }
  }

  if (headerLineIndex === -1) {
    return {
      isValidHeader: false,
      headerErrorMessage: 'Berkas CSV kosong atau tidak memiliki data.',
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  const delimiter = detectDelimiter(rawLines[headerLineIndex]);
  const headers = parseCsvLine(rawLines[headerLineIndex], delimiter).map((h) => h.toLowerCase());

  // Verifikasi kolom wajib: NIS, Nama / Full Name
  const nisIdx = headers.findIndex((h) => h.includes('nis'));
  const nameIdx = headers.findIndex((h) => h.includes('nama') || h.includes('name'));
  const passwordIdx = headers.findIndex(
    (h) => h.includes('password') || h.includes('sandi') || h.includes('pass')
  );

  if (nisIdx === -1 || nameIdx === -1) {
    return {
      isValidHeader: false,
      headerErrorMessage:
        'Format kolom tidak sesuai. Kolom wajib: NIS dan Nama (atau Full Name). Opsional: Password.',
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  // Siapkan data baris dari CSV
  interface TempStudentRow {
    rowNumber: number;
    nis: string;
    fullName: string;
    password?: string;
  }

  const rows: TempStudentRow[] = [];
  const nisCandidateSet = new Set<string>();

  for (let i = headerLineIndex + 1; i < rawLines.length; i++) {
    const rawLine = rawLines[i].trim();
    if (!rawLine) continue;

    const cols = parseCsvLine(rawLine, delimiter);
    if (cols.length === 0 || cols.every((c) => c === '')) continue;

    const rowNumber = i + 1;
    const nis = (cols[nisIdx] || '').trim();
    const fullName = (cols[nameIdx] || '').trim();
    const password = passwordIdx !== -1 ? (cols[passwordIdx] || '').trim() : undefined;

    if (nis) {
      nisCandidateSet.add(nis);
    }

    rows.push({
      rowNumber,
      nis,
      fullName,
      password: password || undefined,
    });
  }

  if (rows.length === 0) {
    return {
      isValidHeader: true,
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  // Cek duplikasi di DB secara massal untuk optimasi performa
  const candidateNisList = Array.from(nisCandidateSet);
  const [existingUsers, existingStudents] = await Promise.all([
    prisma.user.findMany({
      where: { identifier: { in: candidateNisList } },
      select: { identifier: true },
    }),
    prisma.student.findMany({
      where: { nis: { in: candidateNisList } },
      select: { nis: true },
    }),
  ]);

  const existingNisDbSet = new Set<string>([
    ...existingUsers.map((u) => u.identifier.trim()),
    ...existingStudents.map((s) => s.nis.trim()),
  ]);

  const chapterKeys = getChapterKeysForCourse(config.autoEnrollCourseKey);
  const seenNisInCsv = new Set<string>();
  const successfulImports: ImportedStudentCredential[] = [];
  const failedRows: FailedStudentRow[] = [];

  for (const row of rows) {
    const { rowNumber, nis, fullName, password } = row;

    // 1. Validasi Kolom Kosong
    if (!nis) {
      failedRows.push({
        rowNumber,
        nis,
        fullName,
        password,
        errorType: 'MISSING_NIS',
        errorMessage: 'NIS tidak boleh kosong',
      });
      continue;
    }

    if (!fullName) {
      failedRows.push({
        rowNumber,
        nis,
        fullName,
        password,
        errorType: 'MISSING_NAME',
        errorMessage: 'Nama lengkap siswa tidak boleh kosong',
      });
      continue;
    }

    // 2. Validasi Duplikasi di Dalam CSV
    if (seenNisInCsv.has(nis)) {
      failedRows.push({
        rowNumber,
        nis,
        fullName,
        password,
        errorType: 'DUPLICATE_IN_CSV',
        errorMessage: `NIS ${nis} duplikat di dalam berkas CSV`,
      });
      continue;
    }
    seenNisInCsv.add(nis);

    // 3. Validasi Duplikasi di Database
    if (existingNisDbSet.has(nis)) {
      failedRows.push({
        rowNumber,
        nis,
        fullName,
        password,
        errorType: 'DUPLICATE_NIS',
        errorMessage: `NIS ${nis} sudah terdaftar di database`,
      });
      continue;
    }

    // 4. Tentukan Password
    let plainPassword = password;
    if (!plainPassword) {
      if (config.autoGeneratePassword) {
        plainPassword = generateRandomPassword(6);
      } else if (config.defaultPassword && config.defaultPassword.trim()) {
        plainPassword = config.defaultPassword.trim();
      } else {
        plainPassword = 'siswa123';
      }
    }

    // 5. Eksekusi DB Langsung untuk Baris VALID
    try {
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      await prisma.user.create({
        data: {
          identifier: nis,
          password_hash: passwordHash,
          role: UserRole.SISWA,
          is_active: true,
          student: {
            create: {
              nis,
              full_name: fullName,
            },
          },
          ...(chapterKeys.length > 0
            ? {
                progress: {
                  create: chapterKeys.map((k) => ({
                    chapter_key: k,
                    is_completed: false,
                    watch_seconds: 0,
                  })),
                },
              }
            : {}),
        },
      });

      existingNisDbSet.add(nis);
      successfulImports.push({
        nis,
        fullName,
        plainPassword,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal menyimpan siswa ke database';
      failedRows.push({
        rowNumber,
        nis,
        fullName,
        password,
        errorType: 'OTHER',
        errorMessage: errMsg,
      });
    }
  }

  revalidatePath('/guru/students');
  revalidatePath('/superadmin/dashboard');

  return {
    isValidHeader: true,
    successfulImports,
    failedRows,
    summary: {
      totalRows: successfulImports.length + failedRows.length,
      successCount: successfulImports.length,
      failedCount: failedRows.length,
    },
  };
}

/**
 * Memperbaiki dan mengimpor satu baris siswa yang sebelumnya gagal.
 */
export async function fixAndImportStudent(row: {
  nis: string;
  fullName: string;
  password?: string;
}): Promise<{
  success: boolean;
  credential?: ImportedStudentCredential;
  error?: string;
}> {
  await requireSuperAdmin();

  const nis = (row.nis || '').trim();
  const fullName = (row.fullName || '').trim();
  let plainPassword = (row.password || '').trim();

  if (!nis) {
    return { success: false, error: 'NIS tidak boleh kosong' };
  }
  if (!fullName) {
    return { success: false, error: 'Nama siswa tidak boleh kosong' };
  }

  // Cek duplikasi di DB
  const [existingUser, existingStudent] = await Promise.all([
    prisma.user.findUnique({ where: { identifier: nis } }),
    prisma.student.findUnique({ where: { nis } }),
  ]);

  if (existingUser || existingStudent) {
    return { success: false, error: `NIS ${nis} sudah terdaftar di database` };
  }

  if (!plainPassword) {
    plainPassword = generateRandomPassword(6);
  }

  try {
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    await prisma.user.create({
      data: {
        identifier: nis,
        password_hash: passwordHash,
        role: UserRole.SISWA,
        is_active: true,
        student: {
          create: {
            nis,
            full_name: fullName,
          },
        },
      },
    });

    revalidatePath('/guru/students');
    revalidatePath('/superadmin/dashboard');

    return {
      success: true,
      credential: {
        nis,
        fullName,
        plainPassword,
      },
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Gagal menyimpan siswa ke database';
    return { success: false, error: errMsg };
  }
}

// ── 2. IMPORT MASSAL GURU (HYBRID: VALID -> DB, FAILED -> STATE) ──

export interface ImportTeacherConfig {
  autoGeneratePassword?: boolean;
  defaultPassword?: string;
}

export interface ImportedTeacherCredential {
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  plainPassword: string;
}

export interface FailedTeacherRow {
  rowNumber: number;
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  password?: string;
  errorType:
    | 'MISSING_NIP'
    | 'MISSING_NAME'
    | 'MISSING_EMAIL'
    | 'INVALID_EMAIL'
    | 'DUPLICATE_NIP'
    | 'DUPLICATE_EMAIL'
    | 'DUPLICATE_IN_CSV'
    | 'OTHER';
  errorMessage: string;
}

export interface TeacherImportResult {
  isValidHeader: boolean;
  headerErrorMessage?: string;
  successfulImports: ImportedTeacherCredential[];
  failedRows: FailedTeacherRow[];
  summary: {
    totalRows: number;
    successCount: number;
    failedCount: number;
  };
}

/**
 * Memvalidasi dan langsung mengimpor guru yang valid ke DB, mengembalikan baris gagal ke state.
 */
export async function validateAndImportTeachers(
  csvContent: string,
  config: ImportTeacherConfig = {}
): Promise<TeacherImportResult> {
  await requireSuperAdmin();

  const rawLines = csvContent.split(/\r?\n/);
  let headerLineIndex = -1;

  for (let i = 0; i < rawLines.length; i++) {
    if (rawLines[i].trim().length > 0) {
      headerLineIndex = i;
      break;
    }
  }

  if (headerLineIndex === -1) {
    return {
      isValidHeader: false,
      headerErrorMessage: 'Berkas CSV kosong atau tidak memiliki data.',
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  const delimiter = detectDelimiter(rawLines[headerLineIndex]);
  const headers = parseCsvLine(rawLines[headerLineIndex], delimiter).map((h) => h.toLowerCase());

  // Kolom wajib: NIP/NIDN, Nama, Email. Opsional: Password.
  const nipIdx = headers.findIndex((h) => h.includes('nip') || h.includes('nidn'));
  const nameIdx = headers.findIndex((h) => h.includes('nama') || h.includes('name'));
  const emailIdx = headers.findIndex((h) => h.includes('email') || h.includes('surel'));
  const passwordIdx = headers.findIndex(
    (h) => h.includes('password') || h.includes('sandi') || h.includes('pass')
  );

  if (nipIdx === -1 || nameIdx === -1 || emailIdx === -1) {
    return {
      isValidHeader: false,
      headerErrorMessage:
        'Format kolom tidak sesuai. Kolom wajib: NIP/NIDN, Nama, dan Email. (Opsional: Password).',
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  interface TempTeacherRow {
    rowNumber: number;
    nipNidn: string;
    fullNameWithTitle: string;
    officialEmail: string;
    password?: string;
  }

  const rows: TempTeacherRow[] = [];
  const nipCandidateSet = new Set<string>();
  const emailCandidateSet = new Set<string>();

  for (let i = headerLineIndex + 1; i < rawLines.length; i++) {
    const rawLine = rawLines[i].trim();
    if (!rawLine) continue;

    const cols = parseCsvLine(rawLine, delimiter);
    if (cols.length === 0 || cols.every((c) => c === '')) continue;

    const rowNumber = i + 1;
    const nipNidn = (cols[nipIdx] || '').trim();
    const fullNameWithTitle = (cols[nameIdx] || '').trim();
    const officialEmail = (cols[emailIdx] || '').trim().toLowerCase();
    const password = passwordIdx !== -1 ? (cols[passwordIdx] || '').trim() || undefined : undefined;

    if (nipNidn) nipCandidateSet.add(nipNidn);
    if (officialEmail) emailCandidateSet.add(officialEmail);

    rows.push({
      rowNumber,
      nipNidn,
      fullNameWithTitle,
      officialEmail,
      password,
    });
  }

  if (rows.length === 0) {
    return {
      isValidHeader: true,
      successfulImports: [],
      failedRows: [],
      summary: { totalRows: 0, successCount: 0, failedCount: 0 },
    };
  }

  // Pengecekan duplikasi database secara massal
  const candidateNips = Array.from(nipCandidateSet);
  const candidateEmails = Array.from(emailCandidateSet);

  const [existingTeachersByNip, existingTeachersByEmail, existingUsersByEmail] = await Promise.all([
    prisma.teacher.findMany({
      where: { nip_nidn: { in: candidateNips } },
      select: { nip_nidn: true },
    }),
    prisma.teacher.findMany({
      where: { official_email: { in: candidateEmails } },
      select: { official_email: true },
    }),
    prisma.user.findMany({
      where: { identifier: { in: candidateEmails } },
      select: { identifier: true },
    }),
  ]);

  const existingNipDbSet = new Set(existingTeachersByNip.map((t) => t.nip_nidn.trim()));
  const existingEmailDbSet = new Set([
    ...existingTeachersByEmail.map((t) => t.official_email.trim().toLowerCase()),
    ...existingUsersByEmail.map((u) => u.identifier.trim().toLowerCase()),
  ]);

  const seenNipInCsv = new Set<string>();
  const seenEmailInCsv = new Set<string>();
  const successfulImports: ImportedTeacherCredential[] = [];
  const failedRows: FailedTeacherRow[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (const row of rows) {
    const {
      rowNumber,
      nipNidn,
      fullNameWithTitle,
      officialEmail,
      password,
    } = row;

    // 1. Validasi Kolom Kosong
    if (!nipNidn) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'MISSING_NIP',
        errorMessage: 'NIP/NIDN tidak boleh kosong',
      });
      continue;
    }

    if (!fullNameWithTitle) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'MISSING_NAME',
        errorMessage: 'Nama pengajar dan gelar tidak boleh kosong',
      });
      continue;
    }

    if (!officialEmail) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'MISSING_EMAIL',
        errorMessage: 'Email resmi tidak boleh kosong',
      });
      continue;
    }

    // 2. Validasi Format Email
    if (!emailRegex.test(officialEmail)) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'INVALID_EMAIL',
        errorMessage: `Format email '${officialEmail}' tidak valid`,
      });
      continue;
    }

    // 3. Validasi Duplikasi dalam Berkas CSV
    if (seenNipInCsv.has(nipNidn)) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'DUPLICATE_IN_CSV',
        errorMessage: `NIP/NIDN ${nipNidn} duplikat di dalam berkas CSV`,
      });
      continue;
    }

    if (seenEmailInCsv.has(officialEmail)) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'DUPLICATE_IN_CSV',
        errorMessage: `Email ${officialEmail} duplikat di dalam berkas CSV`,
      });
      continue;
    }

    seenNipInCsv.add(nipNidn);
    seenEmailInCsv.add(officialEmail);

    // 4. Validasi Duplikasi Database
    if (existingNipDbSet.has(nipNidn)) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'DUPLICATE_NIP',
        errorMessage: `NIP/NIDN ${nipNidn} sudah terdaftar di database`,
      });
      continue;
    }

    if (existingEmailDbSet.has(officialEmail)) {
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'DUPLICATE_EMAIL',
        errorMessage: `Email ${officialEmail} sudah terdaftar di database`,
      });
      continue;
    }

    // 5. Tentukan Password
    let plainPassword = password;
    if (!plainPassword) {
      if (config.autoGeneratePassword) {
        plainPassword = generateRandomPassword(6);
      } else if (config.defaultPassword && config.defaultPassword.trim()) {
        plainPassword = config.defaultPassword.trim();
      } else {
        plainPassword = 'guru123';
      }
    }

    // 6. Eksekusi DB Langsung untuk Baris VALID
    try {
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      await prisma.user.create({
        data: {
          identifier: officialEmail,
          password_hash: passwordHash,
          role: UserRole.GURU,
          is_active: true,
          teacher: {
            create: {
              nip_nidn: nipNidn,
              full_name_with_title: fullNameWithTitle,
              official_email: officialEmail,
            },
          },
        },
      });

      existingNipDbSet.add(nipNidn);
      existingEmailDbSet.add(officialEmail);

      successfulImports.push({
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        plainPassword,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal menyimpan guru ke database';
      failedRows.push({
        rowNumber,
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        password,
        errorType: 'OTHER',
        errorMessage: errMsg,
      });
    }
  }

  revalidatePath('/superadmin/teachers');
  revalidatePath('/superadmin/dashboard');

  return {
    isValidHeader: true,
    successfulImports,
    failedRows,
    summary: {
      totalRows: successfulImports.length + failedRows.length,
      successCount: successfulImports.length,
      failedCount: failedRows.length,
    },
  };
}

/**
 * Memperbaiki dan mengimpor satu baris guru yang sebelumnya gagal.
 */
export async function fixAndImportTeacher(row: {
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  password?: string;
}): Promise<{
  success: boolean;
  credential?: ImportedTeacherCredential;
  error?: string;
}> {
  await requireSuperAdmin();

  const nipNidn = (row.nipNidn || '').trim();
  const fullNameWithTitle = (row.fullNameWithTitle || '').trim();
  const officialEmail = (row.officialEmail || '').trim().toLowerCase();
  let plainPassword = (row.password || '').trim();

  if (!nipNidn) {
    return { success: false, error: 'NIP/NIDN tidak boleh kosong' };
  }
  if (!fullNameWithTitle) {
    return { success: false, error: 'Nama pengajar tidak boleh kosong' };
  }
  if (!officialEmail) {
    return { success: false, error: 'Email resmi tidak boleh kosong' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(officialEmail)) {
    return { success: false, error: 'Format email tidak valid' };
  }

  // Cek duplikasi di database
  const [existingNip, existingTeacherEmail, existingUser] = await Promise.all([
    prisma.teacher.findUnique({ where: { nip_nidn: nipNidn } }),
    prisma.teacher.findUnique({ where: { official_email: officialEmail } }),
    prisma.user.findUnique({ where: { identifier: officialEmail } }),
  ]);

  if (existingNip) {
    return { success: false, error: `NIP/NIDN ${nipNidn} sudah terdaftar di database` };
  }
  if (existingTeacherEmail || existingUser) {
    return { success: false, error: `Email ${officialEmail} sudah terdaftar di database` };
  }

  if (!plainPassword) {
    plainPassword = generateRandomPassword(6);
  }

  try {
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    await prisma.user.create({
      data: {
        identifier: officialEmail,
        password_hash: passwordHash,
        role: UserRole.GURU,
        is_active: true,
        teacher: {
          create: {
            nip_nidn: nipNidn,
            full_name_with_title: fullNameWithTitle,
            official_email: officialEmail,
          },
        },
      },
    });

    revalidatePath('/superadmin/teachers');
    revalidatePath('/superadmin/dashboard');

    return {
      success: true,
      credential: {
        nipNidn,
        fullNameWithTitle,
        officialEmail,
        plainPassword,
      },
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Gagal menyimpan guru ke database';
    return { success: false, error: errMsg };
  }
}

// ── 3. BACKWARD-COMPATIBILITY EXPORTS ──────────────────────────

export interface ParsedStudentRow {
  rowNumber: number;
  nis: string;
  fullName: string;
  className?: string;
  semester?: string;
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

export async function validateStudentCsv(csvContent: string): Promise<StudentCsvValidationResult> {
  const result = await validateAndImportStudents(csvContent, { autoGeneratePassword: false });
  
  const validRows: ParsedStudentRow[] = result.successfulImports.map((s, idx) => ({
    rowNumber: idx + 2,
    nis: s.nis,
    fullName: s.fullName,
    className: '-',
    semester: 'Aktif',
    password: s.plainPassword,
    status: 'VALID',
  }));

  const invalidRows: ParsedStudentRow[] = result.failedRows.map((f) => ({
    rowNumber: f.rowNumber,
    nis: f.nis,
    fullName: f.fullName,
    className: '-',
    semester: 'Aktif',
    password: f.password,
    status: f.errorType === 'DUPLICATE_NIS' || f.errorType === 'DUPLICATE_IN_CSV' ? 'DUPLICATE' : 'INVALID',
    errorMessage: f.errorMessage,
  }));

  return {
    isValidHeader: result.isValidHeader,
    headerErrorMessage: result.headerErrorMessage,
    totalRows: validRows.length + invalidRows.length,
    validRows,
    invalidRows,
  };
}

export async function executeStudentBulkImport(
  rows: Array<{
    nis: string;
    fullName: string;
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

export interface ParsedTeacherRow {
  rowNumber: number;
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
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

export async function validateTeacherCsv(csvContent: string): Promise<TeacherCsvValidationResult> {
  const result = await validateAndImportTeachers(csvContent, { autoGeneratePassword: false });

  const validRows: ParsedTeacherRow[] = result.successfulImports.map((t, idx) => ({
    rowNumber: idx + 2,
    nipNidn: t.nipNidn,
    fullNameWithTitle: t.fullNameWithTitle,
    officialEmail: t.officialEmail,
    password: t.plainPassword,
    status: 'VALID',
  }));

  const invalidRows: ParsedTeacherRow[] = result.failedRows.map((f) => ({
    rowNumber: f.rowNumber,
    nipNidn: f.nipNidn,
    fullNameWithTitle: f.fullNameWithTitle,
    officialEmail: f.officialEmail,
    password: f.password,
    status: f.errorType === 'DUPLICATE_NIP' || f.errorType === 'DUPLICATE_EMAIL' || f.errorType === 'DUPLICATE_IN_CSV' ? 'DUPLICATE' : 'INVALID',
    errorMessage: f.errorMessage,
  }));

  return {
    isValidHeader: result.isValidHeader,
    headerErrorMessage: result.headerErrorMessage,
    totalRows: validRows.length + invalidRows.length,
    validRows,
    invalidRows,
  };
}

export async function executeTeacherBulkImport(
  rows: Array<{
    nipNidn: string;
    fullNameWithTitle: string;
    officialEmail: string;
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
