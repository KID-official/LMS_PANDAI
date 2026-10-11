import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PrismaClient, UserRole } from '@prisma/client';
import { TeacherSettingsClient } from './TeacherSettingsClient';

const prisma = new PrismaClient();

export default async function TeacherSettingsPage() {
  const session = await getServerSession(authOptions);

  // Proteksi hak akses: Hanya Guru atau Super Admin
  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role === UserRole.SISWA) {
    redirect('/student/profile');
  }

  // Ambil data profil guru langsung dari database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { teacher: true },
  });

  if (!user) {
    redirect('/login');
  }

  const teacherData = {
    id: user.id,
    identifier: user.identifier,
    role: user.role,
    createdAt: user.created_at.toISOString(),
    fullNameWithTitle: user.teacher?.full_name_with_title || user.identifier || 'Guru Pengajar',
    nipNidn: user.teacher?.nip_nidn || user.identifier || '',
    officialEmail: user.teacher?.official_email || user.identifier,
    functionalPosition: user.teacher?.functional_position || 'Pengajar & Fasilitator Literasi Digital AI',
    institution: user.teacher?.institution || 'SMP Mitra / Pengmas Universitas Airlangga',
    whatsappContact: user.teacher?.whatsapp_contact || '+62 812-3456-7890',
    imageUrl: user.teacher?.image_url || null,
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      
      {/* ── Breadcrumb & Page Header ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground">
          <span>DashLite</span>
          <span>&gt;</span>
          <span>Pengaturan</span>
          <span>&gt;</span>
          <span className="text-primary font-bold">Profil Pengajar &amp; Guru Admin</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1">
          <div>
            <h1 className="text-[26px] sm:text-[28px] font-bold text-heading">
              Profil Pengajar &amp; Keamanan Akun
            </h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Kelola data identitas pengajar Pengmas UNAIR, kontak bantuan siswa, serta pembaruan kata sandi sistem.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3.5 py-1.5 text-[12px] font-semibold text-heading border border-outline/30 w-fit shrink-0">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>Status: Sinkron LMS Pengmas</span>
          </div>
        </div>
      </div>

      <TeacherSettingsClient initialData={teacherData} />
    </div>
  );
}
