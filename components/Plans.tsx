'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PlanCardProps {
  title: string;
  range: string;
  percentage: string;
  delay: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, range, percentage, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 md:p-8 hover:border-primary/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/30"
    >
      <h4 className="text-gray-400 text-sm md:text-base mb-2">{title}</h4>
      <p className="text-white text-xl md:text-2xl font-bold mb-4">{range}</p>
      <p className="text-primary text-2xl md:text-3xl font-bold">{percentage}</p>
    </motion.div>
  );
};

export const Plans: React.FC = () => {
  const padrao = [
    { title: 'Padrão 1', range: 'R$ 100 - R$ 4.999,99', percentage: '10% por ciclo' },
    { title: 'Padrão 2', range: 'R$ 5.000 - R$ 9.999,99', percentage: '12% por ciclo' },
    { title: 'Padrão 3', range: 'R$ 10.000 - R$ 500.000', percentage: '14% por ciclo' },
  ];

  const prata = [
    { title: 'Prata 1', range: 'R$ 100 - R$ 4.999,99', percentage: '77% por ciclo' },
    { title: 'Prata 2', range: 'R$ 5.000 - R$ 9.999,99', percentage: '97% por ciclo' },
    { title: 'Prata 3', range: 'R$ 10.000 - R$ 500.000', percentage: '119,5% por ciclo' },
  ];

  const ouro = [
    { title: 'Ouro 1', range: 'R$ 100 - R$ 4.999,99', percentage: '176,8% por ciclo' },
    { title: 'Ouro 2', range: 'R$ 5.000 - R$ 9.999,99', percentage: '228,6% por ciclo' },
    { title: 'Ouro 3', range: 'R$ 10.000 - R$ 500.000', percentage: '361,71% por ciclo' },
  ];

  return (
    <section id="planos" className="relative py-20 md:py-32">
      {/* Fundo escuro com blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Planos de <span className="text-primary">investimento</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Todos os planos são executados automaticamente via contrato inteligente,
            <br className="hidden md:block" />
            com ciclos e rendimentos proporcionais ao valor investido.
          </p>
        </motion.div>

        {/* Planos Padrão */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Planos padrão <span className="text-primary">(30 dias por ciclo)</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {padrao.map((plan, index) => (
              <PlanCard key={plan.title} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Looping Prata */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Looping prata <span className="text-primary">(180 dias por ciclo)</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prata.map((plan, index) => (
              <PlanCard key={plan.title} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Looping Ouro */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Looping ouro <span className="text-primary">(360 dias por ciclo)</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ouro.map((plan, index) => (
              <PlanCard key={plan.title} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
