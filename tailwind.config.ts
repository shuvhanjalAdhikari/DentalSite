import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,md}',
  ],
  theme: {
    container: {
      center: true,
      padding: 'var(--sp-6)',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        petrol: 'rgb(var(--c-petrol) / <alpha-value>)',
        'petrol-deep': 'rgb(var(--c-petrol-deep) / <alpha-value>)',
        'petrol-tint': 'rgb(var(--c-petrol-tint) / <alpha-value>)',
        rose: 'rgb(var(--c-rose) / <alpha-value>)',
        'rose-tint': 'rgb(var(--c-rose-tint) / <alpha-value>)',
        enamel: 'rgb(var(--c-enamel) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        white: 'rgb(var(--c-white) / <alpha-value>)',
        success: 'rgb(var(--c-success) / <alpha-value>)',
        warning: 'rgb(var(--c-warning) / <alpha-value>)',
        error: 'rgb(var(--c-error) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--fs-xs)',
        sm: 'var(--fs-sm)',
        base: 'var(--fs-base)',
        lg: 'var(--fs-lg)',
        xl: 'var(--fs-xl)',
        '2xl': 'var(--fs-2xl)',
        '3xl': 'var(--fs-3xl)',
        '4xl': 'var(--fs-4xl)',
      },
      lineHeight: {
        tight: 'var(--lh-tight)',
        snug: 'var(--lh-snug)',
        base: 'var(--lh-base)',
      },
      spacing: {
        1: 'var(--sp-1)',
        2: 'var(--sp-2)',
        3: 'var(--sp-3)',
        4: 'var(--sp-4)',
        6: 'var(--sp-6)',
        8: 'var(--sp-8)',
        12: 'var(--sp-12)',
        16: 'var(--sp-16)',
        24: 'var(--sp-24)',
        32: 'var(--sp-32)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
      maxWidth: {
        prose: '68ch',
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
