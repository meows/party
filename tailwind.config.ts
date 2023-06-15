import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-red": "rgb(227, 102, 118)",
        "brand-red_dark": "rgb(200, 46, 100)",
        "brand-gray": "rgb(175, 175, 175)",
        "brand-gray_light": "rgb(247, 247, 247)",
        "brand-black": "rgb(34, 34, 34)",
        "brand-blue": "rgb(55, 110, 200)",
        "brand-blue_light": "rgb(75, 160, 220)",
        "brand-orange": "rgb(234, 110, 63)",
      }
    },
  },
  plugins: [],
} satisfies Config;
