'use client';

import React, { useState } from 'react';
import { Download, Share2, Check, Copy, Shield, Sparkles, Loader2 } from 'lucide-react';
import { launchConfetti } from '@/lib/confetti';
import { exportCertificateToPdf } from '@/lib/pdfExporter';

export interface CertificateActionsProps {
  serialNumber: string;
  studentName: string;
  courseTitle: string;
  verificationUrl?: string;
}

export const CertificateActions: React.FC<CertificateActionsProps> = ({
  serialNumber,
  studentName,
  courseTitle,
  verificationUrl,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return;

    // Trigger celebratory confetti burst on the web UI!
    launchConfetti(3500);
    setIsDownloading(true);
    showToast('Membuat file PDF resmi resolusi tinggi...');

    const success = await exportCertificateToPdf({
      elementId: 'printable-certificate-frame',
      studentName,
      serialNumber,
      courseTitle,
    });

    setIsDownloading(false);
    if (success) {
      showToast('Sertifikat resmi berhasil diunduh dalam format PDF!');
    } else {
      showToast('Gagal membuat dokumen PDF. Silakan coba lagi.');
    }
  };

  const handleShare = async () => {
    const fullUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${verificationUrl || `/verify/${serialNumber}`}`
        : `https://sfa-learn.org/verify/${serialNumber}`;

    const shareData = {
      title: `Sertifikat Kelulusan ${studentName} - UNAIR & SFA Learn`,
      text: `Alhamdulillah, saya telah berhasil menyelesaikan kursus "${courseTitle}" dengan predikat Sangat Baik. Cek keaslian sertifikat di:`,
      url: fullUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled share dialog or error, fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      showToast('Tautan verifikasi sertifikat berhasil disalin ke clipboard!');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      showToast('Gagal menyalin tautan.');
    }
  };

  return (
    <>
      {/* ── Print Specific Styles for Crisp High-Resolution A4 Landscape ── */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          html,
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide all surrounding interface elements and floating confetti canvas */
          header,
          footer,
          nav,
          aside,
          .no-print,
          button,
          .certificate-hide-on-print,
          #pure-confetti-canvas {
            display: none !important;
          }
          /* Center and scale the certificate frame to fill A4 landscape */
          .certificate-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100vh !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 10mm !important;
            margin: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Action Container Card */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#CAC3D8]/30 flex flex-col gap-4 certificate-hide-on-print">
        {/* Button Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Primary Action Button: Unduh PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#7F54F8] to-[#6636DE] hover:from-[#6636DE] hover:to-[#5010C8] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-75 disabled:cursor-wait group"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#89F5E7]" />
                <span>Membuat File PDF Resmi...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-[#89F5E7] group-hover:translate-y-0.5 transition-transform" />
                <span>Unduh Sertifikat Resmi (PDF)</span>
                <Sparkles className="w-4 h-4 text-[#FFD700] ml-1 animate-pulse" />
              </>
            )}
          </button>

          {/* Secondary Action Button: Bagikan / Salin Tautan */}
          <button
            type="button"
            onClick={handleShare}
            className="w-full py-3.5 px-5 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] font-bold text-sm sm:text-base flex items-center justify-center gap-2 border border-[#CAC3D8]/40 shadow-xs active:scale-[0.98] transition-all group"
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 text-[#00685F]" />
                <span className="text-[#00685F]">Tautan Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 text-[#3A4BD4] group-hover:scale-110 transition-transform" />
                <span>Bagikan Tautan Sertifikat</span>
                <Copy className="w-4 h-4 text-[#7A7486] ml-0.5" />
              </>
            )}
          </button>
        </div>

        {/* Security & Verification Guarantee Box */}
        <div className="p-3.5 rounded-xl bg-[#F0F3FF] border border-[#CAC3D8]/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#DFE8FF] flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-[#3A4BD4]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-[#061B38]">
              Jaminan Keabsahan Akademik &amp; Pangkalan Data Resmi
            </span>
            <p className="text-xs text-[#494455] leading-relaxed">
              Dokumen ini diterbitkan oleh program Pengabdian Masyarakat Fakultas Vokasi Universitas Airlangga bersama SFA Learn. QR Code dapat dipindai secara publik kapan pun untuk memvalidasi nomor seri resmi <strong className="text-[#061B38] font-mono">{serialNumber}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Micro-interaction Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#061B38] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold z-50 flex items-center gap-2 animate-bounce certificate-hide-on-print">
          <Sparkles className="w-4 h-4 text-[#89F5E7]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
