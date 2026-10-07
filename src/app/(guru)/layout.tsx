'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { NavbarGuru } from '@/app/components/navbar';
import { SidebarGuru } from '@/app/components/sidebar';

/**
 * GuruLayout
 *
 * Layout untuk seluruh area portal guru.
 * Struktur: SidebarGuru (kiri) + { NavbarGuru + main content } (kanan)
 *
 * - Sidebar fixed 288px di desktop, collapsible
 * - Di mobile: sidebar tersembunyi, toggle via NavbarGuru hamburger
 * - Routes yang tercakup: /guru/**
 */
export default function GuruLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const userName     = session?.user?.name  ?? 'Guru Admin';
  const userSubtitle = session?.user?.email ?? 'Pengmas UNAIR';

  return (
    <div className="flex min-h-screen" style={{ background: '#F9F9FF' }}>

      {/* ── SIDEBAR ── */}
      <SidebarGuru
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userName={userName}
        userSubtitle={userSubtitle}
      />

      {/* ── MAIN COLUMN ── */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top navbar */}
        <NavbarGuru
          onMobileMenuToggle={() => setMobileSidebarOpen((v) => !v)}
        />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
