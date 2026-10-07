'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export function NotificationPill() {
  return (
    <section className="w-full px-4 sm:px-6 pt-6 pb-2 flex justify-center">
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F0F3FF] border border-[#E8DEFF] shadow-sm hover:shadow transition-all duration-300 animate-fade-in-up hover:-translate-y-0.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008378] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00685F]"></span>
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#7F54F8] hidden xs:inline-block" />
        <span className="text-xs font-bold tracking-wider uppercase text-[#7F54F8]">
          Inisiatif Pengmas UNAIR • Kurikulum Merdeka Mandiri 2026
        </span>
        <span className="text-[#CAC3D8] text-xs hidden sm:inline">•</span>
        <span className="text-xs text-[#494455] font-medium hidden sm:inline">
          Pilot Project SMP Jawa Timur
        </span>
      </div>
    </section>
  );
}

export default NotificationPill;
