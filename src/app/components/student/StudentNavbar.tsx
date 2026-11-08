'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  Sparkles,
  Menu,
  X,
  LogOut,
  User,
  GraduationCap,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { PUBLIC_ROUTES, STUDENT_ROUTES } from '@/app/components/navigation/routes';

export const StudentNavbar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const userIdentifier = session?.user?.identifier || 'Siswa';
  const userName = session?.user?.name || userIdentifier;

  // Inisial avatar jika siswa belum memiliki foto (contoh: "Ahmad Fauzi" -> "AF")
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase() || 'SI';

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#EAE8F2] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Portal Tag */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href={STUDENT_ROUTES.DASHBOARD} className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7950F2] text-white shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#172554]">
                SFA <span className="text-[#7950F2]">Learn</span>
              </span>
              <span className="text-[10px] font-bold text-[#7B8198] uppercase tracking-wider">
                Portal Siswa
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-2 flex-1 px-8">
          <Link
            href={STUDENT_ROUTES.DASHBOARD}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              pathname === STUDENT_ROUTES.DASHBOARD
                ? 'bg-[#7950F2] text-white shadow-sm'
                : 'text-[#7B8198] hover:text-[#172554] hover:bg-[#F1EDFF]'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href={STUDENT_ROUTES.MY_COURSES}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              pathname.startsWith('/student/courses') || pathname.startsWith('/courses')
                ? 'bg-[#7950F2] text-white shadow-sm'
                : 'text-[#7B8198] hover:text-[#172554] hover:bg-[#F1EDFF]'
            }`}
          >
            Katalog Course
          </Link>
          <Link
            href="/student/certificates"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              pathname.startsWith('/student/certificates')
                ? 'bg-[#7950F2] text-white shadow-sm'
                : 'text-[#7B8198] hover:text-[#172554] hover:bg-[#F1EDFF]'
            }`}
          >
            Certificate
          </Link>
        </nav>

        {/* Right User Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 rounded-xl bg-[#F1EDFF] border border-[#EAE8F2] p-1.5 pr-3 text-xs font-bold text-[#172554] hover:bg-[#eae2fd] transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7950F2] text-white text-xs font-extrabold uppercase overflow-hidden">
                {session?.user?.image ? (
                  <img src={session.user.image} alt={userName} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <span className="max-w-[120px] truncate">{userName}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#7B8198]" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-lg border border-[#EAE8F2] z-50 flex flex-col gap-1 animate-scale-in">
                <div className="px-3 py-2 border-b border-[#EAE8F2]">
                  <span className="text-[11px] font-bold text-[#7B8198]">NIS Pengguna</span>
                  <p className="text-xs font-bold text-[#172554] truncate">{userIdentifier}</p>
                </div>

                <Link
                  href={STUDENT_ROUTES.PROFILE}
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#7B8198] hover:bg-[#F1EDFF] hover:text-[#7950F2] transition-colors"
                >
                  <User className="h-4 w-4 text-[#7950F2]" />
                  <span>Profil Siswa</span>
                </Link>

                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: PUBLIC_ROUTES.LOGIN })}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#BA1A1A] hover:bg-[#FFDAD6] transition-colors"
                >
                  <LogOut className="h-4 w-4 text-[#BA1A1A]" />
                  <span>Keluar / Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#F1EDFF] text-[#172554] hover:bg-[#eae2fd] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE8F2] bg-white px-4 pt-3 pb-6 flex flex-col gap-3 shadow-md animate-fade-in-up">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F1EDFF]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7950F2] text-white text-xs font-extrabold uppercase overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt={userName} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#172554]">{userName}</span>
              <span className="text-[11px] font-medium text-[#7950F2]">NIS: {userIdentifier}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              href={STUDENT_ROUTES.DASHBOARD}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#172554] hover:bg-[#F1EDFF] hover:text-[#7950F2] flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-[#7950F2]" />
              <span>Dashboard</span>
            </Link>
            <Link
              href={STUDENT_ROUTES.MY_COURSES}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#172554] hover:bg-[#F1EDFF] hover:text-[#7950F2] flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#7950F2]" />
              <span>Katalog Course</span>
            </Link>
            <Link
              href="/student/certificates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#172554] hover:bg-[#F1EDFF] hover:text-[#7950F2] flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4 text-[#7950F2]" />
              <span>Certificate</span>
            </Link>
            <Link
              href={STUDENT_ROUTES.PROFILE}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#172554] hover:bg-[#F1EDFF] hover:text-[#7950F2] flex items-center gap-2"
            >
              <User className="h-4 w-4 text-[#7950F2]" />
              <span>Profil Saya</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: PUBLIC_ROUTES.LOGIN })}
            className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FFDAD6] text-[#93000A] text-xs font-bold transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      )}
    </header>
  );
};
