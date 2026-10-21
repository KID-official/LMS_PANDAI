'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import type { RemedialStudentItem } from '@/app/actions/guruDashboard';

interface RemedialInterventionAlertProps {
  students: RemedialStudentItem[];
}

function getInitials(name: string): string {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function RemedialInterventionAlert({
  students,
}: RemedialInterventionAlertProps) {
  const hasRemedial = students.length > 0;

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9] gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                hasRemedial
                  ? 'bg-[#FDE8E8] text-[#BA1A1A]'
                  : 'bg-[#ECFDF5] text-[#059669]'
              }`}
            >
              {hasRemedial ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#061B38] truncate">
                Pusat Intervensi &amp; Remedial
              </h3>
              <p className="text-[12px] text-[#64748B] truncate">
                Siswa butuh pendampingan guru atau remedial kuis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="rounded-md border border-[#CAC3D8]/50 bg-[#F0F3FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6636DE]">
              Topik 4
            </span>
            {hasRemedial && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#FECACA] bg-[#FDE8E8] px-2.5 py-0.5 text-[11px] font-bold text-[#9B1C1C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                <span>{students.length} Siswa</span>
              </span>
            )}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="mt-4 space-y-2.5">
          {!hasRemedial ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-[#F0FDF4] p-6 text-center border border-[#DCFCE7]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-[13px] font-bold text-[#15803D]">
                Semua Siswa Memenuhi KKM
              </p>
              <p className="text-[11px] text-[#166534] mt-1 max-w-xs">
                Tidak ada siswa yang memerlukan remedial kuis saat ini. Tingkat kompetensi kelas berada dalam status optimal.
              </p>
            </div>
          ) : (
            students.map((st) => {
              const isMaxAttempt = st.issueType === 'MAX_ATTEMPTS';
              const isZeroProgress = st.issueType === 'ZERO_PROGRESS';

              return (
                <div
                  key={st.userId}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3 transition-all hover:border-[#CAC3D8] hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isMaxAttempt
                          ? 'bg-[#FDE8E8] text-[#9B1C1C]'
                          : isZeroProgress
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                      }`}
                    >
                      {getInitials(st.fullName)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#061B38] text-[13px] truncate">
                          {st.fullName}
                        </span>
                        <span className="shrink-0 rounded bg-[#E2E8F0] px-1.5 py-0.2 text-[10px] font-bold text-[#475569]">
                          {st.className}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                        {st.reason}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/guru/progress?search=${encodeURIComponent(st.nis)}`}
                    className="flex shrink-0 items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#061B38] transition-colors group-hover:border-[#6636DE] group-hover:text-[#6636DE]"
                  >
                    <span>Audit</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── FOOTER LINK ── */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[12px]">
        <span className="text-[#64748B]">
          Standar Ketuntasan Minimal: <strong>75</strong>
        </span>
        <Link
          href="/guru/progress"
          className="font-semibold text-[#6636DE] hover:underline flex items-center gap-1"
        >
          <span>Pusat Remedial Lengkap</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
