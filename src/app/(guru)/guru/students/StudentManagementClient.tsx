'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createStudent, updateStudent, deleteStudent } from '@/app/actions/students';
import { 
  Search, Plus, Edit2, Trash2, ShieldCheck, 
  GraduationCap, TrendingUp, Flag, RefreshCw, X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type StudentUser = {
  id: string;
  identifier: string;
  is_active: boolean;
  student: {
    nis: string;
    full_name: string;
    image_url?: string | null;
  } | null;
  progressPercentage?: number;
  completedChaptersCount?: number;
  totalChapters?: number;
};

export function StudentManagementClient({ 
  initialUsers, 
  total, 
  currentPage,
  stats,
}: { 
  initialUsers: StudentUser[]; 
  total: number; 
  currentPage: number; 
  stats?: {
    totalAllStudents: number;
    totalActiveStudents: number;
    activePercentage: string;
    averageProgress: string;
    totalCompletedModules?: number;
    remedialCount?: number;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search/Filter State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<StudentUser | null>(null);

  // Form State (Hanya nama, nis, password, status)
  const [formData, setFormData] = useState({
    nis: '',
    fullName: '',
    password: '',
    isActive: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(searchTerm, statusFilter, 1);
  };

  const updateUrl = (search: string, status: string, page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (page > 1) params.set('page', page.toString());
    
    startTransition(() => {
      router.push(`/guru/students?${params.toString()}`);
    });
  };

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      nis: '',
      fullName: '',
      password: '',
      isActive: true,
    });
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: StudentUser) => {
    setModalMode('edit');
    setFormData({
      nis: user.student?.nis || user.identifier,
      fullName: user.student?.full_name || '',
      password: '',
      isActive: user.is_active,
    });
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      await createStudent(formData);
    } else if (selectedUser) {
      await updateStudent(selectedUser.id, formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus siswa ini?')) {
      await deleteStudent(id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-subtle border border-outline/30">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">TOTAL SISWA</span>
            <span className="text-[24px] font-bold text-heading">{stats?.totalAllStudents ?? total}</span>
            <span className="text-[11px] font-semibold text-success">
              {stats?.totalActiveStudents ?? 0} aktif dari {stats?.totalAllStudents ?? total} siswa
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-subtle border border-outline/30">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">AKUN AKTIF</span>
            <span className="text-[24px] font-bold text-heading">{stats?.totalActiveStudents ?? initialUsers.filter(u => u.is_active).length}</span>
            <span className="text-[11px] font-semibold text-success">
              {stats?.activePercentage ? `${stats.activePercentage} Partisipasi` : '0% Partisipasi'}
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-soft text-success">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-subtle border border-outline/30">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">RATA-RATA PROGRESS</span>
            <span className="text-[24px] font-bold text-heading">{stats?.averageProgress ?? '0%'}</span>
            <span className="text-[11px] font-semibold text-primary">{stats?.totalCompletedModules ?? 0} modul tuntas</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-blue text-info">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-subtle border border-outline/30">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">PERLU BIMBINGAN</span>
            <span className="text-[24px] font-bold text-heading">{stats?.remedialCount ?? 0}</span>
            <span className="text-[11px] font-semibold text-danger">Perlu remedial kuis / progress rendah</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
            <Flag className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari NIS atau Nama Siswa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg bg-white border border-outline/50 pl-9 pr-4 text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              updateUrl(searchTerm, e.target.value, 1);
            }}
            className="h-10 rounded-lg bg-white border border-outline/50 px-3 text-[13px] focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
          <button type="submit" className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-surface-soft text-body hover:bg-outline/20 transition-colors">
            <RefreshCw className={cn("h-4 w-4", isPending && "animate-spin")} />
          </button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={openCreateModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-primary text-[13px] font-bold text-white hover:bg-primary-strong transition-colors active:scale-[0.96] duration-150 ease-out"
          >
            <Plus className="h-4 w-4" /> Add Student Manual
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-outline/30 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F9F9FF] border-b border-outline/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-outline" /></th>
                <th className="p-4">SISWA</th>
                <th className="p-4">NIS</th>
                <th className="p-4">KURSUS DIIKUTI</th>
                <th className="p-4">PROGRESS BELAJAR</th>
                <th className="p-4">STATUS AKUN</th>
                <th className="p-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/20">
              {initialUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">Tidak ada data siswa.</td>
                </tr>
              ) : initialUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-soft/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-outline" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-bold text-primary-strong uppercase overflow-hidden">
                        {user.student?.image_url ? (
                          <img src={user.student.image_url} alt={user.student.full_name} className="h-full w-full object-cover" />
                        ) : (
                          (user.student?.full_name || user.identifier)
                            .split(' ')
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join('')
                            .toUpperCase() || 'SI'
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-heading">{user.student?.full_name || 'Tanpa Nama'}</span>
                        <span className="text-[11px] text-muted-foreground">{user.identifier}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-body font-mono text-[12px]">{user.student?.nis || user.identifier}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-blue px-2.5 py-1 text-[11px] font-bold text-info border border-info-soft">
                      <ShieldCheck className="h-3 w-3" /> Literasi AI Dasar
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex items-center justify-between text-[11px] font-bold text-heading">
                        <span className="text-primary">{user.progressPercentage ?? 0}%</span>
                        <span className="text-muted-foreground font-medium">
                          {user.completedChaptersCount ?? 0}/{user.totalChapters ?? 7} Modul
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-soft overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${user.progressPercentage ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {user.is_active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-0.5 text-[11px] font-bold text-success-on-soft">
                        <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-0.5 text-[11px] font-bold text-danger-on-soft">
                        <div className="h-1.5 w-1.5 rounded-full bg-danger"></div>
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit Data Siswa"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 text-muted-foreground hover:text-danger transition-colors"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-outline/30 p-4 text-[12px] text-muted-foreground bg-[#F9F9FF]">
          <span>Menampilkan {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, total)} dari <strong>{total}</strong> siswa</span>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage <= 1}
              onClick={() => updateUrl(searchTerm, statusFilter, currentPage - 1)}
              className="px-2 py-1 disabled:opacity-50 transition-colors hover:text-heading"
            >
              &lt;
            </button>
            <button className="h-6 w-6 rounded bg-primary text-white font-bold">{currentPage}</button>
            <button 
              disabled={currentPage * 10 >= total}
              onClick={() => updateUrl(searchTerm, statusFilter, currentPage + 1)}
              className="px-2 py-1 disabled:opacity-50 transition-colors hover:text-heading"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overscroll-contain">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-outline/30 px-6 py-4">
              <h2 className="text-[16px] font-bold text-heading">
                {modalMode === 'create' ? 'Tambah Siswa Manual' : 'Edit Data Siswa'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-heading transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-heading">NIS (Nomor Induk Siswa)</label>
                <input 
                  type="text" 
                  required
                  value={formData.nis}
                  onChange={e => setFormData({...formData, nis: e.target.value})}
                  className="h-10 rounded-lg border border-outline/50 bg-surface-soft px-3 text-[13px] focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Contoh: 20260101"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-heading">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="h-10 rounded-lg border border-outline/50 bg-surface-soft px-3 text-[13px] focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Contoh: Ahmad Fauzi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-heading">Kata Sandi {modalMode === 'edit' && '(Opsional)'}</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="h-10 rounded-lg border border-outline/50 bg-surface-soft px-3 text-[13px] focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                    placeholder={modalMode === 'create' ? 'Default: siswa123' : 'Kosongkan jika tak diubah'}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-heading">Status Akun</label>
                  <select 
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={e => setFormData({...formData, isActive: e.target.value === 'true'})}
                    className="h-10 rounded-lg border border-outline/50 bg-surface-soft px-3 text-[13px] focus:border-primary focus:bg-white focus:outline-none transition-colors" 
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 border-t border-outline/30 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-[13px] font-bold text-body hover:bg-surface-soft transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-primary-strong active:scale-[0.96] duration-150 ease-out"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
