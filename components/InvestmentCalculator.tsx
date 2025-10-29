'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlanModal } from './PlanModal';

const InvestmentCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [days, setDays] = useState<string>('30');
  const [result, setResult] = useState<{ total: number; profit: number; rate: number; planName: string } | null>(null);

  // Função para formatar o valor enquanto digita
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Remove tudo que não é número
    const numericValue = value.replace(/\D/g, '');
    
    // Armazena o valor numérico puro
    setAmount(numericValue);
    
    // Formata para exibição (adiciona pontos de milhar)
    if (numericValue) {
      const formatted = Number(numericValue).toLocaleString('pt-BR');
      setDisplayAmount(formatted);
    } else {
      setDisplayAmount('');
    }
  };

  const calculateInvestment = () => {
    const value = parseFloat(amount);
    const period = parseInt(days);

    if (isNaN(value) || value < 100 || isNaN(period) || period < 30) {
      alert('Por favor, insira um valor mínimo de R$ 100 e um período mínimo de 30 dias.');
      return;
    }

    let rate = 0;
    let planName = '';
    let planType = '';
    
    // Determinar tipo de plano baseado no período
    if (period >= 360) {
      planType = 'Ouro';
      // Looping Ouro - 360 dias (1 ciclo de 360 dias = rendimento total do período)
      if (value >= 100 && value < 5000) {
        rate = 1.768; // 176.8% por ciclo de 360 dias
        planName = 'Looping Ouro 1';
      } else if (value >= 5000 && value < 10000) {
        rate = 2.286; // 228.6% por ciclo de 360 dias
        planName = 'Looping Ouro 2';
      } else if (value >= 10000) {
        rate = 3.6171; // 361.71% por ciclo de 360 dias
        planName = 'Looping Ouro 3';
      }
    } else if (period >= 180) {
      planType = 'Prata';
      // Looping Prata - 180 dias (1 ciclo de 180 dias = rendimento total do período)
      if (value >= 100 && value < 5000) {
        rate = 0.77; // 77% por ciclo de 180 dias
        planName = 'Looping Prata 1';
      } else if (value >= 5000 && value < 10000) {
        rate = 0.97; // 97% por ciclo de 180 dias
        planName = 'Looping Prata 2';
      } else if (value >= 10000) {
        rate = 1.195; // 119.5% por ciclo de 180 dias
        planName = 'Looping Prata 3';
      }
    } else {
      planType = 'Padrão';
      // Plano Padrão - 30 dias
      if (value >= 100 && value < 5000) {
        rate = 0.10; // 10% por ciclo de 30 dias
        planName = 'Padrão 1';
      } else if (value >= 5000 && value < 10000) {
        rate = 0.12; // 12% por ciclo de 30 dias
        planName = 'Padrão 2';
      } else if (value >= 10000) {
        rate = 0.14; // 14% por ciclo de 30 dias
        planName = 'Padrão 3';
      }
    }

    // Para planos de 180 e 360 dias, o ciclo é o próprio período
    // Para plano de 30 dias, pode ter múltiplos ciclos
    let totalAmount;
    let profit;
    
    if (period >= 180) {
      // Para Prata e Ouro: aplica a taxa uma única vez (1 ciclo completo)
      totalAmount = value * (1 + rate);
      profit = totalAmount - value;
    } else {
      // Para Padrão: pode ter múltiplos ciclos de 30 dias
      const cycles = Math.floor(period / 30);
      totalAmount = value * Math.pow(1 + rate, cycles);
      profit = totalAmount - value;
    }

    setResult({
      total: totalAmount,
      profit: profit,
      rate: Math.round(rate * 100 * 100) / 100, // Arredonda com 2 casas decimais
      planName: planName
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-6 md:p-8 mb-16"
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        <span className="text-primary">Simule</span> seu investimento
      </h3>
      <p className="text-gray-400 text-center mb-6">
        Descubra quanto seu dinheiro pode render
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Valor do Investimento
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
            <input
              type="text"
              value={displayAmount}
              onChange={handleAmountChange}
              placeholder="0"
              className="w-full bg-zinc-900/50 border border-primary/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Período do Investimento
          </label>
          <div className="relative">
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-zinc-900/50 border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="30" className="bg-zinc-900 text-white">30 dias - Plano Padrão</option>
              <option value="180" className="bg-zinc-900 text-white">180 dias - Looping Prata</option>
              <option value="360" className="bg-zinc-900 text-white">360 dias - Looping Ouro</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateInvestment}
        className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Calcular Rendimento
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-zinc-900/50 border border-primary/30 rounded-xl p-6"
        >
          <h4 className="text-lg font-bold text-primary mb-4">Resultado da Simulação:</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Valor investido:</span>
              <span className="text-white font-semibold">{formatCurrency(parseFloat(amount))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Plano:</span>
              <span className="text-primary font-semibold">{result.planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Taxa aplicada:</span>
              <span className="text-primary font-semibold">{result.rate}% por ciclo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Lucro estimado:</span>
              <span className="text-primary font-bold text-lg">{formatCurrency(result.profit)}</span>
            </div>
            <div className="border-t border-primary/30 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total ao final:</span>
                <span className="text-primary font-bold text-xl">{formatCurrency(result.total)}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Simulação baseada em juros compostos por ciclo de 30 dias
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvestmentCalculator;
