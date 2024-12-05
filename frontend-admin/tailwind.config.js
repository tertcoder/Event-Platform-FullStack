/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007BFF",
          dark: "#0056b3",
        },
        secondary: {
          DEFAULT: "#F58424",
          light: "#FFa354",
        },
        background: "#F9F9F9",
        text: {
          DEFAULT: "#333333",
          light: "#666666",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        custom: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
