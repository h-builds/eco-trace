import type { Config } from 'tailwindcss';
import tokens from './tokens.json';

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          'deep-charcoal': tokens.tokens.colors.brand['deep-charcoal'].value,
          'integrity-blue': tokens.tokens.colors.brand['integrity-blue'].value,
          'verification-green': tokens.tokens.colors.brand['verification-green'].value,
        },
        functional: {
          alert: tokens.tokens.colors.functional.alert.value,
          pending: tokens.tokens.colors.functional.pending.value,
          neutral: tokens.tokens.colors.functional.neutral.value,
        },
        surface: {
          canvas: tokens.tokens.colors.surface.canvas.value,
          card: tokens.tokens.colors.surface.card.value,
          border: tokens.tokens.colors.surface.border.value,
        },
      },
      fontFamily: {
        sans: [tokens.tokens.typography['font-family'].value],
      },
      fontSize: {
        base: tokens.tokens.typography['base-size'].value,
      },
      spacing: {
        base: tokens.tokens.spacing.base.value,
        '1': `${tokens.tokens.spacing.scale.value[0]}px`,
        '2': `${tokens.tokens.spacing.scale.value[1]}px`,
        '3': `${tokens.tokens.spacing.scale.value[2]}px`,
        '4': `${tokens.tokens.spacing.scale.value[3]}px`,
        '6': `${tokens.tokens.spacing.scale.value[4]}px`,
        '8': `${tokens.tokens.spacing.scale.value[5]}px`,
        '12': `${tokens.tokens.spacing.scale.value[6]}px`,
        '16': `${tokens.tokens.spacing.scale.value[7]}px`,
      },
      boxShadow: {
        subtle: tokens.tokens.shadows.subtle.value,
        'elevation-1': tokens.tokens.shadows['elevation-1'].value,
      },
    },
  },
  plugins: [],
};

export default config;
