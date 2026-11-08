import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Memulai Seeding Database LMS ---');
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { identifier: 'admin@amos.com' },
    update: {},
    create: {
      identifier: 'admin@amos.com',
      password_hash: passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log('✓ Created/Updated Super Admin:', superAdmin.identifier);

  // 2. Teachers
  const teacher1 = await prisma.user.upsert({
    where: { identifier: 'guru1@amos.com' },
    update: {},
    create: {
      identifier: 'guru1@amos.com',
      password_hash: passwordHash,
      role: UserRole.GURU,
      teacher: {
        create: {
          nip_nidn: '198001012005011001',
          full_name_with_title: 'Budi Santoso, S.Pd.',
          official_email: 'guru1@amos.com',
                  },
      },
    },
  });
  console.log('✓ Created/Updated Teacher 1:', teacher1.identifier);

  const teacher2 = await prisma.user.upsert({
    where: { identifier: 'guru2@amos.com' },
    update: {},
    create: {
      identifier: 'guru2@amos.com',
      password_hash: passwordHash,
      role: UserRole.GURU,
      teacher: {
        create: {
          nip_nidn: '198502022010012002',
          full_name_with_title: 'Siti Aminah, M.Kom.',
          official_email: 'guru2@amos.com',
                  },
      },
    },
  });
  console.log('✓ Created/Updated Teacher 2:', teacher2.identifier);

  // 3. Students (Sesuai kurikulum 2 kursus: 4 bab Pemula + 3 bab Menengah = Total 7 Bab)
  const studentsSeedData = [
    {
      nis: '20260101',
      fullName: 'Ahmad Fauzi',
      className: 'X TKJ A',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 7, // Lulus semua 7 bab
      quizScore: 95,
      quizAttempt: 1,
      quizPassed: true,
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'D', isCorrect: false },
      ],
      certBeginner: 'AMOS-2026-0812-AI',
      certIntermediate: 'AMOS-2026-0812-DF',
    },
    {
      nis: '20260102',
      fullName: 'Sarah Nurlatifah',
      className: 'X TKJ A',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 7, // Lulus semua 7 bab
      quizScore: 100,
      quizAttempt: 1,
      quizPassed: true,
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'C', isCorrect: true },
      ],
      certBeginner: 'AMOS-2026-0813-AI',
      certIntermediate: 'AMOS-2026-0813-DF',
    },
    {
      nis: '20260105',
      fullName: 'Budi Santoso',
      className: 'X TKJ B',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 3,
      quizScore: 68,
      quizAttempt: 2,
      quizPassed: false, // Perlu Remedial
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'B', isCorrect: false },
        { questionId: 'q3', selectedOption: 'D', isCorrect: false },
      ],
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260109',
      fullName: 'Dewa Bagus Wicaksono',
      className: 'XI RPL 1',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 2,
      quizScore: null, // Belum kuis
      quizAttempt: 0,
      quizPassed: false,
      quizSnapshot: null,
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260110',
      fullName: 'Rian Pratama',
      className: 'X TKJ A',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 7, // Lulus semua 7 bab
      quizScore: 85,
      quizAttempt: 1,
      quizPassed: true,
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'D', isCorrect: false },
      ],
      certBeginner: 'AMOS-2026-0814-AI',
      certIntermediate: 'AMOS-2026-0814-DF',
    },
    {
      nis: '20260112',
      fullName: 'Siti Aisyah',
      className: 'X TKJ B',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 2,
      quizScore: 65,
      quizAttempt: 1,
      quizPassed: false, // Perlu Remedial
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'A', isCorrect: false },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'D', isCorrect: false },
      ],
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260115',
      fullName: 'Doni Firmansyah',
      className: 'XI RPL 1',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 4,
      quizScore: 80,
      quizAttempt: 2,
      quizPassed: true,
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'C', isCorrect: true },
      ],
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260120',
      fullName: 'Nabila Putri',
      className: 'XI RPL 2',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 7, // Lulus semua 7 bab
      quizScore: 90,
      quizAttempt: 1,
      quizPassed: true,
      quizSnapshot: [
        { questionId: 'q1', selectedOption: 'B', isCorrect: true },
        { questionId: 'q2', selectedOption: 'A', isCorrect: true },
        { questionId: 'q3', selectedOption: 'B', isCorrect: false },
      ],
      certBeginner: 'AMOS-2026-0815-AI',
      certIntermediate: 'AMOS-2026-0815-DF',
    },
    {
      nis: '20260122',
      fullName: 'Rizky Ramadhan',
      className: 'XI RPL 2',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 2,
      quizScore: null,
      quizAttempt: 0,
      quizPassed: false,
      quizSnapshot: null,
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260125',
      fullName: 'Fajar Hidayat',
      className: 'X TKJ A',
      semester: 'Ganjil 2026/2027',
      isActive: true,
      completedChapters: 1,
      quizScore: null,
      quizAttempt: 0,
      quizPassed: false,
      quizSnapshot: null,
      certBeginner: null,
      certIntermediate: null,
    },
    {
      nis: '20260130',
      fullName: 'Dimas Maulana',
      className: 'X TKJ B',
      semester: 'Ganjil 2026/2027',
      isActive: false, // Akun nonaktif
      completedChapters: 0,
      quizScore: null,
      quizAttempt: 0,
      quizPassed: false,
      quizSnapshot: null,
      certBeginner: null,
      certIntermediate: null,
    },
  ];

  // 7 Bab Resmi Kurikulum (4 bab Pemula + 3 bab Menengah)
  const ALL_CHAPTER_KEYS = [
    'beginner-ch-1',
    'beginner-ch-2',
    'beginner-ch-3',
    'beginner-ch-4',
    'intermediate-ch-1',
    'intermediate-ch-2',
    'intermediate-ch-3',
  ];

  for (const item of studentsSeedData) {
    const user = await prisma.user.upsert({
      where: { identifier: item.nis },
      update: {
        is_active: item.isActive,
      },
      create: {
        identifier: item.nis,
        password_hash: passwordHash,
        role: UserRole.SISWA,
        is_active: item.isActive,
        student: {
          create: {
            nis: item.nis,
            full_name: item.fullName,
          },
        },
      },
      include: {
        student: true,
      },
    });

    // Seed User Progress untuk 7 Bab
    for (let i = 0; i < ALL_CHAPTER_KEYS.length; i++) {
      const chapterKey = ALL_CHAPTER_KEYS[i];
      const isCompleted = i < item.completedChapters;
      await prisma.userProgress.upsert({
        where: {
          user_id_chapter_key: {
            user_id: user.id,
            chapter_key: chapterKey,
          },
        },
        update: {
          is_completed: isCompleted,
          watch_seconds: isCompleted ? 300 : 0,
          completed_at: isCompleted ? new Date() : null,
        },
        create: {
          user_id: user.id,
          chapter_key: chapterKey,
          is_completed: isCompleted,
          watch_seconds: isCompleted ? 300 : 0,
          completed_at: isCompleted ? new Date() : null,
        },
      });
    }

    // Seed Quiz Score jika sudah pernah kuis
    if (item.quizScore !== null) {
      await prisma.userQuizScore.deleteMany({
        where: {
          user_id: user.id,
          quiz_key: 'quiz-beginner-ch-1',
        },
      });

      await prisma.userQuizScore.create({
        data: {
          user_id: user.id,
          quiz_key: 'quiz-beginner-ch-1',
          score: item.quizScore,
          attempt_number: item.quizAttempt,
          is_passed: item.quizPassed,
          answers_snapshot: item.quizSnapshot ?? [],
          taken_at: new Date('2026-10-12T14:20:00.000Z'),
        },
      });
    }

    // Seed Sertifikat 1 (course-beginner) jika ada
    if (item.certBeginner) {
      await prisma.certificate.upsert({
        where: {
          user_id_course_key: {
            user_id: user.id,
            course_key: 'course-beginner',
          },
        },
        update: {
          serial_number: item.certBeginner,
          final_score: item.quizScore ?? 90,
        },
        create: {
          user_id: user.id,
          course_key: 'course-beginner',
          serial_number: item.certBeginner,
          final_score: item.quizScore ?? 90,
          issued_at: new Date('2026-10-12T15:00:00.000Z'),
        },
      });
    }

    // Seed Sertifikat 2 (course-intermediate) jika ada
    if (item.certIntermediate) {
      await prisma.certificate.upsert({
        where: {
          user_id_course_key: {
            user_id: user.id,
            course_key: 'course-intermediate',
          },
        },
        update: {
          serial_number: item.certIntermediate,
          final_score: item.quizScore ?? 90,
        },
        create: {
          user_id: user.id,
          course_key: 'course-intermediate',
          serial_number: item.certIntermediate,
          final_score: item.quizScore ?? 90,
          issued_at: new Date('2026-10-12T15:30:00.000Z'),
        },
      });
    }

    console.log(`✓ Seeded Student ${item.fullName} (${item.nis}) - Progress: ${item.completedChapters}/7`);
  }

  console.log('--- Seeding Database LMS Selesai dengan Sukses ---');
}

main()
  .catch((e) => {
    console.error('Error saat seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
