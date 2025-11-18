'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-primary/20 bg-zinc-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2025 <span className="font-baumans"><span className="text-white">Invest</span><span className="text-primary">Nest</span></span>. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs">
            <Link href="/terms" className="hover:text-primary transition-colors duration-300">
              Termos de uso
            </Link>
            {' - '}
            <span>Política de privacidade</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
