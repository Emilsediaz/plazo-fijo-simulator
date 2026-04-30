/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'animate-stagger-1',
    'animate-stagger-2',
    'animate-stagger-3',
    'animate-stagger-4',
    'animate-stagger-5',
    'animate-stagger-6',
    'animate-stagger-7',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f5f1',
          100: '#ecebe2',
          200: '#d9d6c4',
          900: '#0f1a16',
          950: '#070d0b',
        },
        moss: {
          400: '#7a9b6e',
          500: '#5a7d4f',
          600: '#3f5d36',
          700: '#2d4427',
          800: '#1f301c',
          900: '#142013',
        },
        gold: {
          400: '#d4b86a',
          500: '#b89a4a',
          600: '#947735',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'results-in': 'resultsIn 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'stagger-1': 'fadeUp 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-2': 'fadeUp 0.5s 0.12s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-3': 'fadeUp 0.5s 0.20s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-4': 'fadeUp 0.5s 0.28s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-5': 'fadeUp 0.5s 0.34s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-6': 'fadeUp 0.5s 0.40s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'stagger-7': 'fadeUp 0.5s 0.46s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'row-in': 'fadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        resultsIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
