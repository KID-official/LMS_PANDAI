'use client';

import React from 'react';
import { Brain, Lightbulb, ZoomIn, FileSearch } from 'lucide-react';
import { ClientQuestion } from '@/actions/quizActions';
import OptionRadioGroup from './OptionRadioGroup';

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

      {/* Case Study Visual Media Container (if question has an image) */}
      {question.imageUrl && (
        <div className="rounded-xl overflow-hidden bg-[#F0F3FF] mb-4 shadow-inner relative group border border-[#CAC3D8]/40">
          <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={question.imageUrl}
              alt={question.imageAlt || 'Kasus Studi Visual AI'}
              className="w-full h-full object-cover rounded-lg group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            {/* Gradient shadow overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061B38]/90 via-[#061B38]/20 to-transparent pointer-events-none" />

            {/* Top Right Zoom / Inspection Badge */}
            <div className="absolute top-2.5 right-2.5 bg-[#061B38]/70 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 text-white text-[11px] font-medium shadow-xs">
              <ZoomIn className="w-3 h-3 text-[#E8DEFF]" />
              <span>Resolusi Tinggi</span>
            </div>

            {/* Bottom Media Metadata Bar */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5 truncate pr-2">
                <FileSearch className="w-3.5 h-3.5 text-[#89F5E7] shrink-0" />
                <span className="text-xs font-semibold truncate">
                  {question.caseBadge || 'Kasus: Anomali Visual & Glare Mata'}
                </span>
              </div>
              <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white font-mono shrink-0">
                {question.caseResolution || '1080p'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Forensic / Prompt Insight Snippet (if question has insightTip) */}
      {question.insightTip && (
        <div className="bg-[#F0F3FF] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 mb-5 border border-[#CAC3D8]/30">
          <Lightbulb className="w-4 h-4 text-[#7F54F8] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-[13px] text-[#494455] leading-relaxed">
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
    </article>
  );
};

export default QuestionCard;
