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
          DEFAULT: "#F2EFE4",
          bg: "#E4E1D6",
        },
        ink: {
          DEFAULT: "#3A362E",
          muted: "#8B8577",
        },
        margin: {
          DEFAULT: "#CE8478",
          dark: "#93493E",
          soft: "#F1DAD5",
        },
        secondary: {
          DEFAULT: "#7FA6A6",
          dark: "#3F6363",
          soft: "#DCE8E6",
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
