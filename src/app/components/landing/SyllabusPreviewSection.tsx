'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  RefreshCw,
  Lock,
  GraduationCap,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export function SyllabusPreviewSection() {
  const steps = [
    {
      number: 1,
      status: 'Selesai',
      statusType: 'completed',
      title: 'Pengenalan Hoaks & Deepfake Generatif',
      description: 'Konsep model difusi, kloning suara, dan studi kasus viral media sosial.',
      badgeClass: 'bg-[#89F5E7] text-[#00201D]',
      textClass: 'text-[#00685F]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#00685F]" />,
      cardBg: 'bg-[#F0F3FF] border-[#89F5E7]',
    },
    {
      number: 2,
      status: 'Sedang Berjalan',
      statusType: 'active',
      title: 'Mendeteksi Jejak Digital & Manipulasi Visual',
      description: 'Latihan langsung meneliti ketidakwajaran bayangan, pupil, dan metadata foto.',
      badgeClass: 'bg-[#E8DEFF] text-[#7F54F8]',
      textClass: 'text-[#7F54F8]',
      icon: <RefreshCw className="w-4 h-4 text-[#7F54F8] animate-spin" />,
      cardBg: 'bg-white border-[#7F54F8] shadow-md ring-2 ring-[#7F54F8]/20',
    },
    {
      number: 3,
      status: 'Terkunci',
      statusType: 'locked',
      title: 'Etika & Plagiarisme Penugasan Sekolah',
      description: 'Batasan menggunakan ChatGPT dalam esai dan format sitasi prompt yang jujur.',
      badgeClass: 'bg-[#F0F3FF] text-[#7A7486]',
      textClass: 'text-[#7A7486]',
      icon: <Lock className="w-4 h-4 text-[#7A7486]" />,
      cardBg: 'bg-[#F9F9FF] border-[#CAC3D8]/40 opacity-80',
    },
    {
      number: 4,
      status: 'Terkunci',
      statusType: 'locked',
      title: 'Perlindungan Privasi Siswa di Platform AI',
      description: 'Aturan mengunggah foto wajah dan dokumen rahasia pada mesin generative cloud.',
      badgeClass: 'bg-[#F0F3FF] text-[#7A7486]',
      textClass: 'text-[#7A7486]',
      icon: <Lock className="w-4 h-4 text-[#7A7486]" />,
      cardBg: 'bg-[#F9F9FF] border-[#CAC3D8]/40 opacity-80',
    },
    {
      number: 5,
      status: 'Evaluasi Akhir',
      statusType: 'final',
      title: 'Uji Evaluasi & Terbit Sertifikat',
      description: 'Studi kasus komprehensif 20 soal berbatas waktu 30 menit untuk kelulusan.',
      badgeClass: 'bg-[#DFE0FF] text-[#000A63]',
      textClass: 'text-[#3A4BD4]',
      icon: <GraduationCap className="w-4 h-4 text-[#3A4BD4]" />,
      cardBg: 'bg-[#F0F3FF] border-[#3A4BD4]/40',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#7F54F8] uppercase tracking-wider">
              Silabus Program Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#061B38]">
              Alur Modul: Etika &amp; Keamanan AI Siswa
            </h2>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#DFE8FF] text-[#061B38] text-xs font-semibold">
              Tingkat: Menengah (SMP)
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E8DEFF] text-[#7F54F8] text-xs font-semibold">
              5 Bab Sekuensial
            </span>
          </div>
        </div>

        {/* Syllabus Container Card */}
        <div className="w-full rounded-2xl bg-white p-6 sm:p-8 border border-[#CAC3D8]/50 shadow-raised flex flex-col gap-8">
          {/* Main Course Info Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-[#F0F3FF] border border-[#E7EEFF]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7F54F8] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                AI-1
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-[#061B38]">
                  Etika &amp; Keamanan AI: Menghadapi Deepfake dan Hoaks
                </span>
                <span className="text-xs text-[#494455] font-medium">
                  Durasi Pembelajaran: 6 Jam Pelajaran • Passing Grade: 75/100
                </span>
              </div>
            </div>
            
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-[#7F54F8] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#6636DE] transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Silabus di Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Sequential Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors transition-transform transition-shadow duration-300 hover-lift ${step.cardBg}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step.badgeClass}`}>
                    {step.number}
                  </span>
                  {step.icon}
                </div>
                
                <span className={`text-[11px] font-bold uppercase tracking-wider ${step.textClass}`}>
                  {step.status}
                </span>
                
                <h3 className="text-sm font-bold text-[#061B38] leading-snug">
                  {step.title}
                </h3>
                
                <p className="text-xs text-[#494455] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SyllabusPreviewSection;
