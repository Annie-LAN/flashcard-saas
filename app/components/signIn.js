"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "@/firebase";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API if needed.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        router.push("/generate"); // Redirect to a page
        console.log("Signed in successfully!");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(
          "Error signing in:",
          errorCode,
          errorMessage,
          email,
          credential
        );
      });
  };

  return (
    <Button variant="contained" onClick={handleSignIn}>
      Sign In With Google
    </Button>
  );
}
