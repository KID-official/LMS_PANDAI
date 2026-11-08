'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Loader2,
  HelpCircle,
  ShieldCheck,
  SlidersHorizontal,
  X,
  FileText,
} from 'lucide-react';
import { WizardStepper } from '@/components/import-wizard/WizardStepper';
import {
  FixFieldModal,
  FixTeacherData,
} from '@/components/import-wizard/FixFieldModal';
import {
  CredentialPrintView,
  CredentialItem,
} from '@/components/import-wizard/CredentialPrintView';
import {
  validateAndImportTeachers,
  fixAndImportTeacher,
  FailedTeacherRow,
} from '@/app/actions/bulkImport';

export default function ImportTeachersPage() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('');
  const [detectedRowCount, setDetectedRowCount] = useState<number | null>(null);

  // Configuration options (Step 2)
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
  const [autoActivate, setAutoActivate] = useState(true);

  // Execution states
  const [isProcessing, setIsProcessing] = useState(false);
  const [headerError, setHeaderError] = useState<string | null>(null);

  // Step 3 & 4 data states
  const [totalRows, setTotalRows] = useState(0);
  const [failedRows, setFailedRows] = useState<FailedTeacherRow[]>([]);
  const [credentials, setCredentials] = useState<CredentialItem[]>([]);

  // Fix modal state
  const [selectedFixRow, setSelectedFixRow] = useState<FixTeacherData | null>(null);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);

  // CSV Guide modal state
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Template CSV download
  const handleDownloadTemplate = () => {
    const templateContent =
      'NIP/NIDN,Nama,Email,Password\n' +
      '198703032015011003,Dr. Rizal Pratama M.T.,rizal@amos.com,\n' +
      '199004042018012004,Dewi Lestari M.Pd.,dewi@amos.com,\n' +
      '198505052010011002,Arief Wicaksono S.Kom.,arief@amos.com,\n';

    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_import_guru.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file drop / change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    processSelectedFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processSelectedFile(droppedFile);
    }
  };

  const processSelectedFile = async (selected: File) => {
    setFile(selected);
    setFileName(selected.name);
    setHeaderError(null);

    const kb = (selected.size / 1024).toFixed(0);
    setFileSizeStr(`${kb} KB`);

    try {
      const text = await selected.text();
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const estRows = Math.max(0, lines.length - 1);
      setDetectedRowCount(estRows);
    } catch {
      setDetectedRowCount(null);
    }
  };

  // Clear file
  const handleClearFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFile(null);
    setFileName('');
    setFileSizeStr('');
    setDetectedRowCount(null);
    setHeaderError(null);
  };

  // Execute Validation & Initial Import
  const handleValidateAndImport = async () => {
    if (!file) {
      alert('Silakan pilih berkas CSV guru terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    setHeaderError(null);

    try {
      const csvText = await file.text();
      const result = await validateAndImportTeachers(csvText, {
        autoGeneratePassword,
      });

      if (!result.isValidHeader) {
        setHeaderError(
          result.headerErrorMessage ||
            'Format kolom CSV guru tidak sesuai. Pastikan kolom NIP/NIDN, Nama, dan Email tersedia.'
        );
        setIsProcessing(false);
        return;
      }

      setTotalRows(result.summary.totalRows);
      setFailedRows(result.failedRows);

      const mappedCredentials: CredentialItem[] = result.successfulImports.map((c) => ({
        ...c,
        entity: 'teacher' as const,
      }));
      setCredentials(mappedCredentials);

      if (result.failedRows.length > 0) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }
    } catch (err: unknown) {
      console.error(err);
      setHeaderError(
        err instanceof Error ? err.message : 'Terjadi kegagalan saat membaca berkas CSV.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Open Fix Modal for Teacher
  const handleOpenFixModal = (row: FailedTeacherRow) => {
    setSelectedFixRow({
      rowNumber: row.rowNumber,
      nipNidn: row.nipNidn,
      fullNameWithTitle: row.fullNameWithTitle,
      officialEmail: row.officialEmail,
      errorType: row.errorType,
      errorMessage: row.errorMessage,
    });
    setIsFixModalOpen(true);
  };

  // Save Fixed Teacher
  const handleSaveFixedTeacher = async (
    updated: FixTeacherData
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await fixAndImportTeacher({
      nipNidn: updated.nipNidn,
      fullNameWithTitle: updated.fullNameWithTitle,
      officialEmail: updated.officialEmail,
      password: updated.password,
    });

    if (res.success && res.credential) {
      setFailedRows((prev) => prev.filter((r) => r.rowNumber !== updated.rowNumber));

      setCredentials((prev) => [
        ...prev,
        {
          ...res.credential!,
          entity: 'teacher',
        },
      ]);

      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'Gagal menyimpan dan memverifikasi data guru.',
    };
  };

  // Delete / Skip single failed row
  const handleDeleteFailedRow = (rowNumber: number) => {
    setFailedRows((prev) => prev.filter((r) => r.rowNumber !== rowNumber));
  };

  // Reset entire wizard
  const handleResetWizard = () => {
    handleClearFile();
    setFailedRows([]);
    setCredentials([]);
    setTotalRows(0);
    setCurrentStep(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12">
      {/* ── BREADCRUMB & HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <Link
              href="/guru/dashboard"
              className="hover:text-[#7F54F8] transition"
            >
              Learning Management
            </Link>
            <span>&gt;</span>
            <Link
              href="/superadmin/teachers"
              className="hover:text-[#7F54F8] transition"
            >
              Teachers
            </Link>
            <span>&gt;</span>
            <span className="text-[#7F54F8]">CSV Import Wizard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#061B38]">
            Import Guru Massal via CSV
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Daftarkan akun staf pengajar &amp; instruktur AI secara massal dengan kredensial instan
          </p>
        </div>

        {/* Panduan Format CSV Guru button */}
        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
        >
          <HelpCircle className="h-4 w-4 text-[#7F54F8]" />
          <span>Panduan Format CSV</span>
        </button>
      </div>

      {/* ── STEPPER BAR ── */}
      <WizardStepper
        currentStep={currentStep}
        hasErrors={failedRows.length > 0}
        onStepClick={(step) => {
          if (step <= currentStep) setCurrentStep(step);
        }}
      />

      {/* ── HEADER FORMAT ERROR BANNER ── */}
      {headerError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 shadow-xs space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2.5 text-rose-800 font-bold text-sm">
            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <span>Format Kolom Berkas Tidak Sesuai</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed pl-7.5">
            {headerError}
          </p>
          <div className="pl-7.5 pt-2">
            <button
              onClick={handleDownloadTemplate}
              className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800 transition cursor-pointer"
            >
              Unduh Template yang Benar
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          STEPS 1 & 2: UNDUH TEMPLATE, UPLOAD CSV & KONFIGURASI
          ══════════════════════════════════════════════════════════════ */}
      {(currentStep === 1 || currentStep === 2) && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Card 1: Download Template */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EEFE] text-[#7F54F8]">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-[#061B38]">
                  Download Template CSV Guru
                </h3>
                <p className="text-xs text-slate-500">
                  Struktur data akun pengajar resmi
                </p>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Format baku impor mencakup kolom NIP/NIDN, Nama, dan Email Resmi (opsional: Password).
            </p>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F0F3FF] border border-[#DDD6FE]/60 py-2.5 text-xs font-bold text-[#7F54F8] hover:bg-[#E5ECFF] transition cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Unduh Template CSV Guru (.csv)</span>
            </button>
          </div>

          {/* Card 2: Upload File Berkas */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-[#061B38]">
                Upload Berkas Guru (.csv)
              </h3>
              <span className="rounded-full bg-[#F0EEFE] px-2.5 py-0.5 text-[11px] font-bold text-[#7F54F8]">
                Wajib
              </span>
            </div>

            {/* Dropzone */}
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFF] p-8 hover:border-[#7F54F8] hover:bg-[#F3F4FE] transition cursor-pointer group"
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#7F54F8] mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#061B38]">
                Tarik file CSV ke sini atau klik Telusuri
              </p>
              <p className="mt-1 text-[11px] text-[#94A3B8]">
                Maksimal 5MB, format berkas .csv (UTF-8)
              </p>
            </label>

            {/* Selected File Pill */}
            {file && (
              <div className="flex items-center justify-between rounded-xl bg-[#F0EEFE]/80 border border-[#DDD6FE] p-3.5 animate-in fade-in">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7F54F8] text-white">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#061B38]">
                      {fileName}
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      {fileSizeStr} • {detectedRowCount !== null ? `${detectedRowCount} Baris Guru Terdeteksi` : 'Berkas Siap Diproses'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Hapus Berkas"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Section: Konfigurasi Akun Guru */}
            <div className="pt-3 border-t border-slate-100 space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-[#061B38]">
                Konfigurasi Pembuatan Akun Guru
              </h4>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoGeneratePassword}
                    onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#7F54F8] focus:ring-[#7F54F8] accent-[#7F54F8]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#061B38]">
                      Buat password acak jika kolom password kosong
                    </span>
                    <p className="text-[11px] text-[#64748B]">
                      Kombinasi 6 digit alfanumerik acak unik per pengajar
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoActivate}
                    onChange={(e) => setAutoActivate(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#7F54F8] focus:ring-[#7F54F8] accent-[#7F54F8]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#061B38]">
                      Aktifkan akun guru secara otomatis
                    </span>
                    <p className="text-[11px] text-[#64748B]">
                      Guru dapat langsung login melalui portal LMS
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleClearFile}
                  disabled={isProcessing}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={handleValidateAndImport}
                  disabled={!file || isProcessing}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#7F54F8] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#6D3DF5] transition shadow-md shadow-[#7F54F8]/20 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Menganalisis &amp; Memverifikasi Baris Guru...</span>
                    </>
                  ) : (
                    <span>Periksa &amp; Validasi Baris Data Guru</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          STEP 3: VALIDASI & ERROR CHECKING
          ══════════════════════════════════════════════════════════════ */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Partial Error Alert Banner */}
          {failedRows.length > 0 && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-rose-800">
                  Validasi Parsial: Ditemukan {failedRows.length} Baris Tidak Sesuai
                </h3>
                <p className="mt-1 text-xs text-rose-700 leading-relaxed">
                  Terdapat {failedRows.length} data guru bermasalah dari total {totalRows} baris file CSV. Anda dapat mengabaikan baris gagal dan melanjutkan pendaftaran {credentials.length} guru lainnya.
                </p>
              </div>
            </div>
          )}

          {/* 3 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* KPI 1: TOTAL BARIS */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  TOTAL BARIS GURU
                </p>
                <h3 className="mt-1 text-3xl font-extrabold text-[#061B38]">
                  {totalRows}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">Record diunggah</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
            </div>

            {/* KPI 2: VALID & SUDAH MASUK DB */}
            <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  VALID &amp; SUDAH MASUK DB
                </p>
                <h3 className="mt-1 text-3xl font-extrabold text-[#061B38]">
                  {credentials.length}
                </h3>
                <p className="mt-0.5 text-xs text-emerald-600 font-semibold">
                  {totalRows > 0 ? `${Math.round((credentials.length / totalRows) * 100)}% Siap Didaftarkan` : '100%'}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            {/* KPI 3: GAGAL / ERROR */}
            <div className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  GAGAL / ERROR
                </p>
                <h3 className="mt-1 text-3xl font-extrabold text-[#061B38]">
                  {failedRows.length}
                </h3>
                <p className="mt-0.5 text-xs text-rose-600 font-semibold">
                  {failedRows.length > 0 ? 'Perlu Perhatian' : 'Semua Baris Valid'}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Table: Detail Audit Baris Berkas (if errors exist) */}
          {failedRows.length > 0 && (
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#7F54F8]" />
                  <h3 className="text-sm font-bold text-[#061B38]">
                    Detail Audit Baris Berkas Guru
                  </h3>
                </div>
                <span className="rounded-full bg-[#F0EEFE] px-2.5 py-0.5 text-[11px] font-bold text-[#7F54F8]">
                  Tampilan {failedRows.length} Masalah
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#F8FAFC] text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Baris</th>
                      <th className="py-3 px-4">NIP / NIDN</th>
                      <th className="py-3 px-4">Nama Lengkap &amp; Gelar</th>
                      <th className="py-3 px-4">Email Resmi</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Jenis Error</th>
                      <th className="py-3 px-4 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {failedRows.map((row) => (
                      <tr key={row.rowNumber} className="hover:bg-rose-50/30 transition-colors">
                        <td className="py-3 px-4 font-bold text-rose-600">
                          #{row.rowNumber}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-700">
                          {row.nipNidn || '—'}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#061B38]">
                          {row.fullNameWithTitle ? (
                            row.fullNameWithTitle
                          ) : (
                            <span className="italic text-slate-400">— (Kosong)</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {row.officialEmail || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                            <span>Error</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-rose-600 max-w-xs">
                          {row.errorMessage}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteFailedRow(row.rowNumber)}
                              className="rounded-lg bg-[#EFF6FF] px-2.5 py-1.5 text-xs font-semibold text-[#3B82F6] hover:bg-[#DBEAFE] transition cursor-pointer"
                            >
                              Lewati (Delete)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenFixModal(row)}
                              className="rounded-lg bg-[#F3E8FF] px-2.5 py-1.5 text-xs font-bold text-[#7F54F8] hover:bg-[#E9D5FF] transition cursor-pointer"
                            >
                              Perbaiki Data
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Green verification banner */}
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <p>
              <strong>{credentials.length} Guru lainnya</strong> lolos verifikasi dan otomatis terdaftar ke database sistem.
            </p>
          </div>

          {/* Card: Langkah Eksekusi Impor */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#061B38]">
                Langkah Eksekusi Impor Guru
              </h3>
              <p className="text-xs text-slate-500">
                Sistem siap membuat {credentials.length} akun pengajar aktif untuk portal pembelajaran.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetWizard}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Batalkan Impor Data
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                disabled={credentials.length === 0}
                className="flex items-center gap-2 rounded-xl bg-[#7F54F8] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#6D3DF5] transition shadow-md shadow-[#7F54F8]/20 cursor-pointer disabled:opacity-50"
              >
                <span>Lanjut ke Hasil &amp; Cetak Kredensial</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Security & Credentials Callout */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#DDD6FE]/60 bg-[#F0F5FF] p-4 text-xs text-slate-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0E7FF] text-[#7F54F8]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-[#061B38]">
                Catatan Keamanan Akun Pengajar
              </p>
              <p className="mt-0.5 text-[#64748B] leading-relaxed">
                Kata sandi awal dienkripsi dengan standar <strong>bcrypt</strong> dan pengajar disarankan memperbarui kata sandi setelah login pertama kali.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          STEP 4: HASIL & CETAK KREDENSIAL
          ══════════════════════════════════════════════════════════════ */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Success Hero Alert */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7 text-center shadow-xs space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#061B38]">
              Pendaftaran Massal Berhasil! {credentials.length} Akun Guru Telah Dibuat
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
              Seluruh akun pengajar telah aktif dan siap digunakan untuk masuk ke portal LMS.
            </p>
          </div>

          {/* Credential Print View Component */}
          <CredentialPrintView
            credentials={credentials}
            title="Daftar Kredensial Akun Guru Baru"
            finishHref="/superadmin/teachers"
            finishLabel="Lihat di Kelola Guru"
            onResetWizard={handleResetWizard}
          />
        </div>
      )}

      {/* ── MODAL PERBAIKI DATA GURU ── */}
      <FixFieldModal
        isOpen={isFixModalOpen}
        onClose={() => setIsFixModalOpen(false)}
        entityType="teacher"
        teacherData={selectedFixRow}
        onSaveTeacher={handleSaveFixedTeacher}
      />

      {/* ── MODAL PANDUAN FORMAT CSV GURU ── */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#7F54F8] font-bold text-sm">
                <HelpCircle className="h-5 w-5" />
                <span>Panduan Format CSV Guru &amp; Instruktur</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Susunan kolom header CSV pengajar di baris pertama:
              </p>
              <div className="rounded-xl bg-slate-900 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                NIP/NIDN,Nama,Email,Password
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>NIP/NIDN:</strong> Nomor induk pegawai atau dosen unik.</li>
                <li><strong>Nama:</strong> Nama lengkap beserta gelar akademik resmi.</li>
                <li><strong>Email:</strong> Alamat email aktif resmi yang digunakan untuk login akun.</li>
                <li><strong>Password:</strong> Opsional, jika kosong sistem akan menghasilkan sandi 6 digit acak.</li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-[#7F54F8] hover:bg-[#F0EEFE] cursor-pointer"
              >
                Unduh Template CSV Guru
              </button>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="rounded-xl bg-[#7F54F8] px-4 py-2 text-xs font-bold text-white hover:bg-[#6D3DF5] cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
