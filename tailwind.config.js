/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00C48C",
          dark: "#00A87A",
          mint: "#E7FAF3",
        },
        ink: "#1C1C1C",
        stone: "#8D8686",
        field: "#F3F0F0",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Segoe UI", "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
