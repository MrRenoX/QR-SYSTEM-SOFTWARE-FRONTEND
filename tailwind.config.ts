import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /**
       * Bounded (min AND max) screens for the public site only — NOT a
       * replacement for `md`/`lg` (the admin dashboard already uses those
       * with normal Tailwind cascading semantics for real desktop support,
       * and must keep working that way). The public site is a fixed-width
       * phone shell at <=430px and again at >=1440px (real desktop,
       * untouched) — `tab`/`tabLg` only ever apply in the tablet/iPad band
       * between those two, so a `tabLg:` utility can never leak onto a
       * desktop monitor. Unlike `md`/`lg`, these do NOT cascade into each
       * other — a property set under `tab:` must be repeated under
       * `tabLg:` if it should still apply there.
       */
      screens: {
        tab: { min: "431px", max: "1023px" },
        tabLg: { min: "1024px", max: "1439px" },
      },
      colors: {
        ivory: "#FDF9F4",
        cream: "#FBF3E9",
        sand: "#F6EADB",
        parchment: "#FFFDFA",
        terracotta: {
          DEFAULT: "#D9A24B",
          soft: "#E8C179",
          deep: "#A8722C",
          tint: "#F6EEDC",
        },
        ink: {
          DEFAULT: "#241A14",
          soft: "#3B2C23",
          muted: "#6D5B4F",
          faint: "#9A8878",
        },
        /** The homepage's rustic-brown hero/footer chrome — see Header/Hero/Footer etc. Not used on the site's other (still light) pages. */
        noir: {
          DEFAULT: "#4A2E1D",
          card: "#5C4030",
          border: "rgba(255,255,255,0.12)",
        },
        line: "#EDE0D2",
        water: {
          DEFAULT: "#2F6C9E",
          tint: "#E4EFF7",
        },
        whatsapp: "#25A24A",

        /** Super Admin panel only — a distinct SaaS-dashboard palette, isolated from the public site's warm theme. */
        admin: {
          sidebar: "#16132A",
          sidebarSoft: "#211D3D",
          accent: "#6D5BD0",
          accentSoft: "#EFECFB",
          bg: "#F6F6FB",
          card: "#FFFFFF",
          border: "#ECECF4",
          text: "#1F1D2E",
          muted: "#8B899C",
          faint: "#B4B2C4",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,26,20,0.04), 0 6px 18px -10px rgba(36,26,20,0.14)",
        float: "0 10px 30px -12px rgba(36,26,20,0.28)",
        shell: "0 0 0 1px rgba(36,26,20,0.05), 0 30px 80px -20px rgba(36,26,20,0.22)",
        adminCard: "0 1px 2px rgba(22,19,42,0.04), 0 8px 24px -12px rgba(22,19,42,0.10)",
      },
      borderRadius: {
        card: "14px",
        panel: "18px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateY(-8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "draw-line": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.35s ease-out both",
        "slide-in": "slide-in 0.25s cubic-bezier(0.22,1,0.36,1) both",
        "draw-line": "draw-line 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
