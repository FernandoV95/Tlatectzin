/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'silkscreen': ['Silkscreen', 'cursive'],
        'fascinate': ['Fascinate Inline', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}

