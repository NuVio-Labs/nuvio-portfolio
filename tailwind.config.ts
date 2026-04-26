import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body:    ["var(--font-body)"],
      },
      colors: {
        /* NuVio semantic tokens */
        background:       "var(--nv-bg)",
        surface:          "var(--nv-surface)",
        "surface-soft":   "var(--nv-surface-soft)",
        foreground:       "var(--nv-text-primary)",
        "text-primary":   "var(--nv-text-primary)",
        "text-secondary": "var(--nv-text-secondary)",
        "text-muted":     "var(--nv-text-muted)",
        accent:           "var(--nv-accent)",
        "accent-soft":    "var(--nv-accent-soft)",
        "border-soft":    "var(--nv-border-soft)",
        "border-subtle":  "var(--nv-border-subtle)",
        /* Gold scale */
        gold: {
          300: "var(--nv-gold-300)",
          500: "var(--nv-gold-500)",
          700: "var(--nv-gold-700)",
        },
        /* shadcn compat */
        border: "var(--nv-border-soft)",
        input:  "var(--nv-border-soft)",
        ring:   "var(--nv-accent)",
        primary: {
          DEFAULT:    "var(--nv-text-primary)",
          foreground: "var(--nv-bg)",
        },
        secondary: {
          DEFAULT:    "var(--nv-surface-soft)",
          foreground: "var(--nv-text-secondary)",
        },
        muted: {
          DEFAULT:    "var(--nv-surface-soft)",
          foreground: "var(--nv-text-muted)",
        },
        card: {
          DEFAULT:    "var(--nv-surface)",
          foreground: "var(--nv-text-primary)",
        },
        destructive: {
          DEFAULT:    "#c0392b",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        container:        "1120px",
        "container-wide": "1280px",
        "container-text": "720px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "logo-reveal": {
          "0%":   { opacity: "0", filter: "blur(10px)", transform: "scale(1.2)" },
          "20%":  { opacity: "1", filter: "blur(0px)",  transform: "scale(1.5)" },
          "60%":  { opacity: "1", filter: "blur(0px)",  transform: "scale(1.5)" },
          "100%": { opacity: "0.15", filter: "blur(3px)", transform: "scale(1.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "logo-reveal":    "logo-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
