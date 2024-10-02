import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all relevant file types
  ],
  theme: {
    extend: {
      // You can extend your theme here as needed
    },
  },
  darkMode: "class", // Enable dark mode using the 'class' strategy
  plugins: [
    addVariablesForColors, // Add your custom plugin to inject color variables
  ],
};

/** Adds CSS variables for all color values */
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors")); // Flatten the theme colors
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars, // Add CSS variables to the root element
  });
}
