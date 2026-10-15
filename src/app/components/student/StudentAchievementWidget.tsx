'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { CertificateListItem } from '@/actions/certificateActions';

interface StudentAchievementWidgetProps {
  completedCoursesCount?: number;
  totalCertificatesCount?: number;
  certificates?: CertificateListItem[];
}

export const StudentAchievementWidget: React.FC<StudentAchievementWidgetProps> = ({
  totalCertificatesCount,
  certificates = [],
}) => {
  // Filter sertifikat yang sudah diklaim / diterbitkan
  const claimedCertificates = certificates.filter(
    (cert) => cert.status === 'CLAIMED' && cert.certificate
  );

  // Filter modul yang sudah tuntas 100% dan siap klaim sertifikat
  const readyCertificates = certificates.filter(
    (cert) => cert.status === 'READY_TO_CLAIM'
  );

  // Daftar sertifikat yang ditampilkan di widget (prioritas claimed lalu ready)
  const displayCertificates = [...claimedCertificates, ...readyCertificates];

  const ownedCount =
    totalCertificatesCount !== undefined
      ? totalCertificatesCount
      : claimedCertificates.length;

  return (
    <div className="h-full rounded-3xl bg-gradient-to-br from-[#061B38] via-[#0D2447] to-[#160E36] text-white p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#7F54F8]/30">
      {/* Top Header Section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#7F54F8] to-[#9E7AFF] text-white shadow-sm">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold tracking-tight text-white">
            E-Sertifikat Siswa
          </h3>
        </div>

        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#89F5E7]/20 text-[#89F5E7] text-[10px] font-bold">
          <CheckCircle2 className="w-3 h-3" />
          <span>{ownedCount} Dimiliki</span>
        </span>
      </div>

      {/* Certificate Titles List (Scrollable Content Area) */}
      <div className="flex-1 overflow-y-auto my-3 pr-1 flex flex-col gap-2.5 min-h-[140px]">
        {displayCertificates.length > 0 ? (
          displayCertificates.map((cert) => {
            const isClaimed = cert.status === 'CLAIMED' && cert.certificate;
            const certUrl = `/student/courses/${cert.courseKey}/certificate`;

            return (
              <Link
                key={cert.courseKey}
                href={certUrl}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3 group hover:border-[#7F54F8]/60 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#7F54F8]/25 border border-[#7F54F8]/40 flex items-center justify-center text-[#89F5E7] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white/95 leading-tight truncate group-hover:text-[#89F5E7] transition-colors">
                      {cert.courseTitle}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                      {isClaimed ? (
                        <>
                          <span className="font-mono font-bold text-[#89F5E7]">
                            {cert.certificate?.serialNumber}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/70">
                            Nilai: {cert.certificate?.finalScore}/100
                          </span>
                        </>
                      ) : (
                        <span className="text-[#89F5E7] font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#FFD700]" />
                          Siap Diklaim
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {isClaimed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#89F5E7]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-3 my-auto">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-2">
              <Award className="w-5 h-5 text-white/50" />
            </div>
            <p className="text-xs font-bold text-white/90">Belum Ada E-Sertifikat</p>
            <p className="text-[11px] text-white/60 mt-1 max-w-[200px] leading-relaxed">
              Selesaikan materi modul dan lulus kuis untuk memperoleh sertifikat resmi UNAIR.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action CTA Button */}
      <div className="sticky bottom-0 pt-2 bg-gradient-to-t from-[#160E36] via-[#160E36]/90 to-transparent shrink-0">
        <Link
          href="/student/certificates"
          className="w-full py-2.5 px-4 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md border border-white/10 group active:scale-95"
        >
          <span>Buka Sertifikat Utama</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
