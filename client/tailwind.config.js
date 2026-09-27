/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        PRIME: {
          50: '#effcf5',
          100: '#d9f9e7',
          200: '#b8f1d0',
          300: '#83e3b1',
          400: '#46cf8c',
          500: '#18b96f',
          600: '#0d9859',
          700: '#0b7949',
          800: '#0c603d',
          900: '#0a4f34'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, .08)',
        green: '0 18px 60px rgba(24, 185, 111, .20)'
      }
    }
  },
  plugins: []
};
