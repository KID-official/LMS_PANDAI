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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6">
      {/* ── Top Navigation Action Bar ── */}
      <div className="flex items-center justify-between certificate-hide-on-print">
        <Link
          href={`/student/courses/${courseKey}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7F54F8] hover:text-[#5010C8] p-2 rounded-xl hover:bg-[#F0F3FF] transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Silabus Kursus</span>
        </Link>

        <span className="text-[11px] sm:text-xs font-mono font-bold text-[#7A7486] bg-[#F0F3FF] px-3.5 py-1.5 rounded-full border border-[#CAC3D8]/30">
          No. Seri: {certificate.serialNumber}
        </span>
      </div>

      {/* ── Congratulatory Delight Banner (Matching Stitch UI-08) ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#6636DE] to-[#7F54F8] rounded-3xl p-5 sm:p-6 text-white shadow-md certificate-hide-on-print">
        <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#89F5E7]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight">
              Selamat atas Kelulusanmu, {student.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DEFF] font-medium opacity-95 mt-0.5">
              Sertifikat kompetensi resmi terverifikasi pangkalan data Pengmas UNAIR &amp; SFA Learn.
            </p>
          </div>
        </div>
      </div>

      {/* ── Responsive 12-Column Desktop Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols on Desktop): Certificate Frame Render */}
        <section className="lg:col-span-8 w-full flex justify-center">
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

        {/* Right Column (4 cols on Desktop / Sticky): Credential Card & Actions */}
        <aside className="lg:col-span-4 w-full flex flex-col gap-5 lg:sticky lg:top-8 certificate-hide-on-print">
          {/* Quick Credential Summary Card */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#CAC3D8]/40 flex flex-col gap-3.5">
            <div className="flex items-center gap-3 border-b border-[#CAC3D8]/30 pb-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E8DEFF] text-[#5010C8] flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                {student.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-extrabold text-[#061B38] truncate">{student.fullName}</span>
                <span className="text-xs text-[#7A7486]">NIS: {student.nis} • {student.className}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/30 flex items-center justify-between text-xs">
              <span className="text-[#494455] font-semibold">Predikat Kelulusan:</span>
              <span className="font-extrabold text-[#00685F] bg-[#89F5E7]/40 px-2.5 py-0.5 rounded-full">
                Sangat Baik ({certificate.finalScore}/100)
              </span>
            </div>
          </div>

          {/* Action Buttons & Security Guarantee */}
          <CertificateActions
            serialNumber={certificate.serialNumber}
            studentName={student.fullName}
            courseTitle={course.title}
            verificationUrl={verificationUrl}
          />
        </aside>
      </div>
    </div>
  );
};
