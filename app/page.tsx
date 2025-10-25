'use client';

import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navbar } from '@/components/Navbar';
import { CryptoTicker } from '@/components/CryptoTicker';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Plans } from '@/components/Plans';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 overflow-x-hidden">
        <Navbar />
        <CryptoTicker />
        <Hero />
        <About />
        <Plans />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
