import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#1c1c1c',
        cardground: '#0f0f0f',
    },}
  },
  plugins: [require("daisyui")],
} satisfies Config;
