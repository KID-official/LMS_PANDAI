'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  Search,
  CheckCircle2,
  FileQuestion,
  ExternalLink,
} from 'lucide-react';
import type { RecentActivityItem } from '@/app/actions/guruDashboard';

interface RecentStudentActivityTableProps {
  activities: RecentActivityItem[];
}

function getInitials(name: string): string {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getMonogramColor(index: number): { bg: string; text: string } {
  const colors = [
    { bg: 'bg-[#EDE9FE]', text: 'text-[#6636DE]' },
    { bg: 'bg-[#DFE8FF]', text: 'text-[#3A4BD4]' },
    { bg: 'bg-[#CCFBF1]', text: 'text-[#00685F]' },
    { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
    { bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]' },
  ];
  return colors[index % colors.length];
}

export default function RecentStudentActivityTable({
  activities,
}: RecentStudentActivityTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = activities.filter((act) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      act.studentName.toLowerCase().includes(term) ||
      act.nis.toLowerCase().includes(term) ||
      act.className.toLowerCase().includes(term) ||
      act.title.toLowerCase().includes(term)
    );
  });

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs">
      {/* ── HEADER & SEARCH ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#6636DE]">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#061B38]">
                Aktivitas &amp; Progres Belajar Siswa
              </h3>
              <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Realtime Feed
              </span>
            </div>
            <p className="text-[12px] text-[#64748B]">
              Catatan submisi kuis dan penyelesaian modul terbaru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari siswa atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 w-44 sm:w-56 rounded-lg border border-[#E5E7EB] bg-[#F9F9FF] pl-8 pr-3 text-[12px] text-[#061B38] placeholder:text-[#94A3B8] focus:border-[#6636DE] focus:bg-white focus:outline-none"
            />
          </div>

          <Link
            href="/guru/progress"
            className="flex h-8 items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] font-semibold text-[#061B38] transition-colors hover:bg-[#F9F9FF] hover:text-[#6636DE]"
          >
            <span>Semua Laporan</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── TABLE CONTAINER ── */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="pb-3 pr-4">Siswa &amp; Identitas</th>
              <th className="pb-3 px-4">Materi / Submisi</th>
              <th className="pb-3 px-4">Jenis Aktivitas</th>
              <th className="pb-3 px-4 text-center">Hasil &amp; Nilai</th>
              <th className="pb-3 px-4">Waktu</th>
              <th className="pb-3 pl-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[13px] text-[#64748B]">
                  Tidak ada aktivitas siswa yang cocok dengan pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((act, idx) => {
                const mono = getMonogramColor(idx);
                const isQuiz = act.activityType === 'QUIZ_SUBMISSION';
                return (
                  <tr
                    key={act.id}
                    className="group transition-colors hover:bg-[#F9F9FF]"
                  >
                    {/* Student Info */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${mono.bg} ${mono.text}`}
                        >
                          {getInitials(act.studentName)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#061B38] group-hover:text-[#6636DE] transition-colors truncate">
                            {act.studentName}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                            <span>NIS: {act.nis}</span>
                            <span>•</span>
                            <span className="rounded bg-[#F1F5F9] px-1.5 py-0.2 font-medium text-[#475569]">
                              {act.className}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Material Title */}
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <p className="font-medium text-[#061B38] line-clamp-1">
                        {act.title}
                      </p>
                      {act.subTitle && (
                        <p className="text-[11px] text-[#64748B] line-clamp-1">
                          {act.subTitle}
                        </p>
                      )}
                    </td>

                    {/* Activity Type Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isQuiz ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#B45309]">
                          <FileQuestion className="h-3 w-3" />
                          <span>Kuis Evaluasi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#0369A1]">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Selesai Bab</span>
                        </span>
                      )}
                    </td>

                    {/* Score / Grade */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {isQuiz && typeof act.score === 'number' ? (
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={`font-bold text-[14px] ${
                              act.score >= 75 ? 'text-[#00685F]' : 'text-[#BA1A1A]'
                            }`}
                          >
                            {act.score}
                            <span className="text-[10px] font-normal text-[#64748B]">
                              /100
                            </span>
                          </span>
                          <span
                            className={`text-[10px] font-semibold ${
                              act.score >= 85
                                ? 'text-[#00685F]'
                                : act.score >= 75
                                ? 'text-[#3A4BD4]'
                                : 'text-[#BA1A1A]'
                            }`}
                          >
                            {act.scoreGrade}
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00685F]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Tuntas 100%</span>
                        </div>
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[12px] text-[#64748B]">
                      {act.timeAgoText}
                    </td>

                    {/* Action link */}
                    <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                      <Link
                        href={`/guru/progress?search=${encodeURIComponent(act.nis)}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#F0F3FF] hover:text-[#6636DE]"
                        title="Audit Progres & Lembar Jawaban Siswa"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
