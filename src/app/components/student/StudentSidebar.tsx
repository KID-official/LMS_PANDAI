'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  User,
  Award,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { STUDENT_ROUTES, PUBLIC_ROUTES } from '@/app/components/navigation/routes';

export const StudentSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Dashboard Belajar',
      href: STUDENT_ROUTES.DASHBOARD,
      icon: LayoutDashboard,
      badge: 'Aktif',
    },
    {
      label: 'Pusat Pengetahuan',
      href: PUBLIC_ROUTES.KNOWLEDGE,
      icon: BookOpen,
      badge: 'Riset',
    },
    {
      label: 'Profil Saya',
      href: STUDENT_ROUTES.PROFILE,
      icon: User,
      badge: undefined,
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
      {/* Navigation Menu Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-2">
        <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-[#7A7486]">
          Menu Pembelajaran
        </span>
        <nav className="flex flex-col gap-1 mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#7F54F8] text-white shadow-sm'
                    : 'text-[#494455] hover:bg-[#F0F3FF] hover:text-[#061B38]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#7F54F8]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E8DEFF] text-[#5010C8]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Support / Quick Help Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#7F54F8] to-[#3A4BD4] text-white shadow-md flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold tracking-wide">
            BANTUAN SISWA
          </span>
          <HelpCircle className="w-4 h-4 text-white/80" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">Butuh Bantuan Akses?</span>
          <p className="text-[11px] text-white/90 leading-relaxed">
            Jika kamu mengalami kendala login atau akses modul, tanyakan langsung pada guru pembimbing.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-semibold pt-1 border-t border-white/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pengmas UNAIR x Amos</span>
        </div>
      </div>
    </aside>
  );
};
