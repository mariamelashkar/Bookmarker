/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        secondary: "#33658a",
      },
      fontFamily: {
        headingFont: ["Pacifico", "cursive"],
        bodyFont: ["Poppins", "serif"],
      },
    },
  },
  plugins: [require('daisyui')], 
};
