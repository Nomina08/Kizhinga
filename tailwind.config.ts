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
          green: '#1a7a4c',
          gold: '#c9a227',
          blue: '#0057a8',
          steppe: '#8fbc8f',
          earth: '#8b6914',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #1a7a4c 0%, #c9a227 45%, #0057a8 100%)',
        'hero-gradient-dark':
          'linear-gradient(135deg, #0d3d26 0%, #6b5518 45%, #003366 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
