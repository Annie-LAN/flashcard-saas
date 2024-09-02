"use client";

import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import SignIn from "./components/signIn";

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SmartFlash
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Need a better way to memorize?
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Enhance your learning with AI-powered flashcards generated from your
          own text for faster retention and deeper understanding.
        </Typography>
        <SignIn />
      </Box>
    </>
  );
}
