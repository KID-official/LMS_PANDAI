'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  Search,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import type { RecentUserItem } from '@/app/actions/superadminDashboard';

interface RecentUsersTableProps {
  users: RecentUserItem[];
}

function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getRoleBadge(role: RecentUserItem['role']) {
  switch (role) {
    case 'GURU':
      return {
        label: 'GURU',
        bg: 'bg-[#EDE9FE]',
        text: 'text-[#6636DE]',
        dot: 'bg-[#6636DE]',
      };
    case 'SISWA':
      return {
        label: 'SISWA',
        bg: 'bg-[#E0F2FE]',
        text: 'text-[#0369A1]',
        dot: 'bg-[#0284C7]',
      };
    case 'SUPER_ADMIN':
    default:
      return {
        label: 'ADMIN',
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#B45309]',
        dot: 'bg-[#D97706]',
      };
  }
}

export default function RecentUsersTable({ users }: RecentUsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = users.filter((u) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(term) ||
      u.identifier.toLowerCase().includes(term) ||
      u.identityNumber.toLowerCase().includes(term) ||
      u.organization.toLowerCase().includes(term) ||
      u.role.toLowerCase().includes(term)
    );
  });

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs">
      {/* ── HEADER & SEARCH ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#6636DE]">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#061B38]">
              Registrasi Pengguna Terkini
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Catatan pendaftaran akun guru dan siswa terbaru di dalam sistem
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari nama, NIS, NIP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 w-44 sm:w-56 rounded-lg border border-[#E5E7EB] bg-[#F9F9FF] pl-8 pr-3 text-[12px] text-[#061B38] placeholder:text-[#94A3B8] focus:border-[#6636DE] focus:bg-white focus:outline-none"
            />
          </div>

          <Link
            href="/superadmin/teachers"
            className="flex h-8 items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] font-semibold text-[#061B38] transition-colors hover:bg-[#F9F9FF] hover:text-[#6636DE]"
          >
            <span>Kelola Guru</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── TABLE CONTAINER ── */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="pb-3 pr-4">Pengguna &amp; Akun</th>
              <th className="pb-3 px-4">Peran (Role)</th>
              <th className="pb-3 px-4">Identitas Resmi</th>
              <th className="pb-3 px-4">Rombel / Asal</th>
              <th className="pb-3 px-4 text-center">Status</th>
              <th className="pb-3 px-4">Terdaftar</th>
              <th className="pb-3 pl-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[13px] text-[#64748B]">
                  Tidak ada data pengguna yang sesuai dengan pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((u, idx) => {
                const roleBadge = getRoleBadge(u.role);
                const targetLink =
                  u.role === 'GURU'
                    ? '/superadmin/teachers'
                    : u.role === 'SISWA'
                    ? `/guru/students?search=${encodeURIComponent(u.identifier)}`
                    : '/superadmin/dashboard';

                return (
                  <tr
                    key={u.userId}
                    className="group transition-colors hover:bg-[#F9F9FF]"
                  >
                    {/* User Monogram & Name */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            idx % 2 === 0
                              ? 'bg-[#EDE9FE] text-[#6636DE]'
                              : 'bg-[#DFE8FF] text-[#3A4BD4]'
                          }`}
                        >
                          {getInitials(u.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#061B38] group-hover:text-[#6636DE] transition-colors truncate">
                            {u.name}
                          </p>
                          <p className="text-[11px] text-[#64748B] truncate">
                            {u.identifier}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${roleBadge.bg} ${roleBadge.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${roleBadge.dot}`} />
                        <span>{roleBadge.label}</span>
                      </span>
                    </td>

                    {/* NIS or NIP */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#061B38]">
                      {u.identityNumber}
                    </td>

                    {/* Rombel / Organization */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="rounded bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-medium text-[#475569]">
                        {u.organization}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold text-[#64748B]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8]" />
                          Nonaktif
                        </span>
                      )}
                    </td>

                    {/* Registration Time */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[12px] text-[#64748B]">
                      {u.timeAgo}
                    </td>

                    {/* Quick Link Action */}
                    <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                      <Link
                        href={targetLink}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#F0F3FF] hover:text-[#6636DE]"
                        title="Buka Data Pengguna"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
