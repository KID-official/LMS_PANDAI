'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { NavbarGuru } from '@/app/components/navbar';
import { SidebarGuru } from '@/app/components/sidebar';
import { cn } from '@/lib/utils';

/**
 * GuruLayout
 *
 * Layout untuk seluruh area portal guru.
 * Struktur: SidebarGuru (kiri fixed) + { NavbarGuru + main content } (kanan)
 *
 * - Sidebar fixed di desktop dan mobile
 * - Di desktop: main column offset padding 288px (atau 72px saat collapsed)
 * - Di mobile: sidebar tersembunyi, toggle via NavbarGuru hamburger
 * - Routes yang tercakup: /guru/**
 */
export default function GuruLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const userName     = session?.user?.name  ?? 'Guru Admin';
  const userSubtitle = session?.user?.email ?? 'Pengmas UNAIR';
  const userImage    = session?.user?.image ?? null;

  return (
    <div className="flex min-h-screen" style={{ background: '#F9F9FF' }}>

      {/* ── SIDEBAR (Fixed) ── */}
      <SidebarGuru
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userName={userName}
        userSubtitle={userSubtitle}
        userImage={userImage}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />

      {/* ── MAIN COLUMN ── */}
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-in-out',
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-[288px]'
        )}
      >

        {/* Top navbar */}
        <NavbarGuru
          onMobileMenuToggle={() => setMobileSidebarOpen((v) => !v)}
          userImage={userImage}
          userName={userName}
          userEmail={userSubtitle}
        />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
