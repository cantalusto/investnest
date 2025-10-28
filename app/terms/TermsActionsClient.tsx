'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TermsActionsClientProps {
  termsText: string;
}

export const TermsActionsClient: React.FC<TermsActionsClientProps> = ({ termsText }) => {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBack = () => {
    router.push('/');
  };

  const downloadPdf = async () => {
    setIsDownloading(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      let yPosition = 20;
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      const lineHeight = 5;

      // Função para adicionar nova página se necessário
      const checkNewPage = (extraSpace = 0) => {
        if (yPosition + extraSpace > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Função para adicionar texto com quebra de linha automática
      const addText = (text: string, fontSize = 9, isBold = false) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        
        for (let i = 0; i < lines.length; i++) {
          checkNewPage();
          doc.text(lines[i], margin, yPosition);
          yPosition += lineHeight;
        }
      };

      // Logo
      doc.setFontSize(24);
      doc.setTextColor(16, 185, 129); // primary color
      doc.text('InvestNest', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Título
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('TERMOS DE USO E CONDIÇÕES GERAIS', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Data
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Última atualização: 27/10/2025', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Resetar cor para preto
      doc.setTextColor(0, 0, 0);

      // Processar o conteúdo separando seções
      const sections = termsText.split('\n\n');
      
      for (const section of sections) {
        if (!section.trim()) continue;
        
        // Ignorar o separador com símbolos
        if (section.includes('═══')) continue;
        
        const lines = section.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) {
            yPosition += 3;
            continue;
          }
          
          checkNewPage(10);
          
          // Detectar títulos de seções (começam com número ou CLÁUSULA ou CONSIDERANDO)
          if (
            /^\d+\./.test(line) || 
            line.startsWith('CLÁUSULA') || 
            line.startsWith('CONSIDERANDO') ||
            line.startsWith('CONTRATO DE') ||
            line.startsWith('PLANO PADRÃO') ||
            line.startsWith('PLANO LOOPING') ||
            line.startsWith('DOCUMENTO ASSINADO')
          ) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            addText(line, 10);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            yPosition += 2;
          }
          // Detectar nomes da empresa
          else if (line.includes('INVEST NEST TECNOLOGIA')) {
            doc.setFont('helvetica', 'bold');
            addText(line, 9);
            doc.setFont('helvetica', 'normal');
          }
          // Texto normal
          else {
            addText(line, 9);
          }
        }
        
        yPosition += 3; // Espaço entre seções
      }

      // Salvar
      doc.save('investnest-termos-de-uso.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>

        <button
          onClick={downloadPdf}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Baixar PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};
