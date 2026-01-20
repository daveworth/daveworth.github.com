import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "site-text": "#777",
        "site-heading": "#222",
        "site-link": "#39c",
        "site-heading-secondary": "#393939",
      },
      fontFamily: {
        sans: ["Lato", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#777",
            a: {
              color: "#39c",
              "&:hover": {
                color: "#39c",
              },
            },
            h1: { color: "#222" },
            h2: { color: "#393939" },
            h3: { color: "#494949" },
            h4: { color: "#494949" },
            strong: { color: "#222" },
            code: { color: "#222" },
          },
        },
      },
    },
  },
  plugins: [typography],
};
