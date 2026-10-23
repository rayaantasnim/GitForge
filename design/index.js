tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        space: {
          black: "#020208",
          darker: "#050714",
          navy: "#0a0d26",
          card: "#0f1435",
          border: "rgba(0, 240, 255, 0.15)",
        },
        neon: {
          cyan: "#00f0ff",
          magenta: "#f000ff",
          green: "#00ff9d",
          amber: "#ffaa00",
          indigo: "#6366f1",
          violet: "#a855f7",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 3s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
};
