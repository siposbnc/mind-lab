/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0a0a0f',
          surface: '#0f0f16',
          card: '#13131a',
          elevated: '#18181f',
          border: '#1e1e2a',
        },
        brand: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        text: {
          primary: '#e2e2ea',
          secondary: '#9898a8',
          muted: '#5a5a6a',
        },
        status: {
          active: '#818cf8',
          waiting: '#f59e0b',
          done: '#22c55e',
          error: '#ef4444',
          idle: '#4b5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Cascadia Code', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
