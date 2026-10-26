'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Award,
  RotateCw,
  Download,
  Filter,
} from 'lucide-react';

interface Props {
  search: string;
  className: string;
  certificateStatus: string;
  courseKey: string;
  availableClasses: string[];
  isExporting?: boolean;
  onSearchChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onCertStatusChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onRefresh: () => void;
  onExport: () => void;
}

export function ReportFilterBar({
  search,
  className,
  certificateStatus,
  courseKey,
  availableClasses,
  isExporting = false,
  onSearchChange,
  onClassChange,
  onCertStatusChange,
  onCourseChange,
  onRefresh,
  onExport,
}: Props) {
  const [localSearch, setLocalSearch] = useState(search);

  // Sync internal state with external search prop
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  return (
    <div className="space-y-4">
      {/* ── HEADER ATAS (Breadcrumb, Title, & Action Buttons) ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
            <span>LMS AUDIT & ANALYTICS</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B]">Tahun Ajaran 2026/2027</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
            Laporan Progress & Audit Kuis Siswa
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
            Pantau pencapaian belajar, status kelulusan, dan audit jawaban kuis per siswa.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dropdown Filter Kursus */}
          <div className="relative inline-flex items-center">
            <label htmlFor="course-select" className="sr-only">Pilih Kursus</label>
            <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#334155] shadow-sm hover:border-[#CBD5E1]">
              <Filter className="h-4 w-4 text-[#7C3AED]" />
              <span className="text-[#64748B] hidden sm:inline">Filtered By Kursus:</span>
              <select
                id="course-select"
                aria-label="Pilih Kursus"
                value={courseKey}
                onChange={(e) => onCourseChange(e.target.value)}
                className="cursor-pointer bg-transparent font-bold text-[#7C3AED] focus:outline-none"
              >
                <option value="ALL">Semua Kursus (7 Bab)</option>
                <option value="course-beginner">Etika & Keamanan AI Siswa (4 Bab)</option>
                <option value="course-intermediate">Forensik Visual & Deteksi Deepfake (3 Bab)</option>
              </select>
            </div>
          </div>

          {/* Tombol Export Laporan Ungu */}
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#6D28D9] disabled:opacity-60 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Mengekspor...' : 'Export Laporan (Excel/CSV)'}</span>
          </button>
        </div>
      </div>

      {/* ── TOOLBAR FILTER & SEARCH ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-2.5 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NIS, atau email siswa..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full rounded-xl bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition"
          />
        </div>

        {/* Filter Kelas */}
        <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#334155] border border-transparent hover:border-[#E2E8F0] transition">
          <Users className="h-4 w-4 text-[#64748B]" />
          <span className="text-[#64748B]">Kelas:</span>
          <select
            value={className}
            onChange={(e) => onClassChange(e.target.value)}
            className="cursor-pointer bg-transparent font-semibold text-[#0F172A] focus:outline-none"
          >
            <option value="ALL">Semua Kelas</option>
            {availableClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Status Sertifikat */}
        <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#334155] border border-transparent hover:border-[#E2E8F0] transition">
          <Award className="h-4 w-4 text-[#64748B]" />
          <span className="text-[#64748B]">Status Sertifikat:</span>
          <select
            value={certificateStatus}
            onChange={(e) => onCertStatusChange(e.target.value)}
            className="cursor-pointer bg-transparent font-semibold text-[#0F172A] focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="ISSUED">Diterbitkan</option>
            <option value="NOT_ELIGIBLE">Belum Berhak</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          title="Muat Ulang Data"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition cursor-pointer"
        >
          <RotateCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
