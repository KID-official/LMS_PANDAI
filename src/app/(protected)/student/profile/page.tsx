import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PrismaClient, UserRole } from '@prisma/client';
import { StudentProfileClient } from './StudentProfileClient';

const prisma = new PrismaClient();

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);

  // Proteksi hak akses: Hanya Siswa yang dapat mengakses profil siswa
  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== UserRole.SISWA) {
    redirect('/guru/settings');
  }

  // Ambil data profil siswa langsung dari database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      student: true,
      progress: true,
      quiz_scores: true,
      certificates: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  const studentData = {
    id: user.id,
    identifier: user.identifier,
    isActive: user.is_active,
    nis: user.student?.nis || user.identifier,
    fullName: user.student?.full_name || 'Siswa Pembelajar',
    imageUrl: user.student?.image_url || null,
    completedChaptersCount: user.progress.filter((p) => p.is_completed).length,
    certificatesCount: user.certificates.length,
    quizScoresCount: user.quiz_scores.length,
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6 py-4">
      <StudentProfileClient initialData={studentData} />
    </div>
  );
}
