'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

export interface KnowledgeHeaderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES = [
  'Semua Berita',
  'Etika & Regulasi',
  'Forensik Digital',
  'Panduan Siswa & Guru',
  'Riset & Opini',
  'Tutorial Praktis',
];

export const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-6 bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Top Header Row & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Headline & Subtitle Column */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#E8DEFF] text-[#20005F] font-bold text-xs">
                Edisi Literasi Digital v2.4
              </span>
              <span className="text-xs text-[#7A7486] font-medium">
                Diperbarui setiap hari kerja pk 08.00 WIB
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061B38] tracking-tight leading-tight">
              Pusat Pengetahuan &amp; Warta Literasi AI
            </h1>

            <p className="text-sm sm:text-base text-[#494455] leading-relaxed">
              Rujukan komprehensif warta sains komputer, pengujian integritas akademik, studi kasus keamanan data sekolah, dan panduan praktis kecerdasan artifisial etis.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="w-full md:w-96 relative shrink-0">
            <div className="relative flex items-center bg-white rounded-xl shadow-subtle border border-[#CAC3D8]/40 focus-within:border-[#7F54F8] transition-colors">
              <Search className="w-5 h-5 absolute left-3.5 text-[#7A7486] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari artikel, riset literasi, atau studi kasus..."
                className="w-full h-11 pl-11 pr-24 bg-transparent text-[#061B38] placeholder:text-[#7A7486] text-xs sm:text-sm font-medium rounded-xl focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-1.5 px-3 py-1.5 bg-[#7F54F8] hover:bg-[#6636DE] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#7F54F8] text-white shadow-sm scale-[1.02]'
                    : 'bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
