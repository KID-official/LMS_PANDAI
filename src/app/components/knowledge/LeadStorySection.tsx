'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, Clock, Share2, ArrowRight } from 'lucide-react';

const TRENDING_ARTICLES = [
  {
    id: '1',
    rank: '01',
    category: 'Kebijakan Nasional',
    categoryColor: 'text-[#7F54F8]',
    rankBg: 'bg-[#E8DEFF] text-[#7F54F8]',
    title: 'Kemendikdasmen Rilis 10 Pedoman Pemanfaatan AI Generatif di Ruang Kelas SMP',
    readTime: '5 menit baca',
    statusText: 'Resmi Disahkan',
    statusColor: 'text-[#00685F]',
  },
  {
    id: '2',
    rank: '02',
    category: 'Keamanan Siber',
    categoryColor: 'text-red-500',
    rankBg: 'bg-[#F0F3FF] text-[#494455]',
    title: 'Studi Kasus: Modus Baru Phishing Berbasis Kloning Suara AI dan Cara Mengidentifikasinya',
    readTime: '6 menit baca',
    statusText: '3.4k pembaca',
    statusColor: 'text-[#7A7486]',
  },
  {
    id: '3',
    rank: '03',
    category: 'Literasi Kognitif',
    categoryColor: 'text-[#00685F]',
    rankBg: 'bg-[#F0F3FF] text-[#494455]',
    title: 'Mengapa Siswa Perlu Memahami Algoritma Rekomendasi Media Sosial Sebelum Menggunakan Chatbot',
    readTime: '4 menit baca',
    statusText: '2.1k pembaca',
    statusColor: 'text-[#7A7486]',
  },
];

export const LeadStorySection: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Main Lead Hero Card — 8 cols */}
        <article className="lg:col-span-8 flex flex-col rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle overflow-hidden group hover:shadow-md transition-shadow duration-300">
          {/* Hero Image */}
          <Link href="/knowledge/lead" className="relative w-full h-72 sm:h-96 overflow-hidden block">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLnjDd4mHNWqKZZMaa0IOrcrlFdJ7yTdSlqsXpgPuXU_tnVgf2h4C00cheN7nGcZFiAXWEXCPa182g4PmK3fmlgdXnX_GyAp5VlkTabDdAr9lbGyuYFQ2yo-6gP9hLwIE8Y9inNdUrNybrUmird1CCe59Gbnhe3u7l-bcVcbcZ-CKjUkt0pCBjFKKMFirocFnNE_uDlnWBluKrKHQ5fS-8c98AQ7Ty_aTXwW2kHCaI3u0UI6C9XRkG"
              alt="Digital forensic laboratory screen visualizing synthetic media watermarking"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* Dark scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061B38]/90 via-[#061B38]/30 to-transparent" />

            {/* Category Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#7F54F8] text-white text-xs font-bold uppercase tracking-wide shadow-sm">
                LIPUTAN KHUSUS
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#061B38] text-xs font-semibold shadow-sm">
                ETIKA DIGITAL
              </span>
            </div>

            {/* Share Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#061B38] text-xs font-semibold shadow-sm">
              <Share2 className="w-3.5 h-3.5 text-[#7F54F8]" />
              <span>342 Dibagikan</span>
            </div>

            {/* Bottom Caption Inside Scrim */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
                <span>Oleh Tim Litbang Pengmas UNAIR</span>
                <span>•</span>
                <span>8 menit baca</span>
                <span>•</span>
                <span>14 Oktober 2026</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-[#E8DEFF] transition-colors">
                Terobosan Deteksi Deepfake Berbasis C2PA: Standar Baru Keamanan Konten Sekolah 2026
              </h2>
            </div>
          </Link>

          {/* Card Body */}
          <div className="p-6 flex flex-col justify-between flex-1 gap-4 bg-white">
            <p className="text-sm text-[#494455] leading-relaxed line-clamp-3">
              Inisiatif enkripsi metadata terbuka Coalition for Content Provenance and Authenticity (C2PA) mulai diterapkan pada jaringan pembelajaran daring nasional. Solusi ini secara otomatis menyematkan jejak kriptografi pada karya orisinal siswa sekaligus mengenali hasil manipulasi generative audio-visual dengan akurasi verifikasi hingga 99.4%.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#F0F3FF]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DEFF] flex items-center justify-center text-[#20005F] text-xs font-bold">
                  UA
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#061B38]">Kolaborasi Riset UNAIR & PANDAI LEARNING</span>
                  <span className="text-xs text-[#7A7486]">Kertas Kerja Forensik Komputasi</span>
                </div>
              </div>
              <Link
                href="/knowledge/lead"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold transition-colors shadow-sm group/btn"
              >
                <span>Baca Liputan Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </article>

        {/* Right: Top 3 Trending — 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Section Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7F54F8]" />
              <h3 className="text-sm font-bold text-[#061B38]">Warta Paling Dibahas</h3>
            </div>
            <span className="text-xs font-bold text-[#7F54F8]">Realtime 24 Jam</span>
          </div>

          {/* Trending List */}
          <div className="flex flex-col gap-4 h-full">
            {TRENDING_ARTICLES.map((art) => (
              <article
                key={art.rank}
                className="flex-1 p-4 rounded-xl bg-white border border-[#CAC3D8]/30 shadow-subtle hover:shadow-md transition-colors transition-transform transition-shadow duration-300 flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg ${art.rankBg} text-sm font-bold flex items-center justify-center shrink-0`}>
                    {art.rank}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold ${art.categoryColor}`}>{art.category}</span>
                    <Link
                      href={`/knowledge/${art.id}`}
                      className="text-xs font-semibold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug line-clamp-2"
                    >
                      {art.title}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7A7486] pt-1 border-t border-[#F0F3FF]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                  <span className={`font-semibold ${art.statusColor}`}>{art.statusText}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
