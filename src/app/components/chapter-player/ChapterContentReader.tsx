'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lightbulb, ShieldCheck, ZoomIn } from 'lucide-react';
import { SummaryCard } from '@/data/curriculum';
import { ImageLightboxModal } from '@/app/components/common/ImageLightboxModal';

interface ChapterContentReaderProps {
  textContent: string;
  summaryCards?: SummaryCard[];
}

const DEFAULT_CARDS: SummaryCard[] = [
  {
    pointNumber: '01',
    title: 'Artefak Visual & Mikro-tekstur pada Wajah',
    description:
      'AI generatif kerap menghasilkan tekstur kulit yang terlampau mulus tanpa pori alami (efek lilin). Perhatikan lekukan telinga yang asimetris secara janggal atau jumlah dan sendi jari tangan yang tampak bengkok tak wajar.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8ddxgs-nB8s-5RxSATCSSLiDk6wZ8diFO4M-XgxQo2qylbD-QYXx7-ruobkI4W7mvY-FS9QcyrBL7t678EbVv1VibEQvzP_8Cp9dP-0WJDDvCG40c7t80Z90zlCOJMr1_6AcrOoF6YDXfS9o3fSoq5E331y6bLcQRmSYu3IPkrQ1E8anZHoLIv0cf-9vIvgozkb3g9HargJLNE7F_yUG8eSksf-_nq1TwJyy6VXhE0_sHKummDy5S',
    imageBadge: 'Mikro-tekstur Kulit Sintetis',
    imageAlt: 'Perbandingan Mikro-tekstur Kulit Sintetis dan Alami',
  },
  {
    pointNumber: '02',
    title: 'Analisis Pencahayaan & Pantulan Iris Mata',
    description:
      'Cahaya matahari atau lampu asli akan memantul seragam pada kedua bola mata (titik tangkap cahaya atau catchlight). Pada foto AI palsu, bentuk pantulan mata kiri dan kanan seringkali tidak cocok atau berlawanan arah bayangan.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG88CTfwKAaAoYq0azceO25hqsI-uI-bxJI1oMxWCUBzSBtmaC1NFINCcchRhgAO9Hv3gmy-NW94LoGxGBQmscGAASGufozBQ0mRoNj4KkwB6Zk4ppeROVOK49fads1lBH1LywVmshdC4t_kE__HIXKdhdXVj-vPGCOWdQ746F5dBe-fKE8XAc1EuhI7gp7KhqPFcwg2THflU3tEHjfsgPRFwO9_G7eesw5SaWqPdEksCp6pEitMcy',
    imageBadge: 'Inkonsistensi Catchlight',
    imageAlt: 'Inkonsistensi Catchlight Iris Mata',
  },
  {
    pointNumber: '03',
    title: 'Etika S.A.R.I: Sebelum Klik Bagikan',
    description:
      'Terapkan rumus S.A.R.I (Stop, Amati, Riset sumber asli, Ingatkan teman). Jangan tergesa-gesa memviralkan konten dramatis yang memicu emosi kemarahan atau kepanikan tanpa verifikasi Google Reverse Image atau tinjauan kredibel.',
    tip: 'Cek keaslian foto via Google Lens atau mesin pencari TinEye sebelum berkomentar dan menyebarkan ke grup sekolah.',
  },
];

