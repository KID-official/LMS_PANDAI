'use client';

import React from 'react';
import { BookOpen, CheckSquare, FileText, ArrowRight, ChevronRight } from 'lucide-react';

export interface PillarModule {
  id: string;
  tag: string;
  title: string;
  description: string;
  badge: string;
  actionText: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconHoverBg: string;
  iconColor: string;
  iconHoverColor: string;
  tagColor: string;
}

const PILLAR_MODULES: PillarModule[] = [
  {
    id: 'glosarium',
    tag: 'Glosarium Interaktif',
    title: 'Kamus & Glosarium Istilah AI (A-Z)',
    description:
      'Memahami konsep Large Language Models (LLM), Arsitektur Transformer, Fenomena Halusinasi, hingga Overfitting dengan analogi dunia nyata tanpa rumus matematika rumit.',
    badge: '128 Entri Terindeks',
    actionText: 'Buka Kamus',
    href: '#glosarium',
    icon: BookOpen,
    iconBg: 'bg-[#E8DEFF]',
    iconHoverBg: 'group-hover:bg-[#7F54F8]',
    iconColor: 'text-[#7F54F8]',
    iconHoverColor: 'group-hover:text-white',
    tagColor: 'text-[#7F54F8]',
  },
  {
    id: 'toolkit',
    tag: 'Toolkit Investigasi',
    title: 'Panduan Cepat Cek Fakta (Metode SIFT)',
    description:
      '4 langkah taktis memverifikasi keaslian foto, rekaman suara dan video viral: Stop, Investigate the source, Find better coverage, dan Trace claims sebelum membagikannya.',
    badge: 'Metode Stanford Edu',
    actionText: 'Pelajari SIFT',
    href: '#toolkit',
    icon: CheckSquare,
    iconBg: 'bg-[#89F5E7]/40',
    iconHoverBg: 'group-hover:bg-[#00685F]',
    iconColor: 'text-[#00685F]',
    iconHoverColor: 'group-hover:text-white',
    tagColor: 'text-[#00685F]',
  },
  {
    id: 'integritas',
    tag: 'Integritas Akademik',
    title: 'Template Etika Sitasi AI',
    description:
      'Format baku mencantumkan prompt sintaks, versi model AI, tanggal akses, dan deklarasi kontribusi alat bantu dalam makalah ilmiah dan tugas riset sekolah menengah.',
    badge: 'Standar APA 7th & IEEE',
    actionText: 'Unduh Template',
    href: '#integritas',
    icon: FileText,
    iconBg: 'bg-[#DFE0FF]',
    iconHoverBg: 'group-hover:bg-[#3A4BD4]',
    iconColor: 'text-[#3A4BD4]',
    iconHoverColor: 'group-hover:text-white',
    tagColor: 'text-[#3A4BD4]',
  },
];

export const PillarModulesSection: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Section Title & Action */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7F54F8]">
              Modul Pegangan Cepat
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#061B38]">
              Pilar Literasi Fondasional
            </h2>
          </div>
          <a
            href="#direktori"
            className="text-xs sm:text-sm font-semibold text-[#7F54F8] hover:text-[#6636DE] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>Lihat Seluruh Direktori</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLAR_MODULES.map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.id}
                className="p-6 rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle flex flex-col justify-between gap-6 group hover-lift transition-colors transition-transform transition-shadow duration-300"
              >
                <div className="flex flex-col gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${module.iconBg} ${module.iconHoverBg} flex items-center justify-center transition-colors duration-300 shadow-sm`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${module.iconColor} ${module.iconHoverColor} transition-colors duration-300`}
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <span className={`text-xs font-bold ${module.tagColor}`}>
                      {module.tag}
                    </span>
                    <h3 className="text-base font-bold text-[#061B38] leading-snug group-hover:text-[#7F54F8] transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Footer Badge & Action Link */}
                <div className="pt-2 border-t border-[#CAC3D8]/20 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#7A7486] font-medium">{module.badge}</span>
                  <a
                    href={module.href}
                    className="text-[#7F54F8] hover:text-[#5010C8] font-bold flex items-center gap-1 group/link transition-colors"
                  >
                    <span>{module.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
