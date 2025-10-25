'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80;
      
      // Scroll suave customizado com easing
      const startPosition = window.pageYOffset;
      const distance = offsetTop - startPosition;
      const duration = 600; // 0.6 segundos (reduzido de 1.2s)
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* Brilho neon verde */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 240, 128, 0.4) 0%, rgba(16, 240, 128, 0.2) 40%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1.4, 1.6, 1.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Logo */}
              <div className="relative z-10">
                <Image
                  src="/INVESTNEST - LOGO.svg"
                  alt="InvestNest - O seu ninho de cripto rendimento"
                  width={800}
                  height={350}
                  className="w-full h-auto max-w-2xl mx-auto drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(16, 240, 128, 0.5))'
                  }}
                  priority
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a
              href="#planos"
              onClick={(e) => handleNavClick(e, '#planos')}
              className="inline-flex items-center bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/50 cursor-pointer"
            >
              Conheça os planos
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
