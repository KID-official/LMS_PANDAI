'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, Check, ShieldCheck, Sparkles } from 'lucide-react';

export function CtaBannerSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-[#7F54F8] via-[#6636DE] to-[#5010C8] text-white p-6 sm:p-10 lg:p-12 shadow-raised relative overflow-hidden">
        {/* Decorative Backdrop Geometry */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#3A4BD4] opacity-30 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -top-20 w-64 h-64 rounded-full bg-[#E8DEFF] opacity-20 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide text-white">
                Single Sign-On Siswa &amp; Fasilitator
              </span>
              <span className="text-xs text-white/80 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#89F5E7]" />
                Akses Mandiri Bebas Biaya
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Satu Pintu Akses Pembelajaran &amp; Validasi Sertifikat Digital
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              Akses materi video berurutan, pantau progres audit kelas secara real-time, dan unduh sertifikat resmi ber-QR Code dengan verifikasi pangkalan data akademik UNAIR.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-xl bg-white text-[#7F54F8] text-sm font-extrabold shadow-lg hover:bg-[#F0F3FF] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              >
                <span>Masuk ke Portal LMS Sekarang</span>
                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <span className="text-xs text-white/80 font-medium">
                Demo Cepat: Masuk tanpa sandi rumit menggunakan ID Siswa Terdaftar
              </span>
            </div>
          </div>

          {/* Right Partner Column */}
          <div className="lg:col-span-4 flex flex-col p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <div className="flex items-center gap-3 pb-4 border-b border-white/15">
              <div className="w-10 h-10 rounded-xl bg-white text-[#7F54F8] flex items-center justify-center font-bold text-sm shadow-sm">
                UN
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  Mitra Pelaksana Resmi
                  <ShieldCheck className="w-4 h-4 text-[#89F5E7]" />
                </span>
                <span className="text-xs text-white/80">
                  Pengmas UNAIR × AmosProduction
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 text-xs font-medium text-white/90">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#89F5E7]/20 text-[#89F5E7] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dukungan Teknis Lab Sekolah 7 Hari</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#89F5E7]/20 text-[#89F5E7] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Modul Offline untuk Lab Terbatas</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#89F5E7]/20 text-[#89F5E7] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dashboard Pantau Guru Terpadu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBannerSection;
