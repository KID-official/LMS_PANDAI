'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Camera, Shield, Eye, EyeOff, Check, AlertCircle, 
  HelpCircle, User, Award, Target, CheckCircle2, Clock, 
  LogOut, Loader2, Info 
} from 'lucide-react';
import { updateStudentProfile, changePassword } from '@/app/actions/profile';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';
import { cn } from '@/lib/utils';

type StudentData = {
  id: string;
  identifier: string;
  isActive: boolean;
  nis: string;
  fullName: string;
  className: string;
  semester: string;
  imageUrl: string | null;
  completedChaptersCount: number;
  certificatesCount: number;
  quizScoresCount: number;
};

export function StudentProfileClient({ initialData }: { initialData: StudentData }) {
  const { update } = useSession();
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialData.imageUrl);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const initials = initialData.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'SF';



  // Handle avatar upload
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
      await updateStudentProfile({ imageUrl: data.url });
      await update();
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat mengunggah foto.');
    } finally {
      setIsUploadingAvatar(false);
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
        setPasswordFeedback({ type: 'error', message: res.error || 'Gagal mengganti password.' });
      } else {
        setPasswordFeedback({ type: 'success', message: res.message || 'Password baru berhasil disimpan!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err: any) {
      setPasswordFeedback({ type: 'error', message: err?.message || 'Terjadi kesalahan.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ── TOP NAV HEADER ── */}
      <div className="flex items-center justify-between py-2">
        <Link
          href={STUDENT_ROUTES.DASHBOARD}
          className="flex items-center gap-2 text-heading hover:text-primary transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-outline/40 shadow-subtle">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <span className="text-[18px] font-bold">Profile Settings</span>
        </Link>

        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-outline/40 text-muted-foreground hover:text-heading shadow-subtle transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-subtle overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={initialData.fullName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-bold">{initials}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── CARD 1: Identity & Stats ── */}
      <div className="rounded-2xl bg-white p-6 shadow-subtle border border-outline/30 flex flex-col items-center text-center gap-4">
        
        {/* Avatar with Camera badge */}
        <div className="relative group">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-[32px] font-extrabold text-white shadow-md overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={initialData.fullName} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          
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
            title="Ubah Foto Profil"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-outline/50 text-primary shadow-sm hover:bg-surface-soft transition-colors active:scale-[0.96] duration-150 ease-out"
          >
            {isUploadingAvatar ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Name & Class info */}
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-[20px] font-bold text-heading">
            {initialData.fullName}
          </h2>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface-soft px-3 py-1 text-[11px] font-mono font-bold text-heading border border-outline/30">
              NIS: {initialData.nis}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-[11px] font-bold text-success-on-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Akun Siswa Aktif
            </span>
          </div>

          <p className="text-[12px] text-muted-foreground mt-0.5">
            {initialData.className} • {initialData.semester}
          </p>
        </div>

        {/* Stats 2-column box */}
        <div className="grid grid-cols-2 gap-4 w-full rounded-xl bg-surface-soft p-4 border border-outline/30 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-extrabold text-primary">98.4%</span>
            <span className="text-[11px] text-muted-foreground font-semibold">Kehadiran AI Lab</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline/40">
            <span className="text-[18px] font-extrabold text-heading">Peringkat 3</span>
            <span className="text-[11px] text-muted-foreground font-semibold">Kompetensi Kelas</span>
          </div>
        </div>

      </div>

      {/* ── CARD 2: Pencapaian & Kursus ── */}
      <div className="rounded-2xl bg-white p-6 shadow-subtle border border-outline/30 flex flex-col gap-4">
        
        <div className="flex items-center justify-between border-b border-outline/30 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="text-[15px] font-bold text-heading">Pencapaian &amp; Kursus</h3>
          </div>
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-bold text-primary-strong">
            2 Lencana
          </span>
        </div>

        {/* Badge 1 */}
        <div className="flex items-center justify-between rounded-xl bg-surface-soft p-3.5 border border-outline/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-heading shadow-sm border border-outline/30">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-heading">Juara Literasi AI Bab 1</span>
              <span className="text-[11px] text-muted-foreground">Memahami etika prompt &amp; fakta digital</span>
            </div>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-primary border border-outline/30">
            Nilai 100
          </span>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center justify-between rounded-xl bg-surface-soft p-3.5 border border-outline/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-heading shadow-sm border border-outline/30">
              <Target className="h-5 w-5 text-info" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-heading">Perfect Catchlight Solver</span>
              <span className="text-[11px] text-muted-foreground">Selesai 10 tantangan deteksi AI tanpa salah</span>
            </div>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-info border border-outline/30">
            Mastery
          </span>
        </div>

        {/* Course Progress status items */}
        <div className="flex items-center justify-between px-1 text-[12px] font-semibold text-body pt-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>1 Kursus Tuntas (Beginner)</span>
          </div>
          <span className="font-bold text-success">100%</span>
        </div>

        <div className="flex items-center justify-between px-1 text-[12px] font-semibold text-body">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>1 Kursus Berjalan (Intermediate)</span>
          </div>
          <span className="font-bold text-primary">65%</span>
        </div>

      </div>

      {/* ── CARD 3: Pengaturan Keamanan Password ── */}
      <div className="rounded-2xl bg-white p-6 shadow-subtle border border-outline/30 flex flex-col gap-4">
        
        <div className="flex flex-col gap-0.5 border-b border-outline/30 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-soft text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <h3 className="text-[15px] font-bold text-heading">Pengaturan Keamanan Password</h3>
          </div>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Ganti password sementara dari sekolah demi keamanan data belajarmu.
          </p>
        </div>

        {/* Feedback message */}
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

        {/* Info callout */}
        <div className="flex items-start gap-2.5 rounded-xl bg-surface-blue p-3 text-[12px] text-info border border-info-soft">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Password default sekolah hanya berlaku sementara. Disarankan membuat password baru yang mudah diingat kamu sendiri.
          </span>
        </div>

        <form onSubmit={handleSavePassword} className="flex flex-col gap-3.5">
          
          {/* Password Lama */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-heading">Password Lama / Default</label>
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
                placeholder="Min. 8 karakter (huruf &amp; angka)"
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
                placeholder="Ulangi password baru kamu"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={passwordLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[13px] font-bold text-white shadow-sm hover:bg-primary-strong transition-colors active:scale-[0.96] duration-150 ease-out disabled:opacity-50"
          >
            {passwordLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            <span>Simpan Password Baru</span>
          </button>

        </form>

      </div>

      {/* ── CARD 4: Keluar dari Akun Siswa Button ── */}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-danger-soft/80 border border-danger/30 py-3.5 text-[13px] font-bold text-danger hover:bg-danger hover:text-white transition-colors active:scale-[0.96] duration-150 ease-out shadow-subtle"
      >
        <LogOut className="h-4 w-4" />
        <span>Keluar dari Akun Siswa</span>
      </button>

    </div>
  );
}
