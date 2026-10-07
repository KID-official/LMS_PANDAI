'use client';

import React from 'react';
import { Layers, ShieldCheck, QrCode, Unlock, CheckCircle, CheckCircle2 } from 'lucide-react';

export function PillarsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white border-y border-[#CAC3D8]/30">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#7F54F8] uppercase tracking-widest">
              Fondasi Pedagogi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#061B38] tracking-tight">
              Standar Baru Literasi Digital Sekolah
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#494455] max-w-md leading-relaxed">
            Dirancang kolaboratif antara akademisi Universitas Airlangga dan praktisi teknologi untuk menghadirkan pengalaman belajar yang aman, runut, dan terukur.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-[#F9F9FF] border border-[#E7EEFF] flex flex-col gap-4 shadow-subtle hover-lift hover:border-[#7F54F8]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#E8DEFF] text-[#7F54F8] flex items-center justify-center shadow-sm group-hover:bg-[#7F54F8] group-hover:text-white transition-colors duration-300">
              <Layers className="w-6 h-6" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors">
                Pembelajaran Terstruktur &amp; Sekuensial
              </h3>
              <p className="text-sm text-[#494455] leading-relaxed">
                Siswa dipandu melalui alur video terkurasi tanpa skip dan evaluasi bertahap. Bab selanjutnya hanya terbuka jika siswa menuntaskan kuis pemahaman konsep minimal skor 75.
              </p>
            </div>
            
            <div className="mt-auto pt-3 flex items-center gap-2 text-[#7F54F8] text-xs font-bold border-t border-[#E7EEFF]">
              <span>Sistem Kunci Otomatis</span>
              <Unlock className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-[#F9F9FF] border border-[#E7EEFF] flex flex-col gap-4 shadow-subtle hover-lift hover:border-[#3A4BD4]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#DFE0FF] text-[#3A4BD4] flex items-center justify-center shadow-sm group-hover:bg-[#3A4BD4] group-hover:text-white transition-colors duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#061B38] group-hover:text-[#3A4BD4] transition-colors">
                Kurikulum Khusus Etika &amp; Regulasi AI
              </h3>
              <p className="text-sm text-[#494455] leading-relaxed">
                Silabus kontekstual usia remaja: mengenali rekayasa suara deepfake, perlindungan identitas pribadi (PII), hak kekayaan intelektual karya teman, dan etika atribusi prompt.
              </p>
            </div>
            
            <div className="mt-auto pt-3 flex items-center gap-2 text-[#3A4BD4] text-xs font-bold border-t border-[#E7EEFF]">
              <span>Pedoman Kemendikdasmen</span>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-[#F9F9FF] border border-[#E7EEFF] flex flex-col gap-4 shadow-subtle hover-lift hover:border-[#00685F]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#89F5E7]/40 text-[#00685F] flex items-center justify-center shadow-sm group-hover:bg-[#00685F] group-hover:text-white transition-colors duration-300">
              <QrCode className="w-6 h-6" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#061B38] group-hover:text-[#00685F] transition-colors">
                Sertifikasi Terverifikasi &amp; Portofolio
              </h3>
              <p className="text-sm text-[#494455] leading-relaxed">
                E-sertifikat diterbitkan seketika setelah kelulusan tes komprehensif bab 5. Dilengkapi QR Code publik unik yang dapat diaudit langsung oleh pihak sekolah dan dinas pendidikan.
              </p>
            </div>
            
            <div className="mt-auto pt-3 flex items-center gap-2 text-[#00685F] text-xs font-bold border-t border-[#E7EEFF]">
              <span>Validasi Instan UNAIR</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PillarsSection;
