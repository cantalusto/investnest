'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre nós', href: '#sobre' },
    { name: 'Planos', href: '#planos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detectar seção ativa
      const sections = ['inicio', 'sobre', 'planos', 'faq', 'contato'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80;
      
      // Scroll suave customizado com easing
      const startPosition = window.pageYOffset;
      const distance = offsetTop - startPosition;
      const duration = 1200; // 1.2 segundos
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
    
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background com animação suave */}
      <motion.div
        className={`absolute inset-0 ${scrolled ? 'backdrop-blur-md' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          backgroundColor: 'rgba(24, 24, 27, 0.95)',
          willChange: 'opacity',
        }}
      />
      
      {/* Borda inferior com animação */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: scrolled ? 1 : 0,
          scaleX: scrolled ? 1 : 0,
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut",
          opacity: { duration: 0.4 }
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(16, 240, 128, 0.2), transparent)',
          boxShadow: scrolled ? '0 0 20px rgba(16, 240, 128, 0.3)' : 'none',
          willChange: 'opacity, transform',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo e Menu Mobile - juntos à esquerda */}
          <div className="flex items-center gap-3">
            {/* Logo mobile - sempre visível */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="md:hidden flex items-center cursor-pointer"
            >
              <Image
                src="/INVESTNEST - icon.svg"
                alt="InvestNest"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
            </a>
            
            {/* Mobile Menu Button - ao lado da logo */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-primary focus:outline-none relative z-50 p-2 -mr-2"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </div>
            </button>
            
            {/* Logo desktop - só quando scrollado */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className={`hidden md:flex items-center cursor-pointer transition-opacity duration-300 ${
                scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src="/INVESTNEST - icon.svg"
                alt="InvestNest"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
            </a>
          </div>

          {/* Desktop Menu - centralizado */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <div key={item.name} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-gray-300 hover:text-primary transition-colors duration-300 font-medium cursor-pointer ${
                      isActive ? 'text-primary' : ''
                    }`}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Botão Login - à direita */}
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, '#contato')}
            className="hidden md:block bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            Login
          </a>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-t border-primary/20 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1 max-w-full">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.2 }}
                    className={`block text-base font-medium py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-300 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contato"
                onClick={(e) => {
                  handleNavClick(e, '#contato');
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="block bg-primary text-black py-2.5 rounded-full font-semibold text-center hover:bg-primary/90 transition-all duration-300 cursor-pointer mt-3 text-sm shadow-lg shadow-primary/20"
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
