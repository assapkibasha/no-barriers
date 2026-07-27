/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Deep Water design system — see DESIGN.md. Components must use these
      // tokens, never raw Tailwind palette colors.
      colors: {
        brand: { DEFAULT: '#0F766E', hover: '#0D9488', aqua: '#2DD4BF', soft: '#E3F1EF' },
        ink: { DEFAULT: '#122B30', soft: '#527069' },
        unit: { DEFAULT: '#1D4ED8', soft: '#DBE7FD' },
        reward: { DEFAULT: '#D97706', soft: '#FBEED3' },
        heart: { DEFAULT: '#E11D48', soft: '#FDE5EA' },
        paper: '#FAF8F3',
        line: '#E9E4D8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
}
