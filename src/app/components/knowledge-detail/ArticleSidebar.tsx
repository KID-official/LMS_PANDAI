'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ExternalLink, Newspaper } from 'lucide-react';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';

const RELATED_NEWS = [
  {
    id: '1',
    category: 'Pedoman AI',
    categoryColor: 'text-[#7F54F8]',
    title: 'SOP Penggunaan AI Generatif dalam Penulisan Karya Tulis Ilmiah Remaja',
    readTime: '5 mnt baca',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGm1_qqeaMunHw0p4AxwWZDL-9PN2CRj-PlKa35Ydddi7kcOz4_HefaHS7_OPXo5EITWhx2IucoJpY7GSg9Vaw1DVufK7QF3DPEIJhZ3czLYr-djo8yXBjt7LWtYGvgHFyomfXieR_Doqw_KMHE7nJhPAxKJjMQzABLzLXa0yDiVdMK0aXc3nqXNeed-i038tNjGSSxTFBpd0LAGTFa_K7Prkz221Tm0J193Obw_zVM54VpXzKnfLv',
  },
  {
    id: '3',
    category: 'Riset Algoritma',
    categoryColor: 'text-[#3A4BD4]',
    title: 'Uji Efisiensi Model LLM Kecil (SLM) pada Server Lokal Laboratorium Komputer',
    readTime: '11 mnt baca',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlTn_2ppTtaAS22KXrVEKSf4Lj9iReQW6cQZjhQbA_9IpRP-bDv2zzjsRy_bX__JCGDmyiUwCRVyf88CTqSWKCtyv76gnbTZ-uXCgdV6OfedwnnQ2QgifCkoYyxwrt2QvGkE5iWlcGgngMBKmW2DM9zctDb14eXI3Zn-7QX1gHzdQk_GMx8o7KLumoE1Tg8iMVZQAsGie6eIaiMdeoyqzM5Q8Un1OOxfbIc1WY4LI9sbTlGW8ZFpFb',
  },
];

export const ArticleSidebar: React.FC = () => {

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      {/* Sticky Sidebar Container */}
      <div className="sticky top-24 flex flex-col gap-5">
      {/* LMS Promotion Cross-Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7F54F8] to-[#3A4BD4] text-white shadow-md flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded bg-white/20 text-white text-[11px] font-bold tracking-wide">
              PORTAL SISWA • UI-04D
            </span>
            <GraduationCap className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold leading-snug">
              Ingin Latihan Deteksi Visual Mandiri?
            </span>
            <p className="text-xs text-white/90 leading-relaxed">
              Uji kemampuan analisismu pada simulator interaktif di kursus <strong>&quot;Etika &amp; Keamanan AI&quot;</strong> dan raih lencana sertifikasi digital.
            </p>
          </div>
          <Link
            href="/login"
            className="mt-1 py-2 px-4 rounded-xl bg-white text-[#7F54F8] hover:bg-[#F0F3FF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka Kursus di LMS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Related & Trending News */}
        <div className="p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#061B38] flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#3A4BD4]" />
              Warta Terkait &amp; Populer
            </h4>
            <Link href={PUBLIC_ROUTES.KNOWLEDGE} className="text-xs text-[#7F54F8] font-bold hover:underline">
              Semua
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {RELATED_NEWS.map((news) => (
              <Link
                key={news.id}
                href={`/knowledge/${news.id}`}
                className="flex gap-3 group py-1"
              >
                <div className="w-16 h-14 rounded-xl bg-[#E7EEFF] relative overflow-hidden shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center gap-0.5">
                  <span className={`text-[11px] font-bold ${news.categoryColor}`}>
                    {news.category}
                  </span>
                  <span className="text-xs font-bold text-[#061B38] line-clamp-2 leading-tight group-hover:text-[#7F54F8] transition-colors">
                    {news.title}
                  </span>
                  <span className="text-[11px] text-[#7A7486]">{news.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
};
