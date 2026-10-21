'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import type { ClassSummaryItem } from '@/app/actions/superadminDashboard';

interface ClassEcosystemSummaryWidgetProps {
  classes: ClassSummaryItem[];
}

export default function ClassEcosystemSummaryWidget({
  classes,
}: ClassEcosystemSummaryWidgetProps) {
  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#DFE8FF] text-[#3A4BD4]">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#061B38]">
                Distribusi Rombel Kelas &amp; Capaian Ekosistem
              </h3>
              <p className="text-[12px] text-[#64748B]">
                Komparasi kapasitas dan ketuntasan kurikulum AI di seluruh rombongan belajar
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CAC3D8]/50 bg-[#F0F3FF] px-2.5 py-0.5 text-[11px] font-bold text-[#3A4BD4] shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3A4BD4]" />
            <span>{classes.length} Rombel Terdata</span>
          </span>
        </div>

        {/* ── CLASS PROGRESS BARS ── */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {classes.length === 0 ? (
            <p className="col-span-2 text-center text-[12px] text-[#64748B] py-6">
              Belum ada data rombel kelas terdaftar di dalam sistem.
            </p>
          ) : (
            classes.map((cls) => {
              return (
                <div
                  key={cls.className}
                  className="rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/60 p-3.5 transition-colors hover:bg-white hover:shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[12px] mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#061B38] text-[13px]">
                        Kelas {cls.className}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B]">
                        <Users className="h-3 w-3" />
                        <span>{cls.studentCount} Siswa</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {cls.certifiedCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-[#CCFBF1] px-1.5 py-0.2 text-[10px] font-bold text-[#00685F]">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          <span>{cls.certifiedCount} Lulus</span>
                        </span>
                      )}
                      <span className="font-bold text-[#6636DE]">
                        {cls.averageProgress}%
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6636DE] to-[#7F54F8] transition-all duration-500"
                      style={{ width: `${cls.averageProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-1 border-t border-[#F1F5F9]">
                    <span>Siswa Aktif: <strong>{cls.activeCount}</strong></span>
                    <Link
                      href={`/guru/progress?className=${encodeURIComponent(cls.className)}`}
                      className="font-semibold text-[#6636DE] hover:underline flex items-center gap-0.5"
                    >
                      Audit Rombel &rarr;
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[12px]">
        <span className="text-[#64748B]">
          Pendaftaran rombel baru dapat dilakukan melalui modul Import Massal Siswa.
        </span>
        <Link
          href="/superadmin/import-students"
          className="font-semibold text-[#6636DE] hover:underline flex items-center gap-1"
        >
          <span>Unggah CSV Rombel</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
