import React from 'react';
import {
  NotificationPill,
  HeroSection,
  PillarsSection,
  SyllabusPreviewSection,
  KnowledgeSection,
  CtaBannerSection,
} from '@/app/components/landing';

export default function PublicHomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <NotificationPill />
      <HeroSection />
      <PillarsSection />
      <SyllabusPreviewSection />
      <KnowledgeSection />
      <CtaBannerSection />
    </div>
  );
}
