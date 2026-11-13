'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Move, Sparkles } from 'lucide-react';

export interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  title?: string;
  badge?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  title,
  badge,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialTouchDistRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);
  const lastTapRef = useRef<number>(0);

  // Reset zoom & position whenever modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      // Lock background scrolling
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, imageUrl]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(prev + 0.5, 4);
      return Number(next.toFixed(1));
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return Number(next.toFixed(1));
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Keyboard controls (Esc to close, + to zoom in, - to zoom out, 0 to reset)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleReset]);

  // Double click / Double tap handler (toggle 1x <-> 2x)
  const handleDoubleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (scale > 1) {
        handleReset();
      } else {
        setScale(2);
      }
    },
    [scale, handleReset]
  );

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile (Drag & Pinch-to-Zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Check for double tap
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        handleDoubleTap(e);
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      if (scale > 1) {
        setIsDragging(true);
        dragStartRef.current = {
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        };
      }
    } else if (e.touches.length === 2) {
      // Pinch to zoom start
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      initialTouchDistRef.current = dist;
      initialScaleRef.current = scale;
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      const newX = e.touches[0].clientX - dragStartRef.current.x;
      const newY = e.touches[0].clientY - dragStartRef.current.y;
      setPosition({ x: newX, y: newY });
    } else if (e.touches.length === 2 && initialTouchDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const ratio = currentDist / initialTouchDistRef.current;
      const newScale = Math.min(Math.max(initialScaleRef.current * ratio, 1), 4);
      setScale(Number(newScale.toFixed(2)));
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialTouchDistRef.current = null;
    if (scale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || imageAlt || 'Tampilan Gambar Detail'}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 backdrop-blur-md select-none animate-fade-in"
      onClick={() => {
        // Close on empty backdrop click if not zoomed
        if (scale === 1) onClose();
      }}
      onMouseUp={handleMouseUp}
    >
      {/* Top Header Bar */}
      <header
        className="w-full flex items-center justify-between px-4 sm:px-6 py-3.5 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 max-w-[75%] truncate">
          {badge && (
            <span className="px-2.5 py-1 rounded-lg bg-[#7950F2] text-white text-[11px] font-bold shadow-xs shrink-0">
              {badge}
            </span>
          )}
          <span className="text-white/90 text-xs sm:text-sm font-semibold truncate">
            {title || imageAlt}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Tampilan Gambar"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-md active:scale-95 shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Interactive Viewport */}
      <div
        className="flex-1 w-full flex items-center justify-center overflow-hidden relative touch-none cursor-default"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleTap}
      >
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          className="max-w-[95vw] max-h-[80vh] flex items-center justify-center will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            draggable={false}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl pointer-events-auto"
          />
        </div>

        {/* Helper Hint Badge on first zoom */}
        {scale > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[11px] font-medium border border-white/10 flex items-center gap-1.5 pointer-events-none animate-fade-in">
            <Move className="w-3 h-3 text-[#A78BFA]" />
            <span>Geser gambar untuk melihat detail</span>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Dock */}
      <footer
        className="w-full pb-6 pt-2 px-4 flex flex-col items-center gap-2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-xl text-white">
          {/* Zoom Out Button */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 1}
            aria-label="Perkecil Gambar (Zoom Out)"
            className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Zoom Percentage */}
          <span className="min-w-[48px] text-center text-xs font-mono font-bold text-white px-1">
            {Math.round(scale * 100)}%
          </span>

          {/* Zoom In Button */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 4}
            aria-label="Perbesar Gambar (Zoom In)"
            className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Separator */}
          <div className="h-4 w-px bg-white/20 mx-0.5" />

          {/* Reset Zoom Button */}
          <button
            type="button"
            onClick={handleReset}
            disabled={scale === 1 && position.x === 0 && position.y === 0}
            aria-label="Kembalikan Ukuran Asli (Reset)"
            className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
            title="Reset Ukuran"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Small Touch Gesture Helper for Mobile */}
        <p className="text-[11px] text-white/60 text-center font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#A78BFA]" />
          <span>Ketuk 2x atau gunakan 2 jari untuk zoom cepat</span>
        </p>
      </footer>
    </div>
  );
};

export default ImageLightboxModal;
