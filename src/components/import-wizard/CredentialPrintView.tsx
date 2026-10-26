'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Printer,
  Download,
  Copy,
  Check,
  Search,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
} from 'lucide-react';
import { ImportedStudentCredential, ImportedTeacherCredential } from '@/app/actions/bulkImport';

export type CredentialItem =
  | (ImportedStudentCredential & { entity: 'student'; targetCourse?: string })
  | (ImportedTeacherCredential & { entity: 'teacher' });

export interface CredentialPrintViewProps {
  credentials: CredentialItem[];
  title?: string;
  finishHref: string;
  finishLabel?: string;
  onResetWizard?: () => void;
}

export function CredentialPrintView({
  credentials,
  title = 'Daftar Kredensial Akun yang Dibuat',
  finishHref,
  finishLabel = 'Selesai & Ke Manajemen',
  onResetWizard,
}: CredentialPrintViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllPasswords, setShowAllPasswords] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Filter credentials based on search
  const filteredCredentials = credentials.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    if (item.entity === 'student') {
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.nis.toLowerCase().includes(q) ||
        item.className.toLowerCase().includes(q)
      );
    } else {
      return (
        item.fullNameWithTitle.toLowerCase().includes(q) ||
        item.nipNidn.toLowerCase().includes(q) ||
        item.officialEmail.toLowerCase().includes(q) ||
        (item.institution && item.institution.toLowerCase().includes(q))
      );
    }
  });

  // Handle Print trigger
  const handlePrint = () => {
    window.print();
  };

  // Handle CSV Download
  const handleDownloadCsv = () => {
    if (credentials.length === 0) return;

    let csvContent = '';
    const isStudent = credentials[0].entity === 'student';

    if (isStudent) {
      csvContent = 'NIS,Nama Lengkap,Kelas,Semester,Username,Password Awal,Peran,Kursus Sasaran\n';
      credentials.forEach((item) => {
        if (item.entity === 'student') {
          const course = item.targetCourse || 'Literasi AI Dasar (Level Beginner)';
          csvContent += `"${item.nis}","${item.fullName}","${item.className}","${item.semester}","${item.nis}","${item.plainPassword}","SISWA","${course}"\n`;
        }
      });
    } else {
      csvContent = 'NIP/NIDN,Nama Lengkap,Email Resmi,Jabatan,Institusi,Username,Password Awal,Peran\n';
      credentials.forEach((item) => {
        if (item.entity === 'teacher') {
          csvContent += `"${item.nipNidn}","${item.fullNameWithTitle}","${item.officialEmail}","${item.functionalPosition || '-'}","${item.institution || '-'}","${item.officialEmail}","${item.plainPassword}","GURU"\n`;
        }
      });
    }

    const filename = isStudent
      ? `kredensial_siswa_${new Date().toISOString().slice(0, 10)}.csv`
      : `kredensial_guru_${new Date().toISOString().slice(0, 10)}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy individual password
  const handleCopyPassword = (pass: string, idx: number) => {
    navigator.clipboard.writeText(pass);
    setCopiedIndex(idx);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* ── PRINT-SPECIFIC CSS RULES ── */}
      <style jsx global>{`
        @media print {
          /* Hide all surrounding app chrome */
          nav,
          aside,
          header,
          footer,
          .no-print,
          button,
          a,
          input {
            display: none !important;
          }

          /* Force body and background to pure white */
          html,
          body,
          main {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-only-container {
            display: block !important;
            visibility: visible !important;
            padding: 10mm 15mm !important;
          }

          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 8mm !important;
          }

          .screen-only-container {
            display: none !important;
          }
        }

        @media screen {
          .print-only-container {
            display: none;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          SCREEN DISPLAY (Interactive Table & Toolbar)
          ══════════════════════════════════════════════════════════════ */}
      <div className="screen-only-container space-y-5">
        {/* Toolbar & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NIS, NIP, atau kelas..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#7F54F8] focus:bg-white focus:ring-2 focus:ring-[#7F54F8]/20 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAllPasswords(!showAllPasswords)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              {showAllPasswords ? (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-slate-500" />
                  <span>Sembunyikan Sandi</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 text-slate-500" />
                  <span>Tampilkan Sandi</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] px-3.5 py-2 text-xs font-bold text-[#7F54F8] hover:bg-[#EDE9FE] transition cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh Berkas (.csv)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-[#7F54F8] px-4 py-2 text-xs font-bold text-white hover:bg-[#6D3DF5] transition cursor-pointer shadow-sm shadow-[#7F54F8]/25"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Cetak Kredensial</span>
            </button>

            <Link
              href={finishHref}
              className="flex items-center gap-1.5 rounded-xl bg-[#061B38] px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-2xs"
            >
              <span>{finishLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Credentials Table Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#7F54F8]" />
              <h3 className="text-sm font-bold text-[#061B38]">{title}</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredCredentials.length} dari {credentials.length} akun
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-[#F8FAFC] text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">Nomor Induk</th>
                  <th className="py-3 px-4">Username Login</th>
                  <th className="py-3 px-4">Kelas / Lembaga</th>
                  <th className="py-3 px-4">Password Awal</th>
                  <th className="py-3 px-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCredentials.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Tidak ada kredensial yang cocok dengan pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredCredentials.map((item, idx) => {
                    const isStudent = item.entity === 'student';
                    const name = isStudent ? item.fullName : item.fullNameWithTitle;
                    const idNumber = isStudent ? item.nis : item.nipNidn;
                    const username = isStudent ? item.nis : item.officialEmail;
                    const group = isStudent ? item.className : item.institution || item.functionalPosition || '-';
                    const pass = item.plainPassword;

                    return (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400 font-semibold">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#061B38]">
                          {name}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-600">
                          {idNumber}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-700">
                          {username}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                            {group}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold tracking-wider text-[#7F54F8] bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded-md text-[11px]">
                              {showAllPasswords ? pass : '••••••••'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleCopyPassword(pass, idx)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:border-[#7F54F8] hover:text-[#7F54F8] hover:bg-[#F5F3FF] transition cursor-pointer"
                            title="Salin Sandi"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Bottom Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-[#061B38]">
              Ingin mengimpor berkas CSV lainnya?
            </h4>
            <p className="text-xs text-slate-500">
              Anda dapat mengunggah berkas gelombang baru untuk kelas atau rombel lain.
            </p>
          </div>
          {onResetWizard && (
            <button
              onClick={onResetWizard}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Impor Berkas Lainnya
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PRINT-ONLY CONTAINER (Cuttable Physical Slips for Students/Teachers)
          ══════════════════════════════════════════════════════════════ */}
      <div className="print-only-container">
        <div className="mb-4 text-center border-b pb-3">
          <h1 className="text-xl font-bold tracking-tight text-black uppercase">
            KARTU KREDENSIAL AKSES LMS — RESMI
          </h1>
          <p className="text-xs text-gray-600">
            SFA Learn • Portal Literasi AI • Disdik & Universitas Airlangga
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {credentials.map((item, idx) => {
            const isStudent = item.entity === 'student';
            const name = isStudent ? item.fullName : item.fullNameWithTitle;
            const idNumber = isStudent ? item.nis : item.nipNidn;
            const username = isStudent ? item.nis : item.officialEmail;
            const group = isStudent ? `Kelas: ${item.className}` : `Institusi: ${item.institution || '-'}`;
            const role = isStudent ? 'SISWA' : 'GURU / INSTRUKTUR';
            const course = isStudent
              ? item.targetCourse || 'Literasi AI Dasar (Level Beginner)'
              : 'Portal Manajemen Pembelajaran AI';

            return (
              <div
                key={idx}
                className="print-card rounded-xl border-2 border-dashed border-gray-400 p-4 bg-white text-black relative"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight">SFA Learn</span>
                    <span className="text-[10px] text-gray-500">| AI Literacy LMS</span>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-gray-700 uppercase">
                    {role}
                  </span>
                </div>

                {/* Card Body */}
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Nama Lengkap:</span>
                    <p className="font-bold text-sm text-black leading-tight">{name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">
                        {isStudent ? 'NIS:' : 'NIP / NIDN:'}
                      </span>
                      <p className="font-mono font-bold text-black">{idNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-semibold">
                        {isStudent ? 'Rombel:' : 'Jabatan / Inst:'}
                      </span>
                      <p className="font-medium text-black">{group}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 border border-gray-200 p-2 mt-2 space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-600 font-semibold">Username Login:</span>
                      <span className="font-mono font-bold text-black">{username}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-600 font-semibold">Password Awal:</span>
                      <span className="font-mono font-extrabold text-black text-xs px-2 py-0.5 bg-gray-200 rounded">
                        {item.plainPassword}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 pt-0.5 border-t border-gray-200">
                      <span>Kursus Sasaran:</span>
                      <span className="font-medium truncate max-w-[170px]">{course}</span>
                    </div>
                  </div>
                </div>

                {/* Card Instructions & Cut Line */}
                <div className="mt-2.5 pt-2 border-t border-gray-200 text-[9px] text-gray-500 leading-tight">
                  <p className="font-bold text-gray-700">Petunjuk Login:</p>
                  <p>1. Buka portal LMS di browser: <strong>lms.amos.ac.id</strong></p>
                  <p>2. Segera ganti kata sandi ini setelah login pertama kali demi keamanan akun.</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-[8px] text-gray-400">
                  <span>✂ - - - - - - - - - - - - - - - - - - - - -</span>
                  <span>Potong di sini</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
