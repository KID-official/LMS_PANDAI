'use client';

import React from 'react';
import {
  Clock,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface StudentStatsHeaderProps {
  studentProfile: {
    fullName: string;
    nis: string;
    className: string;
    semester: string;
  } | null;
  stats: {
    totalHoursWatched: number;
    completedChaptersCount: number;
    totalChaptersCount: number;
    averageQuizScore: number;
    certificatesEarnedCount: number;
  };
}

export const StudentStatsHeader: React.FC<StudentStatsHeaderProps> = ({
  studentProfile,
  stats,
}) => {
  const displayName = studentProfile?.fullName || 'Siswa PANDAI LEARNING';
  const nis = studentProfile?.nis || '20260101';



  return (
    <div className="flex flex-col gap-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7F54F8] via-[#6636DE] to-[#3A4BD4] p-6 sm:p-8 text-white shadow-md">
        {/* Decorative background blur blobs */}
        <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#89F5E7]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md self-start">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Portal Siswa • Kurikulum 2026/2027</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Selamat Datang Kembali, <span className="text-[#89F5E7]">{displayName}</span>!
            </h1>
            
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-1">
              Pantau perkembangan modul pembelajaran AI, tingkatkan pemahaman forensik visual, dan kumpulkan sertifikat kompetensi digitalmu.
            </p>
          </div>

          {/* Student Profile Info Tag Pill */}
          <div className="flex flex-col gap-1.5 rounded-2xl bg-white/15 p-4 backdrop-blur-md border border-white/20 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-2 text-xs font-bold">
              <GraduationCap className="h-4 w-4 text-[#89F5E7]" />
              <span>Data Identitas Siswa</span>
            </div>
            <div className="flex flex-col text-xs text-white/90 gap-0.5">
              <span>NIS: <strong className="text-white font-mono">{nis}</strong></span>
              <span>Status: <strong className="text-emerald-300">Akun Siswa Aktif</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Jam Belajar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col justify-between gap-3 group hover:border-[#7F54F8]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7486]">Durasi Nonton</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F3FF] text-[#7F54F8] group-hover:bg-[#7F54F8] group-hover:text-white transition-colors">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#061B38]">
              {stats.totalHoursWatched} <span className="text-xs font-semibold text-[#7A7486]">Jam</span>
            </span>
            <span className="text-[11px] text-[#7A7486] mt-0.5">Akumulasi durasi materi</span>
          </div>
        </div>

        {/* Metric 2: Bab Selesai */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col justify-between gap-3 group hover:border-[#00685F]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7486]">Bab Diselesaikan</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#89F5E7]/40 text-[#00685F] group-hover:bg-[#00685F] group-hover:text-white transition-colors">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#061B38]">
              {stats.completedChaptersCount} <span className="text-xs font-semibold text-[#7A7486]">/ {stats.totalChaptersCount} Bab</span>
            </span>
            <span className="text-[11px] text-[#00685F] font-semibold mt-0.5">Modul pembelajaran</span>
          </div>
        </div>

        {/* Metric 3: Nilai Rata-rata Kuis */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col justify-between gap-3 group hover:border-[#3A4BD4]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7486]">Rata-rata Nilai</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DFE0FF] text-[#3A4BD4] group-hover:bg-[#3A4BD4] group-hover:text-white transition-colors">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#061B38]">
              {stats.averageQuizScore} <span className="text-xs font-semibold text-[#7A7486]">/ 100</span>
            </span>
            <span className="text-[11px] text-[#3A4BD4] font-semibold mt-0.5">Hasil evaluasi kuis</span>
          </div>
        </div>

        {/* Metric 4: Sertifikat Dimiliki */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col justify-between gap-3 group hover:border-[#7F54F8]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7486]">Sertifikat Dimiliki</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8DEFF] text-[#5010C8] group-hover:bg-[#7F54F8] group-hover:text-white transition-colors">
              <Award className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#061B38]">
              {stats.certificatesEarnedCount} <span className="text-xs font-semibold text-[#7A7486]">Sertifikat</span>
            </span>
            <span className="text-[11px] text-[#5010C8] font-semibold mt-0.5">Terverifikasi PANDAI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
