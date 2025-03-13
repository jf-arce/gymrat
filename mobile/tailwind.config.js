/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#C4EC39",
        secondary: "#121519", //Background
        tertiary: "#1F2937",
        white: "#F8F8F8",
        secondaryContrast: "#0e1114",
        secondaryText: "#8D8D8D",
        black: "#0a0a0a",
      },
      fontFamily: {
        "marios-black": ["marios-black", "sans-serif"],
        "marios-regular": ["marios-regular", "sans-serif"],
        "marios-semibold": ["marios-semibold", "sans-serif"],

        "clashgrotesk-extralight": ["clashgrotesk-extralight", "sans-serif"],
        "clashgrotesk-light": ["clashgrotesk-light", "sans-serif"],
        "clashgrotesk-regular": ["clashgrotesk-regular", "sans-serif"],
        "clashgrotesk-medium": ["clashgrotesk-medium", "sans-serif"],
        "clashgrotesk-semibold": ["clashgrotesk-semibold", "sans-serif"],
        "clashgrotesk-bold": ["clashgrotesk-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
