'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  termsText: string;
}

export default function TermsActionsClient({ termsText }: Props) {
  const router = useRouter();

  const downloadPdf = useCallback(async () => {
    try {
      // dynamic import to avoid bundler errors
      const jsPDFModule = await import('jspdf').catch(() => null);
      const jsPDF = jsPDFModule ? (jsPDFModule.default ?? jsPDFModule.jsPDF) : null;

      if (!jsPDF) {
        // fallback to text file if jsPDF is not available
        const blob = new Blob([termsText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'investnest-termos.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = (doc.internal.pageSize?.getWidth && doc.internal.pageSize.getWidth()) || (doc.internal.pageSize?.width ?? 595);
      const pageHeight = (doc.internal.pageSize?.getHeight && doc.internal.pageSize.getHeight()) || (doc.internal.pageSize?.height ?? 842);
      const margin = 40;
      let cursorY = margin + 10;

      // Try to load logo SVG from public and render to canvas to get PNG data URL
      try {
        const logoResp = await fetch('/INVESTNEST - LOGO.svg');
        if (logoResp.ok) {
          const svgText = await logoResp.text();
          const blob = new Blob([svgText], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const img = new Image();
          img.crossOrigin = 'anonymous';
          const imgLoad = new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
          });
          img.src = url;
          await imgLoad;

          // Draw to canvas to convert to PNG
          const canvas = document.createElement('canvas');
          const maxLogoW = 120;
          const scale = Math.min(maxLogoW / img.width, 1);
          canvas.width = img.width * scale || maxLogoW;
          canvas.height = img.height * scale || (canvas.width * 0.3);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // optional white bg
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', margin, cursorY, canvas.width, canvas.height);
            cursorY += canvas.height + 10;
          }
          URL.revokeObjectURL(url);
        }
      } catch (e) {
        // ignore logo errors
      }

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('TERMO DE USO PLATAFORMA INVESTNEST', pageWidth / 2, cursorY, { align: 'center' });
      cursorY += 20;

      // Prepare sections: split by double newlines
      const sections = termsText.split(/\n\s*\n/);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const lineHeight = 14;

      for (let s = 0; s < sections.length; s++) {
        const sec = sections[s].trim();
        if (!sec) continue;

        // Detect heading: starts with number or ALL CAPS short line
        const firstLine = sec.split('\n')[0].trim();
        const isHeading = /^\d+\.?\s/.test(firstLine) || (firstLine.length <= 60 && firstLine === firstLine.toUpperCase());

        if (isHeading) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          const headingLines = doc.splitTextToSize(firstLine, pageWidth - margin * 2);
          for (const hl of headingLines) {
            if (cursorY + lineHeight > pageHeight - margin) { doc.addPage(); cursorY = margin; }
            doc.text(hl, margin, cursorY);
            cursorY += lineHeight;
          }
          // remaining paragraph (without the heading line)
          const rest = sec.split('\n').slice(1).join('\n').trim();
          if (rest) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            const lines = doc.splitTextToSize(rest, pageWidth - margin * 2);
            for (const line of lines) {
              if (cursorY + lineHeight > pageHeight - margin) { doc.addPage(); cursorY = margin; }
              doc.text(line, margin, cursorY);
              cursorY += lineHeight;
            }
          }
        } else {
          // regular paragraph
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          const lines = doc.splitTextToSize(sec, pageWidth - margin * 2);
          for (const line of lines) {
            if (cursorY + lineHeight > pageHeight - margin) { doc.addPage(); cursorY = margin; }
            doc.text(line, margin, cursorY);
            cursorY += lineHeight;
          }
        }

        cursorY += 6; // spacing between sections
      }

      doc.save('investnest-termos.pdf');
    } catch (err) {
      // final fallback
      // eslint-disable-next-line no-console
      console.error('Failed to generate PDF or fallback file', err);
      try {
        const blob = new Blob([termsText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'investnest-termos.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (e) {
        window.print();
      }
    }
  }, [termsText]);

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors"
      >
        Voltar
      </button>

      <button
        onClick={downloadPdf}
        className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        </svg>
        Baixar PDF
      </button>
    </div>
  );

}
