import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        truetypewritter: 'var(--truetypewritter)',
        gillsans: 'var(--gillsans)'
      },
      colors:{
        'background':{
          DEFAULT: '#f3f3ee'
        },
        'invalid':{
          DEFAULT: '#F45050'
        },
      }
    },
  },
  plugins: [],
};
export default config;
