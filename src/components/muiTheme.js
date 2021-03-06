import { createTheme } from "@mui/material/styles";

const dark = "#00000";
const grey = "#757886";
const red = "#ED3237";
const lightRed = "#FEF8F7";
const lightGrey = "#CCCCCC";
const lighterGrey = "#F2F2F2";
const green = "#7DA6C2";

const lightGreen = "#ECF6F3";
const gold = "rgb(243, 173, 83)";
const black = "#3E5EA9";
const white = "#ffffff";

export const muiTheme = createTheme({
  palette: {
    common: {
      dark,
      grey,
      red,
      green,
      lightRed,
      lightGrey,
      lighterGrey,
      lightGreen,
      gold,
      black,
      white,
    },
    primary: {
      main: dark,
    },
    secondary: {
      main: grey,
    },
    error: {
      main: red,
    },
    info: {
      main: lightGrey,
    },
    success: {
      main: green,
    },
    warning: {
      main: gold,
    },
  },
  typography: {
    fontFamily: [
      '"Euclid Circular"',
      '"Circular Std Medium"',
      "Roboto",
      "sans-serif",
    ].join(", "),
    fontSize: 10,
    htmlFontSize: 10,
    h1: {
      fontSize: "4rem",
      color: dark,
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "2.5rem",
      color: dark,
      fontWeight: 600,
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 300,
    },
    h4: {
      fontSize: "1.85rem",
      fontWeight: 300,
      "@media (max-width:600px)": {
        fontSize: "1.3rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 300,
    },
    h6: {
      fontSize: "2rem",
      lineHeight: "2.6rem",
      color: "#010101",
      fontWeight: "600",
    },

    body1: {
      fontSize: "1.4rem",
      fontWeight: 300,
      lineHeight: 1.7,
      color: dark,
    },
    body2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "-.5px",
    },
    btn: {
      fontSize: "2rem",
      textTransform: "none",
      height: "5rem",
      borderRadius: 30,
      fontWeight: 500,
      background:
        "linear-gradient(130deg, rgb(62, 94, 169) 0%, rgb(62, 94, 169) 34%, rgb(126, 237, 186) 100%)",
      boxShadow: "0px 0px 4px -1px rgba(71,64,71,0.63)",
    },

    rowBtn: {
      textTransform: "none",
      borderRadius: "2rem",
      padding: "1rem",
      maxWidth: "10rem",
    },

    cardIconWrapper: {
      width: 86,
      height: 84,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    cardGridWrapper: {
      height: "100%",
      width: "100%",
      borderRadius: 10,
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
    },

    cardParentGrid: {
      borderRadius: 10,
      height: "20.8rem",
      padding: 0,
      cursor: "pointer",
      width: "100%",
      "@media (min-width:600px)": {
        borderRadius: 6,
      },
    },
    FormLabel: {
      fontSize: "1.4rem",
      color: "#2D2F39",
      lineHeight: "2.3rem",
      letterSpacing: ".008em",
    },
    input: {
      // ...theme
      width: "100%",
      height: "5rem",
      borderRadius: ".5rem",
      padding: "1rem",
      fontSize: "1.5rem",
      color: "#2D2F39",
      borderWidth: "1px",
      fontWeight: 300,
      lineHeight: "2.3rem",
      letterSpacing: ".008em",
      "&:focus": {
        outline: "none",
      },

      "&::placeholder": {
        color: "#2D2F39",
        fontWeight: 300,
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#fff",
          boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          top: "-.9rem",
        },
      },
    },
  },
});
