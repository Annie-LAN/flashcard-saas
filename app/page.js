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
          {/* <SignIn /> */}
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
        {/* <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/flashcards"
        >
          Check out flashcards
        </Button> */}
        {/* learn more */}
        {/* <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button> */}
      </Box>

      {/* <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}> */}
      {/* Feature items */}
      {/* </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center"> */}
      {/* Pricing plans */}
      {/* </Grid>
      </Box> */}
    </>
  );
}
