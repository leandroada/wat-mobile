/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        llewie: ['Llewie'],
      },
      colors: {
        primary: '#233066',      // Deep navy blue
        secondary: '#FFB949',    // Yellow (buttons)
        highlight: '#1C75BC',    // Blue (CTA)
        textLight: '#FFFFFF',
        textDark: '#000000',
        surface: '#2D3A61',
        grayMuted: '#A0AEC0',
        yellowOn:"#FF9812", // Yellow on
        greenOn: "#00D532", // Green on
        blueBorder: "#0FA8B3", // Blue on
        greenOnline : "#00F27E",
        redOffline : "#F20000"
      },
    },
  },
  plugins: [],
};
