import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: { xs: "475px", "3xl": "2000px" },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        open_sans: ["Open Sans"],
        sans: [...fontFamily.sans],
      },
      height: {
        "screen-minus-header": "calc(100vh - 6rem)", // Define custom height
      },
      keyframes: {
        pan: {
          "0%": { backgroundPosition: "calc(100% + 30px) center" } /* Start position */,
          "20%": { backgroundPosition: "calc(100% + 30px) center" } /* Pause at start */,
          "40%": { backgroundPosition: "0% center" } /* Quick slide left */,
          "60%": { backgroundPosition: "0% center" } /* Pause on left */,
          "80%": { backgroundPosition: "calc(100% + 30px) center" } /* Quick slide right */,
          "100%": { backgroundPosition: "calc(100% + 30px) center" } /* Back to start */,
        },
      },
      animation: {
        "bg-pan": "pan 25s ease-in-out infinite", // Total cycle duration
      },
    },
  },
};

export default config;
