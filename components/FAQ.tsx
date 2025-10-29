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

  // Função para renderizar texto com InvestNest em Baumans
  const renderTextWithBrand = (text: string) => {
    const parts = text.split('InvestNest');
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="font-baumans">InvestNest</span>
        )}
      </React.Fragment>
    ));
  };

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
        <span className="text-left text-lg font-medium text-white">{renderTextWithBrand(question)}</span>
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
              {renderTextWithBrand(answer)}
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
      question: 'O que significa aceitar os Termos de Uso da InvestNest?',
      answer:
        'Ao criar uma conta e utilizar a plataforma, o usuário declara estar de acordo com todas as regras descritas nos Termos de Uso, incluindo o funcionamento dos investimentos, responsabilidades, políticas de segurança e penalidades em caso de descumprimento. A aceitação é obrigatória para o acesso e uso dos serviços da InvestNest.',
    },
    {
      question: 'Quem pode usar a plataforma da InvestNest?',
      answer:
        'A plataforma é destinada a pessoas jurídicas e físicas maiores de 18 anos, residentes no Brasil, que realizem o cadastro com informações verdadeiras e atualizadas. Contas criadas com dados falsos ou incompletos podem ser suspensas ou encerradas.',
    },
    {
      question: 'Quais são as responsabilidades do usuário?',
      answer:
        'O usuário deve: Fornecer dados corretos e atualizados; Não utilizar a plataforma para fins ilegais, fraudulentos ou proibidos; Assumir os riscos inerentes aos investimentos em criptoativos e DeFi; Respeitar as regras e limites definidos em contrato.',
    },
    {
      question: 'A InvestNest garante lucros fixos?',
      answer:
        'Não. Os planos de investimento apresentam percentuais de rendimento estimados, definidos por contratos inteligentes (Smart Contracts), mas todos os investimentos envolvem riscos de mercado e variações. A InvestNest atua como intermediadora tecnológica, facilitando o acesso e oferecendo automação e transparência, sem prometer ganhos garantidos.',
    },
    {
      question: 'O que acontece se eu descumprir os Termos de Uso?',
      answer:
        'Em caso de violação das regras, fraude, lavagem de dinheiro ou informações falsas, a InvestNest poderá suspender ou encerrar sua conta, além de comunicar às autoridades competentes, se necessário. Os valores bloqueados seguirão as condições do contrato vigente.',
    },
    {
      question: 'Posso sacar meu investimento antes do prazo?',
      answer:
        'Sim, porém o saque emergencial implica multa de 20% sobre o valor investido e perda dos rendimentos do ciclo em andamento. Essas regras garantem o equilíbrio financeiro da plataforma e a segurança dos demais investidores.',
    },
    {
      question: 'Como serei informado sobre alterações nos Termos de Uso?',
      answer:
        'Sempre que houver atualizações relevantes, a InvestNest notificará o usuário por meio da plataforma, aplicativo ou e-mail cadastrado. Recomenda-se que o usuário verifique periodicamente os Termos de Uso para manter-se informado sobre eventuais mudanças.',
    },
    {
      question: 'Como a InvestNest gera lucro?',
      answer:
        'A InvestNest utiliza um modelo de retorno de circulação descentralizado e distribuído, no qual todos os participantes podem iniciar seus próprios planos de renda. Por meio de contratos inteligentes, os usuários fornecem liquidez e recebem retornos automáticos, de acordo com o plano escolhido. Os recursos são transformados em criptoativos e movimentados de forma transparente na blockchain.',
    },
  ];

  return (
    <section id="faq" className="relative py-20 md:py-32">
      {/* Fundo escuro sem blur nas bordas */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            FAQ — <span className="text-primary">perguntas frequentes</span>
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
