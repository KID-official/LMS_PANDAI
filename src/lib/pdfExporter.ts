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
 * Uses a dedicated off-screen landscape sandbox (1024px) to ensure all text,
 * student name, course title, and evaluation score render in exact desktop proportions
 * without responsive layout collapse, text truncation, or overlapping.
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

  // 1. Create a dedicated off-screen landscape sandbox (1024px width)
  const sandbox = document.createElement('div');
  sandbox.style.position = 'fixed';
  sandbox.style.left = '-99999px';
  sandbox.style.top = '0';
  sandbox.style.width = '1024px';
  sandbox.style.zIndex = '-9999';
  sandbox.style.backgroundColor = '#ffffff';

  const clone = targetElement.cloneNode(true) as HTMLElement;
  clone.id = 'cloned-certificate-for-export';
  clone.style.width = '1024px';
  clone.style.maxWidth = '1024px';
  clone.style.minWidth = '1024px';
  clone.style.boxShadow = 'none';
  clone.style.margin = '0 auto';

  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  // Wait 80ms for browser DOM layout & vector styles to settle
  await new Promise((resolve) => setTimeout(resolve, 80));

  try {
    // 2. Render high-res canvas at 2x scale (2048px width -> 300 DPI equivalent)
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 1024,
      windowWidth: 1200,
    });

    // Clean up sandbox from DOM
    sandbox.remove();

    // 3. Initialize jsPDF in A4 Landscape (297mm x 210mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 297;
    const pdfHeight = 210;
    const margin = 5; // 5mm margin for elegant frame framing

    const availableWidth = pdfWidth - margin * 2;
    const availableHeight = pdfHeight - margin * 2;

    const canvasRatio = canvas.width / canvas.height;
    const pageRatio = availableWidth / availableHeight;

    let renderWidth = availableWidth;
    let renderHeight = availableHeight;
    let offsetX = margin;
    let offsetY = margin;

    if (canvasRatio > pageRatio) {
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

    // 4. Sanitize file name
    const cleanName = studentName
      .trim()
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .replace(/\s+/g, '-');
    const cleanSerial = serialNumber.replace(/[^a-zA-Z0-9_\-]/g, '-');
    const fileName = `Sertifikat-Kelulusan-${cleanName || 'Siswa'}-${cleanSerial}.pdf`;

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Failed to export certificate PDF:', error);
    if (document.body.contains(sandbox)) {
      sandbox.remove();
    }
    return false;
  }
}
