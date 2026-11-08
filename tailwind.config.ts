import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0B0E",
        panel: "#12141A",
        bone: "#ECE8E1",
        soft: "#C9C7C2",
        mute: "#A3A5AF",
        dim: "#8E909A",
        copper: "#E39A78",
        lavender: "#B48CDB",
        steel: "#7FA3C9",
      },
      fontFamily: {
        display: ['"Bodoni Moda"', '"Times New Roman"', "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
