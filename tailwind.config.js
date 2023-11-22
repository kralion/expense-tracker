/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#10828D",
        accent: "#A3E062",
        secondary: "#9E9E9E",
        tertiary: "#12557B",
        mute: "#AEACAC",
        textmuted: "#6D6868",
        bold: "#2F7D79",
        background: "#F5F3F3",
        mutedwhite: "#F2F3EE",
      },
    },
  },
  plugins: [],
};
