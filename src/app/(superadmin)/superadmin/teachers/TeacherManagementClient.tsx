'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserPlus,
  UploadCloud,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  RotateCw,
  Mail,
  X,
  Loader2,
} from 'lucide-react';
import {
  TeacherRow,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/app/actions/teachers';

interface Props {
  initialTeachers: TeacherRow[];
  total: number;
  stats: {
    totalTeachers: number;
    activeTeachers: number;
    inactiveTeachers: number;
  };
  currentSearch: string;
  currentStatus: string;
}

const AVATAR_COLORS = [
  'bg-[#7C3AED]',
  'bg-[#2563EB]',
  'bg-[#059669]',
  'bg-[#D97706]',
  'bg-[#DC2626]',
  'bg-[#4F46E5]',
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function TeacherManagementClient({
  initialTeachers,
  total,
  stats,
  currentSearch,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRow | null>(null);

  // Form states (hanya NIP, nama, email, password, status)
  const [formData, setFormData] = useState({
    nipNidn: '',
    fullNameWithTitle: '',
    officialEmail: '',
    password: '',
    isActive: true,
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle search & filter submit
  const handleFilterApply = (newSearch: string, newStatus: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (newSearch) params.set('search', newSearch);
      if (newStatus && newStatus !== 'Semua') params.set('status', newStatus);
      router.push(`/superadmin/teachers?${params.toString()}`);
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData({
      nipNidn: '',
      fullNameWithTitle: '',
      officialEmail: '',
      password: '',
      isActive: true,
    });
    setFormError('');
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (teacher: TeacherRow) => {
    setSelectedTeacher(teacher);
    setFormData({
      nipNidn: teacher.nipNidn,
      fullNameWithTitle: teacher.fullNameWithTitle,
      officialEmail: teacher.officialEmail,
      password: '',
      isActive: teacher.isActive,
    });
    setFormError('');
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (teacher: TeacherRow) => {
    setSelectedTeacher(teacher);
    setIsDeleteOpen(true);
  };

  // Submit Add Teacher
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      await createTeacher({
        nipNidn: formData.nipNidn,
        fullNameWithTitle: formData.fullNameWithTitle,
        officialEmail: formData.officialEmail,
        password: formData.password || 'guru123',
      });
      setIsAddOpen(false);
      router.refresh();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Gagal menambahkan guru.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit Teacher
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    setIsSubmitting(true);
    setFormError('');

    try {
      await updateTeacher(selectedTeacher.userId, {
        nipNidn: formData.nipNidn,
        fullNameWithTitle: formData.fullNameWithTitle,
        officialEmail: formData.officialEmail,
        password: formData.password,
        isActive: formData.isActive,
      });
      setIsEditOpen(false);
      router.refresh();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Gagal memperbarui data guru.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete Teacher
  const handleDeleteConfirm = async () => {
    if (!selectedTeacher) return;
    setIsSubmitting(true);

    try {
      await deleteTeacher(selectedTeacher.userId);
      setIsDeleteOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data guru.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle status directly
  const handleToggleStatus = async (teacher: TeacherRow) => {
    try {
      await updateTeacher(teacher.userId, {
        nipNidn: teacher.nipNidn,
        fullNameWithTitle: teacher.fullNameWithTitle,
        officialEmail: teacher.officialEmail,
        isActive: !teacher.isActive,
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Gagal mengubah status guru.');
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER & ACTIONS ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
            <span>MANAJEMEN PENGGUNA</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B]">Hak Akses Tenaga Pendidik</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
            Kelola Akun Guru
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
            Daftarkan staf pengajar baru, kelola profil NIP/NIDN, dan verifikasi status aktif akun.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tombol Import Massal Guru */}
          <Link
            href="/superadmin/import-teachers"
            className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0F172A] shadow-sm hover:bg-[#F8FAFC] transition cursor-pointer"
          >
            <UploadCloud className="h-4 w-4 text-[#2563EB]" />
            <span>Import Guru (CSV)</span>
          </Link>

          {/* Tombol Tambah Guru Manual */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] transition cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            <span>Tambah Guru Manual</span>
          </button>
        </div>
      </div>

      {/* ── 3 STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            TOTAL GURU TERDAFTAR
          </span>
          <div className="mt-1 text-3xl font-extrabold text-[#0F172A]">{stats.totalTeachers}</div>
          <div className="mt-2 text-xs text-[#64748B]">Terdaftar di pangkalan data</div>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
            GURU AKTIF
          </span>
          <div className="mt-1 text-3xl font-extrabold text-[#059669]">{stats.activeTeachers}</div>
          <div className="mt-2 text-xs text-[#059669] font-medium">
            {stats.totalTeachers > 0 ? Math.round((stats.activeTeachers / stats.totalTeachers) * 100) : 0}% Akun aktif mengajar
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">
            NONAKTIF / CUTI
          </span>
          <div className="mt-1 text-3xl font-extrabold text-[#DC2626]">{stats.inactiveTeachers}</div>
          <div className="mt-2 text-xs text-[#DC2626] font-medium">Akses sistem ditangguhkan</div>
        </div>
      </div>

      {/* ── TOOLBAR FILTER & SEARCH ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-sm">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NIP/NIDN, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilterApply(search, status)}
            className="w-full rounded-xl bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#334155]">
          <span className="text-[#64748B]">Status:</span>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleFilterApply(search, e.target.value);
            }}
            className="cursor-pointer bg-transparent font-semibold text-[#0F172A] focus:outline-none"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
        </div>

        <button
          onClick={() => handleFilterApply(search, status)}
          className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#6D28D9] transition cursor-pointer"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Cari</span>
        </button>

        <button
          onClick={() => {
            setSearch('');
            setStatus('Semua');
            handleFilterApply('', 'Semua');
          }}
          title="Reset Pencarian"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748B] hover:bg-[#F1F5F9] transition cursor-pointer"
        >
          <RotateCw className="h-4 w-4" />
        </button>
      </div>

      {/* ── TEACHER DATA TABLE (5 Columns) ── */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="py-4 pl-6 pr-4">GURU & PENGAJAR</th>
                <th className="py-4 px-4">NIP / NIDN</th>
                <th className="py-4 px-4">EMAIL RESMI</th>
                <th className="py-4 px-4 text-center">STATUS</th>
                <th className="py-4 pl-4 pr-6 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-xs sm:text-sm">
              {isPending ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 pl-6 pr-4">
                      <div className="h-10 w-36 bg-slate-100 rounded-lg" />
                    </td>
                    <td className="py-4 px-4"><div className="h-4 w-28 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-32 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-4 text-center"><div className="h-6 w-16 mx-auto bg-slate-100 rounded-full" /></td>
                    <td className="py-4 pl-4 pr-6 text-center"><div className="h-8 w-20 mx-auto bg-slate-100 rounded" /></td>
                  </tr>
                ))
              ) : initialTeachers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#94A3B8]">
                    Tidak ada data guru yang ditemukan.
                  </td>
                </tr>
              ) : (
                initialTeachers.map((t) => {
                  const avatarBg = getAvatarColor(t.fullNameWithTitle);
                  const initials = getInitials(t.fullNameWithTitle);

                  return (
                    <tr key={t.userId} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      {/* 1. Guru */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarBg} shadow-sm`}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-[#0F172A] leading-tight">
                              {t.fullNameWithTitle}
                            </div>
                            <div className="text-[11px] text-[#64748B] mt-0.5">
                              ID: {t.userId.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. NIP / NIDN */}
                      <td className="py-4 px-4 font-mono font-semibold text-[#0F172A]">
                        {t.nipNidn}
                      </td>

                      {/* 3. Email */}
                      <td className="py-4 px-4 text-[#475569]">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-[#94A3B8]" />
                          <span>{t.officialEmail}</span>
                        </div>
                      </td>

                      {/* 4. Status */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(t)}
                          title="Klik untuk ubah status"
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                            t.isActive
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          }`}
                        >
                          {t.isActive ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              <span>Nonaktif</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* 5. Aksi */}
                      <td className="py-4 pl-4 pr-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(t)}
                            title="Edit Data Guru"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#7C3AED] transition cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(t)}
                            title="Hapus Akun Guru"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-[#E2E8F0] px-6 py-4 text-xs text-[#64748B]">
          Menampilkan <strong className="text-[#0F172A]">{initialTeachers.length}</strong> dari{' '}
          <strong className="text-[#0F172A]">{total}</strong> guru terdaftar
        </div>
      </div>

      {/* ── MODAL TAMBAH GURU MANUAL ── */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A]">Tambah Guru Baru</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0F172A]">NIP / NIDN *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 198501012010011001"
                    value={formData.nipNidn}
                    onChange={(e) => setFormData({ ...formData, nipNidn: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0F172A]">Nama & Gelar *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dr. Budi, M.Kom."
                    value={formData.fullNameWithTitle}
                    onChange={(e) => setFormData({ ...formData, fullNameWithTitle: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A]">Email Resmi *</label>
                <input
                  type="email"
                  required
                  placeholder="guru@amos.com"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A]">Kata Sandi Awal</label>
                <input
                  type="password"
                  placeholder="Default: guru123"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6D28D9] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Akun Guru'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL EDIT GURU ── */}
      {isEditOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A]">Edit Data Guru</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0F172A]">NIP / NIDN *</label>
                  <input
                    type="text"
                    required
                    value={formData.nipNidn}
                    onChange={(e) => setFormData({ ...formData, nipNidn: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0F172A]">Nama & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullNameWithTitle}
                    onChange={(e) => setFormData({ ...formData, fullNameWithTitle: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A]">Email Resmi *</label>
                <input
                  type="email"
                  required
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A]">Kata Sandi Baru (Opsional)</label>
                <input
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <label htmlFor="editIsActive" className="text-xs font-semibold text-[#0F172A] cursor-pointer">
                  Akun aktif dan diizinkan login
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-xl border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6D28D9] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isSubmitting ? 'Memperbarui...' : 'Simpan Perubahan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL KONFIRMASI HAPUS ── */}
      {isDeleteOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A]">Hapus Akun Guru?</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Apakah Anda yakin ingin menghapus akun pengajar{' '}
              <strong className="text-[#0F172A]">{selectedTeacher.fullNameWithTitle}</strong> (NIP: {selectedTeacher.nipNidn})?
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-xl border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteConfirm}
                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Hapus Akun</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
