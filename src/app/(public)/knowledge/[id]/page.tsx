'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { getArticleById } from '@/data/articles';
import {
  ReadingProgressBar,
  ArticleBreadcrumbs,
  ArticleHeader,
  ArticleMedia,
  ArticleContent,
  ArticleSidebar,
} from '@/app/components/knowledge-detail';

export default function KnowledgeDetailPage() {
  const params = useParams();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const articleId = typeof rawId === 'string' ? rawId : 'lead';

  const article = getArticleById(articleId);

  // Font size adjustment state: -1 (small), 0 (normal), 1 (large)
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);

  const handleFontUp = () => {
    setFontSizeLevel((prev) => Math.min(1, prev + 1));
  };

  const handleFontDown = () => {
    setFontSizeLevel((prev) => Math.max(-1, prev - 1));
  };

  const fontSizeClass =
    fontSizeLevel === 1
      ? 'text-base sm:text-lg'
      : fontSizeLevel === -1
      ? 'text-xs sm:text-sm'
      : 'text-sm sm:text-base';

  return (
    <div className="flex flex-col w-full bg-[#F9F9FF] min-h-screen">
      {/* Top Reading Indicator Progress Bar (Sticky Desktop & Mobile) */}
      <ReadingProgressBar />

      {/* Breadcrumbs & Utility Banner */}
      <ArticleBreadcrumbs article={article} />

      {/* Article Hero Header */}
      <ArticleHeader
        article={article}
        fontSizeLevel={fontSizeLevel}
        onFontUp={handleFontUp}
        onFontDown={handleFontDown}
      />

      {/* Featured Media */}
      <ArticleMedia article={article} />

      {/* Main Content Layout (Grid 2 Kolom dengan Desktop Gap Presisi) */}
      <div className="w-full px-4 sm:px-6 lg:px-12 my-6 lg:my-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Primary Editorial Column (8 cols) */}
          <ArticleContent article={article} fontSizeClass={fontSizeClass} />

          {/* Sticky Sidebar Column (4 cols) */}
          <ArticleSidebar />
        </div>
      </div>
    </div>
  );
}
