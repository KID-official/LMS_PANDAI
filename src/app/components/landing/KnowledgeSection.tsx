'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

export function KnowledgeSection() {
  const articles = [
    {
      id: '1',
      tag: 'Liputan Khusus',
      tagColor: 'bg-[#E8DEFF] text-[#7F54F8]',
      date: '18 Feb 2026',
      readTime: '8 menit baca',
      title: 'Terobosan Deteksi Deepfake Berbasis C2PA: Standar Baru Keamanan Konten Sekolah 2026',
      excerpt: 'Kajian implementasi standar metadata kriptografi terbuka Coalition for Content Provenance and Authenticity untuk memverifikasi foto dokumentasi tugas sekolah.',
      author: 'Tim Riset Pengmas UNAIR',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVj-eqUfrdZlA_3zRjMevFj-knVQ-TusdVdbtH_GcqaLvdGMgN1TgsDSZTz3LAbrdj_9MbqK2Bnm0Zn9w1AyU6sfVNwBXmnalKzbqIJss3_laNctEW_yuBxbNP4jhoSYu31aAuasBo6cBJR_ueF5LGIPluib71IZ7NWr7u4vRq4U8Hex2sAICw6jMBC3S1au9FEpoPBanrkiMHtxo3APSc7kWJKd9VqAARHLjowFy2Yc8IgKxYZFD4',
    },
    {
      id: '2',
      tag: 'Kebijakan',
      tagColor: 'bg-[#DFE0FF] text-[#3A4BD4]',
      date: '12 Feb 2026',
      readTime: '5 menit baca',
      title: 'Kemendikdasmen Rilis 10 Pedoman Pemanfaatan AI Generatif di Ruang Kelas SMP',
      excerpt: 'Ringkasan regulasi baru mengenai batasan asisten virtual dalam pengerjaan ujian, penilaian otomatis guru, dan tata tertib penggunaan gawai pintar.',
      author: 'Divisi Kebijakan Pendidikan',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHDkbNAOIOW0muByBnmt0kWgLDkAwFXUVFO1mysStMDQgJCx4y3rbHKtHaw6_CJpxUUrPLWqvJi8iwXi0L6b9vBCr3uMB5y7z-_xoxNm--MbMzcOcNayFB5AZQuKw-duSc5J5lnTswApnHtw-7neS8u2EoAsq1pLlc3-hYOodHxPvi1HfAwRLsLt8PaB_8UYu9LjSCJ7wPPONgaAxhbAOJJysRqYn5AAWsxCAn8cOkN54kIYE8aEH_',
    },
    {
      id: '3',
      tag: 'Toolkit Guru',
      tagColor: 'bg-[#89F5E7]/50 text-[#00685F]',
      date: '05 Feb 2026',
      readTime: '4 menit baca',
      title: 'Panduan Cepat Cek Fakta (Metode SIFT) untuk Konten Video Pendek Viral',
      excerpt: 'Empat langkah praktis: Stop, Investigate the source, Find better coverage, dan Trace original context yang mudah diajarkan guru dalam 15 menit jam wali kelas.',
      author: 'AmosProduction Media Lab',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiTKXDfVmTKQd6KdB5sE9CIUmKJhUnRPuKP65HFNX0N7t956yLpTpnwTJNUHpwhswdGtHtbZuNBD2I-E4QxSC3L8mBaW9T2JrU79QzvALN_QPFNpxtB7B1STCcq_LQ3OEH8oqt7RYWy5Ltb-RoVenD7CT2gMZQ_cHFv6Q-U9QNLooSIDvYvZUOw815Hl8FM2LrLQdqdGUReTwR6p9BoBDfDslVDzsX9UCBATP4E9tPb5sWn0fBS8Ra',
    },
  ];

  return (
    <section id="knowledge" className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-[#F9F9FF] border-t border-[#CAC3D8]/30">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#7F54F8] uppercase tracking-wider">
              Warta &amp; Riset Terhangat
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#061B38]">
              Kanal Pengetahuan AI UNAIR
            </h2>
            <p className="text-xs sm:text-sm text-[#494455]">
              Riset terkini, pedoman praktis guru-siswa, dan kabar regulasi etika kecerdasan buatan.
            </p>
          </div>
          
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7F54F8] hover:text-[#6636DE] transition-colors group shrink-0"
          >
            <span>Kunjungi Pusat Pengetahuan Lengkap</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="flex flex-col rounded-2xl bg-white border border-[#CAC3D8]/40 overflow-hidden shadow-subtle hover-lift hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-48 w-full overflow-hidden relative bg-[#E7EEFF]">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${art.tagColor}`}>
                  {art.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 text-[#7A7486] text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#7F54F8]" />
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#494455] line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>

                <div className="mt-auto pt-3 border-t border-[#F0F3FF] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#7A7486]">
                    {art.author}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#7F54F8] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KnowledgeSection;
