'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCw,
  Users,
} from 'lucide-react';
import type { SuperadminDashboardData } from '@/app/actions/superadminDashboard';
import {
  SuperadminKpiCards,
  SuperadminCommandBar,
  RecentUsersTable,
  ClassEcosystemSummaryWidget,
  TeacherSupervisorWidget,
  SystemHealthWidget,
} from '@/app/components/superadmin-dashboard';

interface SuperAdminDashboardClientProps {
  initialData: SuperadminDashboardData;
}

export default function SuperAdminDashboardClient({
  initialData,
}: SuperAdminDashboardClientProps) {
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
              PORTAL SUPER ADMINISTRATOR
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B]">Tahun Ajaran 2026/2027</span>
          </div>

          <h1 className="text-[26px] md:text-[28px] font-bold text-[#061B38] tracking-tight">
            Dashboard Super Administrator
          </h1>
          <p className="text-[13px] text-[#64748B]">
            Pusat kendali ekosistem, administrasi akun pengajar, dan audit operasional LMS.
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

          {/* Quick Manage CTA */}
          <Link
            href="/superadmin/teachers"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-[#CAC3D8]/50 bg-white px-3 text-[12px] font-semibold text-[#061B38] shadow-xs transition-all hover:bg-[#F9F9FF] hover:border-[#6636DE]/30"
          >
            <Users className="h-3.5 w-3.5 text-[#6636DE]" />
            <span>Kelola Guru</span>
          </Link>
        </div>
      </div>

      {/* ── SECTION 1: 4 KPI CARDS ── */}
      <section aria-label="Metrik Ekosistem Global">
        <SuperadminKpiCards kpis={initialData.kpis} />
      </section>

      {/* ── SECTION 2: COMMAND CENTER QUICK ACTIONS ── */}
      <section aria-label="Pusat Kendali Eksekutif">
        <SuperadminCommandBar />
      </section>

      {/* ── SECTION 3: 12-COLUMN DESKTOP GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── KOLOM UTAMA (8 Kolom di LG) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Registrasi Pengguna Baru */}
          <section aria-label="Registrasi Pengguna Terkini">
            <RecentUsersTable users={initialData.recentUsers} />
          </section>

          {/* Distribusi Rombel & Capaian Ekosistem */}
          <section aria-label="Distribusi Rombel Kelas">
            <ClassEcosystemSummaryWidget classes={initialData.classSummaries} />
          </section>
        </div>

        {/* ── KOLOM KANAN / ASIDE (4 Kolom di LG) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pengawasan Akun Guru */}
          <section aria-label="Pengawasan Akun Pengajar">
            <TeacherSupervisorWidget teachers={initialData.teachers} />
          </section>

          {/* Status Integritas Basis Data & Platform */}
          <section aria-label="Status Integritas Ekosistem">
            <SystemHealthWidget health={initialData.health} />
          </section>
        </div>
      </div>
    </div>
  );
}
