/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "410px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        prime: "#FFE418",
        navColor: "#126E51",
      },
      fontFamily: {
        lato: '"Lato", sans-serif',
        rubik: '"Rubik Maps", system-ui',
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2196F3",
          secondary: "teal",
          ".navbar-color": {
            "background-color": "#2196F3",
          },

          "--swiper-pagination-color": "#2196F3",
          "--swiper-auto-count-color": "#2196F3",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#FFE418",
          secondary: "teal",
          ".navbar-color": {
            "background-color": "#111827",
          },

          "--swiper-pagination-color": "#FFE418",
          "--swiper-auto-count-color": "#FFE418",
        },
      },
    ],
  },
};
