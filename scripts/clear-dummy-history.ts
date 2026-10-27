import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDummyHistory() {
  console.log('=== MEMULAI PEMBERSIHAN DATA RIWAYAT BELAJAR DUMMY ===');

  // 1. Hitung jumlah record sebelum dibersihkan
  const progressCount = await prisma.userProgress.count();
  const quizScoresCount = await prisma.userQuizScore.count();
  const certificatesCount = await prisma.certificate.count();

  console.log(`Ditemukan data lama:`);
  console.log(`- User Progress: ${progressCount} records`);
  console.log(`- Quiz Scores  : ${quizScoresCount} records`);
  console.log(`- Certificates : ${certificatesCount} records`);

  // 2. Bersihkan tabel riwayat
  const delCertificates = await prisma.certificate.deleteMany({});
  const delQuizScores = await prisma.userQuizScore.deleteMany({});
  const delProgress = await prisma.userProgress.deleteMany({});

  console.log(`\n✓ Berhasil membersihkan:`);
  console.log(`- ${delCertificates.count} sertifikat uji coba dihapus`);
  console.log(`- ${delQuizScores.count} riwayat kuis uji coba dihapus`);
  console.log(`- ${delProgress.count} riwayat progres bab uji coba dihapus`);

  // 3. Verifikasi akun pengguna tetap aman
  const usersCount = await prisma.user.count();
  const studentsCount = await prisma.student.count();
  const teachersCount = await prisma.teacher.count();

  console.log(`\n✓ Akun Pengguna Tetap Aman (TIDAK DIHAPUS):`);
  console.log(`- Total Akun Pengguna : ${usersCount}`);
  console.log(`- Profil Siswa         : ${studentsCount}`);
  console.log(`- Profil Guru          : ${teachersCount}`);

  console.log('\n=== PEMBERSIHAN SELESAI. SISTEM SIAP UNTUK KURIKULUM BARU ===');
}

clearDummyHistory()
  .catch((e) => {
    console.error('Terjadi kesalahan saat membersihkan data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
