'use client';

import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
} from 'lucide-react';
import type { GuruKpiData, ScoreDistributionData } from '@/app/actions/guruDashboard';

interface GuruKpiCardsProps {
  kpis: GuruKpiData;
  scoreDistribution: ScoreDistributionData;
}

export default function GuruKpiCards({ kpis, scoreDistribution }: GuruKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {/* ── CARD 1: TOTAL SISWA TERDAFTAR ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Total Siswa Terdaftar
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.totalStudents}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Siswa</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#6636DE] shadow-xs transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-0.5 font-semibold text-[#059669]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{kpis.activeStudents} Aktif ({kpis.activeRate}%)</span>
          </span>
          <span className="text-[#94A3B8]">Semester Ganjil</span>
        </div>
      </div>

      {/* ── CARD 2: RATA-RATA PROGRES KELAS ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Rata-rata Progres Kelas
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.averageProgressPercentage}%
              </span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DFE8FF] text-[#3A4BD4] shadow-xs transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 space-y-1.5 border-t border-[#F1F5F9] pt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6636DE] to-[#7F54F8] transition-all duration-500"
              style={{ width: `${kpis.averageProgressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B]">
            <span className="flex items-center gap-1 text-[#6636DE] font-semibold">
              <Target className="h-3 w-3" /> Target 100%
            </span>
            <span>Kurikulum AI 7 Bab</span>
          </div>
        </div>
      </div>

      {/* ── CARD 3: RATA-RATA NILAI EVALUASI KUIS ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Rata-rata Nilai Kuis
            </span>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#061B38]">
                {kpis.averageQuizScore}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">/ 100</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#B45309] shadow-xs transition-transform group-hover:scale-105">
            <Award className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0FDF4] px-2.5 py-0.5 font-semibold text-[#15803D]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Passing Rate: {scoreDistribution.passingRate}%</span>
          </span>
          <span className="text-[11px] font-medium text-[#64748B]">KKM: 75</span>
        </div>
      </div>

      {/* ── CARD 4: SISWA LULUS & BERSERTIFIKAT UNAIR (Substitusi Kesehatan Sistem) ── */}
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Siswa Bersertifikat
            </span>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-[32px] font-bold tracking-tight text-[#00685F]">
                {kpis.certifiedStudentsCount}
              </span>
              <span className="text-xs font-semibold text-[#64748B]">Siswa Lulus</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#00685F] shadow-xs transition-transform group-hover:scale-105">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-[12px]">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00685F]">
            {kpis.certifiedRate}% Siswa Tuntas
          </span>
          <span className="rounded bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#047857]">
            Akreditasi UNAIR
          </span>
        </div>
      </div>
    </div>
  );
}
