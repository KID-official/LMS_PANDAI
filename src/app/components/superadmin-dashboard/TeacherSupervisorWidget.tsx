'use client';

import React from 'react';
import Link from 'next/link';
import {
  School,
  ExternalLink,
  Plus,
} from 'lucide-react';
import type { TeacherOverviewItem } from '@/app/actions/superadminDashboard';

interface TeacherSupervisorWidgetProps {
  teachers: TeacherOverviewItem[];
}

function getInitials(name: string): string {
  if (!name) return 'G';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function TeacherSupervisorWidget({
  teachers,
}: TeacherSupervisorWidgetProps) {
  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9] gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#DFE8FF] text-[#3A4BD4]">
              <School className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#061B38] truncate">
                Pengawasan Akun Pengajar
              </h3>
              <p className="text-[12px] text-[#64748B] truncate">
                Status guru aktif &amp; verifikasi data NIP
              </p>
            </div>
          </div>

          <Link
            href="/superadmin/teachers"
            className="inline-flex items-center gap-1 rounded-full border border-[#CAC3D8]/50 bg-[#F0F3FF] px-2.5 py-0.5 text-[11px] font-bold text-[#6636DE] shadow-2xs hover:bg-[#EDE9FE] transition-colors shrink-0"
          >
            <span>{teachers.length} Guru</span>
          </Link>
        </div>

        {/* ── TEACHER LIST ── */}
        <div className="mt-4 space-y-2.5">
          {teachers.length === 0 ? (
            <p className="text-center text-[12px] text-[#64748B] py-6">
              Belum ada data pengajar terdaftar.
            </p>
          ) : (
            teachers.map((t, idx) => (
              <div
                key={t.id}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3 transition-all hover:border-[#CAC3D8] hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      idx % 2 === 0
                        ? 'bg-[#EDE9FE] text-[#6636DE]'
                        : 'bg-[#DFE8FF] text-[#3A4BD4]'
                    }`}
                  >
                    {getInitials(t.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-[#061B38] text-[13px] truncate group-hover:text-[#6636DE] transition-colors">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">
                      NIP: {t.nip}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {t.isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold text-[#64748B]">
                      Nonaktif
                    </span>
                  )}
                  <Link
                    href={`/superadmin/teachers?search=${encodeURIComponent(t.nip)}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#F0F3FF] hover:text-[#6636DE]"
                    title="Kelola Data Guru"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── FOOTER ACTIONS ── */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[12px]">
        <Link
          href="/superadmin/teachers"
          className="font-semibold text-[#6636DE] hover:underline flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Tambah Pengajar Manual</span>
        </Link>
        <Link
          href="/superadmin/import-teachers"
          className="text-[#64748B] hover:text-[#6636DE] hover:underline"
        >
          Import CSV Guru
        </Link>
      </div>
    </div>
  );
}
