'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { PUBLIC_ROUTES } from '@/app/components/navigation/routes';

export const StudentRecommendedCoursesWidget: React.FC = () => {
  const recommendations = [
    {
      key: 'course-beginner',
      title: 'Etika & Keamanan AI Siswa',
      category: 'Etika Digital & Regulasi',
      level: 'Pemula',
      estimatedHours: '2.5 Jam',
      instructor: 'Dr. Alwan Hakim, M.Kom.',
      badge: 'Sertifikasi SFA',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCPeiptoSn8t2O-_nMKe_zwFs5P812AbI7fF_3HvXBZDGP5_U1Bf2JHbLYIpFdNn3f62gxlUB5w_ELsFptGk1JSwz7SbwpqAh91iooO4JRaA2jAEhazNTXmhl4NXrXbTC-83VzWYHN_OSW38dF1LYXUre1BswWpwWI96i_vA4fd519vGMTCLlWXjgZTMN_YWchhceT0WDV3Q_jshOGxrNHmSw5XHJDjOYKHTInGy9HnEOv_RuJKViXE',
      description: 'Pelajari etika sitasi AI, kerahasiaan data sekolah, & batasan kecerdasan artifisial.',
      targetHref: '/student/courses/course-beginner/chapter/beginner-ch-1',
    },
    {
      key: 'course-intermediate',
      title: 'Forensik Digital & Deteksi Deepfake',
      category: 'Forensik Digital',
      level: 'Menengah',
      estimatedHours: '3.0 Jam',
      instructor: 'Tim Pengmas Vokasi UNAIR',
      badge: 'Standar C2PA 2026',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBLnjDd4mHNWqKZZMaa0IOrcrlFdJ7yTdSlqsXpgPuXU_tnVgf2h4C00cheN7nGcZFiAXWEXCPa182g4PmK3fmlgdXnX_GyAp5VlkTabDdAr9lbGyuYFQ2yo-6gP9hLwIE8Y9inNdUrNybrUmird1CCe59Gbnhe3u7l-bcVcbcZ-CKjUkt0pCBjFKKMFirocFnNE_uDlnWBluKrKHQ5fS-8c98AQ7Ty_aTXwW2kHCaI3u0UI6C9XRkG',
      description: 'Teknik analisis metadata foto/video, kloning suara, dan validasi keaslian konten.',
      targetHref: '/student/courses/course-intermediate/chapter/intermediate-ch-1',
    },
    {
      key: 'course-academic-integrity',
      title: 'Integritas Akademik & Cek Fakta SIFT',
      category: 'Integritas Akademik',
      level: 'Semua Tingkat',
      estimatedHours: '2.0 Jam',
      instructor: 'AmosProduction x UNAIR',
      badge: 'Metode Stanford Edu',
      thumbnail:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
      description: 'Metode 4 langkah SIFT (Stop, Investigate, Find, Trace) untuk verifikasi informasi.',
      targetHref: PUBLIC_ROUTES.COURSES,
    },
  ];

  return (
    <div className="rounded-3xl bg-white border border-[#CAC3D8]/40 shadow-subtle p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#CAC3D8]/30 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7F54F8]" />
            <h3 className="text-lg font-extrabold text-[#061B38]">Rekomendasi Course Pilihan</h3>
          </div>
          <p className="text-xs text-[#7A7486] font-medium">
            Tingkatkan keahlian literasi AI dan forensik digital kamu melalui modul rekomendasi kurikulum UNAIR 2026.
          </p>
        </div>

        <Link
          href={PUBLIC_ROUTES.COURSES}
          className="px-4 py-2 rounded-xl bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#7F54F8] text-xs font-bold flex items-center gap-2 transition-colors border border-[#7F54F8]/20 shrink-0"
        >
          <span>Lihat Katalog Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid 3 Recommended Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl bg-[#F9F9FF] border border-[#CAC3D8]/40 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col">
              {/* Thumbnail */}
              <div className="relative h-40 w-full overflow-hidden bg-[#DFE8FF]">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#7F54F8] text-white text-[10px] font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#89F5E7]" />
                    {item.estimatedHours}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#89F5E7]">
                    <ShieldCheck className="w-3 h-3" />
                    {item.level}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-sm font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#494455] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#7A7486] pt-2 border-t border-[#CAC3D8]/30 mt-1">
                  <span className="flex items-center gap-1 font-medium truncate">
                    <BookOpen className="w-3 h-3 text-[#7F54F8]" />
                    {item.instructor}
                  </span>
                  <span className="font-bold text-[#7F54F8] shrink-0">{item.badge}</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 pt-0">
              <Link
                href={item.targetHref}
                className="w-full py-2.5 px-3 rounded-xl bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Mulai Belajar Modul</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
