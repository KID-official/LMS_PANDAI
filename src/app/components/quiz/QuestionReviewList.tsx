'use client';

import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Info,
} from 'lucide-react';
import { QuestionReviewDetail } from '@/actions/quizActions';

export interface QuestionReviewListProps {
  questions: QuestionReviewDetail[];
}

export const QuestionReviewList: React.FC<QuestionReviewListProps> = ({ questions }) => {
  // Store expanded question IDs. By default, auto-expand incorrect questions so student can learn immediately!
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    questions.forEach((q) => {
      // Auto-expand wrong questions, or expand all if only few questions
      if (!q.isCorrect || questions.length <= 3) {
        initial[q.questionId] = true;
      }
    });
    return initial;
  });

  const toggleExpand = (questionId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    questions.forEach((q) => {
      allExpanded[q.questionId] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const isAllExpanded = questions.every((q) => expandedIds[q.questionId]);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#CAC3D8]/30 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-1 border-b border-[#CAC3D8]/20">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-[#7F54F8]" />
          <h2 className="text-sm sm:text-base font-bold text-[#061B38]">
            Rincian Evaluasi Soal
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isAllExpanded ? collapseAll : expandAll}
            className="text-[11px] text-[#7F54F8] hover:text-[#6636DE] font-semibold underline underline-offset-2 hidden sm:block"
          >
            {isAllExpanded ? 'Tutup Semua' : 'Buka Semua'}
          </button>
          <span className="text-[11px] bg-[#F0F3FF] text-[#494455] font-semibold px-2.5 py-0.5 rounded-full border border-[#CAC3D8]/40">
            {questions.length} Butir Soal
          </span>
        </div>
      </div>

      {/* Question Items List */}
      <div className="space-y-3">
        {questions.map((q) => {
          const isExpanded = !!expandedIds[q.questionId];

          return (
            <div
              key={q.questionId}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                q.isCorrect
                  ? 'border-[#CAC3D8]/30 bg-white hover:border-[#7F54F8]/40'
                  : 'border-[#BA1A1A]/20 bg-[#FFDAD6]/15 hover:border-[#BA1A1A]/40'
              }`}
            >
              {/* Question Header Card (Clickable to toggle details) */}
              <button
                type="button"
                onClick={() => toggleExpand(q.questionId)}
                aria-expanded={isExpanded}
                className="w-full p-3 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-[#F9F9FF]/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {/* Question Number Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      q.isCorrect
                        ? 'bg-[#E8DEFF] text-[#7F54F8]'
                        : 'bg-[#FFDAD6] text-[#BA1A1A]'
                    }`}
                  >
                    {q.questionNumber}
                  </div>

                  {/* Question Summary / Category Title */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-[#7A7486] uppercase tracking-wider">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#061B38] truncate">
                      {q.questionText}
                    </p>
                  </div>
                </div>

                {/* Status Badge & Expand Icon */}
                <div className="flex items-center gap-2 shrink-0">
                  {q.isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D1FAE5] text-[#065F46] text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F]" />
                      <span>Benar (+{q.points})</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFDAD6] text-[#BA1A1A] text-xs font-bold">
                      <XCircle className="w-3.5 h-3.5 text-[#BA1A1A]" />
                      <span>Salah (0)</span>
                    </span>
                  )}

                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#7A7486]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#7A7486]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7A7486]" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Question Review Details */}
              {isExpanded && (
                <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 border-t border-[#CAC3D8]/20 space-y-3 bg-white/70">
                  {/* Full Question Text */}
                  <div className="pt-2">
                    <p className="text-xs sm:text-sm text-[#061B38] font-medium leading-relaxed">
                      {q.questionText}
                    </p>
                  </div>

                  {/* Case study badge or image if present */}
                  {q.caseBadge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F0F3FF] text-[#061B38] text-[11px] font-semibold border border-[#CAC3D8]/30">
                      <Info className="w-3 h-3 text-[#7F54F8]" />
                      <span>{q.caseBadge}</span>
                    </div>
                  )}

                  {/* Student Answer vs Correct Answer Box */}
                  <div
                    className={`rounded-xl p-3 text-xs sm:text-sm space-y-2 border ${
                      q.isCorrect
                        ? 'bg-[#F0F3FF]/60 border-[#CAC3D8]/30'
                        : 'bg-[#FFDAD6]/30 border-[#BA1A1A]/20'
                    }`}
                  >
                    {/* Jawaban Kamu */}
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#494455] shrink-0 min-w-[105px]">
                        Jawaban Kamu:
                      </span>
                      <span
                        className={`font-semibold ${
                          q.isCorrect ? 'text-[#00685F]' : 'text-[#BA1A1A]'
                        }`}
                      >
                        Opsi {q.studentAnswerKey}
                        {q.studentAnswerText && ` — ${q.studentAnswerText}`}
                      </span>
                    </div>

                    {/* Kunci Jawaban Benar (jika salah) */}
                    {!q.isCorrect && (
                      <div className="flex items-start gap-2 pt-1 border-t border-[#CAC3D8]/30">
                        <span className="font-bold text-[#00685F] shrink-0 min-w-[105px]">
                          Kunci Jawaban:
                        </span>
                        <span className="font-semibold text-[#00685F]">
                          Opsi {q.correctAnswerKey} — {q.correctAnswerText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Kotak Pembahasan Komprehensif (Explanation) */}
                  <div className="rounded-xl p-3.5 bg-[#F9F9FF] border border-[#CAC3D8]/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-[#6636DE]">
                      <Sparkles className="w-4 h-4 text-[#7F54F8]" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Pembahasan & Analisis Forensik
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
                      {q.explanation}
                    </p>

                    {/* Insight Tip if present */}
                    {q.insightTip && (
                      <div className="mt-2 pt-2 border-t border-[#CAC3D8]/30 flex items-start gap-2 text-xs text-[#00685F]">
                        <Lightbulb className="w-3.5 h-3.5 text-[#00685F] shrink-0 mt-0.5" />
                        <span className="italic">{q.insightTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionReviewList;
