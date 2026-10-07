import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── LMS-KID / design.md token aliases ──────────────────────────
        // Digunakan oleh NavbarGuest, Footer, dan komponen legacy
        surface:            "#F9F9FF",
        "surface-variant":  "#D6E3FF",
        "surface-dim":      "#C9DBFF",
        "surface-bright":   "#F9F9FF",
        "surface-container-lowest":  "#FFFFFF",
        "surface-container-low":     "#F0F3FF",
        "surface-container":         "#E7EEFF",
        "surface-container-high":    "#DFE8FF",
        "surface-container-highest": "#D6E3FF",
        "on-surface":         "#061B38",
        "on-surface-variant": "#494455",
        "on-background":      "#061B38",
        "primary-container":        "#7F54F8",
        "primary-fixed":            "#E8DEFF",
        "primary-fixed-dim":        "#CDBDFF",
        "on-primary":               "#FFFFFF",
        "on-primary-fixed":         "#20005F",
        "on-primary-fixed-variant": "#5010C8",
        "on-primary-container":     "#FFFCFF",
        "secondary-container":      "#5566EE",
        "secondary-fixed":          "#DFE0FF",
        "secondary-fixed-dim":      "#BCC2FF",
        "on-secondary":             "#FFFFFF",
        "on-secondary-fixed":       "#000A63",
        "on-secondary-fixed-variant": "#1E31BF",
        "on-secondary-container":   "#FFFBFF",
        "tertiary":                 "#00685F",
        "tertiary-container":       "#008378",
        "tertiary-fixed":           "#89F5E7",
        "tertiary-fixed-dim":       "#6BD8CB",
        "on-tertiary":              "#FFFFFF",
        "on-tertiary-fixed":        "#00201D",
        "on-tertiary-fixed-variant": "#005049",
        "on-tertiary-container":    "#F3FFFC",
        "outline":          "#7A7486",
        "outline-variant":  "#CAC3D8",
        "error":            "#BA1A1A",
        "error-container":  "#FFDAD6",
        "on-error":         "#FFFFFF",
        "on-error-container": "#93000A",
        "inverse-surface":    "#1E314E",
        "inverse-on-surface": "#ECF0FF",
        "inverse-primary":    "#CDBDFF",
        "surface-tint":       "#6839E0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
