'use client';

import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateQrSvgString } from '@/lib/qrCodeSvg';

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

  // Generate pure vector QR Code SVG string for instant, crisp canvas rendering
  const qrSvgString = generateQrSvgString(fullVerifyUrl, {
    size: 72,
    padding: 1,
    fgColor: '#061B38',
    bgColor: '#FFFFFF',
  });

  return (
    <div
      id={id}
      className="certificate-print-area w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative border-2 border-[#7F54F8]/20 transition-all select-none"
    >
      {/* ── Outer Ornate Double Border (#7F54F8 and #3A4BD4) ── */}
      <div className="p-3 sm:p-5 bg-gradient-to-br from-[#7F54F8]/10 via-[#F0F3FF] to-[#3A4BD4]/10">
        <div className="relative p-6 sm:p-9 bg-white rounded-xl border-2 border-[#7F54F8] shadow-inner overflow-hidden">
          {/* Inner Inset Thin Ornate Border (#3A4BD4) */}
          <div className="absolute inset-2 sm:inset-3 border border-[#3A4BD4]/40 rounded-lg pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-[#CAC3D8]/30 rounded pointer-events-none" />

          {/* Corner Flourish Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#7F54F8] rounded-tl pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#7F54F8] rounded-tr pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#3A4BD4] rounded-bl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#3A4BD4] rounded-br pointer-events-none" />

          {/* ── Watermark Background (Universitas Airlangga Crest / Academic Lambang) ── */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            style={{ opacity: 0.03 }}
          >
            <svg
              className="w-72 h-72 sm:w-88 sm:h-88"
              viewBox="0 0 24 24"
              fill="#061B38"
              style={{ fillOpacity: 0.03 }}
            >
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18v4.54l7 3.18 7-3.18V11.82L12 15z" />
            </svg>
          </div>

          {/* ── 1. Insignia Institusi (UNAIR x AmosProduction PANDAI LEARNING) ── */}
          <header className="relative z-10 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
              {/* UNAIR Badge */}
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
                style={{ backgroundColor: '#F0F3FF', borderColor: '#E2E8F0' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: '#1E3A8A' }}
                >
                  <span className="font-serif font-black text-xs tracking-tighter">UA</span>
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wide leading-none"
                    style={{ color: '#061B38' }}
                  >
                    Pengmas UNAIR
                  </span>
                  <span
                    className="text-[8px] font-medium leading-none mt-0.5"
                    style={{ color: '#64748B' }}
                  >
                    Universitas Airlangga
                  </span>
                </div>
              </div>

              {/* Vertical Hairline Divider */}
              <div className="h-6 w-px" style={{ backgroundColor: '#CBD5E1' }} />

              {/* Amos PANDAI LEARNING Badge */}
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
                style={{ backgroundColor: '#F0F3FF', borderColor: '#E2E8F0' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: '#7F54F8' }}
                >
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wide leading-none"
                    style={{ color: '#7F54F8' }}
                  >
                    PANDAI LEARNING
                  </span>
                  <span
                    className="text-[8px] font-medium leading-none mt-0.5"
                    style={{ color: '#64748B' }}
                  >
                    AmosProduction
                  </span>
                </div>
              </div>
            </div>

            {/* Judul & Subtitle */}
            <h1
              className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wide uppercase mt-1 font-serif"
              style={{ color: '#061B38' }}
            >
              SERTIFIKAT KELULUSAN &amp; KOMPETENSI
            </h1>
            <p
              className="text-xs sm:text-sm font-bold tracking-widest uppercase mt-0.5"
              style={{ color: '#7F54F8' }}
            >
              PROGRAM PENGMAS UNIVERSITAS AIRLANGGA &amp; PANDAI LEARNING
            </p>

            {/* Decorative Ribbon Divider */}
            <div className="flex items-center justify-center gap-2 my-2 sm:my-3">
              <div
                className="w-12 sm:w-20 h-0.5 rounded-full"
                style={{ backgroundColor: '#7F54F8', opacity: 0.7 }}
              />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#7F54F8' }} />
              <div
                className="w-12 sm:w-20 h-0.5 rounded-full"
                style={{ backgroundColor: '#1E3A8A', opacity: 0.7 }}
              />
            </div>
          </header>

          {/* ── 2. Nama Siswa, NIS & Kelas ── */}
          <div className="relative z-10 text-center my-3 sm:my-4">
            <p className="text-xs sm:text-sm italic font-medium" style={{ color: '#494455' }}>
              Diberikan dengan bangga dan apresiasi akademik kepada:
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-1 mb-1.5"
              style={{ color: '#061B38' }}
            >
              {studentName}
            </h2>
            {/* Solid, crisp visual divider for html2canvas fidelity */}
            <div
              className="w-56 sm:w-72 h-[2px] mx-auto mb-2"
              style={{ backgroundColor: '#7F54F8', opacity: 0.6 }}
            />
            <p className="text-xs sm:text-sm font-bold" style={{ color: '#494455' }}>
              <span>NIS: {studentNis}</span>
              <span className="mx-2 text-[#CBD5E1]">•</span>
              <span>Kelas: {className}</span>
              <span className="mx-2 text-[#CBD5E1]">•</span>
              <span>SMP Negeri Mitra AI Vokasi</span>
            </p>
          </div>

          {/* ── 3. Kalimat Apresiasi Kelulusan & Judul Kursus ── */}
          <div className="relative z-10 text-center max-w-2xl mx-auto my-3 sm:my-4">
            <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: '#494455' }}>
              Telah menyelesaikan seluruh rangkaian kurikulum, materi sekuensial, dan evaluasi kuis dengan predikat{' '}
              <strong
                className="font-extrabold uppercase px-2.5 py-0.5 rounded"
                style={{ color: '#00685F', backgroundColor: '#D1FAE5' }}
              >
                SANGAT BAIK
              </strong>{' '}
              pada kursus:
            </p>

            <div
              className="my-2.5 px-6 py-2.5 rounded-xl border inline-block max-w-full"
              style={{
                backgroundColor: '#F0F3FF',
                borderColor: '#A5B4FC',
              }}
            >
              <span
                className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight block"
                style={{ color: '#1E3A8A' }}
              >
                {courseTitle}
              </span>
            </div>
          </div>

          {/* ── 4. Indikator Predikat & Nilai Akhir Bar ── */}
          <div
            className="relative z-10 max-w-xl mx-auto my-3 p-3 rounded-xl border flex items-center justify-around text-center shadow-xs"
            style={{
              backgroundColor: '#F0F3FF',
              borderColor: '#E2E8F0',
            }}
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 shrink-0" style={{ color: '#7F54F8' }} />
              <span className="text-xs sm:text-sm font-extrabold" style={{ color: '#061B38' }}>
                Nilai Akhir: {finalScore}/100
              </span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: '#CBD5E1' }} />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#00685F' }} />
              <span className="text-xs sm:text-sm font-bold" style={{ color: '#00685F' }}>
                Lulus Terverifikasi
              </span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: '#CBD5E1' }} />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#1E3A8A' }} />
              <span className="text-xs font-semibold" style={{ color: '#1E3A8A' }}>
                Akreditasi UNAIR
              </span>
            </div>
          </div>

          {/* ── 5. Tanda Tangan Resmi & Segel Stempel Emas Hologram ── */}
          <div className="relative z-10 grid grid-cols-3 items-end gap-3 sm:gap-4 pt-6 pb-2 text-center">
            {/* Left Signatory: Dr. Alwan Hakim, M.Kom. */}
            <div className="flex flex-col items-center text-center">
              <div className="h-10 flex items-end justify-center pb-1">
                <span
                  className="font-serif italic text-base sm:text-lg font-bold tracking-widest select-none"
                  style={{ color: '#1E3A8A' }}
                >
                  AlwanHakim
                </span>
              </div>
              <div
                className="w-36 sm:w-44 h-0.5 mt-1 mb-2"
                style={{ backgroundColor: '#061B38', opacity: 0.6 }}
              />
              <span
                className="text-xs sm:text-sm font-extrabold block leading-normal truncate max-w-full"
                style={{ color: '#061B38' }}
              >
                Dr. Alwan Hakim, M.Kom.
              </span>
              <span
                className="text-[10px] sm:text-xs font-medium block mt-0.5"
                style={{ color: '#64748B' }}
              >
                Ketua Pengmas UNAIR
              </span>
            </div>

            {/* Center: Segel Stempel Digital Emas Hologram UNAIR VALID */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 shadow-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #B45309 0%, #FFD700 50%, #F59E0B 100%)',
                  boxShadow: '0 0 0 2px #FFD700',
                }}
              >
                <div
                  className="w-full h-full rounded-full bg-white border-2 border-dashed flex flex-col items-center justify-center text-center p-1"
                  style={{ borderColor: '#B45309' }}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#B45309' }} />
                  <span
                    className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter leading-tight mt-0.5"
                    style={{ color: '#B45309' }}
                  >
                    UNAIR
                  </span>
                  <span
                    className="text-[7px] sm:text-[8px] font-extrabold text-white px-1 rounded uppercase tracking-wider leading-none mt-0.5"
                    style={{ backgroundColor: '#B45309' }}
                  >
                    VALID
                  </span>
                </div>
              </div>
            </div>

            {/* Right Signatory: Bambang Prakoso, S.Pd. */}
            <div className="flex flex-col items-center text-center">
              <div className="h-10 flex items-end justify-center pb-1">
                <span
                  className="font-serif italic text-base sm:text-lg font-bold tracking-widest select-none"
                  style={{ color: '#7F54F8' }}
                >
                  BambangPrakoso
                </span>
              </div>
              <div
                className="w-36 sm:w-44 h-0.5 mt-1 mb-2"
                style={{ backgroundColor: '#061B38', opacity: 0.6 }}
              />
              <span
                className="text-xs sm:text-sm font-extrabold block leading-normal truncate max-w-full"
                style={{ color: '#061B38' }}
              >
                Bambang Prakoso, S.Pd.
              </span>
              <span
                className="text-[10px] sm:text-xs font-medium block mt-0.5"
                style={{ color: '#64748B' }}
              >
                Guru Pembimbing Lab
              </span>
            </div>
          </div>

          {/* ── 6. Baris Verifikasi & QR Code Aktif ── */}
          <footer
            className="relative z-10 mt-5 border-t rounded-xl px-5 py-3.5 flex items-center justify-between gap-3"
            style={{
              backgroundColor: '#F0F3FF',
              borderColor: '#CBD5E1',
            }}
          >
            <div className="flex flex-col text-left gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold" style={{ color: '#061B38' }}>
                  No. Seri:
                </span>
                <span
                  className="text-xs sm:text-sm font-mono font-bold px-2 py-0.5 rounded"
                  style={{ color: '#7F54F8', backgroundColor: '#E8DEFF' }}
                >
                  {serialNumber}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium" style={{ color: '#494455' }}>
                Tanggal Terbit: {formattedDate}
              </span>
              <span
                className="text-[11px] sm:text-xs font-medium leading-normal block"
                style={{ color: '#1E3A8A' }}
              >
                Verifikasi resmi: {fullVerifyUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>

            {/* Active Pure Vector QR Code (rendered inline for reliable canvas rasterization) */}
            <div
              className="bg-white p-1 rounded-lg border shadow-xs flex items-center justify-center shrink-0 w-15 h-15 sm:w-16 sm:h-16 [&>svg]:w-full [&>svg]:h-full"
              style={{ borderColor: '#CBD5E1' }}
              dangerouslySetInnerHTML={{ __html: qrSvgString }}
              aria-label={`Kode QR Verifikasi ${serialNumber}`}
            />
          </footer>
        </div>
      </div>
    </div>
  );
};
