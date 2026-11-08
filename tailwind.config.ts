import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#0A0A0C",
          raised: "#131216",
          inset: "#17161B",
          violet: "#0F0B14",
        },
        content: {
          primary: "#ECE8E1",
          secondary: "#CAC5BC",
          body: "#A8A29B",
          faint: "#8C867E",
        },
        accent: {
          copper: "#E39A78",
          lavender: "#B48CDB",
        },
        glow: {
          steel: "#1B2230",
          plum: "#2A1A3A",
        },
        line: {
          hairline: "rgba(236,232,225,0.10)",
          soft: "rgba(236,232,225,0.20)",
          strong: "rgba(236,232,225,0.35)",
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Times New Roman"', "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(52px, 8.4vw, 124px)", { lineHeight: "0.95" }],
        "display-xl": ["clamp(44px, 7vw, 104px)", { lineHeight: "0.98" }],
        "display-lg": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.04" }],
        "display-md": ["clamp(34px, 4.4vw, 60px)", { lineHeight: "1.06" }],
        "display-sm": ["clamp(28px, 3.4vw, 46px)", { lineHeight: "1.1" }],
        "display-xs": ["clamp(22px, 2.2vw, 30px)", { lineHeight: "1.2" }],
        lede: ["18px", { lineHeight: "1.65" }],
        body: ["16px", { lineHeight: "1.7" }],
        small: ["15px", { lineHeight: "1.65" }],
        meta: ["13px", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
