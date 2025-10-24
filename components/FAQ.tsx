'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-2 border-primary/30 rounded-lg overflow-hidden mb-4 hover:border-primary/60 transition-colors duration-300 shadow-lg hover:shadow-primary/20 bg-zinc-900/50 backdrop-blur-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors duration-300"
      >
        <span className="text-left text-lg font-medium text-white">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 text-primary flex-shrink-0 ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-zinc-950/50 text-gray-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'A InvestNest garante lucros fixos?',
      answer:
        'Não. Os rendimentos apresentados são percentuais previstos, calculados por contratos inteligentes. Como em qualquer investimento, há riscos e variações de mercado.',
    },
    {
      question: 'Como a InvestNest gera lucro?',
      answer:
        'A plataforma utiliza contratos inteligentes (Smart Contracts) em protocolos DeFi para gerar rendimentos através de estratégias automatizadas de yield farming e staking.',
    },
    {
      question: 'Posso sacar meu investimento antes do prazo?',
      answer:
        'Os ciclos de investimento possuem prazos definidos (30, 180 ou 360 dias). O resgate antecipado pode estar sujeito a penalidades conforme especificado no contrato.',
    },
    {
      question: 'Quem pode usar a plataforma?',
      answer:
        'A plataforma está disponível para investidores brasileiros maiores de 18 anos que concordem com os termos de uso e política de privacidade.',
    },
    {
      question: 'A plataforma é segura?',
      answer:
        'Sim. Utilizamos tecnologia blockchain e contratos inteligentes auditados. Além disso, seguimos a LGPD e implementamos as melhores práticas de segurança da informação.',
    },
  ];

  return (
    <section id="faq" className="relative py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes <span className="text-primary">(FAQ)</span>
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
