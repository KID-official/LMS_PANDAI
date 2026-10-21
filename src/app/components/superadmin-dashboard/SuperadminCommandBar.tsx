'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  FileSpreadsheet,
  UploadCloud,
  BarChart3,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function SuperadminCommandBar() {
  const commands = [
    {
      title: 'Kelola Akun Guru',
      description: 'Manajemen data pengajar, verifikasi profil NIP, dan hak akses guru.',
      href: '/superadmin/teachers',
      icon: Users,
      iconBg: 'bg-[#EDE9FE]',
      iconColor: 'text-[#6636DE]',
      badgeText: 'Kelola Pengajar',
    },
    {
      title: 'Import Massal Siswa',
      description: 'Unggah berkas CSV untuk mendaftarkan akun rombel siswa sekaligus.',
      href: '/superadmin/import-students',
      icon: FileSpreadsheet,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0369A1]',
      badgeText: 'CSV Siswa',
    },
    {
      title: 'Import Massal Guru',
      description: 'Pendaftaran massal akun pengajar dan NIP resmi instansi via CSV.',
      href: '/superadmin/import-teachers',
      icon: UploadCloud,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#B45309]',
      badgeText: 'CSV Guru',
    },
    {
      title: 'Laporan & Audit Global',
      description: 'Audit capaian nilai kuis seluruh siswa dan validasi sertifikat UNAIR.',
      href: '/guru/progress',
      icon: BarChart3,
      iconBg: 'bg-[#F0FDF4]',
      iconColor: 'text-[#059669]',
      badgeText: 'Audit Sistem',
    },
  ];

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F3FF] text-[#6636DE]">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-[#061B38]">
              Pusat Kendali Eksekutif Super Administrator
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Akses cepat wewenang administratif, import data massal, dan audit platform
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {commands.map((cmd) => {
          const Icon = cmd.icon;
          return (
            <Link
              key={cmd.title}
              href={cmd.href}
              className="group relative flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#F9F9FF]/70 p-4 transition-all duration-200 hover:border-[#6636DE]/30 hover:bg-white hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${cmd.iconBg} ${cmd.iconColor} shadow-xs transition-transform group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#94A3B8] transition-all group-hover:translate-x-1 group-hover:text-[#6636DE]" />
                </div>

                <h4 className="text-[13px] font-bold text-[#061B38] transition-colors group-hover:text-[#6636DE]">
                  {cmd.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[#64748B]">
                  {cmd.description}
                </p>
              </div>

              <span className="mt-3 inline-block text-[11px] font-semibold text-[#6636DE]">
                {cmd.badgeText} &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
