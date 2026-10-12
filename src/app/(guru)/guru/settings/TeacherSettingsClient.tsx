'use client';

import { useState, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Camera, Mail, Building, Phone, Award, Shield, Eye, EyeOff, 
  Check, AlertCircle, LogOut, Loader2, UserCheck 
} from 'lucide-react';
import { updateTeacherProfile, changePassword } from '@/app/actions/profile';
import { cn } from '@/lib/utils';

type TeacherData = {
  id: string;
  identifier: string;
  role: string;
  createdAt: string;
  fullNameWithTitle: string;
  nipNidn: string;
  officialEmail: string;
  functionalPosition: string;
  institution: string;
  whatsappContact: string;
  imageUrl: string | null;
};

export function TeacherSettingsClient({ initialData }: { initialData: TeacherData }) {
  const { update } = useSession();
  const router = useRouter();

  // Form profile state
  const [profileForm, setProfileForm] = useState({
    fullNameWithTitle: initialData.fullNameWithTitle,
    nipNidn: initialData.nipNidn,
    officialEmail: initialData.officialEmail,
    functionalPosition: initialData.functionalPosition,
    institution: initialData.institution,
    whatsappContact: initialData.whatsappContact,
    showSignatureBlock: true,
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialData.imageUrl);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile save status
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Avatar initials
  const initials = profileForm.fullNameWithTitle
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'GA';

  // Format terdaftar sejak
  const registerDateStr = (() => {
    try {
      const d = new Date(initialData.createdAt);
      return d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    } catch {
      return 'Jan 2024';
    }
  })();



  // Handle upload avatar
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB.');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengunggah foto');
      }

      setAvatarUrl(data.url);
      // Auto-save photo url to teacher profile
      await updateTeacherProfile({
        fullNameWithTitle: profileForm.fullNameWithTitle,
        nipNidn: profileForm.nipNidn,
        officialEmail: profileForm.officialEmail,
        functionalPosition: profileForm.functionalPosition,
        institution: profileForm.institution,
        whatsappContact: profileForm.whatsappContact,
        imageUrl: data.url,
      });
      // Sinkronkan session NextAuth agar navbar & sidebar langsung memuat gambar baru
      await update();
      router.refresh();
      setProfileFeedback({ type: 'success', message: 'Foto profil berhasil diperbarui!' });
    } catch (err: unknown) {
      alert((err instanceof Error ? err.message : '') || 'Terjadi kesalahan saat upload.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Handle simpan profil
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileFeedback(null);

    try {
      await updateTeacherProfile({
        fullNameWithTitle: profileForm.fullNameWithTitle,
        nipNidn: profileForm.nipNidn,
        officialEmail: profileForm.officialEmail,
        functionalPosition: profileForm.functionalPosition,
        institution: profileForm.institution,
        whatsappContact: profileForm.whatsappContact,
        imageUrl: avatarUrl || undefined,
      });
      // Sinkronkan session NextAuth
      await update();
      router.refresh();
      setProfileFeedback({ type: 'success', message: 'Perubahan profil pengajar berhasil disimpan!' });
    } catch (err: unknown) {
      setProfileFeedback({ type: 'error', message: (err instanceof Error ? err.message : '') || 'Gagal menyimpan profil.' });
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle ganti password
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordFeedback(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordFeedback({ type: 'error', message: 'Konfirmasi password baru tidak cocok!' });
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      if (!res.success) {
        setPasswordFeedback({ type: 'error', message: res.error || 'Gagal mengubah password.' });
      } else {
        setPasswordFeedback({ type: 'success', message: res.message || 'Password berhasil diperbarui!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err: unknown) {
      setProfileFeedback({ type: 'error', message: (err instanceof Error ? err.message : '') || 'Terjadi kesalahan.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Reset form
  const handleResetProfile = () => {
    setProfileForm({
      fullNameWithTitle: initialData.fullNameWithTitle,
      nipNidn: initialData.nipNidn,
      officialEmail: initialData.officialEmail,
      functionalPosition: initialData.functionalPosition,
      institution: initialData.institution,
      whatsappContact: initialData.whatsappContact,
      showSignatureBlock: true,
    });
    setProfileFeedback(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

      {/* ── LEFT COLUMN: Informasi Profil Pengajar (7 cols) ── */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-subtle border border-outline/30 flex flex-col gap-6">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-outline/30 pb-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[17px] font-bold text-heading">Informasi Profil Pengajar</h2>
              <p className="text-[12px] text-muted-foreground">
                Data ini ditampilkan pada tanda tangan sertifikat dan kontak bantuan laboratorium siswa SMP.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold text-primary-strong shrink-0">
              <UserCheck className="h-3.5 w-3.5" />
              Akun Terverifikasi
            </span>
          </div>

          {/* Profile Feedback banner */}
          {profileFeedback && (
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg p-3 text-[13px] font-semibold',
                profileFeedback.type === 'success' ? 'bg-success-soft text-success-on-soft' : 'bg-danger-soft text-danger-on-soft'
              )}
            >
              {profileFeedback.type === 'success' ? <Check className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{profileFeedback.message}</span>
            </div>
          )}

          {/* Teacher Banner / Avatar Top Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-xl bg-surface-soft p-4 sm:p-5 border border-outline/30">
            <div className="relative group shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-[24px] font-extrabold text-white shadow-md overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={profileForm.fullNameWithTitle} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white border-2 border-white shadow-sm">
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-1 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[16px] font-bold text-heading">
                  {profileForm.fullNameWithTitle || 'Nama Pengajar'}
                </span>
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-primary-strong">
                  ROLE: {initialData.role}
                </span>
              </div>

              <p className="text-[12px] text-muted-foreground">
                ID Pengajar: <strong className="text-body font-mono">{profileForm.nipNidn || initialData.identifier}</strong> • Terdaftar sejak {registerDateStr}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[12px] font-bold text-primary border border-outline/50 shadow-sm hover:bg-surface-soft transition-colors active:scale-[0.96] duration-150 ease-out"
                >
                  {isUploadingAvatar ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-3.5 w-3.5" />
                      <span>Ubah Foto Profil</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-muted-foreground">JPG, PNG max 2MB</span>
              </div>
            </div>
          </div>

          {/* Form Profil */}
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            
            {/* Nama Lengkap & NIP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-heading">
                  Nama Lengkap beserta Gelar <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.fullNameWithTitle}
                  onChange={(e) => setProfileForm({ ...profileForm, fullNameWithTitle: e.target.value })}
                  placeholder="Contoh: M. Nuraini, S.Pd"
                  className="h-10 rounded-lg bg-surface-soft border border-transparent px-3 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-heading">
                  NIP / NIDN <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.nipNidn}
                  onChange={(e) => setProfileForm({ ...profileForm, nipNidn: e.target.value })}
                  placeholder="Contoh: 19880415 201201 1 002"
                  className="h-10 rounded-lg bg-surface-soft border border-transparent px-3 text-[13px] font-mono text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Email Resmi */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">
                Alamat Email Resmi <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={profileForm.officialEmail}
                  onChange={(e) => setProfileForm({ ...profileForm, officialEmail: e.target.value })}
                  placeholder="nuraini@smp.literasi.id"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-9 pr-3 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Digunakan untuk notifikasi verifikasi kuis dan laporan pengmas bulanan.
              </p>
            </div>

            {/* Jabatan Fungsional */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Jabatan Fungsional</label>
              <input
                type="text"
                value={profileForm.functionalPosition}
                onChange={(e) => setProfileForm({ ...profileForm, functionalPosition: e.target.value })}
                placeholder="Kepala Laboratorium Komputer & Pengajar Literasi Digital"
                className="h-10 rounded-lg bg-surface-soft border border-transparent px-3 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Asal Institusi / Sekolah */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Asal Institusi / Sekolah Mitra</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={profileForm.institution}
                  onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                  placeholder="SMP Negeri 1 AI Ceria / Mitra Pengmas UNAIR"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-9 pr-3 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Kontak WhatsApp */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Kontak WhatsApp Konsultasi Siswa</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={profileForm.whatsappContact}
                  onChange={(e) => setProfileForm({ ...profileForm, whatsappContact: e.target.value })}
                  placeholder="+62 812-3456-7890"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-9 pr-3 text-[13px] font-mono text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Kontak ini akan tampil di menu &apos;Pusat Bantuan Siswa&apos; saat jam praktikum aktif.
              </p>
            </div>

            {/* Toggle Box: Sertifikat */}
            <div className="mt-2 flex items-center justify-between rounded-xl bg-surface-soft p-4 border border-outline/30">
              <div className="flex items-start gap-3 max-w-[85%]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-heading">
                    Tampilkan nama di blok tanda tangan sertifikat resmi kelulusan siswa
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Sertifikat digital akan menyematkan NIP dan barcode digital validator Anda.
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={profileForm.showSignatureBlock}
                  onChange={(e) => setProfileForm({ ...profileForm, showSignatureBlock: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Actions Button */}
            <div className="mt-4 flex items-center justify-end gap-3 border-t border-outline/30 pt-4">
              <button
                type="button"
                onClick={handleResetProfile}
                className="rounded-lg px-4 py-2.5 text-[13px] font-bold text-muted-foreground hover:bg-surface-soft hover:text-heading transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={profileLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-primary-strong transition-colors active:scale-[0.96] duration-150 ease-out disabled:opacity-50"
              >
                {profileLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Keamanan Kata Sandi & Logout (5 cols) ── */}
      <div className="lg:col-span-5 flex flex-col gap-6">

        {/* Card Keamanan Password */}
        <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-subtle border border-outline/30 flex flex-col gap-5">
          
          <div className="flex flex-col gap-0.5 border-b border-outline/30 pb-4">
            <div className="flex items-center gap-2 text-heading">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-soft text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <h2 className="text-[17px] font-bold">Keamanan Kata Sandi</h2>
            </div>
            <p className="text-[12px] text-muted-foreground mt-1">
              Ganti kata sandi secara berkala untuk menjaga integritas data siswa dan bank soal.
            </p>
          </div>

          {/* Password Feedback */}
          {passwordFeedback && (
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg p-3 text-[13px] font-semibold',
                passwordFeedback.type === 'success' ? 'bg-success-soft text-success-on-soft' : 'bg-danger-soft text-danger-on-soft'
              )}
            >
              {passwordFeedback.type === 'success' ? <Check className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{passwordFeedback.message}</span>
            </div>
          )}

          <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
            
            {/* Password Saat Ini */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Password Saat Ini</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Masukkan password saat ini"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-3 pr-10 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Password Baru */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Password Baru</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Masukkan password baru"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-3 pr-10 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Kombinasi minimal 8 karakter, huruf kapital, angka, dan simbol.
              </p>
            </div>



            {/* Konfirmasi Password Baru */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-heading">Konfirmasi Password Baru</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Ulangi password baru"
                  className="h-10 w-full rounded-lg bg-surface-soft border border-transparent pl-3 pr-10 text-[13px] text-body focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Password Button */}
            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-[13px] font-bold text-white shadow-sm hover:bg-primary-strong transition-colors active:scale-[0.96] duration-150 ease-out disabled:opacity-50"
            >
              {passwordLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              <span>Update Password Pengajar</span>
            </button>
          </form>

        </div>

        {/* Card Logout Akun */}
        <div className="rounded-2xl bg-white p-5 shadow-subtle border border-outline/30 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-heading">Sesi Akun Guru</span>
            <span className="text-[11px] text-muted-foreground">Keluar dari sesi portal saat ini secara aman</span>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="inline-flex items-center gap-2 rounded-lg border border-danger/40 bg-danger-soft px-3.5 py-2 text-[12px] font-bold text-danger hover:bg-danger hover:text-white transition-colors active:scale-[0.96] duration-150 ease-out"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar Akun</span>
          </button>
        </div>

      </div>

    </div>
  );
}
