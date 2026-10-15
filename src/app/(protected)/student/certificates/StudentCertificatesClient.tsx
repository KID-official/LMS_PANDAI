'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  Check,
  Copy,
  Lock,
} from 'lucide-react';
import { StudentCertificatesListResult } from '@/actions/certificateActions';

interface StudentCertificatesClientProps {
  initialData: StudentCertificatesListResult;
}

export const StudentCertificatesClient: React.FC<StudentCertificatesClientProps> = ({
  initialData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'CLAIMED' | 'IN_PROGRESS'>('ALL');
  const [copiedSerial, setCopiedSerial] = useState<string | null>(null);

  const { items, stats, studentName } = initialData;

  const handleCopySerial = async (serial: string) => {
    try {
      await navigator.clipboard.writeText(serial);
      setCopiedSerial(serial);
      setTimeout(() => setCopiedSerial(null), 2000);
    } catch {
      // ignore
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.certificate?.serialNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'CLAIMED') {
      return item.status === 'CLAIMED' || item.status === 'READY_TO_CLAIM';
    }
    if (filterStatus === 'IN_PROGRESS') {
      return item.status === 'IN_PROGRESS' || item.status === 'NOT_STARTED';
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* ── Top Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6636DE] via-[#7F54F8] to-[#3A4BD4] p-6 sm:p-10 text-white shadow-lg">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-bold w-fit shadow-xs">
              <GraduationCap className="w-4 h-4 text-[#89F5E7]" />
              <span>PORTAL PORTOFOLIO AKADEMIK RESMI</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Koleksi E-Sertifikat &amp; Kelulusan AI
            </h1>

            <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
              Selamat datang, <strong className="text-white font-bold">{studentName}</strong>. Seluruh sertifikat kelulusan resmi terbitan Pengabdian Masyarakat Universitas Airlangga bersama SFA Learn (AmosProduction) tercatat dan dapat diverifikasi secara publik kapan saja.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/courses"
              className="px-5 py-3 rounded-xl bg-white text-[#6636DE] hover:bg-[#F0F3FF] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#7F54F8]" />
              <span>Katalog Kursus</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3-Grid KPI Stats Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* KPI 1: Sertifikat Diperoleh */}
        <div className="bg-white rounded-2xl p-5 border border-[#CAC3D8]/40 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8DEFF] text-[#5010C8] flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7A7486]">Sertifikat Resmi</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#061B38]">
                {stats?.totalCertificates || 0}
              </span>
              <span className="text-xs font-semibold text-[#7A7486]">
                dari {stats?.totalCourses || 0} Kursus
              </span>
            </div>
            <span className="text-[11px] text-[#00685F] font-semibold mt-0.5">
              Status Terverifikasi
            </span>
          </div>
        </div>

        {/* KPI 2: Nilai Rata-rata */}
        <div className="bg-white rounded-2xl p-5 border border-[#CAC3D8]/40 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#89F5E7]/40 text-[#00685F] flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7A7486]">Rata-rata Nilai</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#00685F]">
                {stats?.averageScore ? `${stats.averageScore}/100` : '-'}
              </span>
            </div>
            <span className="text-[11px] text-[#7A7486] font-medium mt-0.5">
              Predikat Sangat Baik
            </span>
          </div>
        </div>

        {/* KPI 3: Jaminan Verifikasi */}
        <div className="bg-white rounded-2xl p-5 border border-[#CAC3D8]/40 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DFE8FF] text-[#3A4BD4] flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#7A7486]">Otentikasi Nasional</span>
            <span className="text-sm font-extrabold text-[#061B38]">
              UNAIR x SFA Learn
            </span>
            <span className="text-[11px] text-[#3A4BD4] font-semibold mt-0.5">
              QR Code Terdaftar Publik
            </span>
          </div>
        </div>
      </div>

      {/* ── Filter & Search Controls ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              filterStatus === 'ALL'
                ? 'bg-[#7F54F8] text-white shadow-xs'
                : 'bg-white text-[#494455] hover:bg-[#F0F3FF] border border-[#CAC3D8]/40'
            }`}
          >
            Semua Kursus ({items.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('CLAIMED')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              filterStatus === 'CLAIMED'
                ? 'bg-[#00685F] text-white shadow-xs'
                : 'bg-white text-[#494455] hover:bg-[#F0F3FF] border border-[#CAC3D8]/40'
            }`}
          >
            Sertifikat Terbit ({stats?.totalCertificates || 0})
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('IN_PROGRESS')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              filterStatus === 'IN_PROGRESS'
                ? 'bg-[#3A4BD4] text-white shadow-xs'
                : 'bg-white text-[#494455] hover:bg-[#F0F3FF] border border-[#CAC3D8]/40'
            }`}
          >
            Dalam Progres ({(items.length - (stats?.totalCertificates || 0))})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari kursus atau no. seri..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-3.5 pr-9 rounded-xl bg-white border border-[#CAC3D8]/60 text-xs sm:text-sm text-[#061B38] placeholder:text-[#7A7486] focus:outline-none focus:ring-2 focus:ring-[#7F54F8]"
          />
          <Search className="w-4 h-4 text-[#7A7486] absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* ── Certificates Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {filteredItems.map((item) => {
          const isClaimed = item.status === 'CLAIMED' && item.certificate;
          const isReadyToClaim = item.status === 'READY_TO_CLAIM';

          return (
            <div
              key={item.courseKey}
              className={`rounded-3xl bg-white border shadow-xs transition-all flex flex-col overflow-hidden ${
                isClaimed
                  ? 'border-[#7F54F8]/40 hover:shadow-md ring-1 ring-[#7F54F8]/15'
                  : isReadyToClaim
                  ? 'border-[#00685F]/50 ring-2 ring-[#00685F]/20'
                  : 'border-[#CAC3D8]/40 hover:border-[#CAC3D8]/70'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`h-2.5 w-full ${
                  isClaimed
                    ? 'bg-gradient-to-r from-[#7F54F8] to-[#3A4BD4]'
                    : isReadyToClaim
                    ? 'bg-gradient-to-r from-[#00685F] to-[#89F5E7]'
                    : 'bg-[#CAC3D8]/40'
                }`}
              />

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                {/* Header Information */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-[#7F54F8] bg-[#F0F3FF] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#CAC3D8]/30">
                      {item.courseCategory}
                    </span>

                    {isClaimed ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00685F] bg-[#89F5E7]/30 px-3 py-1 rounded-full border border-[#00685F]/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
                        <span>Sertifikat Terbit</span>
                      </span>
                    ) : isReadyToClaim ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00685F] bg-[#89F5E7]/40 px-3 py-1 rounded-full animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-[#00685F]" />
                        <span>Siap Diklaim</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A7486] bg-[#F0F3FF] px-3 py-1 rounded-full border border-[#CAC3D8]/30">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Dalam Progres</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#061B38] leading-snug">
                    {item.courseTitle}
                  </h3>

                  <p className="text-xs text-[#494455] leading-relaxed line-clamp-2">
                    {item.courseTagline}
                  </p>
                </div>

                {/* Certificate Specific Metadata or Progress Bar */}
                {isClaimed ? (
                  <div className="bg-[#F0F3FF] rounded-2xl p-4 border border-[#CAC3D8]/30 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#7A7486] font-medium">Nomor Seri:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#7F54F8]">
                          {item.certificate?.serialNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopySerial(item.certificate?.serialNumber || '')}
                          title="Salin nomor seri"
                          className="p-1 hover:bg-[#DFE8FF] rounded text-[#7A7486] hover:text-[#7F54F8] transition-colors"
                        >
                          {copiedSerial === item.certificate?.serialNumber ? (
                            <Check className="w-3 h-3 text-[#00685F]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#7A7486] font-medium">Nilai Evaluasi:</span>
                      <span className="font-extrabold text-[#00685F]">
                        {item.certificate?.finalScore}/100 • Sangat Baik
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-[#CAC3D8]/30 pt-2">
                      <span className="text-[#7A7486] font-medium">Tanggal Terbit:</span>
                      <span className="text-[#061B38] font-semibold">
                        {item.certificate?.issuedAt
                          ? new Date(item.certificate.issuedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : '-'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F0F3FF] rounded-2xl p-4 border border-[#CAC3D8]/30 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#061B38]">Progres Pembelajaran:</span>
                      <span className="text-[#7F54F8]">
                        {item.completedChaptersCount} dari {item.totalChaptersCount} Bab Selesai
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-[#E7EEFF] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7F54F8] to-[#3A4BD4] transition-all duration-500"
                        style={{ width: `${item.progressPercentage}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#7A7486] leading-relaxed mt-0.5">
                      {isReadyToClaim
                        ? 'Seluruh modul telah tuntas! Klik tombol di bawah untuk mengklaim sertifikat.'
                        : 'Selesaikan seluruh materi bab dan lulus kuis evaluasi untuk membuka sertifikat kelulusan.'}
                    </p>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                  {isClaimed ? (
                    <>
                      <Link
                        href={`/student/courses/${item.courseKey}/certificate`}
                        className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95 group"
                      >
                        <Award className="w-4 h-4 text-[#89F5E7]" />
                        <span>Buka &amp; Unduh PDF</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <Link
                        href={item.certificate?.verificationUrl || `/verify/${item.certificate?.serialNumber}`}
                        className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#DFE8FF] text-[#061B38] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#CAC3D8]/40 transition-all active:scale-95"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#3A4BD4]" />
                        <span>Verifikasi</span>
                      </Link>
                    </>
                  ) : isReadyToClaim ? (
                    <Link
                      href={`/student/courses/${item.courseKey}/certificate`}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#00685F] hover:bg-[#005049] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
                    >
                      <Sparkles className="w-4 h-4 text-[#89F5E7] animate-spin" />
                      <span>Klaim E-Sertifikat Kelulusan</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      href={`/student/courses/${item.courseKey}`}
                      className="w-full py-3 px-4 rounded-xl bg-[#F0F3FF] hover:bg-[#DFE8FF] text-[#7F54F8] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#CAC3D8]/40 transition-all active:scale-95 group"
                    >
                      {item.completedChaptersCount > 0 ? (
                        <>
                          <span>Lanjutkan Belajar</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#7A7486]" />
                          <span>Mulai Pelajari Modul Kursus</span>
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty Search Result State */}
      {filteredItems.length === 0 && (
        <div className="bg-white rounded-3xl p-10 border border-[#CAC3D8]/40 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F3FF] flex items-center justify-center text-[#7A7486]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#061B38]">
            Tidak Ditemukan Sertifikat yang Cocok
          </h3>
          <p className="text-xs text-[#7A7486] max-w-sm">
            Tidak ada kursus atau nomor seri yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Coba gunakan kata kunci lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('ALL');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-[#7F54F8] text-white font-bold text-xs hover:bg-[#6636DE] transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* ── Official Verification Guarantee Footer ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CAC3D8]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DFE8FF] text-[#3A4BD4] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm sm:text-base font-extrabold text-[#061B38]">
              Jaminan Keabsahan &amp; Integritas Dokumen E-Sertifikat
            </h4>
            <p className="text-xs text-[#494455] max-w-2xl leading-relaxed">
              Setiap sertifikat kelulusan yang diterbitkan dilengkapi nomor registrasi unik dan kode QR kriptografis yang dapat divalidasi keasliannya oleh institusi pendidikan, sekolah mitra, maupun dunia industri melalui laman verifikasi publik Universitas Airlangga.
            </p>
          </div>
        </div>

        <Link
          href="/verify/AMOS-2026-75056-AI"
          className="px-4 py-2.5 rounded-xl bg-[#F0F3FF] hover:bg-[#DFE8FF] text-[#3A4BD4] font-bold text-xs flex items-center gap-1.5 border border-[#CAC3D8]/30 transition-all shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Contoh Laman Verifikasi</span>
        </Link>
      </div>
    </div>
  );
};
