"use client";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Flashcards() {
  const [user, loading, error] = useAuthState(auth);
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined" && router.isReady && !loading && user) {
      const getFlashcards = async () => {
        const docRef = doc(collection(db, "users"), user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setFlashcards(collections);
        } else {
          await setDoc(docRef, { flashcards: [] });
        }
      };
      getFlashcards();
    }
  }, [user, loading, router.isReady]);

  const handleCardClick = (id) => {
    if (router.isReady) {
      router.push(`/flashcard?id=${id}`);
    }
  };

  if (loading) return <div>Loading...</div>; // Optional loading state
  if (error) return <div>Error: {error.message}</div>; // Optional error state
  if (!user) return <div>Please sign in</div>; // Handle unauthenticated state

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
