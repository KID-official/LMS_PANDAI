'use client';

import React from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Award,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import { AnalyticsKPIs } from '@/app/actions/progressReport';

interface Props {
  kpis: AnalyticsKPIs;
  isLoading?: boolean;
}

export function AnalyticsKPICards({ kpis, isLoading = false }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ── CARD 1: TOTAL SISWA AKTIF ── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
              TOTAL SISWA AKTIF
            </span>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {isLoading ? (
                <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
              ) : (
                kpis.totalActiveStudents
              )}
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7E22CE]">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>+14.2% minggu ini</span>
        </div>
      </div>

      {/* ── CARD 2: TINGKAT KELULUSAN ── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
              TINGKAT KELULUSAN
            </span>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {isLoading ? (
                <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg mt-1" />
              ) : (
                `${kpis.passingRate}%`
              )}
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#059669]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#64748B]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
          <span>Rata-rata Skor: <strong className="text-[#0F172A] font-semibold">{kpis.averageScore}</strong></span>
        </div>
      </div>

      {/* ── CARD 3: SERTIFIKAT TERBIT ── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
              SERTIFIKAT TERBIT
            </span>
            <div className="text-3xl font-extrabold text-[#0F172A]">
              {isLoading ? (
                <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
              ) : (
                kpis.issuedCertificatesCount
              )}
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
            <Award className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#64748B]">
          <FileCheck className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Seri AMOS-2026</span>
        </div>
      </div>

      {/* ── CARD 4: PERLU REMEDIAL / RETRY ── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
              PERLU REMEDIAL / RETRY
            </span>
            <div className="text-3xl font-extrabold text-[#DC2626]">
              {isLoading ? (
                <div className="h-9 w-16 bg-slate-100 animate-pulse rounded-lg mt-1" />
              ) : (
                kpis.remedialNeededCount
              )}
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#DC2626]">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#DC2626]">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Sisa kuota attempt</span>
        </div>
      </div>
    </div>
  );
}
