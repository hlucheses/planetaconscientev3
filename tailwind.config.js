/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base — paleta da Planeta Consciente
        ink:        "#0A2E1F", // verde-petróleo profundo (texto principal / fundos escuros)
        forest:     "#1E5A3E", // verde floresta
        leaf:       "#2E8B57", // verde folha (CTAs primários)
        teal:       "#2A9D8F", // verde teal
        mint:       "#C7EBD1", // verde água suave (fundos claros)
        cream:      "#FAF7F0", // off-white principal
        bone:       "#F3EFE3", // off-white alternativo
        // Acento quente — terracota / sol africano
        terracotta: "#D96E2E",
        clay:       "#B8541F",
        sun:        "#F2B544",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        body:    ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft":  "0 8px 30px -10px rgba(10, 46, 31, 0.18)",
        "glow":  "0 0 0 6px rgba(46, 139, 87, 0.15)",
      },
      animation: {
        "fade-up":       "fadeUp .8s cubic-bezier(.16,.84,.44,1) both",
        "fade-in":       "fadeIn .8s ease-out both",
        "marquee":       "marquee 40s linear infinite",
        "blob":          "blob 18s ease-in-out infinite",
        "count":         "count .6s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%":      { transform: "translate(30px,-20px) scale(1.08)" },
          "66%":      { transform: "translate(-20px,30px) scale(.95)" },
        },
        count: {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
