/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a0e1a',
          800: '#0f1629',
          700: '#151d35'
        },
        gold: {
          DEFAULT: '#f5a623',
          light: '#fbbf24'
        },
        teal: {
          DEFAULT: '#00d4aa',
          dark: '#00a88a'
        },
        danger: {
          DEFAULT: '#ff4757',
          dark: '#cc2836'
        },
        warn: {
          DEFAULT: '#ffa502'
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          strong: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'fade-up': 'fadeSlideUp 0.5s ease forwards',
        'ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' }
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [],
}
