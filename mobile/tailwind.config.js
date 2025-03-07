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
        secondary: "#121519",
        white: "#F8F8F8",
      },
      fontFamily: {
        "soliden-condensed": ["Soliden-Condensed", "sans-serif"],
        "soliden-condensed-bold": ["Soliden-Condensed-Bold", "sans-serif"],
        "soliden-regular": ["Soliden-Regular", "sans-serif"],
        "soliden-bold": ["Soliden-Bold", "sans-serif"],
        "soliden-expanded": ["Soliden-Expanded", "sans-serif"],
        "soliden-expanded-bold": ["Soliden-Expanded-Bold", "sans-serif"],
        "marios-black": ["marios-black", "sans-serif"],
        "marios-regular": ["marios-regular", "sans-serif"],
        "marios-semibold": ["marios-semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
