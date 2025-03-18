/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for Tailwind classes in all JS/JSX/TS/TSX files in src folder
  ],
  theme: {
    extend: {colors: {
      customDark: '#1A1A1A',
      lightdark:'#ABABAB' ,// rgb(11, 15, 23) equivalent
      borderlight:"202121",
    },},
  },
  plugins: [],
}
