export const nuvioTheme = {
  extend: {
    colors: {
      nuvio: {
        black: "#050505",
        graphite: "#111111",
        charcoal: "#1A1A1A",
        surface: "#232323",
        gold300: "#F0D88A",
        gold500: "#E0B84A",
        gold700: "#C89A2E",
        champagne: "#F5E7B8",
        textPrimary: "#F5F3EE",
        textSecondary: "#B9B2A3",
        textMuted: "#7E786C",
      },
    },
    borderRadius: {
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    boxShadow: {
      "nuvio-soft": "0 10px 40px rgba(0,0,0,0.30)",
      "nuvio-premium": "0 20px 80px rgba(0,0,0,0.35)",
      "nuvio-gold": "0 0 30px rgba(224,184,74,0.18)",
    },
    transitionTimingFunction: {
      "nuvio-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    backdropBlur: {
      nuvio: "12px",
    },
  },
};
