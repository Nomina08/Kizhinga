import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        buryat: {
          green: '#1a6b47',
          'green-light': '#2d8a5e',
          gold: '#c4a035',
          'gold-light': '#d4b85a',
          blue: '#1e5a8a',
          'blue-light': '#2a7ab8',
          sand: '#e8dcc8',
          mist: '#f5f2eb',
          earth: '#7a5c1e',
          steppe: '#9cb896',
        },
        surface: {
          DEFAULT: '#faf9f7',
          elevated: '#ffffff',
          dark: '#0f1412',
          'dark-elevated': '#1a211e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        body: ['1.125rem', { lineHeight: '1.6' }],
        'body-sm': ['1rem', { lineHeight: '1.6' }],
        h3: ['1.75rem', { lineHeight: '1.3' }],
        h2: ['2.25rem', { lineHeight: '1.2' }],
        h1: ['3.5rem', { lineHeight: '1.1' }],
        'h1-lg': ['3.5rem', { lineHeight: '1.05' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(26, 107, 71, 0.08)',
        card: '0 8px 32px -8px rgba(15, 20, 18, 0.12)',
        'card-hover': '0 20px 48px -12px rgba(15, 20, 18, 0.18)',
        glow: '0 0 40px -8px rgba(196, 160, 53, 0.35)',
        'glow-green': '0 0 40px -8px rgba(26, 107, 71, 0.4)',
        inner: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(180deg, rgba(15,30,22,0.55) 0%, rgba(15,20,18,0.45) 40%, rgba(15,25,40,0.75) 100%)',
        'section-fade':
          'linear-gradient(180deg, var(--tw-gradient-from) 0%, transparent 100%)',
        'premium-gradient':
          'linear-gradient(135deg, #1a6b47 0%, #c4a035 50%, #1e5a8a 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
