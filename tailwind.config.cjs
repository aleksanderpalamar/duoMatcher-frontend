/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    screens: {
      smartphone: "320px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      backgroundImage: {
        background: "url('/background.png')",
        gradient:
          "linear-gradient(89.86deg, #9572fc 23.08%, #43e7ad 60.94%, #e1d55d 33.57%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: [],
};
