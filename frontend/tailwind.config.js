/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nica: {
          blue: '#0067C6',        // Azul Cobalto Oficial de la Bandera de Nicaragua (RGB: 0, 103, 198)
          blueDark: '#004B91',    // Azul Marino Institucional de alto contraste
          blueDeep: '#002E66',    // Azul Profundo
          blueLight: '#3895EC',   // Azul Celeste Lacustre
          blueSoft: '#EBF4FD',    // Blanco con sutil matiz azul patrio
          white: '#FFFFFF',       // Blanco Bandera
          gold: '#E5A823',        // Dorado oficial de las letras y triángulo del Escudo
          goldDark: '#B8810E',    // Dorado bronceado
          green: '#3E8926',       // Verde de los cinco volcanes del escudo
          red: '#D32F2F',         // Rojo del gorro frigio de la libertad
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'nica': '0 8px 24px -4px rgba(0, 103, 198, 0.25)',
        'gold-glow': '0 0 20px rgba(229, 168, 35, 0.4)',
        'flag-glow': '0 0 30px rgba(0, 103, 198, 0.35)',
      }
    },
  },
  plugins: [],
}
