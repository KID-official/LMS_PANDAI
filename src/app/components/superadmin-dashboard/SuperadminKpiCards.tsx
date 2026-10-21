'use client';

import React from 'react';
import {
  Users,
  School,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import type { SuperadminKpiData } from '@/app/actions/superadminDashboard';

interface SuperadminKpiCardsProps {
  kpis: SuperadminKpiData;
}

export default function SuperadminKpiCards({ kpis }: SuperadminKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {/* ── CARD 1: TOTAL PENGGUNA EKOSISTEM ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Total Pengguna Ekosistem
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.totalUsers}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Akun Terdaftar</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#6636DE] shadow-xs transition-transform group-hover:scale-105">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-0.5 font-semibold text-[#059669]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{kpis.activeRate}% Aktif</span>
          </span>
          <span className="text-[#64748B] text-[11px]">
            {kpis.totalStudents} Siswa • {kpis.totalTeachers} Guru
          </span>
        </div>
      </div>

      {/* ── CARD 2: GURU & PENGAJAR TERDAFTAR ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Guru &amp; Pengajar AI
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.totalTeachers}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Pengajar</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DFE8FF] text-[#3A4BD4] shadow-xs transition-transform group-hover:scale-105">
            <School className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3A4BD4]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#3A4BD4]" />
            <span>{kpis.activeTeachersCount} Guru Aktif</span>
          </span>
          <span className="rounded bg-[#F0F3FF] px-2 py-0.5 text-[10px] font-bold uppercase text-[#3A4BD4]">
            Verifikasi NIP
          </span>
        </div>
      </div>

      {/* ── CARD 3: SISWA & ROMBEL TERDAFTAR ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Siswa Terdaftar
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.totalStudents}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Siswa SMP</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#00685F] shadow-xs transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#00685F]">
            <Layers className="h-3.5 w-3.5" />
            <span>{kpis.totalClassesCount} Rombel Kelas</span>
          </span>
          <span className="text-[#64748B] text-[11px]">
            {kpis.activeStudentsCount} Aktif
          </span>
        </div>
      </div>

      {/* ── CARD 4: SERTIFIKAT DITERBITKAN ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Sertifikat Diterbitkan
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#B45309]">
                {kpis.totalCertificates}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Sertifikat Resmi</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#B45309] shadow-xs transition-transform group-hover:scale-105">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B45309]">
            Serial UNAIR Valid
          </span>
          <span className="rounded bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#B45309]">
            Terverifikasi
          </span>
        </div>
      </div>
    </div>
  );
}
