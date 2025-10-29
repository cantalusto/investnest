'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlanModal } from './PlanModal';
import InvestmentCalculator from './InvestmentCalculator';

interface SimplePlanCardProps {
  title: string;
  range: string;
  percentage: string;
  delay: number;
  onClick: () => void;
}

const SimplePlanCard: React.FC<SimplePlanCardProps> = ({ title, range, percentage, delay, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      onClick={onClick}
      className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 hover:border-primary/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/30 cursor-pointer group"
    >
      <h4 className="text-gray-400 text-sm md:text-base mb-2">{title}</h4>
      <p className="text-white text-xl md:text-2xl font-bold mb-4">{range}</p>
      <p className="text-primary text-2xl md:text-3xl font-bold">{percentage}</p>
      
      <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-medium">Ver detalhes</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
};

interface PlanData {
  title: string;
  subtitle: string;
  range: string;
  percentage: string;
  description: string;
  features: string[];
  howItWorks: string[];
}

export const Plans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);

  const plansData: Record<string, PlanData> = {
    'Padrão 1': {
      title: 'Plano Padrão 1',
      subtitle: '30 dias por ciclo',
      range: 'R$ 100 - R$ 4.999,99',
      percentage: '10% por ciclo',
      description: 'Ideal para quem está começando no mundo dos investimentos em criptomoedas. Com ciclos de 30 dias, você obtém retornos rápidos e pode reinvestir ou sacar seus rendimentos.',
      features: [
        'Investimento apartir de apenas R$ 100',
        'Ciclo curto de 30 dias',
        'Rendimento de 10% por ciclo',
        'Execução automática via Smart Contract',
        'Possibilidade de renovação automática',
        'Transparência total na blockchain'
      ],
      howItWorks: [
        'Você investe entre R$ 100 e R$ 4.999,99',
        'O valor é depositado em um contrato inteligente',
        'Durante 30 dias, o sistema executa estratégias DeFi automatizadas',
        'Ao final do ciclo, você recebe seu investimento + 10% de rendimento',
        'Opção de reinvestir automaticamente para composição de juros'
      ]
    },
    'Padrão 2': {
      title: 'Plano Padrão 2',
      subtitle: '30 dias por ciclo',
      range: 'R$ 5.000 - R$ 9.999,99',
      percentage: '12% por ciclo',
      description: 'Para investidores que buscam retornos maiores com um investimento moderado. Oferece 2% a mais de rendimento em comparação ao Padrão 1.',
      features: [
        'Investimento entre R$ 5.000 e R$ 9.999,99',
        'Rendimento de 12% por ciclo de 30 dias',
        'Acesso a pools DeFi de maior liquidez',
        'Prioridade no suporte',
        'Relatórios detalhados de performance',
        'Dashboard exclusivo para acompanhamento'
      ],
      howItWorks: [
        'Invista entre R$ 5.000 e R$ 9.999,99',
        'Acesso automático a estratégias premium',
        'O smart contract distribui seu capital em múltiplos protocolos DeFi',
        'Maximização de retorno através de yield farming otimizado',
        'Receba 12% de rendimento ao final de cada ciclo de 30 dias'
      ]
    },
    'Padrão 3': {
      title: 'Plano Padrão 3',
      subtitle: '30 dias por ciclo',
      range: 'R$ 10.000 - R$ 500.000',
      percentage: '14% por ciclo',
      description: 'O plano mais robusto da categoria Padrão, oferecendo 14% de rendimento mensal para investidores que buscam maximizar retornos de curto prazo.',
      features: [
        'Investimento de R$ 10.000 até R$ 500.000',
        'Maior rendimento: 14% por ciclo',
        'Acesso VIP a estratégias exclusivas',
        'Gestor dedicado para grandes investimentos',
        'Possibilidade de retirada parcial sem penalidades',
        'Seguro opcional para o investimento'
      ],
      howItWorks: [
        'Realize um investimento entre R$ 10.000 e R$ 500.000',
        'Seu capital é alocado nas melhores oportunidades DeFi do mercado',
        'Estratégias avançadas de arbitragem e staking',
        'Rebalanceamento automático para otimização contínua',
        'Rendimento garantido de 14% a cada 30 dias'
      ]
    },
    'Prata 1': {
      title: 'Looping Prata 1',
      subtitle: '180 dias por ciclo',
      range: 'R$ 100 - R$ 4.999,99',
      percentage: '77% por ciclo',
      description: 'Plano de médio prazo com rendimentos substancialmente maiores. Ideal para quem pode manter o investimento por 6 meses e busca retornos expressivos.',
      features: [
        'Investimento apartir de apenas R$ 100',
        'Rendimento de 77% em 180 dias',
        'Composição automática de juros',
        'Lock-in de 6 meses para garantir rendimento máximo',
        'Notificações de progresso mensais',
        'Bônus de fidelidade ao completar o ciclo'
      ],
      howItWorks: [
        'Invista entre R$ 100 e R$ 4.999,99',
        'Seu capital fica bloqueado por 180 dias em contratos otimizados',
        'Estratégias de longo prazo com maior exposição a oportunidades',
        'Reinvestimento automático dos rendimentos intermediários',
        'Ao final de 6 meses, receba 77% de rendimento sobre o valor inicial'
      ]
    },
    'Prata 2': {
      title: 'Looping Prata 2',
      subtitle: '180 dias por ciclo',
      range: 'R$ 5.000 - R$ 9.999,99',
      percentage: '97% por ciclo',
      description: 'Rendimento próximo a 100% em 6 meses. Excelente opção para quem busca quase dobrar o investimento em médio prazo.',
      features: [
        'Investimento entre R$ 5.000 e R$ 9.999,99',
        'Rendimento impressionante de 97% em 6 meses',
        'Acesso a protocolos DeFi de alta performance',
        'Proteção contra volatilidade com estratégias hedgeadas',
        'Relatório trimestral detalhado',
        'Opção de resgate antecipado com penalidade reduzida'
      ],
      howItWorks: [
        'Faça um investimento entre R$ 5.000 e R$ 9.999,99',
        'O contrato inteligente aplica estratégias de médio prazo',
        'Diversificação automática entre staking, lending e yield farming',
        'Reinvestimento programado para maximizar composição',
        'Rendimento total de 97% creditado ao final do período'
      ]
    },
    'Prata 3': {
      title: 'Looping Prata 3',
      subtitle: '180 dias por ciclo',
      range: 'R$ 10.000 - R$ 500.000',
      percentage: '119,5% por ciclo',
      description: 'O topo da categoria Prata: mais que dobre seu investimento em apenas 6 meses com segurança e transparência blockchain.',
      features: [
        'Investimento de R$ 10.000 até R$ 500.000',
        'Rendimento superior a 100%: 119,5% em 180 dias',
        'Gestão personalizada por algoritmos avançados',
        'Acesso antecipado a novos protocolos DeFi',
        'Seguro incluído para investimentos acima de R$ 50.000',
        'Consultoria especializada trimestral'
      ],
      howItWorks: [
        'Invista entre R$ 10.000 e R$ 500.000',
        'Alocação estratégica em protocolos de alta rentabilidade',
        'Monitoramento 24/7 com rebalanceamento automático',
        'Aproveitamento de oportunidades de liquidez premium',
        'Mais que dobre seu capital: receba 119,5% de rendimento'
      ]
    },
    'Ouro 1': {
      title: 'Looping Ouro 1',
      subtitle: '360 dias por ciclo',
      range: 'R$ 100 - R$ 4.999,99',
      percentage: '176,8% por ciclo',
      description: 'Plano anual premium com retornos extraordinários. Para investidores pacientes que buscam multiplicar seu capital em 1 ano.',
      features: [
        'Investimento apartir de apenas R$ 100',
        'Rendimento extraordinário de 176,8% ao ano',
        'Estratégias de longuíssimo prazo',
        'Participação em airdrops e eventos exclusivos',
        'NFT comemorativo para holders anuais',
        'Benefícios exclusivos no ecossistema InvestNest'
      ],
      howItWorks: [
        'Realize um investimento entre R$ 100 e R$ 4.999,99',
        'Lock-in de 12 meses para garantir rendimento máximo',
        'Exposição a protocolos DeFi com maior potencial de crescimento',
        'Composição contínua ao longo do ano',
        'Quase triplique seu investimento: 176,8% de rendimento anual'
      ]
    },
    'Ouro 2': {
      title: 'Looping Ouro 2',
      subtitle: '360 dias por ciclo',
      range: 'R$ 5.000 - R$ 9.999,99',
      percentage: '228,6% por ciclo',
      description: 'Rendimento superior a 200% ao ano. Transforme seu capital com este plano de elite para investidores experientes.',
      features: [
        'Investimento entre R$ 5.000 e R$ 9.999,99',
        'Rendimento excepcional: mais de 228% ao ano',
        'Acesso VIP a lançamentos exclusivos',
        'Participação em governança de protocolos',
        'Cashback mensal em tokens nativos',
        'Convites para eventos presenciais InvestNest'
      ],
      howItWorks: [
        'Invista entre R$ 5.000 e R$ 9.999,99 por 12 meses',
        'Estratégias agressivas de crescimento com gestão de risco',
        'Participação em pools de alta performance e liquidez',
        'Aproveitamento de ciclos completos de mercado',
        'Mais que triplique seu capital: 228,6% de rendimento'
      ]
    },
    'Ouro 3': {
      title: 'Looping Ouro 3',
      subtitle: '360 dias por ciclo',
      range: 'R$ 10.000 - R$ 500.000',
      percentage: '361,71% por ciclo',
      description: 'O plano mais premium da InvestNest. Rendimento de mais de 360% ao ano para grandes investidores que buscam resultados excepcionais.',
      features: [
        'Investimento de R$ 10.000 até R$ 500.000',
        'Rendimento supremo: 361,71% ao ano',
        'Gestão dedicada e personalizada',
        'Acesso prioritário a todas as novidades',
        'Seguro completo do investimento',
        'Linha direta com a equipe executiva',
        'Participação nos lucros da plataforma',
        'Status Diamond Member vitalício'
      ],
      howItWorks: [
        'Faça um investimento entre R$ 10.000 e R$ 500.000',
        'Carteira ultra-diversificada em protocolos de elite',
        'Estratégias proprietárias com IA e machine learning',
        'Acesso a oportunidades de venture capital em cripto',
        'Multiplique por mais de 4x: 361,71% de rendimento garantido'
      ]
    },
  };

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

  const handlePlanClick = (planTitle: string) => {
    const planData = plansData[planTitle];
    if (planData) {
      setSelectedPlan(planData);
    }
  };

  return (
    <section id="planos" className="relative py-20 md:py-32">
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

        <InvestmentCalculator />

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
              <SimplePlanCard 
                key={plan.title} 
                {...plan} 
                delay={index * 0.1}
                onClick={() => handlePlanClick(plan.title)}
              />
            ))}
          </div>
        </div>

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
              <SimplePlanCard 
                key={plan.title} 
                {...plan} 
                delay={index * 0.1}
                onClick={() => handlePlanClick(plan.title)}
              />
            ))}
          </div>
        </div>

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
              <SimplePlanCard 
                key={plan.title} 
                {...plan} 
                delay={index * 0.1}
                onClick={() => handlePlanClick(plan.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <PlanModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </section>
  );
};
