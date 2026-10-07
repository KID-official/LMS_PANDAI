'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PUBLIC_ROUTES, GUEST_NAV_LINKS, type NavLink } from '../navigation/routes';

/**
 * NavbarGuest
 *
 * Navbar untuk halaman publik / guest.
 * Menampilkan logo SFA Learn + tagline di kiri,
 * dan link navigasi + tombol login/daftar di kanan.
 *
 * Design reference: DesignReferences/Navbar Guest.png
 * Design token: design.md § Color Tokens & Components → Navigation
 */
export default function NavbarGuest() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-surface shadow-shell"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* ── LOGO ── */}
        <Link
          href={PUBLIC_ROUTES.HOME}
          className="flex items-center gap-3 select-none"
          aria-label="SFA Learn – halaman utama"
        >
          {/* Icon tile — violet fill, 12px radius */}
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: '#7F54F8' }}
            aria-hidden
          >
            <Sparkles className="h-5 w-5 text-white" />
          </span>

          {/* Brand text */}
          <span className="leading-none">
            <span
              className="block text-[15px] font-bold leading-tight"
              style={{ color: '#061B38', letterSpacing: '-0.2px' }}
            >
              SFA Learn
            </span>
            <span
              className="block text-[12px] font-normal"
              style={{ color: '#7A7486' }}
            >
              Learning Management System
            </span>
          </span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {GUEST_NAV_LINKS.map((link: NavLink) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors',
                  isActive
                    ? 'bg-[#7F54F8] text-white'
                    : 'text-[#494455] hover:bg-[#F0F3FF] hover:text-[#7F54F8]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── CTA BUTTONS ── */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={PUBLIC_ROUTES.LOGIN}
            className="rounded-lg border px-4 py-2 text-[13px] font-semibold transition-colors"
            style={{
              borderColor: '#CAC3D8',
              color: '#494455',
              background: 'transparent',
            }}
          >
            Masuk
          </Link>
          <Link
            href={PUBLIC_ROUTES.REGISTER}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#7F54F8' }}
          >
            Daftar Gratis
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* ── HAMBURGER (mobile) ── */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          style={{ color: '#494455' }}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t bg-white px-6 pb-6 pt-4 md:hidden"
          style={{ borderColor: '#CAC3D8' }}
        >
          <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
            {GUEST_NAV_LINKS.map((link: NavLink) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors',
                    isActive
                      ? 'bg-[#7F54F8] text-white'
                      : 'text-[#494455] hover:bg-[#F0F3FF] hover:text-[#7F54F8]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={PUBLIC_ROUTES.LOGIN}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border py-2.5 text-center text-[13px] font-semibold transition-colors"
              style={{ borderColor: '#CAC3D8', color: '#494455' }}
            >
              Masuk
            </Link>
            <Link
              href={PUBLIC_ROUTES.REGISTER}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg py-2.5 text-center text-[13px] font-semibold text-white"
              style={{ background: '#7F54F8' }}
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
