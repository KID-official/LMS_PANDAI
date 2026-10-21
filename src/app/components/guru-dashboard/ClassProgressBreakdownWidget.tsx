'use client';

import React from 'react';
import { Layers, Users, CheckCircle2 } from 'lucide-react';
import type { ClassBreakdownItem } from '@/app/actions/guruDashboard';

interface ClassProgressBreakdownWidgetProps {
  classes: ClassBreakdownItem[];
}

export default function ClassProgressBreakdownWidget({
  classes,
}: ClassProgressBreakdownWidgetProps) {
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
              <h3 className="text-sm font-bold text-[#061B38]">
                Sebaran Progres per Rombel Kelas
              </h3>
              <p className="text-[12px] text-[#64748B]">
                Komparasi tingkat ketuntasan kurikulum AI antar rombongan belajar
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-bold text-[#475569]">
            {classes.length} Rombel
          </span>
        </div>

        {/* ── CLASS PROGRESS BARS ── */}
        <div className="mt-4 space-y-3.5">
          {classes.length === 0 ? (
            <p className="text-center text-[12px] text-[#64748B] py-6">
              Belum ada data rombel kelas terdaftar.
            </p>
          ) : (
            classes.map((cls) => {
              return (
                <div
                  key={cls.className}
                  className="rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/60 p-3 transition-colors hover:bg-white"
                >
                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#061B38] text-[13px]">
                        Kelas {cls.className}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B]">
                        <Users className="h-3 w-3" />
                        <span>{cls.totalStudents} Siswa</span>
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

                  <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-1.5 pt-1 border-t border-[#F1F5F9]">
                    <span>Rata-rata Skor Kuis</span>
                    <span className="font-semibold text-[#061B38]">
                      {cls.averageScore > 0 ? `${cls.averageScore} / 100` : 'Belum Kuis'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
        Data diperbarui otomatis dari aktivitas pengerjaan video dan kuis tiap rombel.
      </div>
    </div>
  );
}
