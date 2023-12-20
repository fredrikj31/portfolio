import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  },
  plugins: [],
};
export default config;
