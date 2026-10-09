'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Play,
  CheckCircle2,
  Sliders,
  Lock,
  Award,
  ShieldCheck,
  Pause,
} from 'lucide-react';

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 animate-fade-in-up">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E8DEFF] text-[#7F54F8] text-xs font-bold tracking-wide">
                Akreditasi Riset Komunitas
              </span>
              <span className="text-xs font-semibold text-[#7A7486]">
                AmosProduction Collaborative
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061B38] tracking-tight leading-tight">
              Membangun Generasi Kritis &amp; Beretika di Era Kecerdasan Buatan
            </h1>
            
            <p className="text-base sm:text-lg text-[#494455] max-w-xl leading-relaxed">
              Platform pembelajaran daring interaktif berbasis sekuensial pertama untuk siswa SMP. Menguasai etika pemanfaatan AI, verifikasi konten deepfake, dan prompt engineering yang bertanggung jawab secara saintifik.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7F54F8] text-white font-semibold text-sm shadow-md hover:bg-[#6636DE] hover:shadow-lg transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 group"
            >
              <span>Masuk Portal Belajar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#knowledge"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#061B38] font-semibold text-sm border border-[#CAC3D8]/60 shadow-sm hover:bg-[#F0F3FF] hover:border-[#7F54F8]/40 transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-[#7F54F8]" />
              <span>Jelajahi Warta &amp; Riset</span>
            </Link>
          </div>

          {/* Trust Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#CAC3D8]/30">
            <div className="flex flex-col p-3 rounded-xl bg-white border border-[#E7EEFF] shadow-subtle hover-lift">
              <span className="text-xl sm:text-2xl font-bold text-[#7F54F8]">1,200+</span>
              <span className="text-xs text-[#7A7486] font-medium">Siswa Terdaftar</span>
            </div>
            
            <div className="flex flex-col p-3 rounded-xl bg-white border border-[#E7EEFF] shadow-subtle hover-lift">
              <span className="text-xl sm:text-2xl font-bold text-[#00685F]">98.4%</span>
              <span className="text-xs text-[#7A7486] font-medium">Tingkat Lulus Bab</span>
            </div>
            
            <div className="flex flex-col p-3 rounded-xl bg-white border border-[#E7EEFF] shadow-subtle hover-lift">
              <span className="text-xl sm:text-2xl font-bold text-[#3A4BD4]">100%</span>
              <span className="text-xs text-[#7A7486] font-medium">Sertifikat QR Valid</span>
            </div>
            
            <div className="flex flex-col p-3 rounded-xl bg-white border border-[#E7EEFF] shadow-subtle hover-lift">
              <span className="text-xl sm:text-2xl font-bold text-[#061B38]">24 Lab</span>
              <span className="text-xs text-[#7A7486] font-medium">Mitra Sekolah SMP</span>
            </div>
          </div>
        </div>

        {/* Right Visual Feature Showcase: Player & Interactive Widget Preview */}
        <div className="lg:col-span-6 relative">
          {/* Ambient Glows */}
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#E8DEFF] blur-3xl opacity-60 -z-10 animate-pulse-subtle"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-[#DFE0FF] blur-3xl opacity-50 -z-10 animate-pulse-subtle"></div>

          {/* Main LMS Interactive Mockup Card */}
          <div className="w-full rounded-2xl bg-white p-5 sm:p-6 border border-[#CAC3D8]/50 shadow-raised flex flex-col gap-4 relative">
            {/* Window Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FF]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#BA1A1A]"></div>
                <div className="w-3 h-3 rounded-full bg-[#B45309]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00685F]"></div>
                <span className="ml-2 text-xs font-semibold text-[#7A7486] truncate">
                  Modul Interaktif: Etika Sintesis Media
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8DEFF] text-[#7F54F8] text-xs font-bold">
                Sekuensial Aktif
              </span>
            </div>

            {/* Video / Audio Simulation Canvas */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner flex items-center justify-center group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkjr5BE2IkpADPVivm_D_UXah280KDQNBpklO3YRiOyz5sIP4ZdSpim4rFXhmRQiUjJd07D0fHelLuGUbVxhC3XYVv0KWwkUMq9de5ZOWyQNpbhSUa_dqjNOBnUbJP52-KsDmaM5W68b7EDn73AZ0oeqyhduRT_jrg312-g2J7scyERd59noMgjnJvSwF9zYmkgh4DBKoVnfjUIlzXKAgI4oD-LkHTIWBVaGA116XsxCM0GKczqoIR"
                alt="Siswa SMP belajar etika AI dan sintesis media"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061B38]/90 via-[#061B38]/30 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#89F5E7]">
                      Bab 2 • Video Panduan
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      Menemukan Artefak Visual pada Konten Deepfake
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Jeda video" : "Putar video"}
                    className="w-11 h-11 rounded-full bg-[#7F54F8] hover:bg-[#6636DE] text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Lock Sequencer Strip */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F0F3FF] border border-[#E7EEFF]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#89F5E7] text-[#00201D] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#00685F]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#061B38]">
                    Kuis Bab 1 Tuntas (Nilai 90/100)
                  </span>
                  <span className="text-[11px] text-[#494455]">
                    Membuka Bab 2 • Batas Lulus Min. 75
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#00685F] text-white text-[11px] font-bold shadow-sm">
                Terbuka
              </span>
            </div>

            {/* Interactive Simulator Micro-Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#F9F9FF] border border-[#CAC3D8]/40 flex flex-col gap-1 hover:border-[#7F54F8]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#7A7486] font-medium">Uji Prompt Cepat</span>
                  <Sliders className="w-4 h-4 text-[#7F54F8]" />
                </div>
                <p className="text-xs font-bold text-[#061B38]">Cek Glitch Mata &amp; Bayangan</p>
                <div className="w-full bg-[#E7EEFF] rounded-full h-1.5 mt-1.5">
                  <div className="bg-[#7F54F8] h-1.5 rounded-full transition-colors transition-transform transition-shadow duration-300" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F9FF] border border-[#CAC3D8]/40 flex flex-col gap-1 opacity-85">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#7A7486] font-medium">Status Bab 3</span>
                  <Lock className="w-4 h-4 text-[#7A7486]" />
                </div>
                <p className="text-xs font-bold text-[#7A7486]">Plagiarisme &amp; Sitasi AI</p>
                <span className="text-[10px] text-[#7A7486] mt-1 font-medium">
                  Selesaikan Bab 2 Dahulu
                </span>
              </div>
            </div>
          </div>

          {/* Floating Badge Attachment */}
          <div className="absolute -bottom-5 -right-3 p-3.5 bg-white rounded-xl border border-[#E8DEFF] shadow-raised hidden md:flex items-center gap-3 animate-float">
            <div className="w-10 h-10 rounded-lg bg-[#E8DEFF] flex items-center justify-center text-[#7F54F8]">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#061B38] flex items-center gap-1">
                E-Sertifikat Terverifikasi
                <ShieldCheck className="w-3.5 h-3.5 text-[#00685F]" />
              </span>
              <span className="text-[11px] text-[#7A7486]">Terdaftar di Pangkalan UNAIR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
