/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'medium-slate-blue': '#8576FF',
        'dark-shade-indigo': '#1C1678',
        'sky-blue': '#387ADF',
        'mint-green': '#A3FFD6',
        'cyan-bright': '#36C2CE',
        'corn-flower-blue': '#478CCF',
        'white-smoke': '#EDEDED'
      },
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
}

