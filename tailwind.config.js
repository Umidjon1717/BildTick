import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: "#C61F1F",
      secondary: "#1E1E1E",
    },
    fontFamily: {},
    container: {
      center: true,
      screens: {
        lg: "1340px",
      },
      padding: "1rem",
    },
  },
  darkMode: "class",
  plugins: [],
};
