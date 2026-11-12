'use client';

import React, { useState } from 'react';
import { Brain, Lightbulb, ZoomIn, FileSearch } from 'lucide-react';
import { ClientQuestion } from '@/actions/quizActions';
import OptionRadioGroup from './OptionRadioGroup';
import { ImageLightboxModal } from '@/app/components/common/ImageLightboxModal';

export interface QuestionCardProps {
  question: ClientQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  onSelectOption: (key: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  disabled = false,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <article className="w-full bg-white rounded-2xl p-5 sm:p-7 shadow-xs border border-[#CAC3D8]/30 relative overflow-hidden">
      {/* Ambient Accent Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6636DE] via-[#7F54F8] to-[#9C7AFF]" />

      {/* Category Pill Tag & Point Weight */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFE8FF] text-[#6636DE] text-xs font-semibold">
          <Brain className="w-3.5 h-3.5 text-[#7F54F8]" />
          <span>Soal {questionNumber}/{totalQuestions} • {question.category || 'Evaluasi Pemahaman AI'}</span>
        </span>

        <span className="text-xs font-bold text-[#7A7486] bg-[#F0F3FF] px-2.5 py-1 rounded-full border border-[#CAC3D8]/20 shrink-0">
          Bobot: {question.points} Poin
        </span>
      </div>

      {/* Question Statement */}
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#061B38] leading-relaxed mb-4">
        {question.questionText}
      </h3>

      {/* Case Study Visual Media Container (if question has an image) with Click-to-Zoom */}
      {question.imageUrl && (
        <div className="rounded-2xl overflow-hidden bg-[#F8FAFC] mb-5 shadow-xs relative group border border-[#CAC3D8]/40 flex flex-col">
          {/* Top Info Bar */}
          <div className="px-3.5 py-2.5 bg-[#F0F3FF] border-b border-[#CAC3D8]/30 flex items-center justify-between text-[#061B38]">
            <div className="flex items-center gap-1.5 truncate pr-2">
              <FileSearch className="w-4 h-4 text-[#7F54F8] shrink-0" />
              <span className="text-xs font-bold truncate">
                {question.caseBadge || 'Studi Kasus Visual'}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] bg-[#E8DEFF] text-[#20005F] px-2 py-0.5 rounded-full font-mono font-bold">
                {question.caseResolution || '1080p HD'}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center gap-1 text-[11px] text-[#7F54F8] hover:text-[#6636DE] font-bold bg-white px-2 py-0.5 rounded-lg border border-[#CAC3D8]/30 transition-colors shadow-xs"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#7F54F8]" />
                <span>Perbesar</span>
              </button>
            </div>
          </div>

          {/* Media Viewport - Clickable with zoom indicator */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsLightboxOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
            aria-label="Klik untuk memperbesar gambar studi kasus"
            className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-[#0A1128]/5 flex items-center justify-center p-3 cursor-zoom-in group/img"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={question.imageUrl}
              alt={question.imageAlt || 'Kasus Studi Visual AI'}
              className="w-full h-full object-contain rounded-lg group-hover/img:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />

            {/* Floating Zoom Badge Affordance */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 text-[#061B38] text-xs font-bold shadow-md border border-[#CAC3D8]/40 flex items-center gap-1.5 backdrop-blur-md group-hover/img:bg-[#7F54F8] group-hover/img:text-white transition-colors duration-200 pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5 text-[#7F54F8] group-hover/img:text-white transition-colors" />
              <span>Ketuk untuk Zoom</span>
            </div>
          </div>
        </div>
      )}

      {/* Forensic / Prompt Insight Snippet (if question has insightTip) */}
      {question.insightTip && (
        <div className="bg-[#F0F3FF] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 mb-5 border border-[#CAC3D8]/30">
          <Lightbulb className="w-4 h-4 text-[#7F54F8] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-[13px] text-[#494455] leading-relaxed">
            <strong className="text-[#061B38] font-bold">Petunjuk Forensik: </strong>
            {question.insightTip}
          </p>
        </div>
      )}

      {/* Multiple Choice Radio Group Options */}
      <div className="pt-1">
        <OptionRadioGroup
          options={question.options}
          selectedOption={selectedOption}
          onSelectOption={onSelectOption}
          disabled={disabled}
        />
      </div>

      {/* Image Lightbox Modal for Quiz Question */}
      {question.imageUrl && (
        <ImageLightboxModal
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageUrl={question.imageUrl}
          imageAlt={question.imageAlt || 'Kasus Studi Visual AI'}
          title={`Soal ${questionNumber}: ${question.questionText}`}
          badge={question.caseBadge || 'Studi Kasus Visual'}
        />
      )}
    </article>
  );
};

export default QuestionCard;
