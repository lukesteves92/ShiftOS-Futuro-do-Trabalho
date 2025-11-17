module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050509",
        surface: "#0B0B12",
        elevated: "#14141F",
        primary: "#6E56CF",
        "primary-soft": "#3D2F7A",
        accent: "#22A699",
        muted: "#A1A1B5",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.45)",
      },
      backdropBlur: {
        glass: "18px",
      },
    },
  },
  plugins: [],
};