'use client';

import React from 'react';
import {
  Server,
  Database,
  FileCheck2,
  HardDrive,
  Cpu,
} from 'lucide-react';
import type { SystemHealthData } from '@/app/actions/superadminDashboard';

interface SystemHealthWidgetProps {
  health: SystemHealthData;
}

export default function SystemHealthWidget({ health }: SystemHealthWidgetProps) {
  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#059669]">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#061B38]">
                Status Integritas Ekosistem
              </h3>
              <p className="text-[12px] text-[#64748B]">
                Kesehatan basis data &amp; runtime server
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Sistem Normal</span>
          </span>
        </div>

        {/* ── METRIC LIST ── */}
        <div className="mt-4 space-y-3">
          {/* Item 1: Database Status */}
          <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3">
            <div className="flex items-center gap-2.5">
              <Database className="h-4 w-4 text-[#3A4BD4]" />
              <span className="text-[12px] font-medium text-[#061B38]">
                Basis Data PostgreSQL
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              {health.dbStatus}
            </span>
          </div>

          {/* Item 2: User Progress Rows */}
          <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3">
            <div className="flex items-center gap-2.5">
              <HardDrive className="h-4 w-4 text-[#6636DE]" />
              <span className="text-[12px] font-medium text-[#061B38]">
                Log Progres Siswa
              </span>
            </div>
            <span className="text-[12px] font-bold text-[#061B38]">
              {health.totalProgressRows} Record
            </span>
          </div>

          {/* Item 3: Quiz Score Rows */}
          <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3">
            <div className="flex items-center gap-2.5">
              <Cpu className="h-4 w-4 text-[#B45309]" />
              <span className="text-[12px] font-medium text-[#061B38]">
                Submisi Evaluasi Kuis
              </span>
            </div>
            <span className="text-[12px] font-bold text-[#061B38]">
              {health.totalQuizRows} Submisi
            </span>
          </div>

          {/* Item 4: PDF Certificate Engine */}
          <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/70 p-3">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="h-4 w-4 text-[#00685F]" />
              <span className="text-[12px] font-medium text-[#061B38]">
                Generator Sertifikat
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#00685F]">
              Siap Cetak
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
        Infrastruktur serverless Next.js App Router dengan koneksi pooling Prisma.
      </div>
    </div>
  );
}
