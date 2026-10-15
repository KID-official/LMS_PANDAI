'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { CertificateFrame, CertificateActions } from '@/app/components/certificate';
import { StudentCertificateResult } from '@/actions/certificateActions';
import { launchConfetti } from '@/lib/confetti';

interface CertificateViewerClientProps {
  courseKey: string;
  data: StudentCertificateResult;
}

export const CertificateViewerClient: React.FC<CertificateViewerClientProps> = ({
  courseKey,
  data,
}) => {
  // Fire congratulatory confetti on initial mount when eligible
  useEffect(() => {
    if (data.success && data.isEligible) {
      const timer = setTimeout(() => {
        launchConfetti(2500);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [data.success, data.isEligible]);

  // Ineligible / Incomplete state
  if (!data.success || !data.isEligible || !data.certificate || !data.student || !data.course) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FFDAD6] flex items-center justify-center text-[#BA1A1A] mb-4 shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#061B38] mb-2">
          Sertifikat Belum Tersedia
        </h1>

        <p className="text-sm text-[#494455] max-w-md mb-6 leading-relaxed">
          {data.error ||
            'Anda harus menyelesaikan seluruh modul materi dan kuis sekuensial sebelum dapat mengklaim sertifikat resmi ini.'}
        </p>

        {data.progressSummary && (
          <div className="w-full bg-[#F0F3FF] p-4 rounded-xl border border-[#CAC3D8]/30 mb-6 text-left">
            <div className="flex justify-between items-center text-xs font-bold text-[#061B38] mb-1.5">
              <span>Progres Penyelesaian Modul:</span>
              <span className="text-[#7F54F8]">
                {data.progressSummary.completedChapters} / {data.progressSummary.totalChapters} Bab
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E7EEFF] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#7F54F8] transition-all duration-500"
                style={{
                  width: `${Math.round(
                    (data.progressSummary.completedChapters / (data.progressSummary.totalChapters || 1)) *
                      100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <Link
          href={`/student/courses/${courseKey}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>Lanjutkan Belajar Sekarang</span>
        </Link>
      </div>
    );
  }

  const { certificate, student, course, verificationUrl } = data;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6">
      {/* ── Top Navigation Action Bar ── */}
      <div className="flex items-center justify-between certificate-hide-on-print">
        <Link
          href={`/student/courses/${courseKey}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7F54F8] hover:text-[#5010C8] p-1.5 rounded-lg hover:bg-[#F0F3FF] transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Silabus Kursus</span>
        </Link>

        <span className="text-[11px] sm:text-xs font-mono font-bold text-[#7A7486] bg-[#F0F3FF] px-3 py-1 rounded-full border border-[#CAC3D8]/30">
          ID: {certificate.serialNumber}
        </span>
      </div>

      {/* ── Congratulatory Delight Banner (Matching Stitch UI-08) ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#6636DE] to-[#7F54F8] rounded-2xl p-4 sm:p-5 text-white shadow-md certificate-hide-on-print">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#89F5E7]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight">
              Selamat atas Kelulusanmu, {student.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DEFF] font-medium opacity-95">
              Sertifikat kompetensi resmi terverifikasi pangkalan data Pengmas UNAIR &amp; SFA Learn.
            </p>
          </div>
        </div>
      </div>

      {/* ── Realistic Certificate Frame Render ── */}
      <section className="w-full flex justify-center">
        <CertificateFrame
          serialNumber={certificate.serialNumber}
          studentName={student.fullName}
          studentNis={student.nis}
          className={student.className}
          courseTitle={course.title}
          finalScore={certificate.finalScore}
          issuedAt={certificate.issuedAt}
          verificationUrl={verificationUrl}
          instructorName={course.instructorName}
        />
      </section>

      {/* ── Action Buttons & Security Box ── */}
      <section className="w-full">
        <CertificateActions
          serialNumber={certificate.serialNumber}
          studentName={student.fullName}
          courseTitle={course.title}
          verificationUrl={verificationUrl}
        />
      </section>
    </div>
  );
};
