'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export type FixTargetEntity = 'student' | 'teacher';

export interface FixStudentData {
  rowNumber: number;
  nis: string;
  fullName: string;
  password?: string;
  errorType?: string;
  errorMessage?: string;
}

export interface FixTeacherData {
  rowNumber: number;
  nipNidn: string;
  fullNameWithTitle: string;
  officialEmail: string;
  password?: string;
  errorType?: string;
  errorMessage?: string;
}

export interface FixFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: FixTargetEntity;
  studentData?: FixStudentData | null;
  teacherData?: FixTeacherData | null;
  onSaveStudent?: (
    updated: FixStudentData
  ) => Promise<{ success: boolean; error?: string }>;
  onSaveTeacher?: (
    updated: FixTeacherData
  ) => Promise<{ success: boolean; error?: string }>;
}

export function FixFieldModal({
  isOpen,
  onClose,
  entityType,
  studentData,
  teacherData,
  onSaveStudent,
  onSaveTeacher,
}: FixFieldModalProps) {
  // Student form states
  const [nis, setNis] = useState('');
  const [fullName, setFullName] = useState('');

  // Teacher form states
  const [nipNidn, setNipNidn] = useState('');
  const [fullNameWithTitle, setFullNameWithTitle] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Synchronize state when modal opens
  useEffect(() => {
    if (!isOpen) return;

    setServerError(null);
    setIsSubmitting(false);

    if (entityType === 'student' && studentData) {
      setNis(studentData.nis || '');
      setFullName(studentData.fullName || '');
    } else if (entityType === 'teacher' && teacherData) {
      setNipNidn(teacherData.nipNidn || '');
      setFullNameWithTitle(teacherData.fullNameWithTitle || '');
      setOfficialEmail(teacherData.officialEmail || '');
    }
  }, [isOpen, entityType, studentData, teacherData]);

  if (!isOpen) return null;

  // Determine dynamic title, subtitle, error badge based on entity and problem
  const rowNumber =
    entityType === 'student' ? studentData?.rowNumber || 1 : teacherData?.rowNumber || 1;
  const rawErrorMsg =
    entityType === 'student'
      ? studentData?.errorMessage || 'Data tidak lengkap atau duplikat'
      : teacherData?.errorMessage || 'Data tidak lengkap atau duplikat';
  const errorType =
    entityType === 'student' ? studentData?.errorType : teacherData?.errorType;

  // Derive which field is primary to fix
  let modalTitle = 'Perbaiki Data';
  let modalSubtitle = 'Perbarui data pada baris yang bermasalah.';
  let errorTitle = 'Data Bermasalah';
  let primaryField: 'nis' | 'name' | 'nip' | 'teacherName' | 'email' | 'all' = 'all';

  if (entityType === 'student') {
    if (errorType === 'DUPLICATE_NIS' || rawErrorMsg.toLowerCase().includes('duplikat')) {
      modalTitle = 'Perbaiki NIS';
      modalSubtitle = 'Perbarui NIS pada baris yang bermasalah.';
      errorTitle = 'NIS duplikat';
      primaryField = 'nis';
    } else if (errorType === 'MISSING_NAME' || (!studentData?.fullName && studentData?.nis)) {
      modalTitle = 'Perbaiki Nama';
      modalSubtitle = 'Lengkapi nama siswa pada baris yang bermasalah.';
      errorTitle = 'Nama lengkap kosong';
      primaryField = 'name';
    } else if (errorType === 'MISSING_NIS') {
      modalTitle = 'Perbaiki NIS';
      modalSubtitle = 'Lengkapi NIS pada baris yang bermasalah.';
      errorTitle = 'NIS kosong';
      primaryField = 'nis';
    }
  } else {
    // Teacher entity
    if (errorType === 'DUPLICATE_NIP' || rawErrorMsg.toLowerCase().includes('nip')) {
      modalTitle = 'Perbaiki NIP/NIDN';
      modalSubtitle = 'Perbarui NIP/NIDN pada baris yang bermasalah.';
      errorTitle = 'NIP/NIDN duplikat';
      primaryField = 'nip';
    } else if (errorType === 'DUPLICATE_EMAIL' || errorType === 'INVALID_EMAIL') {
      modalTitle = 'Perbaiki Email';
      modalSubtitle = 'Perbarui email resmi pada baris yang bermasalah.';
      errorTitle = 'Email resmi bermasalah';
      primaryField = 'email';
    } else if (errorType === 'MISSING_NAME') {
      modalTitle = 'Perbaiki Nama';
      modalSubtitle = 'Lengkapi nama lengkap dan gelar pengajar.';
      errorTitle = 'Nama pengajar kosong';
      primaryField = 'teacherName';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setIsSubmitting(true);

    try {
      if (entityType === 'student') {
        if (!nis.trim()) {
          setServerError('Kolom NIS wajib diisi.');
          setIsSubmitting(false);
          return;
        }
        if (!fullName.trim()) {
          setServerError('Kolom Nama Lengkap wajib diisi.');
          setIsSubmitting(false);
          return;
        }

        if (onSaveStudent && studentData) {
          const res = await onSaveStudent({
            ...studentData,
            nis: nis.trim(),
            fullName: fullName.trim(),
          });

          if (!res.success) {
            setServerError(res.error || 'Gagal menyimpan perubahan.');
            setIsSubmitting(false);
            return;
          }
        }
      } else {
        // Teacher
        if (!nipNidn.trim()) {
          setServerError('Kolom NIP/NIDN wajib diisi.');
          setIsSubmitting(false);
          return;
        }
        if (!fullNameWithTitle.trim()) {
          setServerError('Kolom Nama Lengkap wajib diisi.');
          setIsSubmitting(false);
          return;
        }
        if (!officialEmail.trim()) {
          setServerError('Kolom Email Resmi wajib diisi.');
          setIsSubmitting(false);
          return;
        }

        if (onSaveTeacher && teacherData) {
          const res = await onSaveTeacher({
            ...teacherData,
            nipNidn: nipNidn.trim(),
            fullNameWithTitle: fullNameWithTitle.trim(),
            officialEmail: officialEmail.trim(),
          });

          if (!res.success) {
            setServerError(res.error || 'Gagal menyimpan perubahan.');
            setIsSubmitting(false);
            return;
          }
        }
      }

      onClose();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
      setServerError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 transition-all transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER BADGE & CLOSE ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EEFE] text-[#7F54F8]">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-extrabold tracking-wider text-[#7F54F8] uppercase">
              VALIDASI IMPOR CSV
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition cursor-pointer disabled:opacity-50"
            aria-label="Tutup Modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── TITLE & SUBTITLE ── */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#061B38]">
            {modalTitle}
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            {modalSubtitle}
          </p>
        </div>

        {/* ── ERROR CALLOUT BOX ── */}
        <div className="mt-5 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorTitle}</span>
            </div>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-700 border border-rose-100 shadow-2xs">
              Baris #{rowNumber}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
            {rawErrorMsg}
          </p>
        </div>

        {/* Server / Validation Error inline notification */}
        {serverError && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* ── FORM FIELDS ── */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {entityType === 'student' ? (
            <>
              {/* NIS Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    NIS
                  </label>
                  <span className="text-xs text-[#94A3B8]">Wajib diisi</span>
                </div>
                <input
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  placeholder="Contoh: 20260101"
                  autoFocus={primaryField === 'nis'}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:ring-2 focus:ring-[#7F54F8]/20 transition disabled:bg-slate-50"
                />
                <p className="text-[11px] text-[#64748B]">
                  Pastikan NIS sesuai dengan data resmi sekolah.
                </p>
              </div>

              {/* Nama Lengkap Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    Nama Lengkap
                  </label>
                  <span className="text-xs text-[#94A3B8]">Wajib diisi</span>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masukkan nama lengkap siswa"
                  autoFocus={primaryField === 'name'}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:ring-2 focus:ring-[#7F54F8]/20 transition disabled:bg-slate-50"
                />
                <p className="text-[11px] text-[#64748B]">
                  Gunakan nama lengkap sesuai data resmi sekolah.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* NIP/NIDN */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    NIP / NIDN
                  </label>
                  <span className="text-xs text-[#94A3B8]">Wajib diisi</span>
                </div>
                <input
                  type="text"
                  value={nipNidn}
                  onChange={(e) => setNipNidn(e.target.value)}
                  placeholder="Contoh: 198703032015011003"
                  autoFocus={primaryField === 'nip'}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:ring-2 focus:ring-[#7F54F8]/20 transition disabled:bg-slate-50"
                />
                <p className="text-[11px] text-[#64748B]">
                  Pastikan NIP/NIDN sesuai dengan data kepegawaian resmi.
                </p>
              </div>

              {/* Nama Guru Lengkap */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    Nama Lengkap & Gelar
                  </label>
                  <span className="text-xs text-[#94A3B8]">Wajib diisi</span>
                </div>
                <input
                  type="text"
                  value={fullNameWithTitle}
                  onChange={(e) => setFullNameWithTitle(e.target.value)}
                  placeholder="Contoh: Dr. Budi Santoso, M.Kom."
                  autoFocus={primaryField === 'teacherName'}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:ring-2 focus:ring-[#7F54F8]/20 transition disabled:bg-slate-50"
                />
              </div>

              {/* Email Resmi */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    Email Resmi (Login)
                  </label>
                  <span className="text-xs text-[#94A3B8]">Wajib diisi</span>
                </div>
                <input
                  type="email"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                  placeholder="budi@unair.ac.id"
                  autoFocus={primaryField === 'email'}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:ring-2 focus:ring-[#7F54F8]/20 transition disabled:bg-slate-50"
                />
              </div>
            </>
          )}

          {/* ── FOOTER ACTIONS ── */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#7F54F8] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#6D3DF5] transition shadow-md shadow-[#7F54F8]/20 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan Perubahan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
