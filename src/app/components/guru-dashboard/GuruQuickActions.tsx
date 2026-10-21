'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserPlus,
  BarChart3,
  Settings,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function GuruQuickActions() {
  const actions = [
    {
      title: 'Tambah Siswa Baru',
      description: 'Daftarkan akun siswa baru ke rombel kelas aktif.',
      href: '/guru/students',
      icon: UserPlus,
      iconBg: 'bg-[#EDE9FE]',
      iconColor: 'text-[#6636DE]',
      badgeText: 'Kelola Siswa',
    },
    {
      title: 'Laporan Progres & Audit Kuis',
      description: 'Pantau lembar jawaban, nilai kuis, dan sertifikat kelulusan.',
      href: '/guru/progress',
      icon: BarChart3,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0369A1]',
      badgeText: 'Audit Nilai',
    },
    {
      title: 'Pengaturan Profil Pengajar',
      description: 'Kelola identitas NIP, kontak instansi, dan keamanan akun.',
      href: '/guru/settings',
      icon: Settings,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#B45309]',
      badgeText: 'Akun Guru',
    },
  ];

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F3FF] text-[#6636DE]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-[#061B38]">
              Panel Pintasan Cepat Guru
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Navigasi instan ke modul administrasi kelas dan evaluasi akademik
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              href={act.href}
              className="group relative flex items-start gap-3.5 rounded-xl border border-[#E5E7EB] bg-[#F9F9FF]/70 p-4 transition-all duration-200 hover:border-[#6636DE]/30 hover:bg-white hover:shadow-sm"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${act.iconBg} ${act.iconColor} shadow-xs transition-transform group-hover:scale-105`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-[13px] font-bold text-[#061B38] transition-colors group-hover:text-[#6636DE]">
                    {act.title}
                  </h4>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#94A3B8] transition-all group-hover:translate-x-1 group-hover:text-[#6636DE]" />
                </div>
                <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[#64748B]">
                  {act.description}
                </p>
                <span className="mt-2.5 inline-block text-[11px] font-semibold text-[#6636DE]">
                  {act.badgeText} &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
