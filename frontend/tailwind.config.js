/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#007BFF",
        secondary: "#F58424",
        background: "#F9F9F9",
        textDark: "#333333",
      },
    },
  },
  plugins: [],
};
