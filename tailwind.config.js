export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          black: "#1F1F24",
          DEFAULT: "#121C25",
          1: "#111014",
          2: "#090E14",
          3: "#0F132E",
        },
        gray: {
          neutral: "#8E9BA8",
          0: "#2C2D33",
          1: "#9096A7",
          3: "#F2F2F2",
          2: "#E6E6E6",
          4: "#596066",
          5: "#4C4C49",
          6: "#F5F6F7",
          7: "#FAFAFA",
          8: "#E6E6E7",
          9: "#E5EAEE",
          10: "#D3D5DC",
          11: "#828897",
          12: "#E9E9E9",
          13: "#6B6C70",
          14: "#F3F3F3",
        },
        red: {
          DEFAULT: "#E52E30",
          1: "#FF6666",
          2: "#E52E301F",
          3: "#FF493D",
          4: "#E52E30",
          5: "#FCEAEA",
          6: "#FDECEC",
          secondary: "#FEF5F5",
        },
        green: {
          DEFAULT: "#16CC53",
          1: "#49B97D33",
          2: "#49B97D",
        },
        yellow: {
          DEFAULT: "#F7E869",
          dark: "#DFBD40",
        },
      },
      lineHeight: {
        normal: "normal",
        130: "130%",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      fontSize: {
        10: "0.625rem", // 10px
        13: "13px", // 13px
        "4.5xl": "2.5rem", // 40px
        "3.5xl": "2rem", // 32px
      },
      borderRadius: {
        "2lg": "10px",
      },
      boxShadow: {
        "tab-item": "0px 4px 8px 0px rgba(18, 28, 37, 0.10)",
        custom:
          "3px 73px 96px 0px rgba(0,0,0,0.05),0px 22.007px 28.941px 0px rgba(0,0,0,0.03),0px 9.141px 12.021px 0px rgba(0,0,0,0.03),0px 3.306px 4.348px 0px rgba(0,0,0,0.02)",
      },
    },
  },
};
