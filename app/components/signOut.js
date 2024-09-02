import { Button } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/"); // Redirect back to the home page
      })
      .catch((error) => {
        // An error happened.
        console.log("Failed to sign out", error);
      });
  };

  return (
    <Button variant="text" onClick={handleSignOut} color="white">
      Sign Out
    </Button>
  );
}
