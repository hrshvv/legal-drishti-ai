/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          white: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981', // Emerald
          light: '#d1fae5'
        },
        danger: {
          DEFAULT: '#ef4444', // Red
          light: '#fee2e2'
        },
        warn: {
          DEFAULT: '#f59e0b', // Amber
          light: '#fef3c7'
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          strong: 'rgba(255, 255, 255, 0.9)'
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
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
