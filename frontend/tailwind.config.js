module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'quicksand': ['Quicksand', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: "#F0572D",
        secondary: "#31363F",
        tertiary: "#191B1D",
        neutral: "#DFE4EA",
        borderColor: "#F3F1ED",
      },
    borderRadius: {
      none: "0",
      lg: "10px",
      md: "6px",
      trlg: "8px",
    },
    boxShadow: {
      first: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
  },
  },
  plugins: [],
};
