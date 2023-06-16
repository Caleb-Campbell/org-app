import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#1c1c1c'
    },}
  },
  plugins: [require("daisyui")],
} satisfies Config;
