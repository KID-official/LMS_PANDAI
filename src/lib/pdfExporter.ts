'use client';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface ExportCertificateOptions {
  elementId?: string;
  element?: HTMLElement | null;
  studentName?: string;
  serialNumber?: string;
  courseTitle?: string;
}

/**
 * Exports the certificate DOM frame into a clean, crisp A4 Landscape PDF.
 * Captures ONLY the certificate frame without any surrounding webpage UI,
 * confetti particles, buttons, or navigation headers.
 */
export async function exportCertificateToPdf(
  options: ExportCertificateOptions = {}
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const {
    elementId = 'printable-certificate-frame',
    element,
    studentName = 'Siswa',
    serialNumber = 'CERTIFICATE',
  } = options;

  const targetElement = element || document.getElementById(elementId);
  if (!targetElement) {
    console.error(`Target certificate element not found: ${elementId}`);
    return false;
  }

  try {
    // 1. Temporarily remove box-shadow & border radius for crisp bleed-to-edge print
    const originalShadow = targetElement.style.boxShadow;
    targetElement.style.boxShadow = 'none';

    // 2. Render target element to high-res canvas (2.5x retina scaling)
    const canvas = await html2canvas(targetElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
    });

    // Restore styling
    targetElement.style.boxShadow = originalShadow;

    // 3. Initialize jsPDF in A4 Landscape (297mm x 210mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 297;
    const pdfHeight = 210;

    // Keep slight 4mm margin so the decorative frame border fits gracefully inside printable margins
    const margin = 4;
    const availableWidth = pdfWidth - margin * 2;
    const availableHeight = pdfHeight - margin * 2;

    const canvasRatio = canvas.width / canvas.height;
    const targetRatio = availableWidth / availableHeight;

    let renderWidth = availableWidth;
    let renderHeight = availableHeight;
    let offsetX = margin;
    let offsetY = margin;

    if (canvasRatio > targetRatio) {
      renderWidth = availableWidth;
      renderHeight = availableWidth / canvasRatio;
      offsetY = margin + (availableHeight - renderHeight) / 2;
    } else {
      renderHeight = availableHeight;
      renderWidth = availableHeight * canvasRatio;
      offsetX = margin + (availableWidth - renderWidth) / 2;
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    pdf.addImage(imgData, 'JPEG', offsetX, offsetY, renderWidth, renderHeight, undefined, 'FAST');

    // 4. Sanitize file name: Sertifikat-Kelulusan-[Nama]-[NoSeri].pdf
    const cleanName = studentName
      .trim()
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .replace(/\s+/g, '-');
    const cleanSerial = serialNumber.replace(/[^a-zA-Z0-9_\-]/g, '-');
    const fileName = `Sertifikat-Kelulusan-${cleanName || 'Siswa'}-${cleanSerial}.pdf`;

    // 5. Trigger direct auto-download in user's browser
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Failed to export certificate PDF:', error);
    return false;
  }
}
