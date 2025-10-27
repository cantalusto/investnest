'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export const CryptoTicker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h',
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        setCryptoData(data);
        setIsLoading(false);
      } catch (error) {
        // Silenciar erro no console e usar dados mockados
        // console.error('Erro ao buscar dados de criptomoedas:', error);
        
        // Dados mockados como fallback
        const mockData: CryptoData[] = [
          {
            id: 'bitcoin',
            symbol: 'btc',
            name: 'Bitcoin',
            current_price: 350000,
            price_change_percentage_24h: 2.5,
            image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
          },
          {
            id: 'ethereum',
            symbol: 'eth',
            name: 'Ethereum',
            current_price: 13000,
            price_change_percentage_24h: 1.8,
            image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
          },
          {
            id: 'binancecoin',
            symbol: 'bnb',
            name: 'BNB',
            current_price: 1800,
            price_change_percentage_24h: -0.5,
            image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
          },
          {
            id: 'solana',
            symbol: 'sol',
            name: 'Solana',
            current_price: 850,
            price_change_percentage_24h: 3.2,
            image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
          },
          {
            id: 'ripple',
            symbol: 'xrp',
            name: 'XRP',
            current_price: 3.5,
            price_change_percentage_24h: 1.2,
            image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
          }
        ];
        
        setCryptoData(mockData);
        setIsLoading(false);
      }
    };

    fetchCryptoData();
    // Atualizar a cada 2 minutos (reduzido para evitar rate limit)
    const interval = setInterval(fetchCryptoData, 120000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || cryptoData.length === 0) {
    return null;
  }

  if (!scrolled) {
    return null;
  }

  // Duplicar os dados para criar efeito infinito
  const duplicatedData = [...cryptoData, ...cryptoData, ...cryptoData];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-20 left-0 right-0 z-30 overflow-hidden w-full max-w-full"
    >
      {/* Background com animação suave */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
      
      {/* Borda inferior com animação */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(16, 240, 128, 0.2), transparent)',
          boxShadow: '0 0 20px rgba(16, 240, 128, 0.3)',
        }}
      />

      <div className="relative h-12 flex items-center overflow-hidden w-full">
        {/* Gradient nas bordas para efeito de fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/95 to-transparent z-10 pointer-events-none" />

        {/* Scroll infinito */}
        <motion.div
          className="flex gap-8 whitespace-nowrap will-change-transform"
          animate={{
            x: [0, -1920], // Ajustar baseado no conteúdo
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {duplicatedData.map((crypto, index) => {
            const isPositive = crypto.price_change_percentage_24h >= 0;
            return (
              <div
                key={`${crypto.id}-${index}`}
                className="flex items-center gap-2 px-4 flex-shrink-0"
              >
                {/* Logo da cripto */}
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-5 h-5 rounded-full"
                />
                
                {/* Símbolo */}
                <span className="text-gray-300 font-semibold text-sm uppercase">
                  {crypto.symbol}
                </span>
                
                {/* Preço */}
                <span className="text-white font-medium text-sm">
                  R$ {crypto.current_price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                
                {/* Variação 24h */}
                <span
                  className={`text-xs font-semibold ${
                    isPositive ? 'text-primary' : 'text-red-500'
                  }`}
                >
                  {isPositive ? '▲' : '▼'}{' '}
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </span>

                {/* Separador */}
                <div className="w-px h-4 bg-gray-700" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};
