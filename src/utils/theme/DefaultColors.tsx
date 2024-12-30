import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans, Roboto,Inter } from "next/font/google";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const plus: any = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "rtl",
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 600,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  // },
  palette: {
    primary: {
      main: "#022213",
      light: "#acdd33",
      dark: "#144322",
    },
    secondary: {
      main: "#fff",
      light: "#bbbebf",
      dark: "#0000",
    },
    success: {
      main: "#0000",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#000",
      secondary: "#00000",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '--TextField-brandBorderColor': '#E0E3E7',
    //       '--TextField-brandBorderHoverColor': '#B2BAC2',
    //       '--TextField-brandBorderFocusedColor': '#6F7E8C',
    //       '& label.Mui-focused': {
    //         color: 'var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: 'var(--TextField-brandBorderColor)',
    //     },
    //     root: {
    //       [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: 'var(--TextField-brandBorderHoverColor)',
    //       },
    //       [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: 'var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },

    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       "&::before": {
    //         borderBottom: "2px solid var(--TextField-brandBorderColor)",
    //       },
    //       "&:hover:not(.Mui-disabled, .Mui-error):before": {
    //         borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
    //       },
    //       "&.Mui-focused:after": {
    //         borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
    //       },
    //     },
    //   },
    // },
  },
});

export { baselightTheme };
