import type { Config } from "tailwindcss";

// Medidas y tipografía calcadas de la portada de referencia (Canela → Cormorant, Suisse → Inter)
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#353331",
        "ink-soft": "#696663",
        sand: "#f1eee9",
        card: "#ebe6df",
        cocoa: "#8d5e3f",
        rosa: "#e3a6b0",
      },
    },
  },
  plugins: [],
} satisfies Config;
