import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestNest - O seu ninho de cripto rendimento',
  description: 'Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi)',
  keywords: ['InvestNest', 'criptomoedas', 'DeFi', 'investimento', 'cripto', 'rendimento', 'blockchain', 'smart contracts', 'investimento descentralizado', 'yield farming', 'staking'],
  authors: [{ name: 'InvestNest' }],
  creator: 'InvestNest',
  publisher: 'InvestNest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/INVESTNEST - icon.svg',
    shortcut: '/INVESTNEST - icon.svg',
    apple: '/INVESTNEST - icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://investnest.com.br',
    siteName: 'InvestNest',
    title: 'InvestNest - O seu ninho de cripto rendimento',
    description: 'Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi). Invista em criptomoedas com segurança e tecnologia.',
    images: [
      {
        url: '/INVESTNEST - LOGO.svg',
        width: 1200,
        height: 630,
        alt: 'InvestNest Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvestNest - O seu ninho de cripto rendimento',
    description: 'Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi)',
    images: ['/INVESTNEST - LOGO.svg'],
    creator: '@investnest',
  },
  verification: {
    google: 'seu-codigo-google-search-console',
  },
  alternates: {
    canonical: 'https://investnest.com.br',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'InvestNest',
    description: 'Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi)',
    url: 'https://investnest.com.br',
    logo: 'https://investnest.com.br/INVESTNEST - icon.svg',
    email: 'contato@investnest.com.br',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://twitter.com/investnest',
      'https://facebook.com/investnest',
      'https://instagram.com/investnest',
    ],
    serviceType: 'Investimentos em Criptomoedas',
    areaServed: 'BR',
    keywords: 'DeFi, criptomoedas, investimento, blockchain, smart contracts',
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
