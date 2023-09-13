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
        primary: {
          orange: "#FF8200", // Tennessee Orange
          gray: "#58595B", // Smoky Mountain Gray
          pebble: "#D5D1CB", // Pebble
          riverPearl: "#8A827B", // River Pearl
          tower: "#898B8C", // Tower
          mockingbird: "#222943", // Mockingbird
          interstate: "#788591", // Interstate
          cedar: "#57352A", // Cedar
          white: "#FFFFFF", // White
          black: "#000000", // Black
          patina: "#008693", // Patina
          ripple: "#4C728B", // Ripple
          forest: "#1A4338", // Forest
          glade: "#809B54", // Glade
          soybean: "#D4C74A", // Soybean
          salamander: "#8C4A1D", // Salamander
          spirit: "#C7661E", // Spirit
          beacon: "#F8A838", // Beacon
          ridge: "#3E3A5D", // Ridge
          iris: "#79698E", // Iris
          utKnoxvilleTorch: "#E65933", // UT Knoxville Torch
          utChattanoogaGold: "#FDB736", // UT Chattanooga Gold
          utSouthernRed: "#C8102E", // UT Southern Red
          utMartinNavy: "#0B2341", // UT Martin Navy
          uthscGreen: "#115740", // UTHSC Green
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
