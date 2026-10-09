'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  PlaySquare, 
  Award,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PUBLIC_ROUTES, GURU_ROUTES, STUDENT_ROUTES, SUPERADMIN_ROUTES } from '@/app/components/navigation/routes';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        identifier,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Kredensial tidak valid. Silakan periksa kembali.');
        setLoading(false);
      } else {
        // Fetch session to check role and redirect appropriately
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        
        if (session?.user?.role === 'SUPER_ADMIN') {
          router.push(SUPERADMIN_ROUTES.DASHBOARD);
        } else if (session?.user?.role === 'GURU') {
          router.push(GURU_ROUTES.DASHBOARD);
        } else {
          router.push(STUDENT_ROUTES.DASHBOARD);
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setIdentifier('admin@amos.com');
    setPassword('password123');
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:gap-12 px-6 py-8 lg:py-12">
      
      {/* ── LEFT COLUMN: Branding & Info (Hidden on Mobile) ── */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:gap-8 pt-4">
        
        {/* Info badges */}
        <div className="flex items-center gap-4 text-[13px] text-muted-foreground font-medium">
          <div className="flex items-center gap-2 rounded-full bg-[#E7EEFF] px-3 py-1 text-[#3A4BD4]">
            <div className="h-2 w-2 rounded-full bg-[#3A4BD4]" />
            Sistem E-Learning Aktif TA 2026/2027
          </div>
          <span>• Server Region ID-West-1 (Jakarta)</span>
        </div>

        {/* Headlines */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] font-bold text-primary shadow-subtle border">
            <GraduationCap className="h-4 w-4" />
            Portal Pembelajaran Terpadu & Terakreditasi
          </div>
          <h1 className="text-[34px] font-bold leading-[1.2] tracking-tight text-heading">
            Selamat Datang di Portal Pembelajaran Digital <span className="text-primary">SFA Learn</span>
          </h1>
          <p className="text-[15px] text-body leading-relaxed max-w-[90%]">
            Akses materi interaktif berstandar industri, silabus kurikulum terstruktur, kuis adaptif berbasis kompetensi, serta peroleh sertifikat digital terverifikasi.
          </p>
        </div>

        {/* Hero Banner / Image Placeholder */}
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#E7EEFF] to-[#DFE8FF] shadow-subtle">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             {/* Decorative placeholder */}
             <GraduationCap className="h-32 w-32 text-primary" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex flex-col gap-1 text-[#061B38]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Kurikulum Merdeka Mandiri</span>
              <span className="text-[15px] font-bold bg-white/80 backdrop-blur rounded px-2 py-1">Ekosistem Edukasi Interaktif Generasi 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow-subtle">
               <ShieldCheck className="h-5 w-5 text-success" />
               <span className="text-[12px] font-bold text-heading">SK Akreditasi A+ Dikti</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-subtle">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary-ink">
              <PlaySquare className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-[13px] font-bold text-heading">Modul Berurutan</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Pemutar video adaptif dengan catatan pintar & playback sync.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-subtle">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7EEFF] text-[#3A4BD4]">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-[13px] font-bold text-heading">Kuis Interaktif</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Evaluasi adaptif real-time dengan diagram radar capaian.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-subtle">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-soft text-success-on-soft">
              <Award className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-[13px] font-bold text-heading">E-Sertifikat Resmi</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Tervalidasi QR Code unik & terarsip langsung pada pangkalan data.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Login Form ── */}
      <div className="flex w-full flex-col gap-4 lg:w-[440px] shrink-0">
        
        {/* Help Link Mobile */}
        <div className="flex justify-end lg:hidden mb-2">
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground hover:text-primary">
            <HelpCircle className="h-4 w-4" /> Pusat Bantuan
          </button>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-shell border border-outline/50">
          
          {/* Header Card */}
          <div className="flex flex-col gap-2 p-8 pb-6 border-b border-outline/30">
            <div className="inline-flex w-fit items-center rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-ink">
              Portal Siswa & Pengguna
            </div>
            <h2 className="text-[22px] font-bold text-heading mt-2">
              Masuk ke Akun Pembelajaran
            </h2>
            <p className="text-[13px] text-muted-foreground">
              Masukkan kredensial identitas Anda untuk melanjutkan materi belajar dan tugas.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5 p-8 pt-6">
            
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-danger-soft p-3 text-[13px] font-semibold text-danger-on-soft">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Input NIS/Identifier */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-heading" htmlFor="identifier">
                ID Pengguna / Nomor Induk Siswa (NIS)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full rounded-lg bg-surface-soft border border-transparent p-3 pl-10 text-[13px] text-body placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Contoh: 20260101 atau ID Akun"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Masukkan NIS/NIP terdaftar pada pangkalan data sekolah.
              </p>
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-heading" htmlFor="password">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg bg-surface-soft border border-transparent p-3 pl-10 pr-10 text-[13px] text-body placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-heading"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-outline text-primary focus:ring-primary accent-primary"
              />
              <label htmlFor="remember" className="text-[13px] text-body cursor-pointer select-none">
                Ingat saya di perangkat ini (30 hari)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-[14px] font-bold text-on-primary transition-colors hover:bg-primary-strong active:scale-[0.96] duration-150 ease-out",
                loading && "opacity-70 pointer-events-none"
              )}
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Platform LMS'}
              {!loading && <ArrowRight className="h-4.5 w-4.5" />}
            </button>

            {/* Demo Section (Based on Reference) */}
            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-surface-soft p-4 border border-outline/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-bold text-heading">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  Akses Cepat Penguji / Demo
                </div>
                <button 
                  type="button"
                  onClick={handleDemoFill}
                  className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px] font-bold text-primary border shadow-sm hover:bg-primary-soft transition-colors"
                >
                  Gunakan Demo
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                 <span>ID: <strong className="text-body">admin@amos.com</strong></span>
                 <span>Sandi: <strong className="text-body">password123</strong></span>
              </div>
            </div>

          </form>
        </div>

        {/* Form Footer */}
        <div className="mt-2 flex flex-col items-center gap-3 text-center px-4">
           <p className="text-[12px] text-muted-foreground">
             Belum memiliki akun siswa aktif? Silakan hubungi wali kelas, pengajar lab, atau administrator prodi di kampus Anda.
           </p>
           <div className="flex items-center gap-1.5 text-[11px] font-semibold text-success">
             <ShieldCheck className="h-3.5 w-3.5" />
             Enkripsi TLS 1.3 • Dilindungi Autentikasi Sesi Aman
           </div>
        </div>

      </div>
    </div>
  );
}
