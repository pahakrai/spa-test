import express from "express";
import { getBookById } from "../helpers/books.js";
import { createOrder } from "../helpers/orders.js";
import { stripe } from "./stripe.js";

const router = express.Router();

router.post("/create-session-order", async (req, res) => {
  const { sessionId, username, phone, bookId, quantity } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) {
    res.status(440).send(new Error("Stripe Session Ended"));
  }
  const order = await createOrder({
    customerName: username,
    customerPhone: phone,
    orderItems: [
      {
        productId: bookId,
        qty: quantity,
      },
    ],
    paymentRef: sessionId,
  });
  // if session is correct create order here
  res.send({ session, order });
});

export { router as orderRouter };
