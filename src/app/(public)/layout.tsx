import React from 'react';
import { NavbarGuest } from '@/app/components/navbar';
import { Footer } from '@/app/components/footer';

/**
 * PublicLayout
 *
 * Layout untuk halaman-halaman publik (guest).
 * Struktur: NavbarGuest → main content → Footer
 *
 * Routes yang tercakup: /, /about, /courses, /contact, /login, /register
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#F9F9FF' }}>
      <NavbarGuest />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
