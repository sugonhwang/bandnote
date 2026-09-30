import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#2B2014",
          bg: "#120D08",
        },
        ink: {
          DEFAULT: "#EDE0C4",
          muted: "#AB9873",
        },
        chrome: {
          DEFAULT: "#EDE0C4",
          muted: "#AB9873",
        },
        margin: {
          DEFAULT: "#E3A542",
          dark: "#F0C878",
          soft: "#3D2C15",
        },
        secondary: {
          DEFAULT: "#8B3A3A",
          dark: "#E0A79E",
          soft: "#3A2020",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Apple SD Gothic Neo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
