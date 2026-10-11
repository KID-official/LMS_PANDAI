'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  User,
  GraduationCap,
} from 'lucide-react';
import { STUDENT_ROUTES, PUBLIC_ROUTES } from '@/app/components/navigation/routes';

export const StudentSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Dashboard',
      href: STUDENT_ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: 'Katalog Course',
      href: PUBLIC_ROUTES.COURSES,
      icon: BookOpen,
    },
    {
      label: 'Certificate',
      href: '/student/certificates',
      icon: GraduationCap,
    },
    {
      label: 'Profil Saya',
      href: STUDENT_ROUTES.PROFILE,
      icon: User,
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
      {/* Navigation Menu Card */}
      <div className="p-3 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-1">
        <nav className="flex flex-col gap-1">
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
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
