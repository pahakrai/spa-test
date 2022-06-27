import express from "express";
import Stripe from "stripe";
import { getBookById } from "../helpers/books.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.get("/config", (req, res) => {
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    basePrice: process.env.BASE_PRICE,
    currency: process.env.CURRENCY,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
router.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post("/create-checkout-session", async (req, res) => {
  const domainURL = req.headers.referer;
  console.log(req.body);
  // const { quantity, bookId, name, phone, locale = "en" } = req.body;
  // const book = await getBookById(bookId);
  // Create new Checkout Session for the order
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(", "),
    locale: "en",
    line_items: [
      {
        name: "Pahak Rai",
        quantity: 1,
        currency: process.env.CURRENCY,
        amount: process.env.BASE_PRICE,
      },
    ],
    success_url: `${domainURL}/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled`,
  });

  const sessionBySessionId = await stripe.checkout.sessions.retrieve(
    session.id
  );
  // if no errors and sessionBySessionId
  // create order here temp after session is validated
  console.log(sessionBySessionId);

  res.send({
    sessionId: session.id,
  });
});

export { router as orderRouter };