export function ChapterContentReader({ textContent, summaryCards }: ChapterContentReaderProps) {
  const cardsToRender = summaryCards && summaryCards.length > 0 ? summaryCards : DEFAULT_CARDS;

  // State for active image lightbox modal
  const [modalImage, setModalImage] = useState<{
    imageUrl: string;
    imageAlt: string;
    title?: string;
    badge?: string;
  } | null>(null);

  const getBadgeStyle = (index: number) => {
    switch (index % 3) {
      case 0:
        return 'bg-[#F1EDFF] text-[#7950F2]';
      case 1:
        return 'bg-[#E0F2FE] text-[#0284C7]';
      default:
        return 'bg-[#EDE9FE] text-[#6D28D9]';
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-6 rounded-full bg-[#7950F2]" />
        <h2 className="text-lg sm:text-xl font-extrabold text-[#172554]">
          Rangkuman Materi Pokok
        </h2>
      </div>

      {/* Introductory Paragraph from chapter textContent */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#EAE8F2] shadow-xs">
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed whitespace-pre-line font-normal">
          {textContent}
        </p>
      </div>

      {/* Cards Poin Utama Rangkuman Bergambar */}
      <div className="flex flex-col gap-5">
        {cardsToRender.map((card, idx) => (
          <div
            key={card.pointNumber || idx}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE8F2] shadow-xs flex flex-col gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${getBadgeStyle(
                  idx
                )}`}
              >
                {card.pointNumber || `0${idx + 1}`}
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-[#172554] leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7B8198] mt-1.5 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Gambar Ilustrasi / Diagram Poin Bab dengan Fitur Click to Open & Zoom */}
            {card.imageUrl && (
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setModalImage({
                    imageUrl: card.imageUrl!,
                    imageAlt: card.imageAlt || card.title,
                    title: card.title,
                    badge: card.imageBadge,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalImage({
                      imageUrl: card.imageUrl!,
                      imageAlt: card.imageAlt || card.title,
                      title: card.title,
                      badge: card.imageBadge,
                    });
                  }
                }}
                aria-label={`Buka dan perbesar diagram ${card.title}`}
                className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden relative bg-[#F8FAFC] border border-[#EAE8F2] flex items-center justify-center p-2 cursor-zoom-in group hover:border-[#7950F2]/50 hover:shadow-md transition-all duration-300"
              >
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt || card.title}
                  fill
                  unoptimized
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Badge Category (Pojok Kiri Bawah) */}
                {card.imageBadge && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#172554]/85 text-white font-bold text-[11px] backdrop-blur-md shadow-xs pointer-events-none">
                    {card.imageBadge}
                  </span>
                )}

                {/* Floating Click-to-Zoom Indicator Button (Pojok Kanan Bawah) */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 text-[#172554] text-xs font-bold shadow-md border border-[#EAE8F2] flex items-center gap-1.5 backdrop-blur-md group-hover:bg-[#7950F2] group-hover:text-white transition-colors duration-200 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-[#7950F2] group-hover:text-white transition-colors" />
                  <span>Ketuk untuk Zoom</span>
                </div>

                {/* Subtle Hover Hint Overlay */}
                <div className="absolute inset-0 bg-[#7950F2]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            )}

            {/* Kiat / Tips Praktis Terkait Poin Bab */}
            {card.tip && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F1EDFF] border border-[#EAE8F2] text-[#172554]">
                <ShieldCheck className="w-5 h-5 text-[#7950F2] shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-snug text-[#475569]">
                  {card.tip}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Student Tip Box "Kiat Juara Literasi" */}
      <div className="p-5 rounded-3xl bg-[#F1EDFF] border border-[#EAE8F2] flex items-center gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#7950F2] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#7950F2]/30">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-extrabold text-sm sm:text-base text-[#172554]">
            Kiat Juara Literasi
          </span>
          <span className="text-xs sm:text-sm text-[#7B8198] leading-relaxed mt-0.5">
            Pahami materi dan diagram visual di atas dengan saksama. Nilai evaluasi kuis minimal 75 untuk membuka lencana bab dan melanjutkan ke materi berikutnya!
          </span>
        </div>
      </div>

      {/* Reusable Interactive Image Lightbox & Zoom Modal */}
      {modalImage && (
        <ImageLightboxModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          imageUrl={modalImage.imageUrl}
          imageAlt={modalImage.imageAlt}
          title={modalImage.title}
          badge={modalImage.badge}
        />
      )}
    </div>
  );
}
