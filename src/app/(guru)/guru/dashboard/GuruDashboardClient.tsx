'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCw,
  FileBarChart2,
} from 'lucide-react';
import type { GuruDashboardData } from '@/app/actions/guruDashboard';
import {
  GuruKpiCards,
  GuruQuickActions,
  RecentStudentActivityTable,
  QuizScoreDistributionWidget,
  RemedialInterventionAlert,
  ClassProgressBreakdownWidget,
} from '@/app/components/guru-dashboard';

interface GuruDashboardClientProps {
  initialData: GuruDashboardData;
}

export default function GuruDashboardClient({ initialData }: GuruDashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
      {/* ── HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#6636DE]">
            <span className="rounded-md bg-[#F0F3FF] px-2.5 py-1 text-[#6636DE] shadow-2xs">
              PORTAL GURU SMP
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B]">Tahun Ajaran 2026/2027</span>
          </div>

          <h1 className="text-[26px] md:text-[28px] font-bold text-[#061B38] tracking-tight">
            Dashboard Guru Literasi AI
          </h1>
          <p className="text-[13px] text-[#64748B]">
            Pemantauan capaian kurikulum, distribusi evaluasi kuis, dan pusat pendampingan siswa.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Refresh Action */}
          <button
            onClick={handleRefresh}
            disabled={isPending}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-[#CAC3D8]/50 bg-white px-3 text-[12px] font-semibold text-[#061B38] shadow-xs transition-all hover:bg-[#F9F9FF] hover:border-[#6636DE]/30 disabled:opacity-60"
            title="Perbarui data metrik terkini"
          >
            <RotateCw
              className={`h-3.5 w-3.5 text-[#6636DE] ${isPending ? 'animate-spin' : ''}`}
            />
            <span>{isPending ? 'Memuat...' : 'Segarkan Data'}</span>
          </button>

          {/* Export / Rekap CTA (White button matching Refresh) */}
          <Link
            href="/guru/progress"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-[#CAC3D8]/50 bg-white px-3 text-[12px] font-semibold text-[#061B38] shadow-xs transition-all hover:bg-[#F9F9FF] hover:border-[#6636DE]/30"
          >
            <FileBarChart2 className="h-3.5 w-3.5 text-[#6636DE]" />
            <span>Rekap &amp; Audit Kuis</span>
          </Link>
        </div>
      </div>

      {/* ── SECTION 1: 4 KPI CARDS ── */}
      <section aria-label="Metrik Utama Guru">
        <GuruKpiCards
          kpis={initialData.kpis}
          scoreDistribution={initialData.scoreDistribution}
        />
      </section>

      {/* ── SECTION 2: QUICK ACTIONS BAR (No Import Guru) ── */}
      <section aria-label="Panel Pintasan Cepat">
        <GuruQuickActions />
      </section>

      {/* ── SECTION 3: 12-COLUMN DESKTOP GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── KOLOM UTAMA (8 Kolom di LG) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Topik 2: Aktivitas & Progres Belajar Siswa Terkini */}
          <section aria-label="Aktivitas Belajar Siswa Terkini">
            <RecentStudentActivityTable
              activities={initialData.recentActivities}
            />
          </section>

          {/* Topik 3: Distribusi Capaian Skor Kuis & Tingkat Kelulusan Kelas */}
          <section aria-label="Distribusi Skor Kuis & Tingkat Kelulusan">
            <QuizScoreDistributionWidget
              scoreDistribution={initialData.scoreDistribution}
            />
          </section>
        </div>

        {/* ── KOLOM KANAN / ASIDE (4 Kolom di LG) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Topik 4: Pusat Intervensi & Siswa Butuh Remedial */}
          <section aria-label="Pusat Intervensi & Remedial">
            <RemedialInterventionAlert
              students={initialData.remedialStudents}
            />
          </section>

          {/* Sebaran Progres per Rombel Kelas */}
          <section aria-label="Sebaran Progres Rombel Kelas">
            <ClassProgressBreakdownWidget
              classes={initialData.classBreakdowns}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
