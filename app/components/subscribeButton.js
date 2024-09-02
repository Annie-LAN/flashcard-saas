"use client";

import { Button } from "@mui/material";
import getStripe from "../utils/get-stripe";

export default function SubscribeButton() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  return (
    <Button variant="contained" color="primary" onClick={handleSubmit}>
      Subscribe
    </Button>
  );
}
