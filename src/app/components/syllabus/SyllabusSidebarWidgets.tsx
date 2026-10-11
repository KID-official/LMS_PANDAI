import React from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Course } from '@/data/curriculum';

interface SyllabusSidebarWidgetsProps {
  course: Course;
  completedCount: number;
  totalChapters: number;
}

export const SyllabusSidebarWidgets: React.FC<SyllabusSidebarWidgetsProps> = ({
  course,
  completedCount,
  totalChapters,
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Widget 1: Peta Capaian Kompetensi ── */}
      <div className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#CAC3D8]/30 pb-3">
          <span className="text-sm font-bold text-[#061B38]">
            Peta Capaian Kompetensi
          </span>
          <Sparkles className="w-4 h-4 text-[#7F54F8]" />
        </div>
        <p className="text-xs text-[#7A7486] leading-relaxed">
          Indikator capaian kurikulum literasi digital yang akan dikuasai setelah menyelesaikan kursus ini:
        </p>

        <ul className="flex flex-col gap-2.5 pt-1 text-xs">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00685F] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[#061B38] font-bold">
                Identifikasi Ciri Media Sintetis &amp; AI
              </span>
              <span className="text-[11px] text-[#7A7486]">
                Dikuasai pada modul awal
              </span>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7F54F8] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[#061B38] font-bold">
                Analisis Investigasi Visual &amp; Cek Fakta
              </span>
              <span className="text-[11px] text-[#7A7486]">
                Target materi lanjutan
              </span>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7A7486] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[#061B38]/80 font-bold">
                Etika Sitasi Prompt &amp; Integritas Akademik
              </span>
              <span className="text-[11px] text-[#7A7486]">
                Standar kurikulum nasional
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* ── Widget 2: Aturan Alur Sekuensial ── */}
      <div className="bg-gradient-to-br from-white to-[#F0F3FF] rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-[#CAC3D8]/30 pb-3">
          <Clock className="w-4 h-4 text-[#7F54F8]" />
          <span className="text-sm font-bold text-[#061B38]">
            Aturan Alur Sekuensial
          </span>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#E8DEFF] text-[#5010C8] font-bold text-[11px] flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <p className="font-bold text-[#061B38]">Tonton Video Lengkap</p>
              <p className="text-[11px] text-[#494455] mt-0.5 leading-snug">
                Durasi wajib diputar secara penuh sebelum tombol asesmen kuis dibuka.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#E8DEFF] text-[#5010C8] font-bold text-[11px] flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <p className="font-bold text-[#061B38]">Kuis Ambang Batas 75</p>
              <p className="text-[11px] text-[#494455] mt-0.5 leading-snug">
                Evaluasi pemahaman dengan nilai minimum kelulusan 75.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#E8DEFF] text-[#5010C8] font-bold text-[11px] flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <p className="font-bold text-[#061B38]">Buka Otomatis</p>
              <p className="text-[11px] text-[#494455] mt-0.5 leading-snug">
                Sistem seketika membuka bab berikutnya begitu kuis dinyatakan lulus.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Widget 3: Sertifikat Kelulusan UNAIR Preview ── */}
      <div className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#CAC3D8]/30 pb-3">
          <span className="text-sm font-bold text-[#061B38]">
            Sertifikat Kelulusan
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#F0F3FF] text-[#7A7486] text-[10px] font-bold uppercase">
            Preview
          </span>
        </div>

        <div className="bg-[#F0F3FF] rounded-xl p-4 flex flex-col items-center text-center gap-2 border border-[#CAC3D8]/30">
          <div className="w-10 h-10 rounded-full bg-[#7F54F8]/10 flex items-center justify-center text-[#7F54F8]">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#7A7486] uppercase tracking-wider">
            Sertifikat Resmi Digital
          </span>
          <span className="text-xs font-bold text-[#061B38]">
            {course.title}
          </span>
          <div className="pt-1 flex items-center gap-2 text-[10px] text-[#7A7486] font-medium">
            <span>UNAIR x AmosProduction</span>
            <span>•</span>
            <span className="text-[#00685F] font-bold">QR Terotentikasi</span>
          </div>
        </div>

        <p className="text-[11px] text-[#7A7486] leading-relaxed">
          E-Sertifikat resmi ber-barcode akan otomatis diterbitkan setelah seluruh {totalChapters} bab diselesaikan ({completedCount}/{totalChapters} bab tuntas).
        </p>
      </div>

      {/* ── Widget 4: Bantuan & Konsultasi ── */}
      <div className="bg-white rounded-2xl border border-[#CAC3D8]/40 shadow-subtle p-5 flex flex-col gap-3">
        <span className="text-sm font-bold text-[#061B38] border-b border-[#CAC3D8]/30 pb-3">
          Bantuan &amp; Konsultasi Lab
        </span>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#89F5E7]/30 text-[#00685F] flex items-center justify-center font-bold text-xs shrink-0">
            BP
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#061B38]">
              Bambang Prakoso, S.Pd.
            </span>
            <span className="text-[11px] text-[#7A7486]">
              Guru Pembimbing Lab Komputer
            </span>
          </div>
        </div>

        <div className="bg-[#F0F3FF] rounded-xl p-3 flex flex-col gap-1 text-[11px] text-[#494455] border border-[#CAC3D8]/30">
          <div className="flex items-center justify-between">
            <span>Jadwal Tanya Jawab:</span>
            <strong className="text-[#061B38]">Rabu &amp; Jumat</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Waktu:</span>
            <strong className="text-[#061B38]">14:00 - 15:30 WIB</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Lokasi:</span>
            <strong className="text-[#061B38]">Lab Multimedia 2</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
