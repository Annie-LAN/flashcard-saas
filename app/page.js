"use client";

import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import SignIn from "./components/signIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.25rem",
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SmartFlash
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          px: 2, // Optional padding for small screens
          textAlign: "center",
          my: 8,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Need a better way to memorize?
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Enhance your learning with AI-powered flashcards generated from your
          own text for faster retention and deeper understanding.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <SignIn />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
