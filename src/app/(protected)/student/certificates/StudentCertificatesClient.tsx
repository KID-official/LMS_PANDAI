'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  Check,
  Copy,
  LayoutDashboard,
} from 'lucide-react';
import { StudentCertificatesListResult } from '@/actions/certificateActions';

interface StudentCertificatesClientProps {
  initialData: StudentCertificatesListResult;
}

export const StudentCertificatesClient: React.FC<StudentCertificatesClientProps> = ({
  initialData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Only search within earned/completed certificates
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.certificate?.serialNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
              Selamat datang, <strong className="text-white font-bold">{studentName}</strong>. Halaman ini khusus menampilkan sertifikat modul yang telah berhasil kamu selesaikan hingga tahap kelulusan resmi.
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
                Sertifikat Diterbitkan
              </span>
            </div>
            <span className="text-[11px] text-[#00685F] font-semibold mt-0.5">
              Status Terverifikasi Sah
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

      {/* ── Control Bar: Header & Search ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F0F3FF] border border-[#CAC3D8]/30 text-xs font-bold text-[#7F54F8]">
            <Award className="w-4 h-4 text-[#7F54F8]" />
            <span>Menampilkan {filteredItems.length} Sertifikat Kelulusan Resmi</span>
          </div>
        </div>

        {/* Search Input (Only shown if student has certificates) */}
        {items.length > 0 && (
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
        )}
      </div>

      {/* ── Certificates Cards Grid ── */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {filteredItems.map((item) => {
            const isClaimed = item.status === 'CLAIMED' && item.certificate;

            return (
              <div
                key={item.courseKey}
                className="rounded-3xl bg-white border border-[#7F54F8]/30 shadow-xs hover:shadow-md ring-1 ring-[#7F54F8]/10 transition-all flex flex-col overflow-hidden"
              >
                {/* Top Gradient Accent Strip */}
                <div className="h-2.5 w-full bg-gradient-to-r from-[#7F54F8] via-[#6636DE] to-[#3A4BD4]" />

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
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00685F] bg-[#89F5E7]/40 px-3 py-1 rounded-full animate-pulse">
                          <Sparkles className="w-3.5 h-3.5 text-[#00685F]" />
                          <span>Siap Diklaim</span>
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

                  {/* Certificate Specific Metadata Card */}
                  {isClaimed ? (
                    <div className="bg-[#F0F3FF] rounded-2xl p-4 border border-[#CAC3D8]/30 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#7A7486] font-medium">Nomor Registrasi:</span>
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
                        <span className="text-[#7A7486] font-medium">Nilai Kelulusan:</span>
                        <span className="font-extrabold text-[#00685F]">
                          {item.certificate?.finalScore}/100 • Sangat Baik
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs border-t border-[#CAC3D8]/30 pt-2">
                        <span className="text-[#7A7486] font-medium">Tanggal Diterbitkan:</span>
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
                    <div className="bg-[#89F5E7]/20 rounded-2xl p-4 border border-[#00685F]/30 flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#00685F]">
                        Seluruh Bab Selesai &amp; Lulus Kuis 🎉
                      </span>
                      <p className="text-[11px] text-[#005049] leading-relaxed">
                        Klik tombol di bawah untuk menerbitkan dan mengklaim e-sertifikat resmi pertamamu.
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
                    ) : (
                      <Link
                        href={`/student/courses/${item.courseKey}/certificate`}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#00685F] hover:bg-[#005049] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
                      >
                        <Sparkles className="w-4 h-4 text-[#89F5E7]" />
                        <span>Klaim E-Sertifikat Kelulusan</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : items.length === 0 ? (
        /* ── Zero Certificates Empty State ── */
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#CAC3D8]/40 shadow-xs text-center flex flex-col items-center gap-4 max-w-2xl mx-auto w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#F0F3FF] flex items-center justify-center text-[#7F54F8] shadow-sm">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#7F54F8]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#061B38]">
              Belum Ada E-Sertifikat yang Diterbitkan
            </h3>
            <p className="text-xs sm:text-sm text-[#494455] max-w-md leading-relaxed">
              Halaman ini khusus memuat modul kursus yang telah berhasil kamu selesaikan hingga memperoleh e-sertifikat resmi. Tuntaskan seluruh bab materi dan lulus kuis evaluasi untuk membuka sertifikat pertamamu!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/student/dashboard"
              className="px-6 py-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Buka Dasbor Belajar</span>
            </Link>

            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl bg-[#F0F3FF] hover:bg-[#DFE8FF] text-[#061B38] font-bold text-xs sm:text-sm border border-[#CAC3D8]/40 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#7F54F8]" />
              <span>Jelajahi Katalog Kursus</span>
            </Link>
          </div>
        </div>
      ) : (
        /* ── Search Not Found State ── */
        <div className="bg-white rounded-3xl p-10 border border-[#CAC3D8]/40 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F3FF] flex items-center justify-center text-[#7A7486]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#061B38]">
            Tidak Ditemukan Sertifikat yang Cocok
          </h3>
          <p className="text-xs text-[#7A7486] max-w-sm">
            Tidak ada sertifikat yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Coba periksa kembali ejaan pencarianmu.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-2 px-4 py-2 rounded-xl bg-[#7F54F8] text-white font-bold text-xs hover:bg-[#6636DE] transition-colors"
          >
            Hapus Pencarian
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
