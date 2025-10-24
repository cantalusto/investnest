'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <section id="contato" className="relative py-20 md:py-32">
      {/* Fundo escuro sem blur nas bordas */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Entre em <span className="text-primary">Contato</span>
          </h2>

          <p className="text-gray-300 text-lg mb-12">
            Dúvidas, sugestões ou quer saber mais sobre nossa plataforma?
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-8 md:p-12 hover:border-primary/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/30"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Email corporativo</h3>
                <a
                  href="mailto:contato@investnest.com.br"
                  className="text-primary text-2xl font-bold hover:text-primary/80 transition-colors duration-300"
                >
                  contato@investnest.com.br
                </a>
              </div>

              <p className="text-gray-400 text-sm">
                Respondemos em até 24 horas úteis
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
