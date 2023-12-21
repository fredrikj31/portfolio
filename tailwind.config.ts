import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      "light-background": "#FFFFFF",
      "light-header": "#333333",
      "light-text": "#555555",
      "dark-background": "#222222",
      "dark-header": "#FFFFFF",
      "dark-text": "#CCCCCC",

      primary: "#3498db",
      secondary: "#2ecc71",
      highlight: "#f1c40f",
      link: "#2980b9",
    },
    extend: {},
    // Breakpoints
    screens: {
      sm: "376px",
      md: "768px",
      mg: "1080px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1920px",
    },
  },
  plugins: [],
};
export default config;
