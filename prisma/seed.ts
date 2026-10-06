import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const superAdmin = await prisma.user.upsert({
    where: { identifier: 'admin@amos.com' },
    update: {},
    create: {
      identifier: 'admin@amos.com',
      password_hash: passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log('Created Super Admin:', superAdmin.identifier);

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
  console.log('Created Teacher 1:', teacher1.identifier);

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
  console.log('Created Teacher 2:', teacher2.identifier);

  for (let i = 1; i <= 10; i++) {
    const nis = `2024${i.toString().padStart(3, '0')}`;
    const student = await prisma.user.upsert({
      where: { identifier: nis },
      update: {},
      create: {
        identifier: nis,
        password_hash: passwordHash,
        role: UserRole.SISWA,
        student: {
          create: {
            nis: nis,
            full_name: `Siswa Dummy ${i}`,
            class_name: i <= 5 ? '8A' : '8B',
            semester: 'Ganjil 2026/2027',
          },
        },
      },
    });
    console.log(`Created Student ${i}:`, student.identifier);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
