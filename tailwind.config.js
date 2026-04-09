/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
        onyx: '#0E0E0D',
        'pitch-black': '#0C0A07',
        'brown-bark': '#6B411C',
        copper: '#B3793F',
        'dark-coffee': '#2A1B10',
        // Mapping your primary brand color to 'copper'
        stelina: '#B3793F', 
      },
      fontFamily: {
        tenor: ['"Tenor Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0E0E0D, #2A1B10, #6B411C)',
      }},
  },
  plugins: [],
}
