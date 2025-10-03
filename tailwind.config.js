/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2D2A32",
          secondary: "#B25D5D",
          accent: "#A3B18A",
          neutral: "#3d4451",
          "base-100": "#ffffff", // white background
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#2D2A32",
          "primary-content": "#ffffff", // text on primary
          secondary: "#B25D5D",
          "secondary-content": "#ffffff",
          accent: "#A3B18A",
          "accent-content": "#1e293b",
          neutral: "#1e293b",
          "neutral-content": "#f3f4f6",
          "base-100": "#0f172a", // background
          "base-content": "#f3f4f6", // text color
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
      },
    ],
  },
};
