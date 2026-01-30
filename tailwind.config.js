export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        gold: "#FFFF00",
      },
      fontfamily: {
        brand: ["HelveticaRounded","sans-serif"],
        brandSub: ["HelveticaLight","sans-serif"],
        ui: ["poppins","sans-serif"],
      },
    },
  },
  plugins: [],
};
