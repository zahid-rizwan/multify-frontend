/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#051120',
          900: '#091E38',
          850: '#0C2545',
          800: '#0F2F57',
          700: '#164278',
          600: '#1F5A9F',
          500: '#2A72C5',
          100: '#E6EFF9',
          50: '#F2F7FD',
        },
        teal: {
          900: '#02383C',
          800: '#00585E',
          700: '#007078',
          600: '#00858F', // Logo Teal
          500: '#009EA9',
          400: '#06B6D4',
          300: '#38BDF8',
          200: '#A5F3FC',
          100: '#E0F5F6',
          50: '#F0F9FA',
        },
        crimson: {
          700: '#9F1239',
          600: '#BE123C',
          500: '#E11D48', // Erythrocyte blood cell red
          400: '#F43F5E',
          100: '#FFE4E6',
          50: '#FFF1F2',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 133, 143, 0.35)',
        'glow-crimson': '0 0 25px -5px rgba(225, 29, 72, 0.35)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.08)',
        'elevated': '0 20px 40px -15px rgba(9, 30, 56, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
