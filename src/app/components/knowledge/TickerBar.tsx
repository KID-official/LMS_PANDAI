'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TickerBar: React.FC = () => {
  const tickerTags = [
    { label: '#DeepfakeForensics', href: '#deepfake-forensics' },
    { label: '#UUEtikaAI2026', href: '#uu-etika-ai' },
    { label: '#PromptSMP', href: '#prompt-smp' },
    { label: '#KeamananDataSekolah', href: '#keamanan-data' },
    { label: '#GenAIKurikulum', href: '#gen-ai-kurikulum' },
  ];

  return (
    <section className="w-full bg-[#F0F3FF] py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#CAC3D8]/30 shadow-subtle">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
        {/* Left Side: Trending Pill & Ticker Tags */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7F54F8]/10 text-[#7F54F8] font-semibold text-xs uppercase tracking-wider shrink-0 animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-[#7F54F8] animate-pulse" />
            Tren Hari Ini
          </span>

          <div className="flex items-center gap-3 text-[#494455] text-xs font-medium whitespace-nowrap">
            {tickerTags.map((tag, index) => (
              <React.Fragment key={tag.label}>
                <a
                  href={tag.href}
                  className="hover:text-[#7F54F8] transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="text-[#061B38] font-semibold group-hover:text-[#7F54F8] transition-colors">
                    {tag.label}
                  </span>
                </a>
                {index < tickerTags.length - 1 && (
                  <span className="text-[#CAC3D8] text-xs select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Standard Accreditation Info */}
        <div className="hidden md:flex items-center gap-2 text-[#494455] text-xs font-semibold shrink-0 bg-white/60 px-3 py-1 rounded-full border border-[#CAC3D8]/40 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#7F54F8]" />
          <span>Standar Kurikulum Merdeka AI Literasi 2026</span>
        </div>
      </div>
    </section>
  );
};
