'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  AnalyticsKPIs,
  StudentReportPaginationResult,
  exportStudentReportData,
} from '@/app/actions/progressReport';
import { AnalyticsKPICards } from '@/components/progress/AnalyticsKPICards';
import { ReportFilterBar } from '@/components/progress/ReportFilterBar';
import { StudentReportTable } from '@/components/progress/StudentReportTable';
import { QuizAuditDrawer } from '@/components/progress/QuizAuditDrawer';

interface Props {
  initialKpis: AnalyticsKPIs;
  initialReport: StudentReportPaginationResult;
  currentSearch: string;
  currentClassName: string;
  currentCertStatus: string;
  currentCourseKey: string;
}

export function ProgressDashboardClient({
  initialKpis,
  initialReport,
  currentSearch,
  currentClassName,
  currentCertStatus,
  currentCourseKey,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Drawer modal state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedQuizKey, setSelectedQuizKey] = useState<string | null>(null);

  // Export state
  const [isExporting, setIsExporting] = useState(false);

  // Helper to update URL search params smoothly
  const updateQuery = (paramsToUpdate: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === '' || value === 'ALL' || value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Search handler
  const handleSearchChange = (value: string) => {
    updateQuery({ search: value, page: 1 });
  };

  // Class filter handler
  const handleClassChange = (value: string) => {
    updateQuery({ className: value, page: 1 });
  };

  // Certificate status filter handler
  const handleCertStatusChange = (value: string) => {
    updateQuery({ certificateStatus: value, page: 1 });
  };

  // Course filter handler
  const handleCourseChange = (value: string) => {
    updateQuery({ courseKey: value, page: 1 });
  };

  // Page change handler
  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  // Refresh handler
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // Open Quiz Audit Drawer
  const handleOpenAudit = (userId: string, quizKey: string) => {
    setSelectedUserId(userId);
    setSelectedQuizKey(quizKey);
    setIsDrawerOpen(true);
  };

  // Export data to CSV handler
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportStudentReportData({
        search: currentSearch,
        className: currentClassName,
        certificateStatus: currentCertStatus as 'ALL' | 'ISSUED' | 'NOT_ELIGIBLE',
        courseKey: currentCourseKey,
      });

      const headers = [
        'NIS',
        'Nama Siswa',
        'Kelas',
        'Kursus',
        'Progress Bab',
        'Persentase Progress',
        'Skor Kuis',
        'Status Kuis',
        'Attempt',
        'Status Sertifikat',
        'Nomor Seri Sertifikat',
      ];

      const csvRows = data.map((d) => [
        `"${d.nis}"`,
        `"${d.fullName.replace(/"/g, '""')}"`,
        `"${d.className}"`,
        `"${d.courseName}"`,
        `"${d.completedChapters}"`,
        `"${d.progressPercentage}"`,
        `"${d.quizScore}"`,
        `"${d.quizStatus}"`,
        `"${d.attempt}"`,
        `"${d.certificateStatus}"`,
        `"${d.certificateSerialNumber}"`,
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Laporan_Progress_Kuis_${currentCourseKey}_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Gagal mengekspor laporan:', err);
      alert('Terjadi kesalahan saat mengekspor laporan.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── TOP FILTER & SEARCH BAR ── */}
      <ReportFilterBar
        search={currentSearch}
        className={currentClassName}
        certificateStatus={currentCertStatus}
        courseKey={currentCourseKey}
        availableClasses={initialReport.availableClasses}
        isExporting={isExporting}
        onSearchChange={handleSearchChange}
        onClassChange={handleClassChange}
        onCertStatusChange={handleCertStatusChange}
        onCourseChange={handleCourseChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* ── 4 KPI CARDS ── */}
      <AnalyticsKPICards kpis={initialKpis} isLoading={isPending} />

      {/* ── DATA TABLE ── */}
      <StudentReportTable
        data={initialReport.data}
        total={initialReport.total}
        page={initialReport.page}
        limit={initialReport.limit}
        totalPages={initialReport.totalPages}
        isLoading={isPending}
        onPageChange={handlePageChange}
        onAuditClick={handleOpenAudit}
      />

      {/* ── SLIDE-OVER QUIZ AUDIT DRAWER ── */}
      <QuizAuditDrawer
        isOpen={isDrawerOpen}
        userId={selectedUserId}
        quizKey={selectedQuizKey}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
