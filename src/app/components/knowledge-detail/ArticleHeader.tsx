'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Share2,
  Bookmark,
  Printer,
  Copy,
  MessageCircle,
  Check,
} from 'lucide-react';
import { ArticleData } from '@/data/articles';

interface ArticleHeaderProps {
  article: ArticleData;
  fontSizeLevel: number;
  onFontUp: () => void;
  onFontDown: () => void;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  fontSizeLevel,
  onFontUp,
  onFontDown,
}) => {
  const [showShareBox, setShowShareBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl flex flex-col gap-4">

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#E8DEFF] text-[#5010C8] text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#DFE0FF] text-[#1E31BF] text-xs font-bold">
              {article.badgeTag}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#DFE8FF] text-[#494455] text-xs font-bold">
              Kurikulum Nasional
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061B38] leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Lead Paragraph */}
          <p className="text-sm sm:text-base text-[#494455] leading-relaxed font-normal">
            {article.excerpt}
          </p>

          {/* Metadata & Author Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#CAC3D8]/30">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#7F54F8] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {article.authorAvatar}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-[#061B38]">
                    {article.author}
                  </span>
                  <span title="Terverifikasi">
                    <CheckCircle2 className="w-4 h-4 text-[#7F54F8]" />
                  </span>
                </div>
                <span className="text-xs text-[#7A7486]">
                  {article.date} • {article.updateTime} • {article.readTime} •{' '}
                  <span className="text-[#3A4BD4] font-semibold">{article.views}</span>
                </span>
              </div>
            </div>

            {/* Utility Bar */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F0F3FF] shadow-subtle border border-[#CAC3D8]/30">
              {/* Share Toggle */}
              <button
                type="button"
                onClick={() => setShowShareBox(!showShareBox)}
                className="h-8 px-2.5 rounded-lg hover:bg-white text-[#494455] hover:text-[#7F54F8] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Bagikan Artikel"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Bagikan</span>
              </button>

              <div className="h-4 w-px bg-[#CAC3D8]/50" />

              {/* Font Controls */}
              <button
                type="button"
                onClick={onFontDown}
                className={`w-8 h-8 rounded-lg hover:bg-white text-xs font-bold ${
                  fontSizeLevel === -1 ? 'text-[#7F54F8]' : 'text-[#494455]'
                }`}
                title="Perkecil Font"
              >
                A-
              </button>
              <button
                type="button"
                onClick={onFontUp}
                className={`w-8 h-8 rounded-lg hover:bg-white text-xs font-bold ${
                  fontSizeLevel === 1 ? 'text-[#7F54F8]' : 'text-[#494455]'
                }`}
                title="Perbesar Font"
              >
                A+
              </button>

              <div className="h-4 w-px bg-[#CAC3D8]/50" />

              {/* Bookmark */}
              <button
                type="button"
                onClick={() => setBookmarked(!bookmarked)}
                className={`w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors ${
                  bookmarked ? 'text-[#7F54F8]' : 'text-[#494455]'
                }`}
                title="Simpan Artikel"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#7F54F8]' : ''}`} />
              </button>

              {/* Print */}
              <button
                type="button"
                onClick={() => typeof window !== 'undefined' && window.print()}
                className="w-8 h-8 rounded-lg hover:bg-white text-[#494455] hover:text-[#061B38] flex items-center justify-center transition-colors"
                title="Cetak Artikel"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Share Box Toast Dropdown */}
          {showShareBox && (
            <div className="p-3 bg-white rounded-xl shadow-md border border-[#CAC3D8]/40 flex items-center gap-2 flex-wrap animate-scale-in">
              <span className="text-xs text-[#7A7486] font-medium">Bagikan via:</span>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)}`,
                    '_blank'
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00685F]" /> WhatsApp
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`,
                    '_blank'
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#3A4BD4]" /> Twitter / X
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-[#E8DEFF] hover:bg-[#7F54F8] text-[#5010C8] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
