/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#a855f7",
        accent: "#ec4899",
        background: "#0f172a",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        '3d': '0 20px 50px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(255, 255, 255, 0.05) inset',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }
    },
  },
  plugins: [],
}
