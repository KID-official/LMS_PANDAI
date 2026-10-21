'use client';

import React from 'react';
import { BarChart2, CheckCircle2 } from 'lucide-react';
import type { ScoreDistributionData } from '@/app/actions/guruDashboard';

interface QuizScoreDistributionWidgetProps {
  scoreDistribution: ScoreDistributionData;
}

export default function QuizScoreDistributionWidget({
  scoreDistribution,
}: QuizScoreDistributionWidgetProps) {
  const { tiers, totalStudentsWithQuiz, passingRate, averageScore, highestScore, lowestScore } =
    scoreDistribution;

  return (
    <div className="rounded-2xl border border-[#CAC3D8]/40 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
      {/* ── HEADER ── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#00685F]">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#061B38]">
                Distribusi Capaian Skor Kuis &amp; Kelulusan
              </h3>
              <p className="text-[12px] text-[#64748B]">
                Sebaran pencapaian passing grade (KKM 75) dari {totalStudentsWithQuiz} siswa peserta kuis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                Passing Rate
              </span>
              <span className="text-[20px] font-bold text-[#00685F] leading-none">
                {passingRate}%
              </span>
            </div>
          </div>
        </div>

        {/* ── STACKED MULTI-SEGMENT BAR ── */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-[#061B38]">Sebaran Proporsi Nilai</span>
            <span className="text-[#64748B]">
              Rata-rata: <strong className="text-[#061B38]">{averageScore}</strong> • Tertinggi: <strong className="text-[#00685F]">{highestScore}</strong> • Terendah: <strong className="text-[#BA1A1A]">{lowestScore}</strong>
            </span>
          </div>

          <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-[#F1F5F9] p-0.5 gap-0.5">
            {tiers.map((tier) => {
              if (tier.percentage === 0) return null;
              return (
                <div
                  key={tier.key}
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${tier.percentage}%`,
                    backgroundColor: tier.colorHex,
                  }}
                  title={`${tier.label}: ${tier.count} Siswa (${tier.percentage}%)`}
                />
              );
            })}
          </div>
        </div>

        {/* ── 3 TIERS DETAIL CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className="rounded-xl border border-[#F1F5F9] bg-[#F9F9FF]/80 p-3.5 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${tier.badgeBg} ${tier.badgeText}`}>
                    {tier.rangeText}
                  </span>
                  <h4 className="mt-2 text-[12px] font-bold text-[#061B38] line-clamp-1">
                    {tier.label}
                  </h4>
                </div>
                <div
                  className="h-3 w-3 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: tier.colorHex }}
                />
              </div>

              <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-[#E5E7EB]/50">
                <span className="text-[20px] font-bold text-[#061B38]">
                  {tier.count}{' '}
                  <span className="text-[11px] font-normal text-[#64748B]">Siswa</span>
                </span>
                <span className="text-[12px] font-bold text-[#64748B]">
                  {tier.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM INSIGHT PILL ── */}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F0FDF4] p-3 text-[12px] text-[#15803D] border border-[#DCFCE7]">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A]" />
        <span>
          <strong>Evaluasi Guru:</strong> Sebanyak <strong>{passingRate}%</strong> siswa telah mencapai batas KKM (&ge; 75). Teruskan pendampingan pada siswa di bawah ambang batas untuk percepatan pemahaman materi.
        </span>
      </div>
    </div>
  );
}
