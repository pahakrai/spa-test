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

router.post("/create-checkout-session", async (req, res) => {
  const domainURL = req.headers.referer;
  const {
    quantity,
    bookId,
    name,
    phone,
    locale = process.env.DEFAULT_LOCALE,
  } = req.body;
  const currencyMinPayment = 4;
  const book = await getBookById(bookId);
  // Create new Checkout Session for the order
  const customer = await stripe.customers.create({
    name,
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(", "),
    locale,
    customer: customer.id,
    line_items: [
      {
        name,
        quantity: 1,
        currency: process.env.CURRENCY,
        amount:
          book.price >= currencyMinPayment
            ? book.price * 100 * quantity // converting to cents
            : process.env.BASE_PRICE,
      },
    ],
    success_url: `${domainURL}/create/?session_id={CHECKOUT_SESSION_ID}&qty=${quantity}&username=${name}&phone=${phone}`,
    cancel_url: `${domainURL}/cancelled`,
  });

  res.send({
    sessionId: session.id,
  });
});

export { router as stripeRouter, stripe };
