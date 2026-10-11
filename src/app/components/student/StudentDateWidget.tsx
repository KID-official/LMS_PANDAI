'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export const StudentDateWidget: React.FC = () => {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [dayName, setDayName] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setDayName(now.toLocaleDateString('id-ID', dayOptions));
    setFormattedDate(now.toLocaleDateString('id-ID', dateOptions));
  }, []);

  return (
    <div className="h-full min-h-[160px] rounded-3xl bg-gradient-to-br from-white to-[#F0F3FF] p-6 border border-[#CAC3D8]/40 shadow-subtle flex flex-col justify-between gap-3 relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
        <Calendar className="w-24 h-24 text-[#7F54F8]" />
      </div>

      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DEFF] text-[#5010C8] text-[11px] font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Waktu Pembelajaran</span>
        </div>
        <Sparkles className="w-4 h-4 text-[#7F54F8]" />
      </div>

      <div className="flex flex-col gap-1 z-10">
        <span className="text-xs font-bold text-[#7A7486] uppercase tracking-wider">
          {dayName || 'Hari Ini'}
        </span>
        <h3 className="text-lg font-extrabold text-[#061B38] leading-snug">
          {formattedDate || '11 Oktober 2026'}
        </h3>
      </div>

      <div className="pt-2 border-t border-[#CAC3D8]/30 flex items-center justify-between text-[11px] font-medium text-[#494455] z-10">
        <span>Sesi Belajar Siswa</span>
        <span className="font-bold text-[#7F54F8]">Aktif</span>
      </div>
    </div>
  );
};
