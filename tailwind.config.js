/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts, js}'
  ],
  theme: {

    extend: {
      gridTemplateRows: {
        '13': 'repeat(13, minmax(0, 1fr))',

      }
    }
  },
  plugins: [],
}
