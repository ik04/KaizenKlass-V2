import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        highlight: "#E5E5CB",
        highlightSecondary: "#D5CEA3",
        primary: "#1A120B",
        primaryLighter: "#3C2A21",
        dashboard: "#251A10",
      },
      fontFamily: {
        display: ["DM Serif Display", "sans"],
        base: ["Oxanium", "sans"],
      },
    },
  },
  plugins: [],
} satisfies Config;
