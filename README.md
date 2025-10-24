# 🪺 InvestNest

**O seu ninho de cripto rendimento**

Plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi). Oferecemos uma interface moderna e intuitiva para investimentos em criptomoedas com contratos inteligentes e total transparência.

## ✨ Características

- 🎨 **Design Moderno**: Interface elegante com tema dark e animações fluidas
- 🌐 **Background Interativo**: Partículas animadas que reagem ao movimento do mouse
- � **Ticker de Criptomoedas**: Dados em tempo real das principais criptomoedas via CoinGecko API
- 📱 **Totalmente Responsivo**: Layout mobile-first com excelente UX em todos os dispositivos
- ⚡ **Performance Otimizada**: Carregamento rápido e animações suaves
- 🔍 **SEO Completo**: Meta tags, Open Graph, Twitter Cards, Schema.org e sitemap
- 🎯 **Navegação Fluida**: Scroll suave entre seções com indicador visual
- 🛡️ **LGPD Compliance**: Comprometidos com a proteção de dados

## �🚀 Tecnologias

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Inter, Baumans)
- **API**: [CoinGecko API](https://www.coingecko.com/api)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/cantalusto/investnest.git

# Entre na pasta do projeto
cd investnest

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Estrutura do Projeto

```
investnest/
├── app/                      # App Router do Next.js
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz com SEO
│   └── page.tsx             # Página principal
├── components/              # Componentes React
│   ├── AnimatedBackground.tsx
│   ├── Navbar.tsx
│   ├── CryptoTicker.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Plans.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/                  # Arquivos estáticos
│   ├── INVESTNEST - icon.svg
│   ├── INVESTNEST - LOGO.svg
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
└── package.json

## 🎯 Planos de Investimento

### Padrão (30 dias)
- **Nível 1**: R$ 100 - R$ 4.999,99 → 10% por ciclo
- **Nível 2**: R$ 5.000 - R$ 9.999,99 → 12% por ciclo
- **Nível 3**: R$ 10.000 - R$ 500.000 → 14% por ciclo

### Looping Prata (180 dias)
- **Nível 1**: R$ 100 - R$ 4.999,99 → 77% por ciclo
- **Nível 2**: R$ 5.000 - R$ 9.999,99 → 97% por ciclo
- **Nível 3**: R$ 10.000 - R$ 500.000 → 119,5% por ciclo

### Looping Ouro (360 dias)
- **Nível 1**: R$ 100 - R$ 4.999,99 → 176,8% por ciclo
- **Nível 2**: R$ 5.000 - R$ 9.999,99 → 228,6% por ciclo
- **Nível 3**: R$ 10.000 - R$ 500.000 → 361,71% por ciclo

## � Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Lint
npm run lint
```

## 🌐 Deploy

O projeto está otimizado para deploy na [Vercel](https://vercel.com):

1. Faça push para o GitHub
2. Importe o projeto na Vercel
3. A Vercel detectará automaticamente Next.js e fará o deploy

## 📄 Licença

Este projeto é propriedade da InvestNest © 2025

## 📧 Contato

- **Email**: contato@investnest.com.br
- **Website**: [investnest.com.br](https://investnest.com.br)

---

Desenvolvido com 💚 pela equipe InvestNest

# Build para produção
npm run build

# Executar versão de produção
npm start
```

## 🌐 Acesso

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📄 Estrutura do Projeto

```
InvestNest/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── AnimatedBackground.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Plans.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   ├── INVESTNEST - icon.svg
│   └── INVESTNEST - LOGO.svg
└── ...
```

## 📧 Contato

Email: contato@investnest.com.br

## 🔍 SEO e Indexação

O projeto está otimizado para mecanismos de busca com:

- ✅ **Meta tags** completas (title, description, keywords)
- ✅ **Open Graph** para redes sociais
- ✅ **Twitter Cards** para compartilhamento no Twitter
- ✅ **Schema.org** structured data (JSON-LD)
- ✅ **Sitemap.xml** para rastreamento do Google
- ✅ **Robots.txt** configurado
- ✅ **Manifest.json** para PWA
- ✅ **Favicon** SVG responsivo

### Configuração do Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade do site
3. Copie o código de verificação
4. Atualize o campo `verification.google` em `app/layout.tsx`
5. Envie o sitemap: `https://investnest.com.br/sitemap.xml`

---

© 2025 InvestNest. Todos os direitos reservados.
