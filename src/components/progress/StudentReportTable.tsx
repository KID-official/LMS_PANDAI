'use client';

import React from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { StudentReportRow } from '@/app/actions/progressReport';

interface Props {
  data: StudentReportRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (newPage: number) => void;
  onAuditClick: (userId: string, quizKey: string) => void;
}

// Generate consistent avatar background colors based on name initials
const AVATAR_COLORS = [
  'bg-[#7C3AED]', // Violet
  'bg-[#059669]', // Emerald
  'bg-[#2563EB]', // Blue
  'bg-[#D97706]', // Amber
  'bg-[#DC2626]', // Rose
  'bg-[#0D9488]', // Teal
  'bg-[#4F46E5]', // Indigo
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function StudentReportTable({
  data,
  total,
  page,
  limit,
  totalPages,
  isLoading = false,
  onPageChange,
  onAuditClick,
}: Props) {
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(total, page * limit);

  // Generate pagination pages
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === '...') {
        return (
          <span key={`ellipsis-${idx}`} className="px-2 text-xs text-[#94A3B8]">
            ...
          </span>
        );
      }
      const isCurrent = p === page;
      return (
        <button
          key={`page-${p}`}
          onClick={() => onPageChange(p as number)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition cursor-pointer ${
            isCurrent
              ? 'bg-[#7C3AED] text-white shadow-sm'
              : 'text-[#475569] hover:bg-[#F1F5F9]'
          }`}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
      {/* ── RESPONSIVE TABLE WRAPPER ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
              <th className="py-4 pl-6 pr-4">SISWA</th>
              <th className="py-4 px-4">KURSUS</th>
              <th className="py-4 px-4">PROGRESS BAB</th>
              <th className="py-4 px-4">SKOR KUIS</th>
              <th className="py-4 px-4">ATTEMPT</th>
              <th className="py-4 px-4">SERTIFIKAT</th>
              <th className="py-4 pl-4 pr-6 text-center">AUDIT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs sm:text-sm">
            {isLoading ? (
              // Skeleton rows
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-28 rounded bg-slate-100" />
                        <div className="h-3 w-20 rounded bg-slate-100" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1.5">
                      <div className="h-3 w-16 rounded bg-slate-100" />
                      <div className="h-4 w-32 rounded bg-slate-100" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-24 rounded bg-slate-100" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-16 rounded bg-slate-100" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-14 rounded bg-slate-100" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 w-28 rounded bg-slate-100" />
                  </td>
                  <td className="py-4 pl-4 pr-6 text-center">
                    <div className="h-8 w-24 mx-auto rounded-lg bg-slate-100" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#94A3B8]">
                  Tidak ada data siswa yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const initials = getInitials(row.fullName);
                const avatarBg = getAvatarColor(row.fullName);

                return (
                  <tr
                    key={row.userId}
                    className="hover:bg-[#F8FAFC]/80 transition-colors"
                  >
                    {/* 1. SISWA */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        {row.imageUrl ? (
                          <img
                            src={row.imageUrl}
                            alt={row.fullName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover border border-[#E2E8F0]"
                          />
                        ) : (
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarBg} shadow-sm`}
                          >
                            {initials}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-[#0F172A] leading-tight">
                            {row.fullName}
                          </div>
                          <div className="text-[11px] text-[#64748B] mt-0.5">
                            NIS: {row.nis} •{' '}
                            <span className="font-medium text-[#7C3AED]">
                              {row.className}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. KURSUS */}
                    <td className="py-4 px-4">
                      <div>
                        <span className="inline-block rounded-md bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-bold text-[#4F46E5] uppercase tracking-wide">
                          {row.courseLevel}
                        </span>
                        <div className="mt-0.5 font-semibold text-[#0F172A] text-xs">
                          {row.courseName}
                        </div>
                      </div>
                    </td>

                    {/* 3. PROGRESS BAB */}
                    <td className="py-4 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#0F172A]">
                            {row.completedChapters} dari {row.totalChapters} Bab
                          </span>
                          <span
                            className={`font-bold ${
                              row.progressPercentage === 100
                                ? 'text-[#059669]'
                                : 'text-[#3B82F6]'
                            }`}
                          >
                            {row.progressPercentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              row.progressPercentage === 100
                                ? 'bg-[#059669]'
                                : 'bg-[#3B82F6]'
                            }`}
                            style={{ width: `${row.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 4. SKOR KUIS */}
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-sm font-extrabold text-[#7C3AED]">
                          {row.latestScore !== null ? `${row.latestScore}/100` : '??/100'}
                        </div>
                        <div
                          className={`text-[11px] font-semibold ${
                            row.scoreStatusColor === 'emerald'
                              ? 'text-[#059669]'
                              : row.scoreStatusColor === 'violet'
                              ? 'text-[#7C3AED]'
                              : row.scoreStatusColor === 'amber'
                              ? 'text-[#D97706]'
                              : 'text-[#94A3B8]'
                          }`}
                        >
                          {row.scoreStatusText}
                        </div>
                      </div>
                    </td>

                    {/* 5. ATTEMPT */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-[#475569]">
                        {row.attemptText}
                      </span>
                    </td>

                    {/* 6. SERTIFIKAT */}
                    <td className="py-4 px-4">
                      {row.certificateStatus === 'ISSUED' && row.certificateSerialNumber ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#1D4ED8] border border-[#DBEAFE]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB]" />
                          <span>Diterbitkan ({row.certificateSerialNumber})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-xl bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-medium text-[#64748B]">
                          Belum Berhak
                        </span>
                      )}
                    </td>

                    {/* 7. AUDIT */}
                    <td className="py-4 pl-4 pr-6 text-center">
                      {row.hasQuiz ? (
                        <button
                          onClick={() => onAuditClick(row.userId, row.latestQuizKey || 'quiz-literasi-ai-dasar')}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#6D28D9] hover:shadow cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Audit Jawaban</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 text-xs font-medium text-[#94A3B8] cursor-not-allowed opacity-75"
                        >
                          <EyeOff className="h-3.5 w-3.5" />
                          <span>Belum Ada Kuis</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER & PAGINATION ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#E2E8F0] px-6 py-4">
        <div className="text-xs text-[#64748B]">
          Menampilkan <strong className="text-[#0F172A] font-semibold">{startItem}-{endItem}</strong> dari{' '}
          <strong className="text-[#0F172A] font-semibold">{total}</strong> entitas hasil audit
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
