/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'rp': '510px',
        'sp': '373px'
      }
    },
  },
  plugins: [],
}

