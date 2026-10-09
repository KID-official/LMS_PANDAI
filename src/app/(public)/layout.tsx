import React from 'react';
import { NavbarLanding } from '@/app/components/navbar';
import { FooterLanding } from '@/app/components/footer';

/**
 * PublicLayout
 *
 * Layout untuk halaman-halaman publik (guest).
 * Struktur: NavbarLanding → main content → FooterLanding
 *
 * Routes yang tercakup: /, /about, /courses, /contact, /login, /register
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#F9F9FF' }}>
      <NavbarLanding />

      <main className="flex-1">
        {children}
      </main>

      <FooterLanding />
    </div>
  );
}
