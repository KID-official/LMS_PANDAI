'use client';

import React, { useState } from 'react';
import {
  TickerBar,
  KnowledgeHeader,
  LeadStorySection,
  PillarModulesSection,
  EditorialGridSection,
} from '@/app/components/knowledge';

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Berita');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#F9F9FF]">
      {/* Top Ticker Bar */}
      <TickerBar />

      {/* Header & Category Chips */}
      <KnowledgeHeader
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Featured Lead Story & Top Trends Magazine Grid */}
      <LeadStorySection />

      {/* 3 Pillar Curated Knowledge Modules */}
      <PillarModulesSection />

      {/* Main Editorial Grid & Sidebar Widgets */}
      <EditorialGridSection
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </div>
  );
}
