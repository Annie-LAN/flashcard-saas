"use client";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "../components/signOut";
import SubscribeButton from "../components/subscribeButton";

export default function Flashcards() {
  const [user, loading, error] = useAuthState(auth);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const getFlashcardSets = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const flashcardSetsRef = collection(userDocRef, "flashcardSets");
          const querySnapshot = await getDocs(flashcardSetsRef);

          if (!querySnapshot.empty) {
            const sets = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Flashcard sets data:", sets); // Log flashcard sets data
            setFlashcardSets(sets);
          } else {
            console.log("No flashcard sets found!");
          }
        } catch (error) {
          console.error("Error fetching flashcard sets:", error);
        }
      };

      getFlashcardSets();
    }
  }, [user, loading]);

  const handleCardClick = (setId) => {
    console.log("Card clicked with ID:", setId);
    router.push(`/flashcard/${encodeURIComponent(setId)}`);
  };

  if (loading) return <div>Loading...</div>; // Optional loading state
  if (error) return <div>Error: {error.message}</div>; // Optional error state

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            SmartFlash
          </Typography>

          <Button variant="text" color="white" href="/generate">
            Generate
          </Button>
          <SubscribeButton />
          <SignOut />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Typography variant="h4" component="div" sx={{ mt: 4, mb: 4 }}>
          My Flashcard Sets
        </Typography>
        <Grid container spacing={3}>
          {flashcardSets.length > 0 ? (
            flashcardSets.map((flashcardSet, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => handleCardClick(flashcardSet.id)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {flashcardSet.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No flashcard sets found.</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
