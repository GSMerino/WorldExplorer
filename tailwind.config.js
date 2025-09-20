// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: [
    "./index.html",             // si usas Vite
    "./src/**/*.{js,ts,jsx,tsx}" // todos tus componentes React/TS
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // otros configs...
}


