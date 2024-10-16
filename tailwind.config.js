/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary : "#2a1b42",
        secondary: "grey",
        tertiary: "#211e35"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #160d24",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "main" : "url('/src/assets/background.jpeg')",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

