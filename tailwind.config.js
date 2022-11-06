/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
      translate: {
        'more': "calc(100% + 20px)",
      },
      padding: {
        'border': '1px',
      },
      height: {
        '128': '32rem',
        '135': '35rem',
      },
      width: {
        '110' : '28rem',
        '128': '32rem',
        '135': '35rem',
      }
    },
  },
  plugins: [],
}