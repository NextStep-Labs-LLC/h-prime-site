import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    colors: {
      // H-Prime Brand Colors
      blue: {
        50: '#f0f7ff',
        100: '#e0efff',
        200: '#b9dafe',
        300: '#7cbffd',
        400: '#398ffc', // H-Prime Secondary Blue (links, phone)
        500: '#1a75e8',
        600: '#1B2A4A', // H-Prime Primary Navy (header, footer)
        700: '#162240',
        800: '#111a33',
        900: '#0c1226',
      },
      orange: {
        50: '#fffdf0',
        100: '#fffae0',
        200: '#fff3b8',
        300: '#ffe880',
        400: '#ffd940',
        500: '#FFC704', // H-Prime Gold Accent (CTA, highlights)
        600: '#e6b300',
        700: '#cc9f00',
        800: '#a68200',
        900: '#806300',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      // Keep essential default colors
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
    },
  },
  plugins: [],
} satisfies Config;
