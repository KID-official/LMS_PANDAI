'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Loader2,
  Search,
  ExternalLink,
  Award,
  Calendar,
  User,
  BookOpen,
} from 'lucide-react';
import { PublicVerificationResult } from '@/actions/certificateActions';
import { CertificateFrame } from '@/app/components/certificate';
import { exportCertificateToPdf } from '@/lib/pdfExporter';

interface PublicVerifyClientProps {
  serialNumber: string;
  result: PublicVerificationResult;
}

export const PublicVerifyClient: React.FC<PublicVerifyClientProps> = ({
  serialNumber,
  result,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setToastMessage('Membuat dokumen PDF resmi resolusi tinggi...');

    const success = await exportCertificateToPdf({
      elementId: 'printable-certificate-frame',
      studentName: result.studentName || 'Siswa',
      serialNumber: result.serialNumber || serialNumber,
      courseTitle: result.courseTitle,
    });

    setIsDownloading(false);
    if (success) {
      setToastMessage('Sertifikat resmi berhasil diunduh dalam format PDF!');
    } else {
      setToastMessage('Gagal membuat dokumen PDF. Silakan coba lagi.');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/verify/${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // ── Invalid Serial Number State ──
  if (!result.isValid) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#BA1A1A]/20 flex flex-col items-center text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFDAD6] flex items-center justify-center text-[#BA1A1A] mb-5 shadow-sm">
            <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <span className="text-xs font-bold text-[#BA1A1A] uppercase tracking-widest bg-[#FFDAD6]/60 px-3 py-1 rounded-full mb-2">
            Status: Verifikasi Gagal
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#061B38] mb-3">
            Sertifikat Tidak Ditemukan
          </h1>

          <p className="text-sm sm:text-base text-[#494455] max-w-lg mb-6 leading-relaxed">
            Nomor seri <code className="font-mono font-bold text-[#BA1A1A] bg-[#FFDAD6]/40 px-2 py-0.5 rounded">{serialNumber}</code> tidak tercatat dalam pangkalan data verifikasi akademik Universitas Airlangga &amp; SFA Learn.
          </p>

          {/* Form Cek Nomor Seri Lain */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2.5 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Masukkan Nomor Seri (contoh: AMOS-2026-0812)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#F0F3FF] border border-[#CAC3D8]/60 text-xs sm:text-sm text-[#061B38] placeholder:text-[#7A7486] focus:outline-none focus:ring-2 focus:ring-[#7F54F8]"
              />
              <Search className="w-4 h-4 text-[#7A7486] absolute right-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs sm:text-sm active:scale-95 transition-all shrink-0"
            >
              Cari Ulang
            </button>
          </form>

          <Link
            href="/"
            className="text-xs sm:text-sm font-bold text-[#7F54F8] hover:underline"
          >
            ← Kembali ke Beranda SFA Learn
          </Link>
        </div>
      </div>
    );
  }

  // ── Valid Certificate Verification State ──
  const formattedDate = result.issuedAt
    ? new Date(result.issuedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '12 Oktober 2026';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-6 sm:gap-8">
      {/* ── Official Verification Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00685F] via-[#008378] to-[#005049] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-md">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-[#89F5E7]" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#89F5E7] uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dokumen Resmi &amp; Terverifikasi Sah</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Sertifikat Keahlian &amp; Kompetensi Valid
            </h1>

            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
              Diterbitkan secara sah oleh Program Pengabdian Masyarakat Universitas Airlangga bersama SFA Learn (AmosProduction). Terdata dalam register nasional kelulusan literasi AI.
            </p>
          </div>
        </div>
      </div>

      {/* ── Certificate Data Specification Card ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#CAC3D8]/40 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#CAC3D8]/30 gap-3">
          <div>
            <span className="text-xs font-bold text-[#7A7486] uppercase tracking-wider block">
              Nomor Registrasi Sertifikat
            </span>
            <span className="text-base sm:text-lg font-mono font-black text-[#7F54F8]">
              {result.serialNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-[#F0F3FF] hover:bg-[#DFE8FF] text-[#061B38] font-bold text-xs flex items-center gap-1.5 border border-[#CAC3D8]/30 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00685F]" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7F54F8]" />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-3.5 py-2 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-75 disabled:cursor-wait"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#89F5E7]" />
                  <span>Mengunduh...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#89F5E7]" />
                  <span>Unduh Sertifikat (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 6-Grid Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 1. Nama Penerima */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DFE8FF] flex items-center justify-center text-[#6636DE] shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Nama Penerima
              </span>
              <span className="text-sm font-extrabold text-[#061B38]">
                {result.studentName}
              </span>
              <span className="text-xs text-[#494455]">
                NIS: {result.studentNis} • {result.className}
              </span>
            </div>
          </div>

          {/* 2. Nama Kursus */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DFE8FF] flex items-center justify-center text-[#6636DE] shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Program Kursus
              </span>
              <span className="text-sm font-extrabold text-[#061B38] line-clamp-1">
                {result.courseTitle}
              </span>
              <span className="text-xs text-[#494455]">
                Kurikulum Terakreditasi 2026
              </span>
            </div>
          </div>

          {/* 3. Tanggal Penerbitan */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DFE8FF] flex items-center justify-center text-[#6636DE] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Tanggal Terbit
              </span>
              <span className="text-sm font-extrabold text-[#061B38]">
                {formattedDate}
              </span>
              <span className="text-xs text-[#00685F] font-semibold">
                Status: Aktif Selamanya
              </span>
            </div>
          </div>

          {/* 4. Nilai Akhir */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#89F5E7]/40 flex items-center justify-center text-[#00685F] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Nilai &amp; Predikat
              </span>
              <span className="text-sm font-extrabold text-[#00685F]">
                {result.finalScore}/100 • Sangat Baik
              </span>
              <span className="text-xs text-[#494455]">
                Evaluasi Kuis Sekuensial
              </span>
            </div>
          </div>

          {/* 5. Instansi Penerbit */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DFE0FF] flex items-center justify-center text-[#3A4BD4] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Penyelenggara
              </span>
              <span className="text-sm font-extrabold text-[#061B38]">
                Pengmas UNAIR x SFA
              </span>
              <span className="text-xs text-[#494455]">
                Universitas Airlangga
              </span>
            </div>
          </div>

          {/* 6. Penandatangan Resmi */}
          <div className="p-3.5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/20 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DFE8FF] flex items-center justify-center text-[#6636DE] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#7A7486] uppercase">
                Penandatangan
              </span>
              <span className="text-sm font-extrabold text-[#061B38]">
                {result.instructorName || 'Dr. Alwan Hakim, M.Kom.'}
              </span>
              <span className="text-xs text-[#494455]">
                Ketua Tim Pengmas UNAIR
              </span>
            </div>
          </div>
        </div>

        {/* Toggle Full Certificate Visual Preview */}
        <div className="pt-2 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setShowFullPreview(!showFullPreview)}
            className="w-full py-3 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#7F54F8] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#7F54F8]/30 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>
              {showFullPreview ? 'Sembunyikan Lembar Sertifikat' : 'Tampilkan Lembar Sertifikat Lengkap (Resolusi Cetak)'}
            </span>
          </button>

          {/* 
            Certificate Frame:
            Rendered visible when showFullPreview is true.
            When showFullPreview is false, stays mounted off-screen with fixed width (w-[900px])
            so html2canvas can capture it at full desktop resolution at any moment!
          */}
          <div
            className={
              showFullPreview
                ? 'pt-4 border-t border-[#CAC3D8]/40 flex justify-center w-full'
                : 'fixed -left-[99999px] top-0 pointer-events-none opacity-0 w-[900px] z-[-1]'
            }
            aria-hidden={!showFullPreview}
          >
            <CertificateFrame
              id="printable-certificate-frame"
              serialNumber={result.serialNumber || serialNumber}
              studentName={result.studentName || 'Siswa'}
              studentNis={result.studentNis || '-'}
              className={result.className || '-'}
              courseTitle={result.courseTitle || 'Literasi & Etika Kecerdasan Buatan'}
              finalScore={result.finalScore || 85}
              issuedAt={result.issuedAt || new Date()}
              verificationUrl={result.verificationUrl}
              instructorName={result.instructorName}
            />
          </div>
        </div>
      </div>

      {/* Floating Micro-interaction Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#061B38] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold z-50 flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-[#89F5E7]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
