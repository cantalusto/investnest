/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10f080',
        secondary: '#1a0a3a',
        dark: '#18181b',
        darkPurple: '#0a0520',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        baumans: ['var(--font-baumans)', 'Baumans', 'cursive'],
      },
    },
  },
  plugins: [],
}
