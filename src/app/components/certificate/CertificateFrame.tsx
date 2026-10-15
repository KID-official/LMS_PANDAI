'use client';

import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateQrDataUrl } from '@/lib/qrCodeSvg';

export interface CertificateFrameProps {
  serialNumber: string;
  studentName: string;
  studentNis: string;
  className: string;
  courseTitle: string;
  finalScore: number;
  issuedAt: string | Date;
  verificationUrl?: string;
  instructorName?: string;
  id?: string;
}

export const CertificateFrame: React.FC<CertificateFrameProps> = ({
  serialNumber,
  studentName,
  studentNis,
  className,
  courseTitle,
  finalScore,
  issuedAt,
  verificationUrl,
  id = 'printable-certificate-frame',
}) => {
  // Format date in Indonesian locale (e.g. 15 Oktober 2026)
  const dateObj = typeof issuedAt === 'string' ? new Date(issuedAt) : issuedAt;
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fullVerifyUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${verificationUrl || `/verify/${serialNumber}`}`
      : `https://sfa-learn.org/verify/${serialNumber}`;

  // Generate pure vector QR Code Data URL
  const qrDataUrl = generateQrDataUrl(fullVerifyUrl, {
    size: 96,
    padding: 1,
    fgColor: '#061B38',
    bgColor: '#FFFFFF',
  });

  return (
    <div
      id={id}
      className="certificate-print-area w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative border-2 border-[#7F54F8]/20 transition-all"
    >
      {/* ── Outer Ornate Double Border (#7F54F8 and #3A4BD4) ── */}
      <div className="p-3 sm:p-5 bg-gradient-to-br from-[#7F54F8]/10 via-[#F0F3FF] to-[#3A4BD4]/10">
        <div className="relative p-6 sm:p-10 bg-white rounded-xl border-2 border-[#7F54F8] shadow-inner overflow-hidden">
          {/* Inner Inset Thin Ornate Border (#3A4BD4) */}
          <div className="absolute inset-2 sm:inset-3 border border-[#3A4BD4]/40 rounded-lg pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-[#CAC3D8]/30 rounded pointer-events-none" />

          {/* Corner Flourish Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#7F54F8] rounded-tl pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#7F54F8] rounded-tr pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#3A4BD4] rounded-bl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#3A4BD4] rounded-br pointer-events-none" />

          {/* ── Watermark Background (Universitas Airlangga Crest / Academic Lambang) ── */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
            <svg
              className="w-72 h-72 sm:w-96 sm:h-96 text-[#061B38]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18v4.54l7 3.18 7-3.18V11.82L12 15z" />
            </svg>
          </div>

          {/* ── 1. Insignia Institusi (UNAIR x AmosProduction SFA Learn) ── */}
          <header className="relative z-10 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
              {/* UNAIR Badge */}
              <div className="flex items-center gap-2 bg-[#F0F3FF] px-3 py-1.5 rounded-full border border-[#CAC3D8]/40">
                <div className="w-7 h-7 rounded-full bg-[#3A4BD4] flex items-center justify-center text-white shadow-xs">
                  <span className="font-serif font-black text-xs tracking-tighter">UA</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-extrabold text-[#061B38] uppercase tracking-wide leading-none">
                    Pengmas UNAIR
                  </span>
                  <span className="text-[8px] font-medium text-[#7A7486] leading-none mt-0.5">
                    Universitas Airlangga
                  </span>
                </div>
              </div>

              {/* Vertical Hairline Divider */}
              <div className="h-6 w-px bg-[#CAC3D8]" />

              {/* Amos SFA Learn Badge */}
              <div className="flex items-center gap-2 bg-[#F0F3FF] px-3 py-1.5 rounded-full border border-[#CAC3D8]/40">
                <div className="w-7 h-7 rounded-full bg-[#7F54F8] flex items-center justify-center text-white shadow-xs">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-extrabold text-[#7F54F8] uppercase tracking-wide leading-none">
                    SFA Learn
                  </span>
                  <span className="text-[8px] font-medium text-[#7A7486] leading-none mt-0.5">
                    AmosProduction
                  </span>
                </div>
              </div>
            </div>

            {/* Judul & Subtitle */}
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-[#061B38] tracking-wide uppercase mt-1 font-serif">
              SERTIFIKAT KELULUSAN &amp; KOMPETENSI
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#7F54F8] tracking-widest uppercase mt-0.5">
              PROGRAM PENGMAS UNIVERSITAS AIRLANGGA &amp; SFA LEARN
            </p>

            {/* Decorative Ribbon Divider */}
            <div className="flex items-center justify-center gap-2 my-2 sm:my-3">
              <div className="w-12 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#7F54F8] to-[#3A4BD4] rounded-full" />
              <div className="w-2 h-2 rotate-45 bg-[#7F54F8]" />
              <div className="w-12 sm:w-20 h-0.5 bg-gradient-to-l from-transparent via-[#7F54F8] to-[#3A4BD4] rounded-full" />
            </div>
          </header>

          {/* ── 2. Nama Siswa, NIS & Kelas ── */}
          <div className="relative z-10 text-center my-3 sm:my-4">
            <p className="text-xs sm:text-sm italic text-[#494455] font-medium">
              Diberikan dengan bangga dan apresiasi akademik kepada:
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#061B38] tracking-tight mt-1.5 mb-1 underline decoration-[#7F54F8]/40 decoration-2 underline-offset-8">
              {studentName}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#494455] mt-2">
              <span>NIS: {studentNis}</span>
              <span className="mx-2 text-[#CAC3D8]">•</span>
              <span>Kelas: {className}</span>
              <span className="mx-2 text-[#CAC3D8]">•</span>
              <span>SMP Negeri Mitra AI Vokasi</span>
            </p>
          </div>

          {/* ── 3. Kalimat Apresiasi Kelulusan & Judul Kursus ── */}
          <div className="relative z-10 text-center max-w-2xl mx-auto my-3 sm:my-4">
            <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
              Telah menyelesaikan seluruh rangkaian kurikulum, materi sekuensial, dan evaluasi kuis dengan predikat{' '}
              <strong className="text-[#00685F] font-extrabold uppercase bg-[#89F5E7]/20 px-2 py-0.5 rounded">
                SANGAT BAIK
              </strong>{' '}
              pada kursus:
            </p>

            <div className="my-2.5 sm:my-3 p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#F0F3FF] via-[#E7EEFF] to-[#F0F3FF] border border-[#3A4BD4]/20 shadow-xs inline-block max-w-full">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#3A4BD4] tracking-tight block">
                {courseTitle}
              </span>
            </div>
          </div>

          {/* ── 4. Indikator Predikat & Nilai Akhir Bar ── */}
          <div className="relative z-10 max-w-lg mx-auto my-3 p-2.5 rounded-xl bg-[#F0F3FF] border border-[#CAC3D8]/40 flex items-center justify-around text-center shadow-xs">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#7F54F8]" />
              <span className="text-xs sm:text-sm font-extrabold text-[#061B38]">
                Nilai Akhir: {finalScore}/100
              </span>
            </div>
            <div className="h-4 w-px bg-[#CAC3D8]" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00685F]" />
              <span className="text-xs sm:text-sm font-bold text-[#00685F]">
                Lulus Terverifikasi
              </span>
            </div>
            <div className="hidden sm:flex h-4 w-px bg-[#CAC3D8]" />
            <div className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3A4BD4]" />
              <span className="text-xs font-semibold text-[#3A4BD4]">
                Akreditasi Vokasi UNAIR
              </span>
            </div>
          </div>

          {/* ── 5. Tanda Tangan Resmi & Segel Stempel Emas Hologram ── */}
          <div className="relative z-10 grid grid-cols-3 items-end gap-2 sm:gap-4 pt-4 sm:pt-6 pb-2 text-center">
            {/* Left Signatory: Dr. Alwan Hakim, M.Kom. */}
            <div className="flex flex-col items-center">
              <div className="h-12 flex items-end justify-center pb-1">
                {/* Vector Cursive Signature Simulation */}
                <span className="font-serif italic text-lg sm:text-xl font-bold text-[#3A4BD4]/80 tracking-widest select-none -rotate-3">
                  AlwanHakim
                </span>
              </div>
              <div className="w-full max-w-[150px] sm:max-w-[180px] h-0.5 bg-[#061B38]/60 my-1" />
              <span className="text-xs sm:text-sm font-extrabold text-[#061B38] truncate w-full">
                Dr. Alwan Hakim, M.Kom.
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-[#7A7486]">
                Ketua Pengmas UNAIR
              </span>
            </div>

            {/* Center: Segel Stempel Digital Emas Hologram UNAIR VALID */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#B45309] via-[#FFD700] to-[#F59E0B] p-1 shadow-md flex items-center justify-center ring-2 ring-[#FFD700]/60">
                <div className="w-full h-full rounded-full bg-white border-2 border-dashed border-[#B45309] flex flex-col items-center justify-center text-center p-1">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#B45309]" />
                  <span className="text-[8px] sm:text-[9px] font-black text-[#B45309] uppercase tracking-tighter leading-tight mt-0.5">
                    UNAIR
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-extrabold bg-[#B45309] text-white px-1 rounded uppercase tracking-wider leading-none mt-0.5">
                    VALID
                  </span>
                </div>
              </div>
            </div>

            {/* Right Signatory: Bambang Prakoso, S.Pd. */}
            <div className="flex flex-col items-center">
              <div className="h-12 flex items-end justify-center pb-1">
                {/* Vector Cursive Signature Simulation */}
                <span className="font-serif italic text-lg sm:text-xl font-bold text-[#7F54F8]/80 tracking-widest select-none rotate-2">
                  BambangPrakoso
                </span>
              </div>
              <div className="w-full max-w-[150px] sm:max-w-[180px] h-0.5 bg-[#061B38]/60 my-1" />
              <span className="text-xs sm:text-sm font-extrabold text-[#061B38] truncate w-full">
                Bambang Prakoso, S.Pd.
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-[#7A7486]">
                Guru Pembimbing Lab
              </span>
            </div>
          </div>

          {/* ── 6. Baris Verifikasi & QR Code Aktif ── */}
          <footer className="relative z-10 mt-4 pt-3 border-t border-[#CAC3D8]/40 bg-[#F0F3FF]/70 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 px-6 sm:px-10 py-3 sm:py-4 flex items-center justify-between gap-3">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#061B38]">
                  No. Seri:
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#7F54F8] bg-[#E8DEFF] px-2 py-0.5 rounded">
                  {serialNumber}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#494455] font-medium mt-0.5">
                Tanggal Terbit: {formattedDate}
              </span>
              <span className="text-[10px] sm:text-xs text-[#3A4BD4] font-medium truncate max-w-[240px] sm:max-w-md">
                Verifikasi resmi: {fullVerifyUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>

            {/* Active Pure Vector QR Code */}
            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-[#CAC3D8]/50 shadow-xs flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt={`Kode QR Verifikasi ${serialNumber}`}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                loading="eager"
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
