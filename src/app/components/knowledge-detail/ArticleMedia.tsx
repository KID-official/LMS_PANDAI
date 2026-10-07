'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Info } from 'lucide-react';
import { ArticleData } from '@/data/articles';

interface ArticleMediaProps {
  article: ArticleData;
}

export const ArticleMedia: React.FC<ArticleMediaProps> = ({ article }) => {
  return (
    <figure className="w-full px-4 sm:px-6 lg:px-8 my-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#DFE8FF] aspect-[16/9] max-h-[520px] shadow-subtle border border-[#CAC3D8]/30">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />

          {/* C2PA Manifest Overlay Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#061B38] text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#7F54F8]" />
            <span>Manifest Otentik C2PA Tersemat {article.c2paId}</span>
          </div>

          {/* EXIF Metadata Badge */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-[#1E314E]/80 backdrop-blur-md text-[#ECF0FF] text-xs font-mono">
            {article.imageExif}
          </div>
        </div>

        {/* Figcaption */}
        <figcaption className="flex items-start gap-2 text-[#7A7486] text-xs px-1">
          <Info className="w-4 h-4 text-[#7F54F8] shrink-0 mt-0.5" />
          <span>{article.imageCaption}</span>
        </figcaption>
      </div>
    </figure>
  );
};
