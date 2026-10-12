'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  Loader2,
  FileCheck,
  Users,
} from 'lucide-react';
import {
  validateTeacherCsv,
  executeTeacherBulkImport,
  TeacherCsvValidationResult,
} from '@/app/actions/bulkImport';

export default function ImportTeachersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const [validationResult, setValidationResult] = useState<TeacherCsvValidationResult | null>(null);
  const [importSummary, setImportSummary] = useState<{
    successCount: number;
    errorCount: number;
  } | null>(null);

  // Download template CSV guru
  const handleDownloadTemplate = () => {
    const templateContent =
      'NIP/NIDN,Nama,Email,Jabatan,Institusi,WA,Password\n' +
      '198703032015011003,Rizal Pratama M.T.,rizal@amos.com,Dosen Vokasi,UNAIR,081234567890,guru123\n' +
      '199004042018012004,Dewi Lestari M.Pd.,dewi@amos.com,Instruktur AI,Mitra AMOS,081298765432,guru123\n';

    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_import_guru.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file select
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setImportSummary(null);
    setIsValidating(true);

    try {
      const text = await selectedFile.text();
      const result = await validateTeacherCsv(text);
      setValidationResult(result);
    } catch (err) {
      console.error(err);
      alert('Gagal membaca berkas CSV.');
    } finally {
      setIsValidating(false);
    }
  };

  // Handle execute import
  const handleExecuteImport = async () => {
    if (!validationResult || validationResult.validRows.length === 0) return;

    setIsImporting(true);
    try {
      const res = await executeTeacherBulkImport(
        validationResult.validRows.map((r) => ({
          nipNidn: r.nipNidn,
          fullNameWithTitle: r.fullNameWithTitle,
          officialEmail: r.officialEmail,
          functionalPosition: r.functionalPosition,
          institution: r.institution,
          whatsappContact: r.whatsappContact,
          password: r.password,
        }))
      );
      setImportSummary(res);
    } catch (err) {
      console.error(err);
      alert('Gagal mengeksekusi import massal guru.');
    } finally {
      setIsImporting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFile(null);
    setFileName('');
    setValidationResult(null);
    setImportSummary(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
          <span>SUPER ADMIN</span>
          <span className="text-[#94A3B8]">•</span>
          <span className="text-[#64748B]">IMPOR MASSAL TENAGA PENDIDIK</span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Import Massal Guru
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Daftarkan akun staf pengajar & instruktur menggunakan berkas CSV dengan validasi NIP dan Email resmi.
        </p>
      </div>

      {/* ── STEP 1 & 2: TEMPLATE & UPLOAD ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
            <Download className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">1. Unduh Template CSV Guru</h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Format kolom wajib: <code className="bg-slate-100 px-1 py-0.5 rounded text-[#0F172A]">NIP/NIDN, Nama, Email, Jabatan, Institusi, WA, Password</code>.
          </p>
          <button
            onClick={handleDownloadTemplate}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] bg-white py-2 text-xs font-bold text-[#2563EB] hover:bg-[#EFF6FF] transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Unduh Template CSV Guru</span>
          </button>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A]">2. Unggah & Validasi Berkas CSV</h2>
            {file && (
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Ganti Berkas</span>
              </button>
            )}
          </div>

          <label
            htmlFor="teacher-csv-upload"
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] p-6 hover:border-[#2563EB] hover:bg-[#F8FAFC] transition cursor-pointer"
          >
            <input
              id="teacher-csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB] mb-2">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="text-xs font-bold text-[#0F172A]">
              {fileName ? fileName : 'Pilih atau Seret Berkas CSV Guru ke sini'}
            </div>
            <p className="mt-1 text-[11px] text-[#94A3B8]">
              Pastikan alamat email guru belum pernah didaftarkan sebelumnya.
            </p>
          </label>
        </div>
      </div>

      {/* ── LOADING VALIDATION ── */}
      {isValidating && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          <p className="text-xs font-semibold text-[#64748B]">Memvalidasi NIP, NIDN, dan Email pengajar...</p>
        </div>
      )}

      {/* ── ERROR HEADER TIDAK SESUAI ── */}
      {validationResult && !validationResult.isValidHeader && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <XCircle className="h-5 w-5 text-rose-600" />
            <span>Format Kolom Berkas Tidak Sesuai</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">
            {validationResult.headerErrorMessage}
          </p>
          <div className="pt-2">
            <button
              onClick={handleDownloadTemplate}
              className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800 transition cursor-pointer"
            >
              Unduh Template yang Benar
            </button>
          </div>
        </div>
      )}

      {/* ── VALIDATION SUMMARY & PREVIEW ── */}
      {validationResult && validationResult.isValidHeader && !importSummary && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E2E8F0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Hasil Validasi Pra-Impor Guru
              </h2>
              <p className="text-xs text-[#64748B]">
                Pemeriksaan duplikasi NIP dan Email di database telah selesai.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#059669] border border-[#A7F3D0]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{validationResult.validRows.length} Guru Valid</span>
              </span>
              {validationResult.invalidRows.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#FEF2F2] px-2.5 py-1 text-xs font-bold text-[#DC2626] border border-[#FECACA]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{validationResult.invalidRows.length} Error / Duplikat</span>
                </span>
              )}
            </div>
          </div>

          {/* Invalid Rows Table */}
          {validationResult.invalidRows.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#DC2626] flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Daftar Guru Bermasalah (Akan dilewati jika Anda memilih Skip Error):</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-rose-200 bg-rose-50/50">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-rose-200 text-[#991B1B] font-bold">
                      <th className="py-2.5 px-3">Baris</th>
                      <th className="py-2.5 px-3">NIP / NIDN</th>
                      <th className="py-2.5 px-3">Nama</th>
                      <th className="py-2.5 px-3">Email</th>
                      <th className="py-2.5 px-3">Penyebab Masalah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100 text-[#7F1D1D]">
                    {validationResult.invalidRows.map((r) => (
                      <tr key={r.rowNumber}>
                        <td className="py-2 px-3 font-mono font-bold">Baris {r.rowNumber}</td>
                        <td className="py-2 px-3 font-mono">{r.nipNidn || '-'}</td>
                        <td className="py-2 px-3">{r.fullNameWithTitle || '-'}</td>
                        <td className="py-2 px-3 font-mono">{r.officialEmail || '-'}</td>
                        <td className="py-2 px-3 font-medium text-rose-700">{r.errorMessage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Valid Rows Preview Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
              <FileCheck className="h-3.5 w-3.5 text-[#059669]" />
              <span>Daftar Guru yang Siap Didaftarkan:</span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] font-bold">
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">NIP / NIDN</th>
                    <th className="py-2.5 px-3">Nama & Gelar</th>
                    <th className="py-2.5 px-3">Email Resmi</th>
                    <th className="py-2.5 px-3">Jabatan</th>
                    <th className="py-2.5 px-3">Institusi</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#0F172A]">
                  {validationResult.validRows.slice(0, 10).map((r, i) => (
                    <tr key={r.rowNumber} className="hover:bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-mono text-[#64748B]">{i + 1}</td>
                      <td className="py-2 px-3 font-mono font-bold">{r.nipNidn}</td>
                      <td className="py-2 px-3 font-semibold">{r.fullNameWithTitle}</td>
                      <td className="py-2 px-3">{r.officialEmail}</td>
                      <td className="py-2 px-3 text-[#64748B]">{r.functionalPosition || '-'}</td>
                      <td className="py-2 px-3 text-[#64748B]">{r.institution || '-'}</td>
                      <td className="py-2 px-3 text-center">
                        <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          VALID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {validationResult.validRows.length > 10 && (
              <p className="text-[11px] text-[#64748B] italic">
                Menampilkan 10 dari {validationResult.validRows.length} baris valid.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              onClick={handleReset}
              className="rounded-xl border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Batalkan Impor
            </button>

            <button
              onClick={handleExecuteImport}
              disabled={isImporting || validationResult.validRows.length === 0}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1D4ED8] shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memproses Impor...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>
                    {validationResult.invalidRows.length > 0
                      ? `Lanjutkan & Skip Error (${validationResult.validRows.length} Guru)`
                      : `Eksekusi Impor (${validationResult.validRows.length} Guru)`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── SUCCESS RESULT SUMMARY ── */}
      {importSummary && (
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
            <CheckCircle2 className="h-8 w-8 text-[#059669]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0F172A]">
            Import Massal Guru Berhasil!
          </h2>
          <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
            Sebanyak <strong className="text-[#2563EB]">{importSummary.successCount} akun guru baru</strong> telah
            berhasil didaftarkan ke dalam sistem LMS.
            {importSummary.errorCount > 0 && ` (${importSummary.errorCount} baris bermasalah dilewati)`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="rounded-xl border border-[#CBD5E1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Impor Berkas Lainnya
            </button>

            <Link
              href="/superadmin/teachers"
              className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-xs font-bold text-white hover:bg-[#6D28D9] transition shadow-sm"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Buka Halaman Kelola Guru</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
