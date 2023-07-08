/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E86DE',
      },
      fontFamily:{
        titleFont: 'Noto Sans, sans-serif',
        bodyFont: 'Noto Sans JP, sans-serif',
      }
    },
  },
  plugins: [],
}
