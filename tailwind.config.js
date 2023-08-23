/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Reem Kufi", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        dropout: "dropout 0.3s ease-in-out 1 forwards",
        dropin: "dropout 0.3s reverse ease-in-out 1 forwards",
        dropinout: "dropout 0.5s alternate ease-in-out 2",
      },
      keyframes: {
        dropout: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "50%": { opacity: 0.25 },
          "100%": { transform: "translateY(150%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
