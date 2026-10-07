'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';
import { ArticleData } from '@/data/articles';

interface ArticleBreadcrumbsProps {
  article: ArticleData;
}

export const ArticleBreadcrumbs: React.FC<ArticleBreadcrumbsProps> = ({ article }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-3.5 mt-2.5 sm:mt-3.5 lg:mt-4 bg-[#F0F3FF]/60 border-b border-[#CAC3D8]/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#494455] flex-wrap">
          <Link
            href={PUBLIC_ROUTES.HOME}
            className="hover:text-[#7F54F8] transition-colors flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#7A7486]/50" />
          <Link
            href={PUBLIC_ROUTES.KNOWLEDGE}
            className="hover:text-[#7F54F8] transition-colors font-medium"
          >
            Pusat Pengetahuan
          </Link>
          <ChevronRight className="w-3 h-3 text-[#7A7486]/50" />
          <span className="text-[#494455]">{article.category}</span>
          <ChevronRight className="w-3 h-3 text-[#7A7486]/50" />
          <span className="text-[#7F54F8] font-bold">{article.badgeTag}</span>
        </nav>

        {/* Peer Review Badge & DOI */}
        <div className="flex items-center gap-2 text-xs text-[#494455]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#89F5E7]/40 text-[#00201D] font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00685F] animate-pulse" />
            Tinjauan Sejawat SFA 2026
          </span>
          <span className="hidden sm:inline text-[#CAC3D8]">•</span>
          <span className="hidden sm:inline text-[#494455] font-mono text-[11px]">
            DOI: {article.doi}
          </span>
        </div>
      </div>
    </section>
  );
};
