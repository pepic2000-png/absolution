/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        easy: '#639922',
        medium: '#378ADD',
        hard: '#D85A30',
        maximum: '#7F77DD',
      },
    },
  },
  plugins: [],
}

