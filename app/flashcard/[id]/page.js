import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Flashcard() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    async function getFlashcard() {
      if (!search || loading || !user) return;

      console.log("search is", search);

      try {
        // Reference to the single document containing the flashcards array
        const flashcardDocRef = doc(
          db,
          "users",
          user.uid,
          "flashcardSets",
          search
        );
        const docSnap = await getDoc(flashcardDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
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
  }, [search, user, loading]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(index)}>
                  <CardContent>
                    <div>
                      <Typography variant="h5" component="div">
                        {flipped[index] ? flashcard.back : flashcard.front}
                      </Typography>
                    </div>
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
  );
}
