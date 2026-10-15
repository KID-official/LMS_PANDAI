'use client';

import React, { useEffect, useRef } from 'react';
import { Trophy, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export interface QuizResultHeaderProps {
  studentName: string;
  score: number;
  passingScore: number;
  isPassed: boolean;
  attemptNumber: number;
  quizTitle?: string;
}

export const QuizResultHeader: React.FC<QuizResultHeaderProps> = ({
  studentName,
  score,
  passingScore,
  isPassed,
  attemptNumber,
  quizTitle,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pure CSS/JS Confetti Effect when passed
  useEffect(() => {
    if (!isPassed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#7F54F8', '#6636DE', '#00685F', '#89F5E7', '#F59E0B', '#EF4444', '#EC4899'];
    const particleCount = 45;

    interface Particle {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * -height * 0.5,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 3,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const startTime = Date.now();
    const duration = 4000; // 4 seconds confetti

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity * (1 - elapsed / duration));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPassed]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-[#CAC3D8]/30 p-5 sm:p-7 text-center flex flex-col items-center">
      {/* Interactive Confetti Spark Canvas (Passes Through Mouse Events) */}
      {isPassed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* Ambient Festive Aura Glow */}
      <div
        className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isPassed ? 'bg-[#7F54F8]/15' : 'bg-[#F59E0B]/15'
        }`}
      />
      <div
        className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isPassed ? 'bg-[#89F5E7]/30' : 'bg-[#EF4444]/10'
        }`}
      />

      {/* Celebration Badge / Trophy Graphic */}
      <div className="relative mb-3.5 flex items-center justify-center">
        {/* Outer Circular Aura */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 hover:scale-105 ${
            isPassed ? 'bg-[#E8DEFF]' : 'bg-[#FEF3C7]'
          }`}
        >
          {/* Inner Accent Circle */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
              isPassed
                ? 'bg-[#7F54F8] text-white shadow-[#7F54F8]/30'
                : 'bg-[#D97706] text-white shadow-[#D97706]/30'
            }`}
          >
            {isPassed ? (
              <Trophy className="w-7 h-7 text-white fill-white/20 animate-in zoom-in-75 duration-300" />
            ) : (
              <RefreshCw className="w-7 h-7 text-white animate-spin-slow" />
            )}
          </div>
        </div>

        {/* Small Verification / Status Corner Badge */}
        <div
          className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-sm text-white ${
            isPassed ? 'bg-[#00685F]' : 'bg-[#D97706]'
          }`}
        >
          {isPassed ? (
            <CheckCircle2 className="w-4 h-4 fill-[#00685F] text-white" />
          ) : (
            <AlertCircle className="w-4 h-4 fill-[#D97706] text-white" />
          )}
        </div>

        {/* Decorative Animated Sparkle Dots (Delight) */}
        {isPassed && (
          <>
            <span className="absolute -top-1 left-1 w-2.5 h-2.5 rounded-full bg-[#7F54F8] animate-ping opacity-75 pointer-events-none" />
            <span className="absolute top-2 -right-2 w-2 h-2 rounded-full bg-[#00685F] animate-pulse pointer-events-none" />
            <span className="absolute bottom-1 -left-3 w-2 h-2 rounded-full bg-[#5566EE] pointer-events-none" />
          </>
        )}
      </div>

      {/* Quiz Title Eyebrow if provided */}
      {quizTitle && (
        <span className="text-[11px] font-semibold text-[#7A7486] uppercase tracking-wider mb-1">
          {quizTitle}
        </span>
      )}

      {/* Status Pill Badge */}
      <div className="mb-2.5">
        {isPassed ? (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#065F46] shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00685F] fill-[#00685F] text-white" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              LULUS EVALUASI • Percobaan ke-{attemptNumber}
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              PERLU REMEDIAL • Percobaan ke-{attemptNumber}
            </span>
          </div>
        )}
      </div>

      {/* Large Score Display */}
      <div className="flex items-baseline justify-center gap-1.5 my-1">
        <span
          className={`text-4xl sm:text-5xl font-black tracking-tight ${
            isPassed ? 'text-[#7F54F8]' : 'text-[#D97706]'
          }`}
        >
          {score}
        </span>
        <span className="text-xl sm:text-2xl font-semibold text-[#7A7486]">
          / 100
        </span>
      </div>

      {/* Benchmark Info Strip */}
      <div className="px-3.5 py-1.5 rounded-lg bg-[#F0F3FF] text-[#494455] text-center mb-3">
        <p className="text-xs">
          Ambang Batas Kelulusan:{' '}
          <span className="font-bold text-[#061B38]">{passingScore}</span>
          {' '}| Status:{' '}
          <span
            className={`font-bold ${
              isPassed ? 'text-[#00685F]' : 'text-[#D97706]'
            }`}
          >
            {isPassed ? 'Memenuhi Syarat' : 'Belum Memenuhi Syarat'}
          </span>
        </p>
      </div>

      {/* Personalized Compliment / Encouragement */}
      <p className="text-xs sm:text-sm text-[#494455] max-w-sm sm:max-w-md leading-relaxed mx-auto">
        {isPassed ? (
          <>
            Luar biasa, <strong className="text-[#061B38] font-bold">{studentName}</strong>! Kamu memahami indikator manipulasi konten AI secara kritis dan bertanggung jawab.
          </>
        ) : (
          <>
            Tetap semangat, <strong className="text-[#061B38] font-bold">{studentName}</strong>! Nilaimu belum mencapai ambang kelulusan ({passingScore}). Tinjau kembali materi bab dan pelajari pembahasan soal untuk mengulang kuis.
          </>
        )}
      </p>
    </div>
  );
};

export default QuizResultHeader;
