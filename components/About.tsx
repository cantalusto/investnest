'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="relative py-20 md:py-32">
      {/* Fundo escuro com blur - fade apenas no topo para transição do Hero */}
      <div 
        className="absolute inset-0 backdrop-blur-sm" 
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 15%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Sobre a <span className="text-primary font-baumans">InvestNest</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                A <span className="text-primary font-semibold font-baumans">InvestNest</span> é uma plataforma de tecnologia financeira voltada à inovação no
                mercado de investimentos descentralizados (DeFi).
              </p>

              <p>
                Nosso objetivo é simplificar o acesso a investimentos digitais seguros e
                automatizados, utilizando contratos inteligentes (Smart Contracts) para
                garantir eficiência, transparência e autonomia aos investidores.
              </p>

              <p>
                Trabalhamos com responsabilidade, conforme a Lei Geral de Proteção de
                Dados (LGPD) e com processos de validação contábil e fiscal em andamento.
              </p>
            </div>

            {/* Cards DeFi, Smart, LGPD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-zinc-800/50 border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-primary text-2xl font-bold mb-2">DeFi</h3>
                <p className="text-gray-400 text-sm">Investimentos Descentralizados</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-zinc-800/50 border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-primary text-2xl font-bold mb-2">Smart</h3>
                <p className="text-gray-400 text-sm">Contratos Inteligentes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-zinc-800/50 border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-primary text-2xl font-bold mb-2">LGPD</h3>
                <p className="text-gray-400 text-sm">Segurança e Privacidade</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
