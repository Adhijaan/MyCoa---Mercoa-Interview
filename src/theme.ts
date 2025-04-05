// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7043", //  Friendly Orange
    },
    secondary: {
      main: "#FFCA28", // Sunny yellow
    },
    background: {
      default: "#F5F5F5", // Light gray
    },
    text: {
      primary: "#333333", // Dark
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
