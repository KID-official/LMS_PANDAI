import { getStudents } from '@/app/actions/students';
import { StudentManagementClient } from './StudentManagementClient';

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string; page?: string };
}) {
  const search = searchParams.search || '';
  const status = searchParams.status || '';
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 10;

  const { users, total } = await getStudents(search, status, page, limit);

  return (
    <div className="w-full flex flex-col gap-6 p-6 md:p-8 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-primary uppercase tracking-wide">
          <span className="rounded-md bg-primary-soft px-2 py-0.5 text-primary-strong">SMP AI LITERACY PORTAL</span>
          <span className="text-muted-foreground">• Academic Year 2026/2027</span>
        </div>
        <h1 className="text-[28px] font-bold text-heading mt-1">Student Management</h1>
        <p className="text-[13px] text-muted-foreground">Total <strong className="text-primary">{total} siswa SMP aktif</strong> terdaftar dalam sistem modul AI</p>
      </div>

      <StudentManagementClient initialUsers={users} total={total} currentPage={page} />
    </div>
  );
}
