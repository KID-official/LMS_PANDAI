'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Play, Pause, Tv2 } from 'lucide-react';
import { useChapterTimerStore } from '@/stores/useChapterTimerStore';

interface VideoPlayerContainerProps {
  chapterKey: string;
  youtubeUrl: string;
  title: string;
  minWatchSeconds: number;
  isAlreadyCompleted: boolean;
}

export function VideoPlayerContainer({
  chapterKey,
  youtubeUrl,
  title,
  minWatchSeconds,
  isAlreadyCompleted,
}: VideoPlayerContainerProps) {
  const {
    isPlaying,
    isCompleted,
    initChapter,
    startTimer,
    pauseTimer,
    tick,
  } = useChapterTimerStore();

  const [hasStarted, setHasStarted] = useState(false);

  // Initialize chapter store on mount or chapter change
  useEffect(() => {
    initChapter(chapterKey, minWatchSeconds, isAlreadyCompleted);
    setHasStarted(isAlreadyCompleted);
  }, [chapterKey, minWatchSeconds, isAlreadyCompleted, initChapter]);

  // Handle timer tick interval every 1000ms when video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, tick]);

  // Transform youtube embed url with autoplay parameters if playing
  const embedUrl = useMemo(() => {
    let base = youtubeUrl;
    if (base.includes('watch?v=')) {
      base = base.replace('watch?v=', 'embed/');
    }
    const separator = base.includes('?') ? '&' : '?';
    return hasStarted
      ? `${base}${separator}autoplay=1&enablejsapi=1&rel=0`
      : base;
  }, [youtubeUrl, hasStarted]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseTimer();
    } else {
      setHasStarted(true);
      startTimer();
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#061B38] shadow-lg group">
      {/* Video Content / Iframe */}
      {hasStarted ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        /* Video Poster / Thumbnail Before First Play */
        <div className="relative w-full h-full bg-[#061B38] flex items-center justify-center">
          {/* Subtle gradient pattern background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#061B38] via-[#1E314E] to-[#5010C8]/40" />

          {/* Center Play Button Overlay with Pulse Effect */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <button
              onClick={handleTogglePlay}
              aria-label="Mulai Putar Video"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7F54F8] hover:bg-[#6636DE] text-white flex items-center justify-center shadow-xl shadow-[#7F54F8]/40 hover:scale-105 active:scale-95 transition-all group/btn"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
            </button>
            <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
              Klik untuk Mulai Video &amp; Sequencer
            </span>
          </div>
        </div>
      )}

      {/* Floating Control Overlay Header */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BA1A1A] text-white font-semibold text-xs shadow-md">
          <Tv2 className="w-3.5 h-3.5" />
          <span>YouTube Edukasi</span>
        </span>
        <span className="px-2.5 py-1 rounded-md bg-black/70 text-white font-mono font-medium text-xs backdrop-blur-sm">
          Target: {minWatchSeconds}s
        </span>
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <button
          onClick={handleTogglePlay}
          className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md shadow-sm transition-colors"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#89F5E7] fill-[#89F5E7]" />
              <span>Jeda Timer</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#89F5E7] fill-[#89F5E7]" />
              <span>{hasStarted ? 'Lanjutkan Timer' : 'Mulai Video'}</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full bg-[#00685F] text-white text-[11px] font-bold shadow-sm">
              ✓ Syarat Selesai
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
