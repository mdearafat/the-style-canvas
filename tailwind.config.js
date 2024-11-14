/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F7FA',
          100: '#EAEFF4',
          200: '#D1DCE6',
          300: '#A8BDD1',
          400: '#799AB7',
          500: '#597E9F',
          600: '#456584',
          700: '#39516B',
          800: '#32465A',
          900: '#2D3C4D',
          950: '#1E2833',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
