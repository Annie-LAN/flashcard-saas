"use client";

import { useEffect, useState } from "react";
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
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "../../components/signOut";
import SubscribeButton from "@/app/components/subscribeButton";

export default function Flashcard({ params }) {
  const { id } = params;
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardName, setFlashcardName] = useState("");
  const [flipped, setFlipped] = useState({});
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    async function getFlashcard() {
      if (loading || !user) return;

      try {
        // Reference to the single document containing the flashcards array
        const flashcardDocRef = doc(db, "users", user.uid, "flashcardSets", id);
        const docSnap = await getDoc(flashcardDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // get name
          const flashcardSetName = data.name || "";
          setFlashcardName(flashcardSetName);
          // get flashcards: back and front
          const flashcardsArray = data.flashcards || [];
          setFlashcards(flashcardsArray);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
      }
    }

    getFlashcard();
  }, [id, user, loading]);

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            SmartFlash
          </Typography>
          <Button variant="text" color="white" href="/flashcards">
            Flashcards
          </Button>
          <Button variant="text" color="white" href="/generate">
            Generate
          </Button>
          <SubscribeButton />
          <SignOut />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Typography variant="h4" component="div" sx={{ mt: 4 }}>
          {flashcardName}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
          {flashcards.length > 0 ? (
            flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {flipped[index] ? flashcard.back : flashcard.front}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No flashcards found.</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
