/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: "#00FFF0",
        violet: "#A855F7",
        darkbg: "#0E0E10",
        slatepanel: "#1C1C22",
      },
    },
  },
  plugins: [],
};
