// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // otros configs...
}
