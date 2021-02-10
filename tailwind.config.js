module.exports = {
  purge: ['./{apps,libs,webcomponents}/*/src/**/*.{html,ts}'],
  theme: {
    inset: {
      '1/10': '10%',
      '1/2': '50%',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        warn: 'var(--color-warn)',
        main: 'var(--color-main)',
        light: 'var(--color-light)',
        background: 'var(--color-background)',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'group-hover'],
  },
  plugins: [],
}
