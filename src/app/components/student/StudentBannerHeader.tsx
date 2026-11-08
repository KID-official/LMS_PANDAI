'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { STUDENT_ROUTES } from '@/app/components/navigation/routes';

interface StudentBannerHeaderProps {
  studentProfile: {
    fullName: string;
    nis: string;
    className: string;
    semester: string;
  } | null;
}

export const StudentBannerHeader: React.FC<StudentBannerHeaderProps> = ({
  studentProfile,
}) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setFormattedDate(now.toLocaleDateString('id-ID', options));
  }, []);

  const displayName = studentProfile?.fullName || 'Siswa SFA Learn';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#F1EDFF] border border-[#EAE8F2] p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Column: Personalized Greeting, Message, and CTA */}
        <div className="flex flex-col items-start gap-4 max-w-xl text-left">
          {/* Live Date Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-[#7950F2] border border-[#EAE8F2] shadow-xs">
            <Calendar className="h-3.5 w-3.5 text-[#7950F2]" />
            <span>{formattedDate || '11 Oktober 2026'}</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#172554] leading-tight">
              Halo, <span className="text-[#7950F2]">{displayName}</span>! 👋
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#7B8198] leading-relaxed">
              Selamat datang kembali di SFA Learn. Jelajahi modul kecerdasan buatan, robotika cerdas, dan literasi teknologi kamu hari ini.
            </p>
          </div>

          {/* Purple CTA Button: Lihat Katalog Course */}
          <div className="pt-1">
            <Link
              href={STUDENT_ROUTES.MY_COURSES}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#7950F2] hover:bg-[#683fe4] text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Lihat Katalog Course</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Educational Illustration */}
        <div className="shrink-0 w-64 h-52 sm:w-72 sm:h-56 relative flex items-center justify-center">
          <svg
            viewBox="0 0 320 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md select-none"
          >
            <defs>
              <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7950F2" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
              <linearGradient id="bookCoverGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#7950F2" />
              </linearGradient>
              <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#312E81" />
              </linearGradient>
              <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="50%" stopColor="#7950F2" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
              <filter id="shadow3D" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#7950F2" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Base Shadow Platform */}
            <ellipse cx="160" cy="225" rx="110" ry="24" fill="#E4DCFA" opacity="0.8" />

            {/* 3D Stack of Books at Base */}
            {/* Bottom Book */}
            <g filter="url(#shadow3D)">
              {/* Spine & Pages */}
              <path d="M 60 190 L 190 220 L 260 195 L 130 168 Z" fill="#FFFFFF" />
              <path d="M 60 190 L 190 220 L 190 232 L 60 202 Z" fill="url(#bookCoverGrad)" />
              <path d="M 190 220 L 260 195 L 260 207 L 190 232 Z" fill="#4C1D95" />
              <path d="M 65 192 L 188 219 L 188 227 L 65 200 Z" fill="#F8FAFC" />
              <path d="M 188 219 L 255 196 L 255 204 L 188 227 Z" fill="#E2E8F0" />
            </g>

            {/* Middle Book (Angled) */}
            <g>
              <path d="M 70 170 L 180 198 L 245 174 L 135 148 Z" fill="#FFFFFF" />
              <path d="M 70 170 L 180 198 L 180 208 L 70 180 Z" fill="url(#bookCoverGrad2)" />
              <path d="M 180 198 L 245 174 L 245 184 L 180 208 Z" fill="#5B21B6" />
              <path d="M 75 172 L 178 197 L 178 204 L 75 178 Z" fill="#F8FAFC" />
              <path d="M 178 197 L 240 175 L 240 181 L 178 204 Z" fill="#E2E8F0" />
            </g>

            {/* Isometric 3D Laptop with AI Sparkle */}
            <g filter="url(#shadow3D)">
              {/* Laptop Screen Body */}
              <path d="M 105 75 L 215 75 L 215 150 L 105 150 Z" rx="10" fill="#1E293B" />
              {/* Laptop Display Inner */}
              <rect x="112" y="82" width="96" height="60" rx="6" fill="url(#laptopScreenGrad)" />
              {/* Laptop Display Content (Code / EdTech Graphic) */}
              <circle cx="160" cy="107" r="14" fill="#7950F2" opacity="0.6" />
              <path d="M 152 107 L 160 99 L 168 107 L 160 115 Z" fill="#A78BFA" />
              <rect x="122" y="126" width="36" height="4" rx="2" fill="#818CF8" opacity="0.8" />
              <rect x="162" y="126" width="28" height="4" rx="2" fill="#38BDF8" opacity="0.8" />
              <rect x="122" y="133" width="54" height="3" rx="1.5" fill="#C4B5FD" opacity="0.5" />
              {/* Laptop Keyboard Base (Isometric Perspective) */}
              <path d="M 90 150 L 230 150 L 250 176 L 70 176 Z" fill="#CBD5E1" />
              <path d="M 70 176 L 250 176 L 250 182 L 70 182 Z" fill="#94A3B8" />
              <rect x="135" y="166" width="50" height="7" rx="3.5" fill="#E2E8F0" />
            </g>

            {/* Floating 3D Graduation Cap (Toga) */}
            <g transform="translate(180, 25)">
              <polygon points="40,25 75,40 40,55 5,40" fill="#312E81" />
              <polygon points="40,20 78,36 40,52 2,36" fill="url(#bookCoverGrad)" />
              {/* Cap under cap */}
              <path d="M 24 45 Q 40 60 56 45 L 56 52 Q 40 67 24 52 Z" fill="#1E1B4B" />
              {/* Gold Tassel */}
              <circle cx="40" cy="36" r="3" fill="url(#goldGrad)" />
              <path d="M 40 36 Q 52 44 56 56" stroke="url(#goldGrad)" strokeWidth="2" fill="none" />
              <rect x="54" y="55" width="4" height="8" rx="2" fill="url(#goldGrad)" />
            </g>

            {/* Floating 3D AI Learning Badge / Star */}
            <g transform="translate(42, 60)" filter="url(#shadow3D)">
              <rect x="0" y="0" width="46" height="46" rx="14" fill="#FFFFFF" />
              <rect x="3" y="3" width="40" height="40" rx="11" fill="#F1EDFF" />
              <path
                d="M 23 12 L 25.5 19.5 L 33 22 L 25.5 24.5 L 23 32 L 20.5 24.5 L 13 22 L 20.5 19.5 Z"
                fill="url(#bookCoverGrad)"
              />
            </g>

            {/* Floating Mini Glowing Sparkles */}
            <g transform="translate(265, 110)">
              <circle cx="8" cy="8" r="8" fill="url(#orbGrad)" opacity="0.9" />
              <circle cx="8" cy="8" r="4" fill="#FFFFFF" opacity="0.6" />
            </g>
            <g transform="translate(68, 140)">
              <circle cx="5" cy="5" r="5" fill="#A78BFA" opacity="0.8" />
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
};
