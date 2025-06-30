/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8B5CF6", // purple-500
          600: "#7C3AED", // purple-600
        },
      },
    },
  },
  plugins: [],
}
