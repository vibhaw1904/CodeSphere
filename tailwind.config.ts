import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-start': '#343b45',
        'bg-end': '#3b3127',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(315deg, var(--tw-gradient-stops))',

      },
    },
  },
  plugins: [],
};
export default config;
