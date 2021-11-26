/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{jsx,tsx}', './ui/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
