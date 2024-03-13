import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //* customize tailwind css container class
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        // DEFAULT: "1.25rem",
        // xs: "1.25rem",
        // sm: "1.25rem",
        // md: "2.375rem",
        // lg: "2.375rem",
        // xl: "4rem",
        // "2xl": "5rem",
        // "3xl": "10rem",
      },
    },

    //* customize tailwind css breakpoints
    screens: {
      xxs: "320px",
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
    },
    extend: {
      //* add your own colors here
      textColor: {
        secondaryDark: "#A4A4A4",
        secondaryLight: "#515151",
      },
      backgroundColor: {
        secondaryDark: "#232323",
        tertiaryDark: "#383535",
        dark: "#0D0D0D",
        secondaryLight: "#F5F5F5",
        tertiaryLight: "#D8D6D6",
      },
      borderColor: {
        primaryBorderDark: "#5E5E5E",
        primaryBorderLight: "#C8C8C8",
      },
      // boxShadow: {
      //   primary: "0px 4px 35px rgba(192, 192, 192, 0.45)",
      // },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: "#161616",
            foreground: "#ffffff",
            primary: {
              50: "#E8FFE8",
              100: "#D1FED1",
              200: "#A1FCA1",
              300: "#6EF96C",
              400: "#46F842",
              500: "#30F729",
              600: "#24F71C",
              700: "#17DC11",
              800: "#06C306",
              900: "#00A900",
              DEFAULT: "#06B906", // *add color here for dark mode
              foreground: "#ffffff",
            },
          },
        },
        light: {
          extend: "light",
          colors: {
            background: "#fff",
            foreground: "black",
            primary: {
              50: "#eff6e8",
              100: "#d8e1ce",
              200: "#c0cdb1",
              300: "#a7ba93",
              400: "#8fa675",
              500: "#768c5b",
              600: "#5b6d46",
              700: "#414e32",
              800: "#262f1c",
              900: "#0a1102",
              DEFAULT: "#404C2E", // *add color here for light mode
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};

export default config;
