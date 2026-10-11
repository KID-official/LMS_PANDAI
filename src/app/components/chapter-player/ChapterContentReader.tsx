import React from 'react';
import Image from 'next/image';
import { Lightbulb, ShieldCheck } from 'lucide-react';

interface ChapterContentReaderProps {
  textContent: string;
}

export function ChapterContentReader({ textContent }: ChapterContentReaderProps) {
  return (
    <div className="flex flex-col gap-5 mt-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-6 rounded-full bg-[#7F54F8]" />
        <h2 className="text-lg sm:text-xl font-bold text-[#061B38]">
          Rangkuman Materi Pokok
        </h2>
      </div>

      {/* Introductory Paragraph from chapter textContent */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm">
        <p className="text-sm sm:text-base text-[#494455] leading-relaxed">
          {textContent}
        </p>
      </div>

      {/* Cards 3 Poin Utama Rangkuman */}
      <div className="flex flex-col gap-4">
        {/* Poin 01 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E8DEFF] text-[#20005F] font-extrabold text-sm flex items-center justify-center shrink-0">
              01
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#061B38]">
                Artefak Visual &amp; Mikro-tekstur pada Wajah
              </h3>
              <p className="text-xs sm:text-sm text-[#494455] mt-1 leading-relaxed">
                AI generatif kerap menghasilkan tekstur kulit yang terlampau mulus tanpa pori alami (efek lilin). Perhatikan lekukan telinga yang asimetris secara janggal atau jumlah dan sendi jari tangan yang tampak bengkok tak wajar.
              </p>
            </div>
          </div>

          <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden relative bg-[#E7EEFF]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8ddxgs-nB8s-5RxSATCSSLiDk6wZ8diFO4M-XgxQo2qylbD-QYXx7-ruobkI4W7mvY-FS9QcyrBL7t678EbVv1VibEQvzP_8Cp9dP-0WJDDvCG40c7t80Z90zlCOJMr1_6AcrOoF6YDXfS9o3fSoq5E331y6bLcQRmSYu3IPkrQ1E8anZHoLIv0cf-9vIvgozkb3g9HargJLNE7F_yUG8eSksf-_nq1TwJyy6VXhE0_sHKummDy5S"
              alt="Perbandingan Mikro-tekstur Kulit Sintetis dan Alami"
              fill
              unoptimized
              className="object-cover"
            />
            <span className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-lg bg-black/70 text-white font-semibold text-[11px] backdrop-blur-md">
              Mikro-tekstur Kulit Sintetis
            </span>
          </div>
        </div>

        {/* Poin 02 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#89F5E7] text-[#00201D] font-extrabold text-sm flex items-center justify-center shrink-0">
              02
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#061B38]">
                Analisis Pencahayaan &amp; Pantulan Iris Mata
              </h3>
              <p className="text-xs sm:text-sm text-[#494455] mt-1 leading-relaxed">
                Cahaya matahari atau lampu asli akan memantul seragam pada kedua bola mata (titik tangkap cahaya atau <em>catchlight</em>). Pada foto AI palsu, bentuk pantulan mata kiri dan kanan seringkali tidak cocok atau berlawanan arah bayangan.
              </p>
            </div>
          </div>

          <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden relative bg-[#E7EEFF]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG88CTfwKAaAoYq0azceO25hqsI-uI-bxJI1oMxWCUBzSBtmaC1NFINCcchRhgAO9Hv3gmy-NW94LoGxGBQmscGAASGufozBQ0mRoNj4KkwB6Zk4ppeROVOK49fads1lBH1LywVmshdC4t_kE__HIXKdhdXVj-vPGCOWdQ746F5dBe-fKE8XAc1EuhI7gp7KhqPFcwg2THflU3tEHjfsgPRFwO9_G7eesw5SaWqPdEksCp6pEitMcy"
              alt="Inkonsistensi Catchlight Iris Mata"
              fill
              unoptimized
              className="object-cover"
            />
            <span className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-lg bg-black/70 text-white font-semibold text-[11px] backdrop-blur-md">
              Inkonsistensi Catchlight
            </span>
          </div>
        </div>

        {/* Poin 03 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-sm flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#DFE0FF] text-[#000A63] font-extrabold text-sm flex items-center justify-center shrink-0">
              03
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#061B38]">
                Etika S.A.R.I: Sebelum Klik Bagikan
              </h3>
              <p className="text-xs sm:text-sm text-[#494455] mt-1 leading-relaxed">
                Terapkan rumus <strong>S.A.R.I</strong> (<strong>S</strong>top, <strong>A</strong>mati, <strong>R</strong>iset sumber asli, <strong>I</strong>ngatkan teman). Jangan tergesa-gesa memviralkan konten dramatis yang memicu emosi kemarahan atau kepanikan tanpa verifikasi Google Reverse Image atau tinjauan kredibel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F0F3FF] border border-[#CAC3D8]/30 text-[#061B38]">
            <ShieldCheck className="w-5 h-5 text-[#7F54F8] shrink-0" />
            <span className="text-xs font-medium leading-snug">
              Cek keaslian foto via Google Lens atau mesin pencari TinEye sebelum berkomentar dan menyebarkan ke grup sekolah.
            </span>
          </div>
        </div>
      </div>

      {/* Student Tip Box "Kiat Juara Literasi" */}
      <div className="p-4 rounded-2xl bg-[#E7EEFF]/70 border border-[#CAC3D8]/40 flex items-center gap-3.5 shadow-sm">
        <div className="w-11 h-11 rounded-full bg-[#7F54F8] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#7F54F8]/25">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-xs sm:text-sm text-[#061B38]">
            Kiat Juara Literasi
          </span>
          <span className="text-xs text-[#494455] leading-relaxed">
            Pahami konsepnya dengan teliti. Nilai evaluasi kuis minimal 75 untuk membuka lencana bab dan melanjutkan ke materi berikutnya!
          </span>
        </div>
      </div>
    </div>
  );
}
