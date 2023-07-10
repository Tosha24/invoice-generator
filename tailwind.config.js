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
        primaryColor: '#742099',
        hoverColor: '#4a044e',
        borderColor: '#f3f4f6',
        lightColor: '#d946ef',
      },
      fontFamily:{
        titleFont: ["Noto Sans", "sans-serif"],
        bodyFont: ["Noto Sans JP", "sans-serif"],
      },
      boxShadow: {
        shadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      }
    },
  },
  plugins: [],
}
