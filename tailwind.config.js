/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-2": "repeat(2, auto)",
      },
    },
  },
  plugins: [
    require("tailwind-bootstrap-grid")({
      containerMaxWidths: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    }),
  ],
  corePlugins: {
    container: false,
  },
};
