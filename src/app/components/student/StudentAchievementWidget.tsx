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
    <div className="rounded-3xl bg-white border border-[#EAE8F2] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE8F2]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F1EDFF] text-[#7950F2]">
            <Award className="w-4 h-4 text-[#7950F2]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#172554]">
              E-Sertifikat Siswa
            </h3>
            <span className="text-[11px] text-[#7B8198] font-medium">
              Bukti kompetensi digital
            </span>
          </div>
        </div>

        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F1EDFF] text-[#7950F2] text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{ownedCount} Dimiliki</span>
        </span>
      </div>

      {/* Certificate Items List */}
      <div className="flex-1 flex flex-col gap-2.5 my-1 min-h-[120px]">
        {displayCertificates.length > 0 ? (
          displayCertificates.slice(0, 3).map((cert) => {
            const isClaimed = cert.status === 'CLAIMED' && cert.certificate;
            const certUrl = `/student/courses/${cert.courseKey}/certificate`;

            return (
              <Link
                key={cert.courseKey}
                href={certUrl}
                className="p-3 rounded-2xl bg-[#FAFAFF] hover:bg-[#F1EDFF] border border-[#EAE8F2] flex items-center justify-between gap-3 group transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#EAE8F2] flex items-center justify-center text-[#7950F2] shrink-0 group-hover:border-[#7950F2]/40 transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#172554] leading-tight truncate group-hover:text-[#7950F2] transition-colors">
                      {cert.courseTitle}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                      {isClaimed ? (
                        <>
                          <span className="font-mono font-bold text-[#7950F2]">
                            {cert.certificate?.serialNumber}
                          </span>
                          <span className="text-[#7B8198]">•</span>
                          <span className="text-[#7B8198]">
                            Nilai: {cert.certificate?.finalScore}/100
                          </span>
                        </>
                      ) : (
                        <span className="text-[#7950F2] font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#EAB308]" />
                          Siap Diklaim
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {isClaimed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 my-auto rounded-2xl bg-[#FAFAFF] border border-dashed border-[#EAE8F2]">
            <Award className="w-7 h-7 text-[#A78BFA] mb-1.5" />
            <p className="text-xs font-bold text-[#172554]">
              Belum Ada Sertifikat
            </p>
            <p className="text-[11px] text-[#7B8198] mt-0.5 max-w-[200px]">
              Selesaikan modul belajar untuk menerbitkan e-sertifikat resmi.
            </p>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-[#EAE8F2]">
        <Link
          href="/student/certificates"
          className="w-full py-2 px-3 rounded-xl bg-[#FAFAFF] hover:bg-[#F1EDFF] text-[#7950F2] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#EAE8F2]"
        >
          <span>Buka Direktori Sertifikat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
