import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

/**
 * Theme-Farbe aus globals.css, die trotzdem Deckkraft-Varianten erlaubt
 * (bg-accent/10, hover:border-accent/40, bg-surface/95 …). Mit einem
 * blossen "var(--nv-…)" erzeugt Tailwind diese Klassen gar nicht; vorher
 * waren dadurch 80 Stellen wirkungslos. color-mix() funktioniert auch mit
 * den Tokens, die selbst schon rgba() sind; ohne Deckkraftangabe ergibt es
 * exakt die Ausgangsfarbe.
 */
const token = (name: string) =>
  `color-mix(in srgb, var(--nv-${name}) calc(<alpha-value> * 100%), transparent)`

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
        background:       token("bg"),
        surface:          token("surface"),
        "surface-soft":   token("surface-soft"),
        "surface-raised": token("surface-raised"),
        "surface-strong": token("surface-strong"),
        foreground:       token("text-primary"),
        "text-primary":   token("text-primary"),
        "text-secondary": token("text-secondary"),
        "text-muted":     token("text-muted"),
        accent:           token("accent"),
        "accent-soft":    token("accent-soft"),
        "accent-text":    token("accent-text"),
        "border-soft":    token("border-soft"),
        "border-subtle":  token("border-subtle"),
        "border-strong":  token("border-strong"),
        /* Gold scale */
        gold: {
          300: token("gold-300"),
          500: token("gold-500"),
          700: token("gold-700"),
        },
        /* shadcn compat */
        border: token("border-soft"),
        input:  token("border-soft"),
        ring:   token("accent"),
        primary: {
          DEFAULT:    token("text-primary"),
          foreground: token("bg"),
        },
        secondary: {
          DEFAULT:    token("surface-soft"),
          foreground: token("text-secondary"),
        },
        muted: {
          DEFAULT:    token("surface-soft"),
          foreground: token("text-muted"),
        },
        card: {
          DEFAULT:    token("surface"),
          foreground: token("text-primary"),
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
