import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-background)",
        text: "var(--color-text)",
        secondary: "#b1fcff",
        "button-dark": "#596a74",
        red: "#d81b60",
        table: "#505254",
      },
    },
  },
  plugins: [],
} satisfies Config;
