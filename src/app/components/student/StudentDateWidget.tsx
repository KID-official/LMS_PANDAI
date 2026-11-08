'use client';

import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export const StudentDateWidget: React.FC = () => {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [dayName, setDayName] = useState<string>('');
  const [dayNumber, setDayNumber] = useState<string>('');
  const [monthName, setMonthName] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setDayName(now.toLocaleDateString('id-ID', { weekday: 'long' }));
    setDayNumber(now.toLocaleDateString('id-ID', { day: 'numeric' }));
    setMonthName(now.toLocaleDateString('id-ID', { month: 'short' }));
    setFormattedDate(
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  return (
    <div className="rounded-3xl bg-[#F1EDFF] border border-[#EAE8F2] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 h-full">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#7950F2] text-xs font-bold border border-[#EAE8F2] shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#7950F2]" />
          <span>Jadwal Belajar</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#059669] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAE8F2]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Sesi Aktif</span>
        </span>
      </div>

      {/* Center: Calendar Illustration & Date Info */}
      <div className="flex items-center gap-4 my-auto py-2">
        {/* Calendar 3D/Isometric Style Icon Card */}
        <div className="w-16 h-18 rounded-2xl bg-white border border-[#EAE8F2] shadow-xs flex flex-col overflow-hidden shrink-0 text-center">
          <div className="bg-[#7950F2] text-white text-[10px] font-bold py-1 uppercase tracking-wider">
            {monthName || 'OKT'}
          </div>
          <div className="flex-1 flex items-center justify-center text-2xl font-black text-[#172554] py-1">
            {dayNumber || '11'}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#7950F2] uppercase tracking-wider">
            {dayName || 'Hari Ini'}
          </span>
          <h4 className="text-base sm:text-lg font-extrabold text-[#172554] leading-tight">
            {formattedDate || '11 Oktober 2026'}
          </h4>
          <span className="text-[11px] text-[#7B8198] mt-0.5">
            Waktu belajar fleksibel &amp; mandiri
          </span>
        </div>
      </div>

      {/* Footer Schedule Status */}
      <div className="pt-3 border-t border-[#EAE8F2] flex items-center justify-between text-xs text-[#7B8198]">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#7950F2]" />
          <span>Target: 1 Bab Hari Ini</span>
        </span>
        <span className="font-bold text-[#7950F2]">Tersedia</span>
      </div>
    </div>
  );
};
