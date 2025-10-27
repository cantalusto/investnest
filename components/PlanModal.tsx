'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  range: string;
  percentage: string;
  description: string;
  features: string[];
  howItWorks: string[];
}

export const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  range,
  percentage,
  description,
  features,
  howItWorks,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 my-4 sm:my-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botão Fechar */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-primary transition-colors duration-200 z-10 p-1"
                  aria-label="Fechar"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Conteúdo */}
                <div className="p-5 sm:p-6 md:p-8">
                {/* Cabeçalho */}
                <div className="mb-5">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-primary text-base md:text-lg font-semibold mb-1">{subtitle}</p>
                  <p className="text-gray-400 text-sm md:text-base mb-3">{range}</p>
                  <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 md:px-6 md:py-2">
                    <span className="text-primary text-lg md:text-xl font-bold">
                      {percentage}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-5">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{description}</p>
                </div>

                {/* Características */}
                <div className="mb-5">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-primary">✓</span> Características
                  </h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                      >
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Como Funciona */}
                <div className="mb-5">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-primary">⚡</span> Como Funciona
                  </h4>
                  <ol className="space-y-2.5">
                    {howItWorks.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-300 text-sm md:text-base">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Aviso de Risco */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 md:p-4 mb-5">
                  <p className="text-yellow-200 text-xs md:text-sm">
                    <strong>⚠️ Aviso Importante:</strong> Os rendimentos apresentados são
                    estimativas baseadas em contratos inteligentes. Como em qualquer
                    investimento, há riscos e variações de mercado. Leia atentamente os
                    termos antes de investir.
                  </p>
                </div>

                {/* Botão CTA */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                  >
                    Fechar
                  </button>
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-black px-4 py-2.5 md:px-6 md:py-3 rounded-full font-bold transition-all duration-300 shadow-lg shadow-primary/20 text-sm md:text-base">
                    Investir Agora
                  </button>
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
