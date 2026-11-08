'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LogIn, Menu, X, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  PUBLIC_ROUTES,
  STUDENT_ROUTES,
  GURU_ROUTES,
  SUPERADMIN_ROUTES,
} from '@/app/components/navigation/routes';

export function NavbarLanding() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = session?.user?.role;
  const dashboardHref =
    userRole === 'SUPER_ADMIN'
      ? SUPERADMIN_ROUTES.DASHBOARD
      : userRole === 'GURU'
      ? GURU_ROUTES.DASHBOARD
      : STUDENT_ROUTES.DASHBOARD;

  const portalLabel =
    userRole === 'GURU'
      ? 'Portal Guru'
      : userRole === 'SUPER_ADMIN'
      ? 'Portal Admin'
      : 'Portal Siswa';

  const navLinks = [
    { label: 'Beranda', href: PUBLIC_ROUTES.HOME },
    { label: 'Pusat Pengetahuan', href: PUBLIC_ROUTES.KNOWLEDGE },
    { label: 'Katalog Course', href: PUBLIC_ROUTES.COURSES },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9FF] border-b border-outline/30 backdrop-blur-md bg-opacity-80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href={PUBLIC_ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-150 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold leading-tight text-heading">
                PANDAI LEARNING
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">
                panduan digital & literasi AI siswa
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-150',
                  isActive 
                    ? 'bg-primary-soft text-primary-strong' 
                    : 'text-body hover:bg-surface-soft hover:text-heading'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Login / Portal Button */}
        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <Link
              href={dashboardHref}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-colors duration-150 hover:bg-primary-strong active:scale-[0.96] ease-out"
            >
              <User className="h-4 w-4" />
              {portalLabel}
            </Link>
          ) : (
            <Link
              href={PUBLIC_ROUTES.LOGIN}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-colors duration-150 hover:bg-primary-strong active:scale-[0.96] ease-out"
            >
              <LogIn className="h-4 w-4" />
              Masuk Portal
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-body hover:bg-surface-soft md:hidden transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-outline/30 bg-white p-4 shadow-lg md:hidden flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-[14px] font-bold transition-colors',
                    isActive 
                      ? 'bg-primary-soft text-primary-strong' 
                      : 'text-body hover:bg-surface-soft'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {session?.user ? (
            <Link
              href={dashboardHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-primary-strong active:scale-[0.96] ease-out"
            >
              <User className="h-4 w-4" />
              {portalLabel}
            </Link>
          ) : (
            <Link
              href={PUBLIC_ROUTES.LOGIN}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-primary-strong active:scale-[0.96] ease-out"
            >
              <LogIn className="h-4 w-4" />
              Masuk Portal
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
