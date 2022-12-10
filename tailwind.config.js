/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      dongle: ["Dongle"],
      gamja: ["Gamja Flower"],
    },
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      base: "1.4rem",
      lg: "1.6rem",
      xl: "1.8rem",
      "2xl": "2rem",
      "3xl": "2.2rem",
      "4xl": "2.4rem",
      "5xl": "2.6rem",
      "6xl": "2.8rem",
      "7xl": "3rem",
      "8xl": "3.2rem",
      "9xl": "3.4rem",
    },
    extend: {},
  },
  plugins: [],
};
