import React from 'react';
import { LayoutDashboard, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Dashboard Guru | SFA Learn',
  description: 'Ringkasan aktivitas dan pemantauan pembelajaran digital.',
};

export default function GuruDashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7F54F8]">
          <span className="rounded-md bg-[#F0F3FF] px-2.5 py-1 text-[#7F54F8]">
            PORTAL GURU SMP
          </span>
          <span className="text-[#94A3B8]">•</span>
          <span className="text-[#64748B]">Tahun Ajaran 2026/2027</span>
        </div>
        <h1 className="text-[26px] font-bold text-[#061B38] mt-1">Dashboard Guru</h1>
        <p className="text-[13px] text-[#64748B]">
          Selamat datang di ringkasan aktivitas dan pemantauan modul pembelajaran AI Literacy.
        </p>
      </div>

      {/* ── EMPTY SECTION CONTAINER ── */}
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white p-10 text-center shadow-xs transition-all">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F3FF] text-[#7F54F8] shadow-xs">
          <LayoutDashboard className="h-8 w-8" />
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F0F3FF] px-3 py-1 text-[11px] font-semibold text-[#7F54F8]">
          <Sparkles className="h-3 w-3" />
          <span>Area Siap Pakai</span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-[#061B38]">
          Section Dasbor Guru
        </h3>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[#64748B]">
          Bagian ini disiapkan untuk widget ringkasan aktivitas siswa, progres belajar terkini, dan metrik capaian kurikulum.
        </p>
      </div>
    </div>
  );
}
