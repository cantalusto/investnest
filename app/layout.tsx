import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestNest - O seu ninho de cripto rendimento',
  description: 'Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi)',
  icons: {
    icon: '/INVESTNEST - icon.svg',
    shortcut: '/INVESTNEST - icon.svg',
    apple: '/INVESTNEST - icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
