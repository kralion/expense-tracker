/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#368983",
        accent: "#BCE15B",
        secondary: "#9E9E9E",
        mute: "#AEACAC",
        textmuted: "#6D6868",
        bold: "#2F7D79",
        background: "#F5F3F3",
        mutedwhite: "#F4F4F4",
      },
    },
  },
  plugins: [],
};
